import React from "react";
import axios from "axios";
import BASE_URL from "../config.js"

// Tells the server that the user is online
// If more than 3 minutes have passed since it was called with someone's username, they will be listed as "offline" on the Friends page
export async function heartbeat(name){
    try {
        await axios.post(`${BASE_URL}update-online.php?`, {
            username: name,
            online: true
        });
    } catch (error){
        console.error("Axios error in heartbeat:", error.response ? error.response.data : error.message);
    }
}