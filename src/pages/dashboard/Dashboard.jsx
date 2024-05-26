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
    const { setSelectedBlog } = useStore();
    const [blogs, setBlogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();
    const [currentBlogPage, setCurrentBlogPage] = useState(1);
    const [currentUserPage, setCurrentUserPage] = useState(1);
    const [blogsPerPage] = useState(5); // Number of blogs per page
    const [usersPerPage] = useState(5); // Number of users per page
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/blogs/all");
                const result = await res.json();
                setBlogs(result.blogs || []);
            } catch (error) {
                console.error(error.message);
                toast.error(error.message);
                setBlogs([]);
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
                console.log(res.data);
                const result = res.data;
                setUsers(result.data || []);
            } catch (error) {
                console.error(error.message);
                toast.error(error.message);
                setUsers([]);
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
            setCurrentBlogPage(1); // Reset to first page on new search
        }, 300),
        [blogs]
    );

    useEffect(() => {
        if (searchQuery) {
            handleSearch(searchQuery);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery, handleSearch]);

    // Logic to get current blogs
    const currentBlogs = (searchQuery ? searchResults : blogs).slice((currentBlogPage - 1) * blogsPerPage, currentBlogPage * blogsPerPage);

    // Logic to get current users
    const currentUsers = users.slice((currentUserPage - 1) * usersPerPage, currentUserPage * usersPerPage);

    // Change page
    const paginateBlogs = (pageNumber) => setCurrentBlogPage(pageNumber);
    const paginateUsers = (pageNumber) => setCurrentUserPage(pageNumber);

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
            <div className="border w-full p-5">
                <h2>Dashboard</h2>
                <div>
                    <div role="tablist" className="tabs tabs-bordered">
                        <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Users" />
                        <div role="tabpanel" className="tab-content p-10">
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentUsers.filter(user => user.id !== authUser.id).map((user) => (
                                            <tr key={user.id}>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div>
                                                            <div className="font-bold">{user.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{user.email}</td>
                                                <td>{user.role}</td>
                                                <th>
                                                    <button className="btn btn-ghost btn-xs">details</button>
                                                </th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <nav className="flex justify-center gap-2">
                                    <ul className="join gap-3">
                                        {Array.from({ length: Math.ceil((users || []).length / usersPerPage) }).map((_, index) => (
                                            <li key={index} className="page-item">
                                                <button onClick={() => paginateUsers(index + 1)} className="page-link join-item btn">
                                                    {index + 1}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
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
                                                                    <img
                                                                        src={blog.imageUrl}
                                                                        alt="Blog Thumbnail"
                                                                        className="object-cover object-center"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="font-bold">
                                                                    <NavLink
                                                                        to={`/blogs/${joinWithDash(blog.title)}`}
                                                                        onClick={() => setSelectedBlog(blog)}
                                                                    >
                                                                        {shortTitle(blog.title)}
                                                                    </NavLink>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{shortStory(blog.body)}</td>
                                                    <td>{blog.category}</td>
                                                    <td>{blog.author.name}</td>
                                                    <td>{formatDate(blog.createdAt)}</td>
                                                    <th>
                                                        <button
                                                            onClick={() => handleDelete(blog.id)}
                                                            className="btn btn-ghost btn-xs text-red-500"
                                                        >
                                                            Delete
                                                        </button>
                                                    </th>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">
                                                    No blogs found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <nav className="flex justify-center gap-2">
                                    <ul className="join gap-3">
                                        {Array.from({ length: Math.ceil((searchQuery ? searchResults : blogs).length / blogsPerPage) }).map((_, index) => (
                                            <li key={index} className="page-item">
                                                <button onClick={() => paginateBlogs(index + 1)} className="page-link join-item btn">
                                                    {index + 1}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
