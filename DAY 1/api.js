import axios from 'axios';


export async function getPostsData() {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts/");
        return response.data;
	}
	catch (error) {
        console.log(error);
	}
}

//@NOTE wersja 2 
// export const getPostsData = async () => {
//     const res = await axios.get("https://jsonplaceholder.typicode.com/posts/");
//     return res.data;
// }
