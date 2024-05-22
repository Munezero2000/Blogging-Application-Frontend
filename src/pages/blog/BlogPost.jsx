// eslint-disable-next-line no-unused-vars
import { BiSolidLike } from "react-icons/bi";
import Navbar from "../../components/navbar/Navbar"
// import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import useSingleBlog from "../../hooks/useSingleBlog";
import { formatDate } from "../../utils/formatDate";
import { AiOutlineLike } from "react-icons/ai";
import useToggleLike from "../../hooks/useToggleLike";
import Comments from "../../components/comments/Comments";
import useStore from "../../../zustand/useStore";
import Blog from "./Blogpage";

function BlogPost() {
    const { loading } = useSingleBlog()
    const { toggleLike } = useToggleLike()
    const { selectedBlog } = useStore()

    console.log(selectedBlog)

    const handleLikeToggle = async () => {
        try {
            await toggleLike(selectedBlog.blog.id);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            {!selectedBlog && <Blog />}
            <Navbar />
            <div className="p-4 h-auto min-h-screen flex flex-col items-center justify-start lg:justify-center w-full gap-5 bg-slate-400 dark:bg-slate-900">
                {loading
                    ? (<span className="loading loading-spinner w-10"></span>)
                    : (
                        <>
                            <div className="lg:w-[980px]">
                                <img className="w-full" src={`http://localhost:8081/uploads/${selectedBlog.blog.blogThumbnail}`} alt="" />
                            </div>
                            <div className="flex flex-col gap-4 px-7 w-full lg:w-[980px]">
                                <h1 className="text-3xl font-bold capitalize">{selectedBlog.blog.title}</h1>
                                <div className="flex justify-between items-center">
                                    <div className="avatar flex justify-start items-center gap-3">
                                        <div className="w-8 rounded-full">
                                            {(selectedBlog.author && selectedBlog.author.profilePicture)
                                                ? (<img src={`http://localhost:8081/uploads/${selectedBlog.author.profilePicture}`} alt="Author profile" />)
                                                : (<img src="https://avatar.iran.liara.run/public/boy?username=hozayves" />)
                                            }
                                        </div>
                                        <h3 className="flex flex-col">
                                            <span className="font-semibold">{selectedBlog.author.names}</span>
                                            <span className="text-xs">Posted on {formatDate(selectedBlog.blog.lastModifiedDate)}</span>
                                        </h3>
                                    </div>
                                    <div className="flex justify-center items-center gap-5">
                                        <div className="flex justify-center items-center gap-1">
                                            <span>{selectedBlog.blog_likes.length}</span>
                                            <AiOutlineLike onClick={() => handleLikeToggle(selectedBlog.blog.id)} className="w-6 h-6 cursor-pointer" />
                                        </div>
                                        {/* <BiSolidLike /> */}
                                        <FaRegComment className="w-7 h-7 cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                            <div className="px-5 py-7 text-2xl lg:w-[980px] leading-9">
                                {selectedBlog.blog.content}
                            </div>
                            <Comments blogId={selectedBlog.blog.id} blogComment={selectedBlog.blog_comment} />
                        </>

                    )}

            </div>
        </>
    )
}

export default BlogPost