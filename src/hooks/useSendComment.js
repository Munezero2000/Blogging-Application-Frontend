import { useState } from "react"
import toast from "react-hot-toast"
import useStore from "../../zustand/useStore"
import axios from "axios"

const useSendComment = () => {
    const [loading, setLoading] = useState(false)
    const {selectedBlog, setSelectedBlog} = useStore()
    
    const sendComment = async(comment, blogId) => {
        console.log(selectedBlog)
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
            const res = await axios.post(`/api/comments/${blogId}/newComment`, { text: comment }, {withCredentials: true})
            

            if(res.status !== 200) {
                throw new Error("Error on send comment")
            }
            console.log(res)

            toast.success("Comment sent successfully!");
            
            setTimeout(() => {
                
                window.location.reload(); // Reload the page
            }, 1000);
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