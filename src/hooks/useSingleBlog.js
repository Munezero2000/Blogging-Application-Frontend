import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand/useStore";

const useSingleBlog = () => {
    const [loading, setLoading] = useState(true);
    const { selectedBlog, setSelectedBlog } = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            try {
                if (!selectedBlog) {
                    // If no selectedBlog is available, redirect to /blog route
                    navigate("/blog");
                    return;
                }

                const res = await fetch(`/api/blogs/${selectedBlog.id}`);
                const result = await res.json();
                
                if (!res.ok) {
                    throw new Error(result.error);
                }
                
                setSelectedBlog(result);
            } catch (error) {
                console.log(error);
                // Handle error if needed
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [selectedBlog, setSelectedBlog, navigate]);

    return { loading }; 
};

export default useSingleBlog;
