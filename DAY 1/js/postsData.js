import { getPostsData } from '../api.js'
import { makeFilter, useFilter as filter } from './filter.js';

const postsContainer = document.getElementById('postsContainer');

var posts;

async function postsData(){
    postsContainer.innerHTML='';
    posts = await getPostsData();
    let filteredPosts = await filter(posts)
    for(let post in filteredPosts){
        buildPost(filteredPosts[post])        
    }
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
        console.log(filteredPosts);
        for(let post in filteredPosts){
            buildPost(filteredPosts[post])        
        }
    }},
    clean: {type: 'button', id: 'clean', content: 'Wyczyść'},
}

makeFilter(inputs);

const form = document.forms['filterForm'];

// document.getElementById('filter').addEventListener('click', useFilter);
document.getElementById('clean').addEventListener('click', cleanFilterForm);

window.document.addEventListener('filter', filter());


function cleanFilterForm(e){
    e.preventDefault();
    for(let inputName in inputs){
        if(inputs[inputName].type != 'button'){
            form[inputName].value = inputs[inputName].defaultValue;
        }
    }
    postsData();
}

// async function useFilter(e){
//     e.preventDefault();
//     postsContainer.innerHTML='';
//     let postsWithFilter = await getPostsData();
//     let filterKeys = [];
//     for(let inputName in inputs){
//         filterKeys[inputName] = form[inputName].value;
//         if(form[inputName].type == 'text'){       
//             if(!!filterKeys[inputName]){
//                 if(isNaN(filterKeys[inputName])){
//                     postsWithFilter = postsWithFilter.filter((e) =>{
//                         return e[inputs[inputName].filterKey].search(form[inputName].value) !== -1
//                     })  
//                 }
//                 else{
//                     postsWithFilter = postsWithFilter.filter((e) =>{
//                         return e[inputs[inputName].filterKey] == form[inputName].value
//                     })  
//                 }
//             }
//         }
//         else if(inputName == 'sortDirection'){
//             let isDesc = filterKeys[inputName] != 'asc'
//             postsWithFilter.sort((a,b) =>{
//                 let greater = a[form['sortBy'].value] >= b[form['sortBy'].value]
//                 if(isDesc) {
//                     greater=!greater
//                 }
//                 return greater ? 1 : -1;
//             })
//         }
//     }
//     for(let post in postsWithFilter){
//         buildPost(postsWithFilter[post])        
//     }
// }


function buildPost(postToBuild){
    console.log('wykonuje sie');
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
