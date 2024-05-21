import { useState } from "react"
import { NavLink } from "react-router-dom"
import useLogin from "../../hooks/useLogin"
import { Toaster } from "react-hot-toast"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { loading, login } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login({ email, password })
    }
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-slate-400 dark:bg-slate-900">
            <div className="card bg-slate-950 p-7 w-[350px] px-5">
                <Toaster />
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className="flex justify-center items-center mb-4">
                        <h2 className="text-4xl">Login</h2>
                    </div>
                    <label className="input input-bordered flex items-center gap-2 dark:bg-slate-900">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 text-slate-800 dark:text-slate-400"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="grow text-slate-900 dark:text-slate-400" placeholder="example@gmail.com" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 dark:bg-slate-900">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 text-slate-800 dark:text-slate-400"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="grow text-slate-900 dark:text-slate-400" placeholder="Password" />
                    </label>
                    <NavLink to="/signup" className="text-sm text-slate-900 dark:text-slate-400 hover:underline hover:text-blue-600 mt-2 inline-block">
                        {"Don't"} have an account?
                    </NavLink>
                    <button className="btn btn-neutral dark:bg-slate-400 border border-transparent dark:text-slate-900 dark:hover:text-slate-400 dark:hover:border-slate-400 dark:hover:bg-transparent" disabled={loading}>
                        {loading ? <span className="loading loading-spinner"></span> : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login