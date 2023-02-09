import { useState, useEffect } from "react";
import { axiosAccessToken } from "../../api/axiosInstanceses";

const useAccessToken = () => {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState("loading");
    const [error, setError] = useState<string|null>(null);

    useEffect(() => {
        const controller = new AbortController();
        let isCancelled = false;
        // get Access token
        const getAccessToken = async () => {
            try {
                const res = await axiosAccessToken.request({
                    signal: controller.signal,
                    data: "grant_type=client_credentials"
                });

                setToken(res.data.access_token);
            } catch (error: any) {
                if(isCancelled)
                {
                    return
                }
                
                if (!error.request) {
                    console.log("No Server Response!");
                    setError("No Server Response!")

                }
                else if (error.request?.status === 405) {
                    console.log("Bad Request");
                    setError("Bad Request")
                }
                else {
                    console.log("something went wrong please try later");
                    setError("something went wrong please try later");
                }
            } finally {
                setLoading("idle");
            }
        }

        // start fetching
        getAccessToken();

        return () => {
            isCancelled = true;
            // cancel fetching
            controller.abort();
        }

    }, [])


    return [token, loading, error]
}


export default useAccessToken