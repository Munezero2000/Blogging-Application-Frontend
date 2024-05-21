import BlogList from "./BlogList"

function Blogs() {
    return (
        <div className=" w-screen h-auto px-10 py-10 flex flex-col justify-start items-center gap-4 md:flex-row md:flex-wrap md:justify-start md:gap-10 lg:justify-center">
            <div className="flex flex-col justify-start items-center gap-4 md:flex-row md:flex-wrap md:justify-start md:gap-10 lg:w-[1124px]">
                <BlogList />
                <BlogList />
                <BlogList />
                <BlogList />
                <BlogList />
                <BlogList />
            </div>
        </div>
    )
}

export default Blogs