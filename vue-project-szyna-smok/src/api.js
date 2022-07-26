import axios from "axios";

export async function getPostsData() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/"
    );
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function getPostComments(postId) {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function getAlbums() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/albums/"
    );
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function getPhotosOfGivenAlbum(albumId) {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
    );
    return response.data;
  } catch (error) {
    return [];
  }
}
