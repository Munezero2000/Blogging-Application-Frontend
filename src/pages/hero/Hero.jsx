import HeroPage from "../../components/HeroPage/HeroPage"
import Navbar from "../../components/navbar/Navbar"

function Hero() {
    return (
        <div className="p-4 h-screen flex flex-col items-center justify-start w-full bg-slate-400 dark:bg-slate-900 dark:text-white  ">
            <Navbar />
            <HeroPage />
        </div>
    )
}

export default Hero