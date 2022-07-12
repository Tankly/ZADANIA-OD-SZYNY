import {getPostsData} from '../api.js'

const postsContainer = document.getElementById('postsContainer');
async function postsData(){
    postsContainer.innerHTML='';
    const posts = await getPostsData();
    for(let post in posts){
        buildPost(posts[post].id, posts[post].userId, posts[post].title, posts[post].body)        
    }
}
postsData();

let inputs = {
    author: {label: 'Autor', defaultValue: '', filterKey:'userId'},
    title: {label: 'Tytuł', defaultValue: '', filterKey:'title'},
    content: {label: 'Treść', defaultValue: '', filterKey:'body'},
    sort: {label: 'Sortowanie', defaultValue: 'default'},
}

const form = document.forms['filterForm'];

document.getElementById('filter').addEventListener('click', useFilter);
document.getElementById('clean').addEventListener('click', cleanFilterForm);

function cleanFilterForm(e){
    e.preventDefault();
    for(let inputName in inputs){
        form[inputName].value = inputs[inputName].defaultValue;
    }
    postsData();
}

async function useFilter(e){
    e.preventDefault();
    postsContainer.innerHTML='';
    let postsWithFilter = await getPostsData();
    let filterKeys = [];
    for(let inputName in inputs){
        filterKeys[inputName] = form[inputName].value;
        if(form[inputName].type == 'text'){       
            if(filterKeys[inputName]!=''){
                if(isNaN(filterKeys[inputName])){
                    postsWithFilter = postsWithFilter.filter((e) =>{
                        return e[inputs[inputName].filterKey].search(form[inputName].value) !== -1
                    })  
                }
                else{
                    postsWithFilter = postsWithFilter.filter((e) =>{
                        return e[inputs[inputName].filterKey] == form[inputName].value
                    })  
                }
            }
        }
        else if(form[inputName].type = 'select-one'){
            if (filterKeys[inputName]=='default' || filterKeys[inputName]=='asc') {
                postsWithFilter.sort((a,b) =>{
                    return a[0] - b[0];
                })
            }
            else if(filterKeys[inputName]=='desc'){
                postsWithFilter.reverse((a,b) =>{
                    return a[0] - b[0];
                })
            }
        }
    }
    for(let post in postsWithFilter){
        buildPost(postsWithFilter[post].id, postsWithFilter[post].userId, postsWithFilter[post].title, postsWithFilter[post].body)        
    }
}


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
