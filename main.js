// import Todo from "./Todo.js";

class Todo {
  constructor(id, text) {      
    this.id = id;
    this.text = text;
    this.type = "doing";
  }
}

const toDos = [];

const button = document.getElementById("addToDoButton")
button.addEventListener("click", AddTodo, false);

function AddTodo () {
  const id = toDos.length;
  const text = document.getElementById("toDoInputArea").value;
  toDos.push (new Todo(id, text));
  console.log(toDos)
};

