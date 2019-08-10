class Todo {
  constructor(id, text) {      
    this.id = id;
    this.text = text;
    this.type = "doing";
  }
}

const toDos = [];

const addButton = document.getElementById("addToDoButton");
addButton.addEventListener("click", createTodoTable, false);

const ids = ["displayAll", "displayDoing", "displayDone"];

ids.forEach(function( id ){
  const radiobutton = document.getElementById( id );
  radiobutton.addEventListener("click", displayControl, false);
});

function displayControl(){
  const trs = document.querySelectorAll("tr");
  trs.forEach(function( tr ){
    tr.classList.remove("hide");
  });
  switch (this.value){
    case "doing":
      const dones = document.querySelectorAll("tr.done");
      dones.forEach(function( task ){
        task.classList.add("hide");
      });
      break;
    case "done":
      const doings = document.querySelectorAll("tr.doing"); 
      doings.forEach(function( task ){
        task.classList.add("hide");
      });
      break ;
    case "all":
      const unDones = document.querySelectorAll("tr.done, tr.doing");
      unDones.forEach(function( task ){
        task.classList.delete("hide");
      });
      break;
  }
};

function addTodo () {
  const id = toDos.length;
  const target = document.getElementById("toDoInputArea")
  const text = target.value;
  toDos.push (new Todo(id, text));
};

function displayTodos() {
  toDos.forEach(function( todo ) {
    const tr = document.createElement('tr');
    tr.classList.add(todo.type)
    const nameTd = document.createElement('td');
    nameTd.textContent = todo.text;
    const idTd = document.createElement('td');
    idTd.textContent = todo.id;
    const typeTd = document.createElement('td');
    typeTd.textContent = todo.type;

    const buttonTd = document.createElement('td');
    const changeButton = document.createElement('button');
    changeButton.classList.add("change-button");
    changeButton.dataset.todoId = todo.id;
    changeButton.textContent = todo.type;
    changeButton.addEventListener("click", changeStatus, false);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add("delete-button")
    deleteButton.dataset.todoId = todo.id;
    deleteButton.textContent = "削除";
    deleteButton.addEventListener("click", deleteTodo, false);

    buttonTd.appendChild(changeButton);
    buttonTd.appendChild(deleteButton);

    tr.appendChild(idTd);
    tr.appendChild(nameTd);
    tr.appendChild(typeTd);
    tr.appendChild(buttonTd);
    const target = document.getElementById('todoTrArea');
    target.appendChild(tr);
  });
}

function createTodoTable(){
  addTodo ();
  const target = document.getElementById("toDoInputArea");
  target.value = "";
  hideTodos();
  displayTodos();
};

function hideTodos() {
  const target = document.getElementById('todoTrArea');
  target.textContent = "";
}

function changeStatus () {
  const id = this.dataset.todoId;
  const todo = toDos[id];
  todo.type = 'done';
  hideTodos();
  displayTodos();
};

function deleteTodo (){
  const id = this.dataset.todoId;
  toDos[id].type = "deleted";
  hideTodos();
  displayTodos();
}

