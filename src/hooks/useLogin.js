import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const getUser = async (id) => {
    try {
      const res = await fetch(`/api/users/${id}`);
      const result = await res.json();

      localStorage.setItem("logged-user", JSON.stringify(result));
      setAuthUser(result);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const login = async ({ email, password }) => {
    const success = handleError({email, password})
    if(!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await res.json();


      if (result.error) {
        throw new Error(result.error);
      }

      toast.success("Login successful");

      // Fetch user data
      await getUser(result.userId);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};
export default useLogin;


function handleError({email, password}) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
        toast.error("Please fill all the fields.")
        return false
    }
    if (password.length < 6) {
        toast.error("Password must be at least 6 character.")
        return false
    }
    
    if (!emailPattern.test(email)) {
        toast.error("Invalid email format");
        return false;
    }
    return true
}
