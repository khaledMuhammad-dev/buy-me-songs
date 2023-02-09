import axios from "axios";

export const axiosAccessToken = axios.create({
    method: "POST",
    baseURL: "https://accounts.spotify.com/api/token",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(process.env.REACT_APP_SPOTIFY_CLIENT_ID + ":" + process.env.REACT_APP_SPOTIFY_SECRET),
    }
})