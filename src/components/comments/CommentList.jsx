/* eslint-disable react/prop-types */
import { BsThreeDotsVertical } from "react-icons/bs";
import useDeleteComment from "../../hooks/useDeleleComment";
import { formatDate } from "../../utils/formatDate";

function CommentList({ blogComment, blogId }) {
    // eslint-disable-next-line no-unused-vars
    const { loading, deleteComment } = useDeleteComment()
    return (
        <div>
            {blogComment.map(comment => (
                <div key={comment.id} className='flex justify-between items-center border-b border-slate-600'>
                    <div key={comment.id} className="chat chat-start gap-1 flex-grow px-5">
                        <div className="chat-header flex items-center gap-2">
                            {comment.writer.names}
                            <time className="text-xs opacity-50">{formatDate(comment.commentAt)}</time>
                        </div>
                        <div className="chat-bubble px-5">{comment.text}</div>
                    </div>
                    <span className='px-3 dropdown dropdown-end'>
                        <BsThreeDotsVertical tabIndex={0} role="button" />
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-slate-900 border-slate-500 border rounded-box w-52">
                            <li><a>Edit</a></li>
                            <li><a onClick={() => deleteComment(blogId, comment.id)}>Delete</a></li>
                        </ul>
                    </span>
                </div>
            ))}
        </div>
    )
}

export default CommentList