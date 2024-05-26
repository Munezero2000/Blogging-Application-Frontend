import { useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios';

const useNewStory = () => {
    const [loading, setLoading] = useState(false);

    const newStory = async ({ title, genre, thumbnail, story }) => {
        if(!title || !genre || !thumbnail || !story) {
            toast.error("Fill all fields please")
            return;
        }
        if(story.length < 200) {
            toast.error("Your story can't be less that 200 characters")
            return;
        }
        if(title.length < 5) {
            toast.error("Title must not be less than 5 characters")
            return;
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('category', genre);
            formData.append('blogThumbnail', thumbnail);
            formData.append('content', story);

            const res = await axios.post("/api/blogs/create", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            if (!res.data || res.status !== 200) {
                throw new Error("Server error. Please try again later.");
            }

            console.log(await res.data);

        } catch (error) {
            // console.error(error);
            toast.error(error.response?.data?.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return { loading, newStory };
};

export default useNewStory;
