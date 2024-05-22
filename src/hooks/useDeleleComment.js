import { useState } from "react"
import toast from "react-hot-toast"

const useDeleteComment = () => {
    const [loading, setLoading] = useState(false)

    const deleteComment = async(blogId, commentId) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/comments/delete/${blogId}/${commentId}`, {
                method: "DELETE",
                headers: {'Content-Type': "application/json"}
            })
            const result = await res.json()

            if(!result.ok) {
                throw new Error("Error in delete a comment")
            }

            toast.success("Comment deleted successful")
            console.log(result)
        } catch (error) {
            console.log(error.message)
            toast.error("Failed to delete a comment. Try again later")
        } finally {
            setLoading(false)
        }
    }
    return {loading, deleteComment}
}
export default useDeleteComment