import {fireAlert} from './customAlert.js';


var form;

const isEven = (num) => num % 2 === 0;

const addZero = (num) => num = '0' + num;

const defaultValidation = (value) => {
    return /.+/.test(value)
}

const peselValidation = (value) => {
    let weights = '1379137913';
    let checkSum = 0;
    if(/^\d{11}$/.test(value)){
        let i=0;
        let tempSum;
        for(i; i<10; i++){
            tempSum = value[i] * weights[i];
            tempSum = tempSum % 10;
            checkSum += tempSum;
        }
        checkSum = checkSum % 10;
        let finalCheck = 10 - checkSum;
        if(finalCheck == value[10]){
            return true;
        }
    }
}

const regForEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

let formDetails = {
    name: 'userForm',
    id: 'userForm'
}

let inputs = {
    name: {label: 'Imię', type: 'input', inputType: 'text', validationF: defaultValidation},
    surname: {label: 'Nazwisko', type: 'input', inputType: 'text', validationF: defaultValidation},
    pesel: {label: 'PESEL', type: 'input', inputType: 'text', maxLength: '11',validationF: peselValidation},
    birthDate:{label: 'Data urodzenia', type: 'input',  inputType: 'date', disabled: 'true', validationF: defaultValidation},
    age: {label: 'Wiek', type: 'input', inputType: 'number', disabled: 'true', validationF: (value) => {
        return value > 0 && /.+/.test(value)
    }},
    email: {label: 'Email', type: 'input', inputType: 'email', validationF: (value) => {
        return regForEmail.test(value)
    }},
    details: {label: 'Opis', type: 'textarea', textArea: [4, 50], placeholder: 'Dodaj opis', validationF: defaultValidation},
    gender: {label: 'Płeć', type: 'select', selectOptions: ['default', 'Mężczyzna', 'Kobieta'], textForOptions: ['Wybierz płeć', 'Mężczyzna', 'Kobieta'], disabled: 'true', validationF: defaultValidation},
    sendForm: {type: 'button', id: 'sendForm', content: 'zapisz'}
}



function buildForm(inputs, formDetails){
    let app = document.getElementById('app');
    let pageContent = document.createElement('div');
    pageContent.className = 'pageContent';
    app.appendChild(pageContent);
    let header =  document.createElement('header');
    pageContent.appendChild(header);
    let headerH1 = document.createElement('h1');
    headerH1.innerText = 'Formularz';
    header.appendChild(headerH1);
    let main = document.createElement('main');
    pageContent.appendChild(main);
    let formDiv = document.createElement('div');
    formDiv.className = 'formContainer';
    main.appendChild(formDiv);
    let formEl = document.createElement('form');
    formDiv.appendChild(formEl);
    formEl.name = formDetails.name;
    formEl.id =  formDetails.id;
    for(let inputName in inputs){
        let formItem = document.createElement('div');
        formEl.appendChild(formItem);
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

        for(key of ['disabled','maxLength']) {
            if(inputs[inputName][key]){
                formItemElement[key] = inputs[inputName][key];
            }
        }

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
                if(i==0){
                    optionEl.selected = 'true';
                    optionEl.hidden = 'true';
                }
            }
        }
    }
    form = document.forms[formDetails.name];
}
buildForm(inputs, formDetails);




const handlePesel = (e) =>  {
    let pesel = e.target.value;
    if(pesel.length == 11){
        let birthDate = document.getElementById('birthDate');
        let birthMonth = 0;
        let birthDay = 0;
        // let birthYear = 1900 + parseInt(pesel[0]*10)+parseInt(pesel[1]);
        let birthYear = 1900 + parseInt(pesel.slice(0,2));
        if (pesel[2]>=2 && pesel[2]<8){
            birthYear+=Math.floor(pesel[2]/2)*100;
        }
        if (pesel[2]>=8){
            birthYear-=100;
        }

        birthMonth = parseInt((pesel[2]%2)*10)+parseInt(pesel[3]);
        // birthMonth = parseInt(pesel.slice(2,4));
        if(birthMonth < 10){
            birthMonth = addZero(birthMonth);
        }
        // birthDay = parseInt(pesel[4]*10)+parseInt(pesel[5]);
        birthDay = pesel.slice(4,6);
        birthDate.value = `${birthYear}-${birthMonth}-${birthDay}`;
        let age = document.getElementById('age');
        let calculatedAge = new Date(new Date() - new Date(birthDate.value)).getFullYear() - 1970;
        age.value = calculatedAge;
        let gender = document.getElementById('gender');
        if(isEven(pesel[9])){
            gender.value = 'Kobieta';
        }
        else{
            gender.value = 'Mężczyzna';
        }
    }
}

const handleInputValidation = (e) => {
    let inputValue = e.target.value;
    let validF = inputs[e.target.name].validationF
    if(!validF(inputValue)){
        e.target.classList.add("wrongInput");
    }
    else{
        e.target.classList.remove("wrongInput");
    }
}

document.getElementById('pesel').addEventListener('input', handlePesel)

document.getElementById('sendForm').addEventListener('click', getFormData)

//@NOTE "obrzydliwe"
// const inputsForLiveValidation = document.querySelectorAll('input:not(input[type="button"])')

// for (let i=0; i<inputsForLiveValidation.length; i++){
//     inputsForLiveValidation[i].addEventListener('focusout', handleInputValidation);
// }

for(let inputName in inputs){
    if(inputs[inputName].type != 'button'){
        form[inputName].addEventListener('focusout', handleInputValidation);
        form[inputName].addEventListener('input', handleInputValidation);
    }
}

function getFormData(e){
    e.preventDefault();
    let alertMsg="Sprawdź proszę pole: ";
    let output = '';
    let valid = true;
    for(let inputName in inputs) {
        if(inputs[inputName].type != 'button'){
            let value = form[inputName].value;
            let inputSettings = inputs[inputName];
            output+=`${inputSettings.label} : ${value}<br/>`;
            if(!inputSettings.validationF(value)) {
                alertMsg+= inputSettings.label+' ';
                valid = false;
            }
        }
    }
    if(valid){
        if(document.getElementById('output')){
            document.getElementById('output').remove();
        }
        // let result=document.getElementById("output");
        let body = document.querySelector('main');
        let outputDivContainer = document.createElement('div');
        body.appendChild(outputDivContainer);
        outputDivContainer.id='output';
        let outputDiv = document.createElement('div');
        outputDivContainer.appendChild(outputDiv).innerHTML=output;
        // result.innerHTML = output
    }
    else{
        fireAlert(alertMsg);
    }
}