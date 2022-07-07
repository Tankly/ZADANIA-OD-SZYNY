const defaultValidation = (value) => {
    return /.+/.test(value)
}


function getFormData(){
    const regForEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let inputs = {
        name: {label: 'Imię', validationF: defaultValidation},
        surname: {label: 'Nazwisko', validationF: defaultValidation},
        age: {label: 'Wiek', validationF: (value) => {
            return value > 0 && /.+/.test(value)
        }},
        email: {label: 'Email', validationF: (value) => {
            return regForEmail.test(value)
        }},
        details: {label: 'Opis', validationF: defaultValidation},
        gender: {label: 'Płeć', validationF: defaultValidation},
    }
    const form = document.forms['userForm']
    let alertMsg="Formularz źle wpełniony sprawdź pole: ";
    let output = '';
    let valid = true;
    for(inputName in inputs) {
        let value = form[inputName].value
        let inputSettings = inputs[inputName]
        output+=`${inputSettings.label} : ${value}<br/>`
        if(!inputSettings.validationF(value)) {
            alertMsg+= inputSettings.label+' ';
            valid = false
        }
    }
    if(valid){
        // let result=document.getElementById("output");
        let body = document.body;
        let outputDiv = document.createElement('div');
        outputDiv.id='output';
        body.appendChild(outputDiv).innerHTML=output;
        // result.innerHTML = output
    }
    else{
        fireAlert(alertMsg);
    }
}