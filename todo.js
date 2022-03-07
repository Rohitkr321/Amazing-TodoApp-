
let todos = [];
let checkedItem = [];
let checkedIndex = [];
//Set the value of button and create.
function createDiv() {
    //Create and append Left DIV
    let leftPanDiv = document.createElement("div");
    leftPanDiv.setAttribute("id", "left");
    document.body.appendChild(leftPanDiv)
    let heading = document.createElement("h1");
    heading.innerHTML = "ToDo";
    heading.setAttribute("id","head");
    let task = document.createElement("div");
    task.setAttribute("id", "task");
    document.querySelector("#left").appendChild(heading);
    document.querySelector("#left").appendChild(task);

    //Create and Append Right DIV 
    let rightPanDiv = document.createElement("div");
    rightPanDiv.setAttribute("id", "right");
    document.body.appendChild(rightPanDiv)
    
    //Create textArea
    let input = document.createElement("textarea");
    input.style.width="50%"
    input.setAttribute("id", "input")
    input.setAttribute("rows", "7")
    input.setAttribute("cols", "25")
    input.setAttribute("placeholder","I need to...")
    // Append textArea to right DIV
    document.querySelector("#right").appendChild(input)

    // Listening to the event
    document.querySelector("#input").addEventListener("keydown", eventHandler)

    getToDo()

    // event handler function
    function eventHandler(e) {
        let keyCode = e.code; //check for enter key press
        let text = document.querySelector("#input").value; //get the value of textarea

        if (keyCode === "Enter" && text !=="") {
            e.preventDefault(); //Don't Know what it does
            // create a container for every TASK


            document.querySelector("#input").value =""; //Setting textArea value to empty

            todos.push(text);
            todosInString = JSON.stringify(todos)
            localStorage.setItem("todos", todosInString);

            let leftDiv = document.getElementById("left")

            leftDiv.removeChild(leftDiv.childNodes[1]);
            let task = document.createElement("div");
            task.setAttribute("id", "task");
            leftDiv.appendChild(task);
            getToDo()

        }
    }

}

createDiv()

//Create All Button and set the Value in getToDo function.
function getToDo() {
    let mytodos = localStorage.getItem("todos");
    if (mytodos !== null) {

        
        let mytodo = JSON.parse(mytodos);
        todos = mytodo;
        for (let i = 0; i < todos.length; i++) {
            let container = document.createElement("div");
            container.classList.add("taskContainer") // add class to the container
            let idToSet = i
            container.setAttribute("id", idToSet);


            let readButton = document.createElement("button"); // creating a read button
            readButton.innerHTML = "▢"
            readButton.addEventListener("click", checkBox)
            let checkID = `check-${i}`
            readButton.setAttribute("id", checkID)


            let editButton = document.createElement("button"); // creating an edit button
            let editId = `edit-${i}`
            editButton.setAttribute("id",editId)
            editButton.innerHTML="✎"
            editButton.addEventListener("click",editTask)
          

            let deleteButton = document.createElement("button"); //creating deleteButton
            deleteButton.innerHTML = "X"
            deleteButton.addEventListener("click", deleteBox)
            let deleteID = `delete-${i}`
            deleteButton.setAttribute("id", deleteID)

            let p = document.createElement("p"); //Create a p element
            p.innerText = todos[i]; // adding the textValue from TextArea to the p element
            
            container.appendChild(p); //append the p element to container
            container.appendChild(readButton); //append read button to container
            container.appendChild(editButton); //append Edit button to container
            container.appendChild(deleteButton); //append deleteButton to container
            document.querySelector("#task").appendChild(container);
        }
        renderCheckBox()
    }
}


//CheckBox .
function checkBox(event) {
    let element = event.path[1];
    let id = element.getAttribute("id")
    document.getElementById(`check-${id}`).innerHTML = "✔";
    let p = element.childNodes[0].innerHTML
    if(checkedItem.indexOf(p)==-1){
        checkedItem.push(p);
    }
    localStorage.setItem("checked",JSON.stringify(checkedItem))

}

//Delete the Task if it's done. 
function deleteBox(event) {
    let element = event.path[1];
    let id = element.getAttribute("id")
    let txt = todos[id];
    todos.splice(id, 1);
    todosInString = JSON.stringify(todos)
    localStorage.setItem("todos", todosInString);

    let leftDiv = document.getElementById("left")

    leftDiv.removeChild(leftDiv.childNodes[1]);
    let task = document.createElement("div");
    task.setAttribute("id", "task");
    leftDiv.appendChild(task);

    let toRemoveCheckedItem = checkedItem.indexOf(txt);

    if(toRemoveCheckedItem!==-1){
        checkedItem.splice(toRemoveCheckedItem,1)
    }

    checkedIndex=[]

    localStorage.setItem("checked",JSON.stringify(checkedItem));

    getToDo()
}

//After Complete the task ,renderCheckBox Complete Or Not.
function renderCheckBox(){
    let checkedItemFromLocalStorage = localStorage.getItem("checked")
    if(checkedItemFromLocalStorage!==null){
        let allCheckedItem = JSON.parse(checkedItemFromLocalStorage)
        checkedItem = allCheckedItem;

        let mytodo = JSON.parse(localStorage.getItem("todos"));


        for(let i=0;i<checkedItem.length;i++){
            let index = mytodo.indexOf(checkedItem[i])
            checkedIndex.push(index);
        }

        checkedIndex.forEach(id=>{
            document.getElementById(`check-${id}`).innerHTML = "✔";
        })
    }
}

//Edit Function For Edit The Task.
function editTask(event){ 
let text;
if (confirm(`If You sure for Edit the task then Write in textArea After press Ok`) == true) {
  let element = event.path[1];
  let p = element.childNodes[0].innerHTML;
  document.getElementById('input').value = p;
  deleteBox(event);
} 
else {
  text = "You canceled!";
  text.innerHTML="No";
}
}
