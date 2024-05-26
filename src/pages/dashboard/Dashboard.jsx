import { useEffect, useState, useCallback } from "react";
import Navbar from "../../components/navbar/Navbar";
import toast from "react-hot-toast";
import { shortStory, shortTitle } from "../../utils/displayShortChar";
import { useAuthContext } from "../../context/AuthContext";
import { formatDate } from "../../utils/formatDate";
import debounce from "lodash.debounce";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { joinWithDash } from "../../utils/joinWithDash";
import useStore from "../../../zustand/useStore";

function Dashboard() {
    const { setSelectedBlog } = useStore()
    const [blogs, setBlogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage] = useState(5); // Number of blogs per page
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [userSearchQuery, setUserSearchQuery] = useState(""); // State for user search query
    const [userSearchResults, setUserSearchResults] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/blogs/all");
                const result = await res.json();
                setBlogs(result.blogs);
            } catch (error) {
                console.error(error.message);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res = await axios.get("/api/users/", { withCredentials: true });
                setUsers(res.data); // Assuming your API response has a data property

            } catch (error) {
                console.error(error.message);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Debounced search function to improve performance
    const handleSearch = useCallback(
        debounce((query) => {
            const filteredBlogs = blogs.filter((blog) =>
                blog.title.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filteredBlogs);
            setCurrentPage(1); // Reset to first page on new search
        }, 300),
        [blogs]
    );
    // Debounced search function to improve performance for users
    const handleUserSearch = useCallback(
        debounce((query) => {
            const filteredUsers = users.filter((user) =>
                (user.name && user.name.toLowerCase().includes(query.toLowerCase())) ||
                (user.email && user.email.toLowerCase().includes(query.toLowerCase()))
            );
            setUserSearchResults(filteredUsers);
            setCurrentPage(1); // Reset to first page on new search
        }, 300),
        [users]
    );

    useEffect(() => {
        if (searchQuery) {
            handleSearch(searchQuery);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery, handleSearch]);

    useEffect(() => {
        if (userSearchQuery) {
            handleUserSearch(userSearchQuery);
        } else {
            setUserSearchResults([]);
        }
    }, [userSearchQuery, handleUserSearch]);

    // Logic to get current blogs
    const currentBlogs = (searchQuery ? searchResults : blogs).slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Function to handle delete blog
    const handleDelete = async (id) => {
        setLoading(true);
        try {
            const res = await axios.delete(`/api/blogs/delete/${id}`, {
                withCredentials: true
            });
            if (res.status === 200) {
                setBlogs(blogs.filter((blog) => blog.id !== id));
                setSearchResults(searchResults.filter((blog) => blog.id !== id));
                toast.success("Blog deleted successfully!");
            } else {
                const result = await res.json();
                toast.error(result.message || "Failed to delete the blog");
            }
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to delete the blog");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 h-screen flex flex-col items-center justify-start w-full bg-slate-400 dark:bg-slate-900 dark:text-white">
            <Navbar />
            <div className=" w-full p-5">
                <h2>Dashboard</h2>
                <div>
                    <div role="tablist" className="tabs tabs-bordered">
                        <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Users" />
                        <div role="tabpanel" className="tab-content p-10">
                            <div className="overflow-x-auto">
                                <div className="flex justify-end">
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        placeholder="Search Users"
                                        value={userSearchQuery}
                                        onChange={(e) => setUserSearchQuery(e.target.value)}
                                    />

                                </div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Email</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(userSearchQuery ? userSearchResults : users).length > 0 ? (
                                            (userSearchQuery ? userSearchResults : users).map((user) => (
                                                <tr key={user.id}>
                                                    <td>
                                                        <div className="flex items-center gap-3">
                                                            <div>
                                                                <div className="font-bold">{user.names}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{user.email}</td>
                                                    <td>{user.role}</td>
                                                    <th>
                                                        <button className="btn btn-ghost btn-xs">details</button>
                                                    </th>
                                                </tr>
                                            )
                                            )
                                        ) : (
                                            <tr>
                                                <td colSpan="4">No users found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Blogs" defaultChecked />
                        <div role="tabpanel" className="tab-content p-10">
                            <div className="overflow-x-auto">
                                <div className="flex justify-end">
                                    <form className="w-[500px] flex gap-2 self-end">
                                        <label className="input input-bordered flex items-center gap-2">
                                            <input
                                                type="text"
                                                className="grow"
                                                placeholder="Search"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                className="w-4 h-4 opacity-70"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </label>
                                    </form>
                                </div>
                                <table className="table">
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
                                        {currentBlogs.length > 0 ? (
                                            currentBlogs.map((blog) => (
                                                <tr key={blog.id}>
                                                    <td>
                                                        <div className="flex items-center gap-3">
                                                            <div className="avatar">
                                                                <div className="mask mask-squircle w-12 h-12">
                                                                    <img src={`http://localhost:8081/uploads/${blog.blogThumbnail}`} alt="Blog Thumbnail" />
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
                                                        <button className="btn btn-ghost btn-xs text-red-500" onClick={() => handleDelete(blog.id)}>Delete</button>
                                                        {/* <button className="btn btn-ghost btn-xs text-blue-600">Update</button> */}
                                                        <NavLink to={`/blog-post/${joinWithDash(blog.title)}`} onClick={() => setSelectedBlog(blog)} className="btn btn-ghost btn-xs text-fuchsia-500">View</NavLink>
                                                    </th>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6">No blogs found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <nav className="flex justify-center gap-2">
                                    <ul className="join gap-3">
                                        {Array.from({ length: Math.ceil((searchQuery ? searchResults.length : blogs.length) / blogsPerPage) }).map((_, index) => (
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

                        {/* <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Subscribed" />
                        <div role="tabpanel" className="tab-content p-10">Tab content 3</div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
