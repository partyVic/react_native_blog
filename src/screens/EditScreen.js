import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const EditScreen = ({ navigation, route }) => {
    const id = route.params.id
    const { state, editBlogPost } = useContext(Context);

    const blogPost = state.find(blogPost => blogPost.id === id);

    return (
        <BlogPostForm
            initialValues={{ title: blogPost.title, content: blogPost.content }}

            //! onSubmit receive TWO arguments from child
            //! BUT can still be add additional arguments(1.id. 2.the call back function: ()=>)
            onSubmit={(title, content) => {

                //! pop() navigate to the previous screen
                editBlogPost(id, title, content, () => navigation.pop());
            }}
        />
    );
};

const styles = StyleSheet.create({});

export default EditScreen;