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
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        // credentials: 'include' // Ensure cookies are included
      });
      const result = await res.json();
      console.log(result);

      if (result.error) {
        console.log(result.error);
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
