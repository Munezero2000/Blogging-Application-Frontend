import { useState } from "react"
import Navbar from "../../components/navbar/Navbar"
import useNewStory from "../../hooks/useNewStory"
import { Toaster } from "react-hot-toast"

function Newblog() {
    const [inputs, setInputs] = useState({ title: '', genre: '', thumbnail: '', story: '' })
    const { loading, newStory } = useNewStory()

    const handleSubmit = async (e) => {
        e.preventDefault()





        await newStory(inputs)
    }
    return (
        <div className="p-4 h-full flex flex-col items-center justify-start w-full bg-slate-400 dark:bg-slate-900">
            <Navbar />
            <div className="w-full h-full flex flex-col items-center justify-start pt-10 pb-5 gap-5">
                <div>
                    <h1 className="text-3xl">Create New Blog</h1>
                </div>
                <Toaster />
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="w-[450px] flex flex-col gap-3">
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">What is your blog title?</span>
                        </div>
                        <input value={inputs.title} onChange={e => setInputs({ ...inputs, title: e.target.value })} type="text" placeholder="New blog title" className="input input-bordered w-full text-slate-900 dark:text-slate-400" />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Blog belongs in which category?</span>
                        </div>
                        <select value={inputs.genre} onChange={e => setInputs({ ...inputs, genre: e.target.value })} className="select select-bordered text-slate-900 dark:text-slate-400">
                            <option disabled >Pick one</option>
                            <option value="TECHNOLOGY">TECHNOLOGY</option>
                            <option value="TRAVEL">TRAVEL</option>
                            <option value="SPORTS">SPORTS</option>
                            <option value="LIFESTYLE">LIFESTYLE</option>
                            <option value="HEALTH">HEALTH</option>
                            <option value="FASHION">FASHION</option>
                            <option value="EDUCATION">EDUCATION</option>
                            <option value="MUSIC">MUSIC</option>
                            <option value="ARTS">ARTS</option>
                        </select>
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Blog thumbnail?</span>
                        </div>
                        <input onChange={e => setInputs({ ...inputs, thumbnail: e.target.files[0] })} type="file" className="file-input file-input-bordered w-full text-slate-900 dark:text-slate-400" />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">What is your story?</span>
                        </div>
                        <textarea value={inputs.story} onChange={e => setInputs({ ...inputs, story: e.target.value })} placeholder="What is your story?" className="textarea textarea-bordered textarea-lg w-full text-slate-900 dark:text-slate-400" ></textarea>
                    </label>
                    <button className="btn btn-neutral cursor-pointer dark:bg-slate-400 border border-transparent dark:text-slate-900 dark:hover:text-slate-400 dark:hover:border-slate-400 dark:hover:bg-transparent">
                        {loading ? <span className="loading loading-spinner"></span> : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Newblog