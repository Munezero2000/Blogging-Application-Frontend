/* eslint-disable react/no-unescaped-entities */

function HeroPage() {
    return (
        <div className="w-screen h-full px-10 py-5 pt-20 flex flex-col gap-10 bg-slate-400 dark:bg-slate-900">
            <div className="flex flex-col gap-3 text-3xl font-bold sm:text-5xl md:text-6xl">
                <h1>Muraho(🙏), I'm</h1>
                <h1>Munezero Ange Gabriel</h1>
                <p>I design & Code for web</p>
            </div>
            <div className=" text-2xl font-thin flex flex-col gap-4 sm:gap-4 sm:text-3xl md:text-4xl md:gap-4 text-base-50 dark:text-white">
                <p>
                    Web developer with experience in User Experience(UX), frontend
                    web design.
                </p>
                <p>I love fun Web UI, collaborate and making products.</p>
                <p>
                    I value simple structure, clean design pattern, and
                    thoughtful<br /> interactions.
                </p>
            </div>
        </div>
    )
}

export default HeroPage