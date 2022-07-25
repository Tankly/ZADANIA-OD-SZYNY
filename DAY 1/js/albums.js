import { getAlbums } from '../api.js'
import { makeFilter, useFilter as filter, cleanFilterForm as clean, saveFilterSettings } from './filter.js';
import l  from './loading.js';
import { changeUrl } from '../router/index'
import { buildPhotos } from './photos'

var albumsContainer;

async function albumsData(){
    albumsContainer.innerHTML='';
    albums = await getAlbums();
    let filteredAlbums = await filter('albums')
    albumsBuilder(filteredAlbums);
}


export function buildAlbumsFoundation(){
    let app = document.getElementById('app');
    let pageContent = document.createElement('div');
    pageContent.className = 'pageContent';
    app.appendChild(pageContent);
    let header =  document.createElement('header');
    pageContent.appendChild(header);
    let headerH1 = document.createElement('h1');
    headerH1.innerText = 'Albumy';
    header.appendChild(headerH1);
    let main = document.createElement('main');
    main.id = 'albumsMain';
    pageContent.appendChild(main);
    let filterFormContainerDiv = document.createElement('div');
    filterFormContainerDiv.id = 'filterFormContainer';
    main.appendChild(filterFormContainerDiv);
    let albumsContainerDiv = document.createElement('div');
    albumsContainerDiv.id = 'albumsContainer';
    main.appendChild(albumsContainerDiv);
    albumsContainer = document.getElementById('albumsContainer')
    makeFilter(inputs);
    albumsData();
}


let inputs = {
    author: {label: 'Autor:', defaultValue: '', filterKey: 'userId', type: 'input', inputType: 'number'},
    title: {label: 'Tytuł:', defaultValue: '', filterKey: 'title', type: 'input', inputType: 'text'},
    sortBy: {label: 'Sortowanie po:', defaultValue: 'userId', type: 'select', selectOptions: ['userId', 'title'], textForOptions: ['Autor', 'Tytuł']},
    sortDirection: {label: 'Sposób sortowania:', defaultValue: 'asc', type: 'select', selectOptions: ['asc', 'desc'], textForOptions: ['Rosnąco', 'Malejąco']},
    filter: {type: 'button', id: 'filter', content: 'Filtruj', btnFunction: async () =>{
        let filteredAlbums = await filter('albums');
        albumsBuilder(filteredAlbums);
        saveFilterSettings();
    }},
    clean: {type: 'button', id: 'clean', content: 'Wyczyść', btnFunction: async () =>{
        clean();
        await albumsData();
    }},
}


// window.document.addEventListener('filter', filter);
// window.document.addEventListener('clean', clean);

function albumsBuilder(data){
    l.loading(albumsContainer);
    for(let d in data){
        buildAlbum(data[d])
    }
    l.unlink();
}

function buildAlbum(postToBuild){
    let albumNumber = postToBuild.id;
    let albumAuthor = postToBuild.userId;
    let albumTitle = postToBuild.title;

    
    let postDiv = document.createElement('div');
    let post = albumsContainer.appendChild(postDiv);
    post.className = 'album';
    post.id = `Album_${albumNumber}`;
    
    let postHeaderH2 = document.createElement('h2');
    let postHeaderDone = post.appendChild(postHeaderH2);
    postHeaderDone.innerHTML =`Album nr: ${albumNumber} <br> ${albumTitle}`;

    let postFooter = document.createElement('div');
    postFooter.className = 'albumFooter';
    post.appendChild(postFooter);
    
    let postAuthorSpan = document.createElement('span');
    postAuthorSpan.innerText =`Autor: ${albumAuthor}`;
    postFooter.appendChild(postAuthorSpan);

    let postCommentsBtn = document.createElement('button');
    postCommentsBtn.innerText = 'Przejdź do albumu';
    postFooter.appendChild(postCommentsBtn);

    postCommentsBtn.addEventListener('click', async () => {
            changeUrl('albums', 'albumy', `albums/${albumNumber}/photos`);
            buildPhotos(albumNumber);
    })
}
