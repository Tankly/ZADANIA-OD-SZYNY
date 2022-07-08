import axios from 'axios';


export async function getPostsData() {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts/");
		// console.log(response);
        return response;
	}
	catch (error) {
        console.log(error);
	}
}
