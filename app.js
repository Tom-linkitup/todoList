//DOM String
const refresh = document.querySelector(".clear");
const date = document.getElementById("date");
const input = document.getElementById("input");
const list = document.getElementById("list");
const addBtn = document.querySelector(".fa-plus-circle")

//ClassName
const check = "fa-check-circle";
const unCheck = "fa-circle-thin";
const checkedText = "lineThrough";

//variables
let listArr, id;

//get item from local storage
let data = window.localStorage.getItem("ToDo");

//check data is empty or not
if(data){
    listArr = JSON.parse(data);
    id = listArr.length; // set id to the last one of the listArr
    loadListArr(listArr); // load the listArr to the UI 
}else{
    listArr = [];
    id = 0;
}

function loadListArr(array){
    array.map(item => {
        addTodo(item.name, item.id, item.done, item.trash)
    });
};

//clear the local storage
refresh.addEventListener("click", () => {
    window.localStorage.clear();
    location.reload();
});

// Show today date
const today = new Date();
const options = { weekday: "long", month: "short", day: "numeric" };
date.textContent = today.toLocaleDateString(undefined, options);

//Add todo function
function addTodo(todoText, id, isTodoDone, isTrashed){
    if(isTrashed){ return }
    let isDone = isTodoDone ? check : unCheck;
    let isTextDone = isTodoDone ? checkedText : "";
    let todoHtml = `<li class="item" job="">
                        <i class="fa ${isDone} co" job="complete" id="${id}"></i>
                        <p class="text ${isTextDone}">${todoText}</p>
                        <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
                    </li>`
    list.insertAdjacentHTML("beforeend", todoHtml);
};

//click to add todo
addBtn.addEventListener("click", () => {
    let todoText = input.value;
    if(todoText !== ""){
        addTodo(todoText, id, false, false);
        listArr.push({
            name: todoText,
            id: id,
            done: false,
            trash: false
        });
        //set item to local storage (this code should be added when listArr is updated)
        window.localStorage.setItem("ToDo", JSON.stringify(listArr));
        id++;
    };
    input.value = "";
    input.focus();
});

function completeTodo(element){
    element.classList.toggle(check);
    element.classList.toggle(unCheck);
    element.parentNode.querySelector(".text").classList.toggle("lineThrough");

    listArr[element.id].done = listArr[element.id].done ? false : true;
}

function deleteTodo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    listArr[element.id].trash = true;
}

list.addEventListener("click", (e) => {
    const element = e.target;
    const elementJob = element.attributes.job.value;
    if(elementJob === "complete"){
        completeTodo(element);
    }else if(elementJob === "delete"){
        deleteTodo(element);
    }
    //set item to local storage (this code should be added when listArr is updated)
    window.localStorage.setItem("ToDo", JSON.stringify(listArr));
});