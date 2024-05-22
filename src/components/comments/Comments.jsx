/* eslint-disable react/prop-types */
import { useState } from 'react';
import useSendComment from '../../hooks/useSendComment'
import CommentList from './CommentList';
import useStore from '../../../zustand/useStore';

function Comments({ blogId, blogComment }) {
    const [comment, setComment] = useState("")
    const { loading, sendComment } = useSendComment()
    const { selectedBlog } = useStore()

    const handleSendComment = async (e) => {
        e.preventDefault()

        await sendComment(comment, blogId)
        console.log(selectedBlog)
    }
    return (
        <div className='border w-full p-5 flex items-center justify-center'>
            <div className='w-[700px] flex flex-col gap-7'>
                <form onSubmit={handleSendComment} className='flex justify-between items-center'>
                    <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Your comment" className="textarea textarea-bordered textarea-xs basis-11/12  border" ></textarea>
                    <button className="btn btn-primary">
                        {loading ? (<span className='loading loading-spinner'></span>) : "Send"}
                    </button>
                </form>
                <CommentList blogComment={blogComment} blogId={blogId} />
            </div>
        </div>
    )
}

export default Comments