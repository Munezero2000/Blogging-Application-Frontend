import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const useSignup = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const signup = async({username, email, password}) => {
        const success = handleError({username, email, password})
        if (!success) return ;

        setLoading(true)
        try {
            const res = await fetch("/api/auth/register", {
                method: 'POST',
                headers: {'Content-Type': "application/json"},
                body: JSON.stringify({username, email, password})
            })
            const result = await res.json()
            
            if(result.error) {
                throw new Error(result.error)
            }

            toast.success("Thanks, Welcome to our blog")

            setTimeout(() => {
                navigate("/login")
            }, 2000)

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return {loading, signup}
}
export default useSignup

function handleError({username, email, password}) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username || !email || !password) {
        toast.error("Please fill all the fields.")
        return false
    }
    if(username.length < 2) {
        toast.error("Names must at least between 3 - 25 character.")
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