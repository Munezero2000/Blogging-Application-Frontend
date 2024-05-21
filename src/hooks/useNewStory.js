import { useState } from "react";
import toast from "react-hot-toast";

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

            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            const res = await fetch("/api/blogs/create", {
                method: 'POST',
                headers: {'Content-Type': "multipart/form-data"},
                body: formData
            });

            if (!res.ok) {
                if (res.status === 401 || res.status === 403) {
                    console.log(res)
                    throw new Error("Unauthorized access. Please log in.");
                }
                console.log(res)
                throw new Error("Server error. Please try again later.");
            }

            const result = await res.json();

            if (result.error) {
                throw new Error(result.error);
            }

            console.log(result);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, newStory };
};

export default useNewStory;
