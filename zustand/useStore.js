import { create } from 'zustand'

const useStore = create((set) => ({
    selectedBlog: null,
    setSelectedBlog: (selectedBlog) => set({selectedBlog})
    
}))
export default useStore