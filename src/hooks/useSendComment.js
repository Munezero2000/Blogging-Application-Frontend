import { useState } from "react"
import toast from "react-hot-toast"
import useStore from "../../zustand/useStore"

const useSendComment = () => {
    const [loading, setLoading] = useState(false)
    const {selectedBlog, setSelectedBlog} = useStore()

    const sendComment = async(comment, blogId) => {

        if (!comment) {
            toast.error("Write your comment please")
            return ;
        }
        if(comment.length < 10) {
            toast.error("Comment must be between 10 - 1024 character")
            return;
        }
        setLoading(true)
        try {
            const res = await fetch(`/api/comments/${blogId}/newComment`, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({text: comment})
            })
            const newComment = await res.json()

            if(!res.ok) {
                throw new Error("Error on send comment")
            }

            toast.success("Comment sent successfully!");
            
            setSelectedBlog({
                ...selectedBlog,
                blog_comment: [...selectedBlog.blog_comment, newComment ]
            });
        } catch (error) {
            console.log(error)
            toast.error("Failed to send comment. Please try again later.")
        } finally {
            setLoading(false)
        }
    }
    return {loading, sendComment}
}
export default useSendComment