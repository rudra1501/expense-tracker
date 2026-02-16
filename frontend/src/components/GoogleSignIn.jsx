import { useEffect } from "react"
import API from "../api/axios";


function GoogleSignIn({ onSuccess }) {
    useEffect(()=>{
        if(!window.google) return;

        window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
            document.getElementById("g_id_signin"),
            {theme: "outline", size: "large"}
        )
    },[]);

    const handleCredentialResponse = async(response)=>{
        try {
            const idToken = response.credential;
            const { data } = await API.post("/auth/google", {idToken});
            localStorage.setItem("token", data.token);
            onSuccess && onSuccess(data);
        } catch (error) {
            console.error("error in handleCredentialResponse", error);
            console.log("error in handle Credential Response: ", error)
            alert("google login failed");
        }
    };

  return <div id="g_id_signin"></div>;
}

export default GoogleSignIn;