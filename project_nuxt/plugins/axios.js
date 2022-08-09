const errors = {
    400: { errMsg:"Nieprawidłowe zapytanie", },
    429: { 
        errMsg:"Nieautoryzowany dostęp", 
        extra: (store, router) => {
            store.dispatch('logout');
            router.push('/');
        }
    },
    403: { errMsg:"Brak uprawnień",},
    404: { errMsg:"Nie znaleziono", },
    401: { errMsg:"Zbyt wiele zapytań, spróbuj za chwile", },
}

export default function ({ $axios, store}) {
    console.log(store, this.$router);
    $axios.onError(error => {
        let msg = "Wewnętrzny błąd serwera"
        // if(error.response.data.message){
        //     msg = error.response.data.message;
        // }
        // else {
            for(const err in errors){
                if(err == error.response.status){
                    console.log('err.errMsg: ',errors[err].errMsg);
                    msg = errors[err].errMsg;
                    if(errors[err].extra){
                        errors[err].extra(store, this.$router)
                        break
                    }
                }
            // }
        }
        store.dispatch('alert/setMsg', msg);
        return Promise.resolve(false);
    })
}


// error.response.status