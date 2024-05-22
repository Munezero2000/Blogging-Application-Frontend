import { useState } from "react"
import toast from "react-hot-toast"

const useToggleLike = () => {
    const [spinner, setLoading] = useState(false)

    const toggleLike = async(id) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/blogs/${id}/toggleLike`)
            const result = await res.json()

            if(!res.ok) {
                throw new Error("Error in toggle like")
            }
            console.log(result)
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return {spinner, toggleLike}
}
export default useToggleLike