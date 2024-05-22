import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const logout = async () => {
        setLoading(true);
        try {
            // Check if the token exists
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
            if (token) {
                // Remove the "token" cookie
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }

            // Remove the "logged-user" from local storage
            localStorage.removeItem("logged-user");

            toast.success("Logging out...");
            // Redirect to the homepage after a short delay
            setTimeout(() => {
                navigate("/");
                window.location.reload();
            }, 2000);
        } catch (error) {
            toast.error("Error in logout process");
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout };
};

export default useLogout;
