/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom"
import { shortStory, shortTitle } from "../../utils/displayShortChar"
import useStore from "../../../zustand/useStore"
import { joinWithDash } from "../../utils/joinWithDash"

function BlogList({ blog }) {
    const { setSelectedBlog } = useStore()

    return (
        <>
            <NavLink to={`/blog-post/${joinWithDash(blog.title)}`} onClick={() => setSelectedBlog(blog)} className="card w-80 hover:cursor-pointer md:w-80 shadow-xl dark:border dark:border-slate-800 bg-white text-slate-900 dark:bg-transparent dark:text-white">
                <figure className="h-48">
                    <img className="h-48 w-full" src={`http://localhost:8081/uploads/${blog.blogThumbnail}`} alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title capitalize">{shortTitle(blog.title)}</h2>
                    <p>{shortStory(blog.content)}</p>
                    <div className="card-actions justify-end mt-5">
                        <div className="badge badge-outline">{blog.category}</div>
                    </div>
                </div>
            </NavLink>
        </>
    )
}

export default BlogList