import Blogs from "../../components/blogs/Blogs"
import Navbar from "../../components/navbar/Navbar"

function Blog() {
    return (
        <div className='p-4 h-auto flex flex-col items-center justify-start w-full bg-slate-400 dark:bg-slate-900'>
            <Navbar />
            <Blogs />
        </div>
    )
}

export default Blog