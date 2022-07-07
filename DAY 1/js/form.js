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
        birthDay = parseInt(pesel.slice(4,6));
        birthDate.value = `${birthYear}-${birthMonth}-${birthDay}`;
        age = document.getElementById('age');
        let calculatedAge = new Date(new Date() - new Date(birthDate.value)).getFullYear() - 1970;
        age.value = calculatedAge;
        gender = document.getElementById('gender');
        if(isEven(pesel[9])){
            gender.value = 'Kobieta';
        }
        else{
            gender.value = 'Mężczyzna';
        }
    }
}

document.getElementById('pesel').addEventListener('input', handlePesel)

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
        finalCheck = 10 - checkSum;
        if(finalCheck == value[10]){
            return true;
        }
    }
}

const isEven = (num) => num % 2 === 0;

const addZero = (num) => num = '0' + num;

function getFormData(){
    const regForEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let inputs = {
        name: {label: 'Imię', validationF: defaultValidation},
        surname: {label: 'Nazwisko', validationF: defaultValidation},
        pesel: {label: 'PESEL', validationF: peselValidation},
        birthDate:{label: 'Data urodzenia', validationF: defaultValidation},
        age: {label: 'Wiek', validationF: (value) => {
            return value > 0 && /.+/.test(value)
        }},
        email: {label: 'Email', validationF: (value) => {
            return regForEmail.test(value)
        }},
        details: {label: 'Opis', validationF: defaultValidation},
        gender: {label: 'Płeć', validationF: defaultValidation},
    }
    const form = document.forms['userForm'];
    let alertMsg="Formularz źle wpełniony sprawdź pole: ";
    let output = '';
    let valid = true;
    for(inputName in inputs) {
        let value = form[inputName].value;
        let inputSettings = inputs[inputName];
        output+=`${inputSettings.label} : ${value}<br/>`;
        if(!inputSettings.validationF(value)) {
            alertMsg+= inputSettings.label+' ';
            valid = false;
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