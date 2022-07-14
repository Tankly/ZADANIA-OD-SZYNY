import { getPostsData } from '../api.js'

var inputsFromPosts;
var form;

// const filter = new CustomEvent('filter');

export function makeFilter(inputs){
    inputsFromPosts = inputs;
    let filterFormContainer = document.getElementById('filterFormContainer');
    let filterForm = document.createElement('form');
    filterFormContainer.appendChild(filterForm);
    filterForm.name = 'filterForm';
    filterForm.id = 'filterForm';
    for(let inputName in inputs){
        let formItem = document.createElement('div');
        filterForm.appendChild(formItem);
        formItem.className = 'formItem';
        
        if(inputs[inputName].type != 'button'){
            let labelForInput = document.createElement('label');
            formItem.appendChild(labelForInput);
            labelForInput.htmlFor = inputName;
            labelForInput.innerText = inputs[inputName].label;
        }
        let formItemElement = document.createElement(inputs[inputName].type);
        formItem.appendChild(formItemElement);
        
        formItemElement.id = inputName;
        formItemElement.name = inputName;

        if(inputs[inputName].type == 'button'){
            formItemElement.innerText = inputs[inputName].content;
            formItemElement.type = 'button';
            if(inputs[inputName].btnFunction){
                formItemElement.addEventListener('click', inputs[inputName].btnFunction);
            }
        }
        else if(inputs[inputName].type == 'input'){
            formItemElement.type = inputs[inputName].inputType;
        }
        else if(inputs[inputName].type == 'select'){
            for(let i=0; i<inputs[inputName].selectOptions.length; i++){
                let optionEl = document.createElement('option');
                formItemElement.appendChild(optionEl);
                optionEl.value = inputs[inputName].selectOptions[i];
                optionEl.innerText = inputs[inputName].textForOptions[i];
            }
        }
    }
    form = document.forms['filterForm'];
}


export async function useFilter(){
    postsContainer.innerHTML='';
    let postsWithFilter = await getPostsData();
    let filterKeys = [];
    for(let inputName in inputsFromPosts){
        filterKeys[inputName] = form[inputName].value;
        if(form[inputName].type == 'text'){       
            if(!!filterKeys[inputName]){
                if(isNaN(filterKeys[inputName])){
                    postsWithFilter = postsWithFilter.filter((e) =>{
                        return e[inputsFromPosts[inputName].filterKey].search(form[inputName].value) !== -1
                    })  
                }
                else{
                    postsWithFilter = postsWithFilter.filter((e) =>{
                        return e[inputsFromPosts[inputName].filterKey] == form[inputName].value
                    })  
                }
            }
        }
        else if(inputName == 'sortDirection'){
            let isDesc = filterKeys[inputName] != 'asc'
            postsWithFilter.sort((a,b) =>{
                let greater = a[form['sortBy'].value] >= b[form['sortBy'].value]
                if(isDesc) {
                    greater=!greater
                }
                return greater ? 1 : -1;
            })
        }
    }
    return postsWithFilter;
}


export function cleanFilterForm(){
    for(let inputName in inputsFromPosts){
        if(inputsFromPosts[inputName].type != 'button'){
            form[inputName].value = inputsFromPosts[inputName].defaultValue;
        }
    }
}

// document.getElementById('filter').addEventListener('click', () => document.dispatchEvent(filter));