import {getPostsData} from '../api.js'

const postsContainer = document.getElementById('postsContainer');
async function postsData(){
    const posts = await getPostsData();
    for(let post in posts){
        buildPost(posts[post].id, posts[post].userId, posts[post].title, posts[post].body)        
    }
}
postsData();

function buildPost(postNumber, postAuthor, postTitle, postBody){

    let postDiv = document.createElement('div');
    let post = postsContainer.appendChild(postDiv);
    post.className = 'post';
    
    let postHeaderH2 = document.createElement('h2');
    let postHeaderDone = post.appendChild(postHeaderH2);
    postHeaderDone.innerHTML =`Post nr: ${postNumber} <br> ${postTitle}`;

    let postBodyP = document.createElement('p');
    let postBodyDone = post.appendChild(postBodyP);
    postBodyDone.innerText = postBody;

    let postAuthorSpan = document.createElement('span');
    let postAuthorDone = post.appendChild(postAuthorSpan);
    postAuthorDone.innerText =`Autor: ${postAuthor}`;
}

// .post -> .postHeader, .postBody, .postAuthor 