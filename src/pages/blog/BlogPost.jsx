// eslint-disable-next-line no-unused-vars
import { BiSolidLike } from "react-icons/bi";
import Navbar from "../../components/navbar/Navbar"
// import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

function BlogPost() {
    return (
        <>
            <Navbar />
            <div className="p-4 h-auto flex flex-col items-center justify-start lg:justify-center w-full gap-5 bg-slate-400 dark:bg-slate-900 border">

                <div className="lg:w-[980px]">
                    <img className="w-full" src="/blog.avif" alt="" />
                </div>
                <div className="flex flex-col gap-4 px-7 w-full lg:w-[980px]">
                    <h1 className="text-3xl font-bold">Retro Vibes: ASCII Hot Coffee Animation in (Node.js)</h1>
                    <div className="flex justify-between items-center">
                        <div className="avatar flex justify-start items-center gap-3">
                            <div className="w-8 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                            <h3 className="flex flex-col">
                                <span className="font-semibold">Yves Muhoza</span>
                                <span className="text-xs">Posted on May 2024</span>
                            </h3>
                        </div>
                        <div className="flex justify-center items-center gap-5">
                            {/* <div className="flex justify-center items-center gap-1">
                                <span>10</span>
                                <AiOutlineLike className="w-6 h-6 cursor-pointer" />
                            </div> */}
                            {/* <BiSolidLike /> */}
                            <FaRegComment className="w-7 h-7 cursor-pointer" />
                        </div>
                    </div>
                </div>
                <div className="px-5 py-7 text-2xl lg:w-[980px] leading-9">
                    Breaking It Down
                    Frames Array:
                    This array contains the different frames of the coffee cup with rising steam. Each frame is a snapshot of the cup in different states to create the illusion of movement.

                    Animation Loop:
                    The setInterval function cycles through these frames every 500 milliseconds, clearing the console and printing the next frame to create a smooth animation.

                    Conclusion
                    This little project was not just fun to create but also a perfect blend of my love for retro computing and coffee. I hope you enjoy it as much as I did making it. Feel free to tweak it, add your own spin, and share your versions!

                    Stay caffeinated and keep coding, friends!

                    About the Author
                    Hey, {"I'm"} Amir, but you might know me as Bek Brace.
                    {"I'm"} passionate about all things coding and have a soft spot for retro tech. Follow my journey as I explore programming, sip on endless cups of coffee, and share fun projects like this one!
                </div>

            </div>
        </>
    )
}

export default BlogPost