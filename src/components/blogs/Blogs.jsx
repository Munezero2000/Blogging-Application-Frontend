import useGetBlog from "../../hooks/useGetBlog"
import BlogList from "./BlogList"


function Blogs() {
    const { loading, blogs } = useGetBlog()

    return (
        <div className="w-screen h-auto min-h-[95vh] px-10 py-10 flex flex-col justify-start items-center gap-4 md:flex-row md:flex-wrap md:justify-start md:gap-10 lg:justify-center">
            <div className="flex flex-col justify-start items-center gap-4 md:flex-row md:flex-wrap md:justify-start md:gap-10 lg:w-[1124px]">
                {loading
                    ? <span className="loading loading-spinner w-20 mx-auto"></span>
                    : (
                        blogs.map((blog, index) => (<BlogList key={index} blog={blog} />))
                    )
                }
            </div>
        </div>
    )
}

export default Blogs