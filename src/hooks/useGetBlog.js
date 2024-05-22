import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const useGetBlog = () => {
    const [loading, setLoading] = useState(false)
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const fetchBlogs = async() => {
            setLoading(true)
            try {
                const res = await fetch("/api/blogs/all")
                const result = await res.json()

                setBlogs(result.blogs)
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchBlogs()
    }, [])
    return {loading, blogs}
}
export default useGetBlog