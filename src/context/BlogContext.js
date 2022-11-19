import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer'

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'get_blogposts':
            return action.payload;
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
                    id: action.payload.id,
                    title: action.payload.title,
                    content: action.payload.content,
                },
            ];
        default:
            return state;
    }
};

const getBlogPosts = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts');

        dispatch({ type: 'get_blogposts', payload: response.data });
    };
};

const addBlogPost = (dispatch) => {
    //! the arguments(title,content, callback) for dispatch() put into the return function
    //! callback function here is after successfully add a blog post(submit the form), navigate to home page
    return async (title, content, callback) => {
        // dispatch({ type: 'add_blogpost', payload: { title, content } });

        const response = await jsonServer.post('/blogposts', { title, content })

        dispatch({
            type: 'add_blogpost',
            payload: response.data
        })

        if (callback) {
            callback();
        }
    };
}

const deleteBlogPost = (dispatch) => {
    //! the argument(id) for dispatch() put into the return function
    return async id => {
        await jsonServer.delete(`/blogposts/${id}`);

        dispatch({ type: 'delete_blogpost', payload: id });
    }
}

const editBlogPost = (dispatch) => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`, { title, content });

        dispatch({
            type: 'edit_blogpost',
            payload: { id, title, content }
        })

        if (callback) {
            callback();
        }
    };
}

export const { Context, Provider } = createDataContext(
    blogReducer,
    { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
    []
);