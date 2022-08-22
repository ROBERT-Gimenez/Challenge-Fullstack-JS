function qse(element) {
    return document.querySelector(element)
};
function qsAll(element) {
    return document.querySelectorAll(element)
};
let form =qse("#operation")
let concept = qse("#concept");
let date = qse("#date");
let amount = qse("#amount");
let movements = qse("#movements");
let operation = qse("#operation");
let general = qse("#general_list");
let add = qse("#links");
let submit = qse("#submit");

let inputs = [concept,date,amount];

form.addEventListener('submit' , function (event){
    event.preventDefault()
    let error = false;
    inputs.forEach(element => { if(element.value ==""){
        error = true
    }})
    if(error == false){
        window.location.reload
        event.submit()
        alert("add operation")
    }else{
        event.preventDefault()
        alert("check the fields")

    }   
    ;
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



