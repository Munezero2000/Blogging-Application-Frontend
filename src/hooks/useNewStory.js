import { useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios';

const useNewStory = () => {
    const [loading, setLoading] = useState(false);

    const newStory = async ({ title, genre, thumbnail, story }) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('category', genre);
            formData.append('blogThumbnail', thumbnail);
            formData.append('content', story);

            const res = await axios.post("http://localhost:8081/api/blogs/create", formData, {
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
