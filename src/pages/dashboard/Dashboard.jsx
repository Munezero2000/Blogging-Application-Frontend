import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar"
import toast from "react-hot-toast";
import { shortStory, shortTitle } from "../../utils/displayShortChar";
import { useAuthContext } from "../../context/AuthContext";
import { formatDate } from "../../utils/formatDate";

function Dashboard() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext()
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage] = useState(5); // Number of blogs per page

    useEffect(() => {
        const fetchBlogs = async () => {
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

    // Logic to get current blogs
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="p-4 h-screen flex flex-col items-center justify-start w-full bg-slate-400 dark:bg-slate-900 dark:text-white  ">
            <Navbar />
            <div className="border w-full p-5">
                <h2>Dashboard </h2>
                <div className="">
                    <div role="tablist" className="tabs tabs-bordered">
                        <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="All User" />
                        {/* All users */}
                        <div role="tabpanel" className="tab-content p-10">
                            <div className="">
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        {/* head */}
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* row 1 */}
                                            <tr>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div>
                                                            <div className="font-bold">Hart Hagerty</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    Zemlak, Daniel and Leannon
                                                    <br />
                                                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                                </td>
                                                <td>Purple</td>
                                                <th>
                                                    <button className="btn btn-ghost btn-xs">details</button>
                                                </th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Blogs" checked />
                        <div role="tabpanel" className="tab-content p-10">
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th>Blog Title</th>
                                            <th>Content</th>
                                            <th>Category</th>
                                            <th>Author</th>
                                            <th>Created At</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row 1 */}
                                        {blogs.length > 0
                                            ? (
                                                currentBlogs.map(blog =>

                                                    <tr key={blog.id}>
                                                        <td>
                                                            <div className="flex items-center gap-3">
                                                                <div className="avatar">
                                                                    <div className="mask mask-squircle w-12 h-12">
                                                                        <img src={`http://localhost:8081/uploads/${blog.blogThumbnail}`} alt="Avatar Tailwind CSS Component" />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold">{shortTitle(blog.title)}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{shortStory(blog.content)}</td>
                                                        <td>{blog.category}</td>
                                                        <td>{authUser.names}</td>
                                                        <td>{formatDate(blog.publicationDate)}</td>
                                                        <th className="flex">
                                                            <button className="btn btn-ghost btn-xs text-red-500">Delete</button>
                                                            <button className="btn btn-ghost btn-xs text-blue-600">Update</button>
                                                            <button className="btn btn-ghost btn-xs text-fuchsia-500">View</button>
                                                        </th>
                                                    </tr>
                                                )

                                            )
                                            : (<h1>No blog yet</h1>)}
                                    </tbody>
                                </table>
                                {/* Pagination */}
                                <nav className="flex justify-center gap-2">
                                    <ul className="join gap-3">
                                        {Array.from({ length: Math.ceil(blogs.length / blogsPerPage) }).map((_, index) => (
                                            <li key={index} className="page-item">
                                                <button onClick={() => paginate(index + 1)} className="page-link join-item btn">
                                                    {index + 1}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </div>

                        <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Subscribed" />
                        <div role="tabpanel" className="tab-content p-10">Tab content 3</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard