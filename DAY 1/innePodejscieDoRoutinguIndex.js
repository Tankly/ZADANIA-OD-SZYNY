const path = window.location.pathname.substring(1)
const pages = {
    form: {
        html: import("./views/form.html"),
        script: () => {
            import("./js/form.js")
        }
    }
}
if(pages[path]) {
    pages[path].html.then((page) => {
        document.getElementById('app').innerHTML=page.toString()
        pages[path].script()
    })
} else {
    document.getElementById('app').innerHTML='dupa'
}