function qse(element) {
    return document.querySelector(element)
};
function qsAll(element) {
    return document.querySelectorAll(element)
};

let login = qse('form#login_form');
let register = qse('#register_form');
let goLogin = qse("#link_login");
let goRegister = qse('#link_register');


goLogin.addEventListener('click' , (e) => {
    e.preventDefault()
    register.style.display="none"
    login.style.display="flex"
})
goRegister.addEventListener('click' , (e) => {
    e.preventDefault()
    register.style.display="flex"
    login.style.display="none"
})
