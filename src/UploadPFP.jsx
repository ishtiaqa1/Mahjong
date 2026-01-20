import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UploadPFP() {
    const [file, setFile] = useState(null);     //file being uploaded (must be some type of image; not verified)
    const id = localStorage.getItem("userid");
    const [image, setImage] = useState(<img className="profile-picture"/>);
    const [msg, setMsg] = useState(<p/>);

    useEffect(() => {
        async function get_pfp(userid) {
            try{
                const response = await axios.post("https://jokersmahjong.gamer.gd/htdocs/get-pfp.php?", {"id": userid}, {
                    headers: { "Content-Type": "application/json" }
                });
                if(response.data.success){
                    //I took the substring here because every time I changed it server-side, the SQL queries somehow broke; control coupling
                    //The random number stops the browser from caching the old profile picture and ignoring changes to it
                    const num = String(Math.floor(Math.random()*512));
                    const path = "https://jokersmahjong.gamer.gd/htdocs/" + response.data.filepath.substring(9) + "?" + num;
                    //console.log(userid +": " + path);
                    setImage(<img src={path} className="profile-picture"/>);
                } else {
                    //console.log("Error retrieving profile picture: "+response.data.message);
                }
            } catch(error) {
                console.log("Axios error:", error.response ? error.response.data : error.message);
                console.error(err);
            }
        }
        get_pfp(id);
    },[]);
    
    const selectFile = (event) => {
        setMsg(<p/>);
        if(!event.target.files || !event.target.files.length){
            setFile("");
            return;
        }
        if(event.target.files[0].size > 120000000){
            setMsg(<p style={{ color: "red" }}>{"Error: image size must be under 1.2MB"}</p>);
            return;
        }
        setFile(event.target.files[0]);
        setImage(<img src={URL.createObjectURL(event.target.files[0])} className="profile-picture"/>);
    }

    async function send_file() {
        setMsg(<p/>)
        const formData = new FormData();
        formData.append("id", id);
        formData.append("image", file);
        try{
            const response = await axios.post("https://jokersmahjong.gamer.gd/htdocs/upload-pfp.php", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            if(response.data.success){
                console.log("Image uploaded successfully!");
                setMsg(<p style={{ color: "green" }}>{"Profile picture updated!"}</p>)

                //display "Profile picture updated successfully"
            } else {
                setMsg(<p style={{ color: "red" }}>{"Error: "+response.data.message}</p>);
            }
        } catch (error) {
            setMsg(<p style={{ color: "red" }}>{"Axios error:"+ error.response ? error.response.data : error.message}</p>);
        }
    }

    return(
        <div>
            <div>{image}</div>
            <div>
                Upload Profile Picture: <input type="file" name="image" accept="image/*" onChange={selectFile}/>
                <input type="submit" value="Submit" onClick={send_file}/>
                {msg}
            </div>
        </div>
    )
}