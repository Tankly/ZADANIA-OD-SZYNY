
export function makeFilter(inputs){
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
        if(inputs[inputName].type = 'buttton'){
            formItemElement.innerText = inputs[inputName].content;
        }
        else if(inputs[inputName].type = 'input'){
            formItemElement.type = inputs[inputName].inputType; 
        }
    }
}