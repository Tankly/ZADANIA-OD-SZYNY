import axios from 'axios';


export async function getPostsData() {
        try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts/");
                return response.data;
        }
        catch (error) {
                return []
        }
}

export async function getPostComments(postId) {
        try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
                console.log(response.data);
                return response.data;
        }
        catch (error) {
                return []
        }
}

//@NOTE wersja 2 
// export const getPostsData = async () => {
//     const res = await axios.get("https://jsonplaceholder.typicode.com/posts/");
//     return res.data;
// }
