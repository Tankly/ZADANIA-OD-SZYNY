import { getPostsData } from '../api.js'
import { makeFilter, useFilter as filter, cleanFilterForm as clean } from './filter.js';

const postsContainer = document.getElementById('postsContainer');

var posts;

async function postsData(){
    postsContainer.innerHTML='';
    posts = await getPostsData();
    let filteredPosts = await filter(posts)
    postBuilder(filteredPosts);
}
postsData();


let inputs = {
    author: {label: 'Autor:', defaultValue: '', filterKey: 'userId', type: 'input', inputType: 'text'},
    title: {label: 'Tytuł:', defaultValue: '', filterKey: 'title', type: 'input', inputType: 'text'},
    content: {label: 'Treść:', defaultValue: '', filterKey: 'body', type: 'input', inputType: 'text'},
    sortBy: {label: 'Sortowanie po:', defaultValue: 'userId', type: 'select', selectOptions: ['userId', 'title', 'body'], textForOptions: ['Autor', 'Tytuł', 'Treść']},
    sortDirection: {label: 'Sposób sortowania:', defaultValue: 'asc', type: 'select', selectOptions: ['asc', 'desc'], textForOptions: ['Rosnąco', 'Malejąco']},
    filter: {type: 'button', id: 'filter', content: 'Filtruj', btnFunction: async () =>{
        let filteredPosts = await filter(posts);
        postBuilder(filteredPosts);
    }},
    clean: {type: 'button', id: 'clean', content: 'Wyczyść', btnFunction: async () =>{
        clean();
        await postsData();
    }},
}

makeFilter(inputs);

// window.document.addEventListener('filter', filter);
// window.document.addEventListener('clean', clean);

function postBuilder(data){
    for(let d in data){
        buildPost(data[d])
    }
}

function buildPost(postToBuild){
    let postNumber = postToBuild.id;
    let postAuthor = postToBuild.userId;
    let postTitle = postToBuild.title;
    let postBody = postToBuild.body;

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
