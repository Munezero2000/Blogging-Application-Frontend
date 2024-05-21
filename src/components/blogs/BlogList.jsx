import { NavLink } from "react-router-dom"

function BlogList() {
    return (
        <>
            <NavLink to="/blog-post" className="card w-90 hover:cursor-pointer md:w-80 md:flex-grow shadow-xl dark:border dark:border-slate-800 bg-white text-slate-900 dark:bg-transparent dark:text-white">
                <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        Difference between GraphQL, REST, and gRPC
                        {/* <div className="badge badge-secondary">NEW</div> */}
                    </h2>
                    <p>Hello devs, if you are preparing for Coding interviews interviews...</p>
                    <div className="card-actions justify-end mt-5">
                        <div className="badge badge-outline">DevOps</div>
                        <div className="badge badge-outline">Backend</div>
                    </div>
                </div>
            </NavLink>
        </>
    )
}

export default BlogList