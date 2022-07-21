import { getPostsData } from '../api.js'
import { makeFilter, useFilter as filter, cleanFilterForm as clean } from './filter.js';
import l  from './loading.js';

var postsContainer;

var posts;

async function postsData(){
    postsContainer.innerHTML='';
    posts = await getPostsData();
    let filteredPosts = await filter(posts)
    postBuilder(filteredPosts);
    
}

export function buildPostsFoundation(){
    let app = document.getElementById('app');
    let pageContent = document.createElement('div');
    pageContent.className = 'pageContent';
    app.appendChild(pageContent);
    let header =  document.createElement('header');
    pageContent.appendChild(header);
    let headerH1 = document.createElement('h1');
    headerH1.innerText = 'Posty';
    header.appendChild(headerH1);
    let main = document.createElement('main');
    main.id = 'postsMain';
    pageContent.appendChild(main);
    let filterFormContainerDiv = document.createElement('div');
    filterFormContainerDiv.id = 'filterFormContainer';
    main.appendChild(filterFormContainerDiv);
    let postsContainerDiv = document.createElement('div');
    postsContainerDiv.id = 'postsContainer';
    main.appendChild(postsContainerDiv);
    postsContainer = document.getElementById('postsContainer')
    makeFilter(inputs);
    postsData();
}


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


// window.document.addEventListener('filter', filter);
// window.document.addEventListener('clean', clean);

function postBuilder(data){
    l.loading(postsContainer);
    for(let d in data){
        buildPost(data[d])
    }
    l.unlink();
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
