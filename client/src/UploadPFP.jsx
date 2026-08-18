import React, { useState, useEffect } from "react";
import { getProfilePicture, uploadProfilePicture } from "./api.js";

export default function UploadPFP() {
    const [file, setFile] = useState(null);     //file being uploaded (must be some type of image; not verified)
    const id = localStorage.getItem("userid");
    const [image, setImage] = useState(<img className="profile-picture"/>);
    const [msg, setMsg] = useState(<p/>);

    useEffect(() => {
        async function get_pfp(userid) {
            try{
                const response = await getProfilePicture(userid);
                if(response.success && response.filepath){
                    //The random number stops the browser from caching the old profile picture and ignoring changes to it
                    const num = String(Math.floor(Math.random()*512));
                    const path = response.filepath + "?" + num;
                    setImage(<img src={path} className="profile-picture"/>);
                } else {
                    //console.log("Error retrieving profile picture: "+response.message);
                }
            } catch(error) {
                console.error("Error retrieving profile picture:", error.message);
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
        try{
            const response = await uploadProfilePicture(id, file);
            if(response.success){
                console.log("Image uploaded successfully!");
                setMsg(<p style={{ color: "green" }}>{"Profile picture updated!"}</p>)
                const num = String(Math.floor(Math.random()*512));
                setImage(<img src={response.filepath + "?" + num} className="profile-picture"/>);
            } else {
                setMsg(<p style={{ color: "red" }}>{"Error: "+response.message}</p>);
            }
        } catch (error) {
            setMsg(<p style={{ color: "red" }}>{"Error: " + error.message}</p>);
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