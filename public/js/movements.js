function qse(element) {
    return document.querySelector(element)
};
function qsAll(element) {
    return document.querySelectorAll(element)
};


let movements = qse("#movements");
let operation = qse("#operation");
let general = qse("#general_list");
let add = qse("#links");
let submit = qse("#submit");
submit.addEventListener('click' , (e) =>{
    window.location.reload
    alert("add operation")
})
movements.addEventListener('click' , (e) =>{
    e.preventDefault()
    operation.style.display="none"
    general.style.display="flex"

})
add.addEventListener('click' , (e) =>{
    e.preventDefault()
    operation.style.display="flex"
    general.style.display="none"



})

