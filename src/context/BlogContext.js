import React, { useState } from 'react';

const BlogContext = React.createContext();

export const BlogProvider = ({ children }) => {
    const [blogPosts, setBlogPosts] = useState([])

    const addBlogPost = () => {
        setBlogPosts([...blogPosts, { title: `Blog Post #${blogPosts.length + 1}` }])
    }

    const editBlogPost = () => { }
    const deleteBlogPost = () => { }

    return (
        <BlogContext.Provider
            value={{
                data: blogPosts,
                addBlogPost: addBlogPost,
                editBlogPost,
                deleteBlogPost
            }}
        >
            {children}
        </BlogContext.Provider>
    )
}

export default BlogContext