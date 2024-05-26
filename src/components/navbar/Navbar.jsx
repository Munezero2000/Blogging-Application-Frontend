import { GoPlus } from "react-icons/go";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";
import { Toaster } from "react-hot-toast";

function Navbar() {
    const { authUser } = useAuthContext()
    const { logout } = useLogout()
    return (
        <div className="navbar bg-slate-400 dark:bg-slate-900">
            <Toaster />
            <div className="flex-1 flex justify-center">
                <NavLink to="/" className="btn btn-ghost text-xl hover:bg-slate-450 dark:hover:bg-slate-900"> Blog</NavLink>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 flex gap-3">
                    <li>
                        <NavLink to="/blog" className="hover:bg-slate-450 dark:hover:bg-slate-900">Blog</NavLink>
                    </li>
                    {!authUser && (
                        <>
                            <li>
                                <NavLink to="/login" className="hover:bg-slate-450 dark:hover:bg-slate-900">
                                    <span className="dark:hover:border-b">Login</span></NavLink>
                            </li>
                            <li>
                                <NavLink to="/signup" className="hover:bg-blue-500 hover:text-white dark:hover:bg-slate-900 border-blue-500 border text-blue-500 font-semibold">Create account</NavLink>
                            </li>
                        </>
                    )}

                </ul>
                {authUser && (
                    <>
                        <NavLink to="/new-blog" className="dropdown dropdown-end cursor-pointer">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <div className="w-10 rounded-full flex justify-center items-center tooltip tooltip-left" data-tip="New Blog">
                                    <GoPlus className="w-10 h-6" />
                                </div>
                            </div>
                        </NavLink>
                        <div className="dropdown dropdown-end dark:bg-slate-900">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 dark:bg-slate-800 bg-slate-500">

                                {authUser.role === "ADMIN" && (<li><Link to="/dashboard">Dashboard</Link></li>)}
                                <li><a onClick={logout}>Logout</a></li>
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar