/* eslint-disable react/no-unescaped-entities */

import { NavLink } from "react-router-dom"

function HeroPage() {
    return (
        <div className="w-screen h-full px-10 py-5 pt-20 flex flex-col gap-10 bg-slate-400 dark:bg-slate-900">
            <div className="flex flex-col gap-3 text-3xl font-bold sm:text-5xl md:text-9xl">
                <h1 className="">Stay curious.</h1>
            </div>
            <div className=" text-2xl font-thin flex flex-col gap-4 sm:gap-4 sm:text-3xl md:text-4xl md:gap-10 text-base-50 dark:text-white">
                <p>
                    Discover stories, thinking, and expertise from writers<br /> on any topic.
                </p>
                <NavLink to="/blog" className="btn w-[200px] md:mt-20 dark:bg-white dark:text-gray-800 dark:hover:bg-gray-300">Start reading</NavLink>
            </div>
        </div>
    )
}

export default HeroPage