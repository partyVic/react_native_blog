import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const CreateScreen = ({ navigation }) => {
    const { addBlogPost } = useContext(Context);

    return (
        <BlogPostForm
            onSubmit={(title, content) => {
                //! ()=> call back function run after the form submitted
                //! onSubmit receive TWO arguments from child
                //! BUT can still be add additional argument(the call back function: ()=>) here
                addBlogPost(title, content, () => navigation.navigate('Index'));
            }}
        />
    );
};

const styles = StyleSheet.create({});

export default CreateScreen;