import createDataContext from './createDataContext';

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'edit_blogpost':
            return state.map((blogPost) => {
                return blogPost.id === action.payload.id ? action.payload : blogPost;
            });
        case 'delete_blogpost':
            return state.filter((blogPost) => blogPost.id !== action.payload);
        case 'add_blogpost':
            return [
                ...state,
                {
                    id: Math.floor(Math.random() * 99999),
                    title: action.payload.title,
                    content: action.payload.content,
                },
            ];
        default:
            return state;
    }
};

const addBlogPost = (dispatch) => {
    //! the arguments(title,content, callback) for dispatch() put into the return function
    //! callback function here is after successfully add a blog post(submit the form), navigate to home page
    return (title, content, callback) => {
        dispatch({ type: 'add_blogpost', payload: { title, content } });
        if (callback) {
            callback();
        }
    };
};
const deleteBlogPost = (dispatch) => {
    //! the argument(id) for dispatch() put into the return function
    return (id) => {
        dispatch({ type: 'delete_blogpost', payload: id });
    };
};
const editBlogPost = (dispatch) => {
    return (id, title, content, callback) => {
        dispatch({
            type: 'edit_blogpost',
            payload: { id, title, content },
        });
        if (callback) {
            callback();
        }
    };
};

export const { Context, Provider } = createDataContext(
    blogReducer,
    { addBlogPost, deleteBlogPost, editBlogPost },
    [{ title: 'TEST POST', content: 'TEST CONTENT', id: 1 }]
);