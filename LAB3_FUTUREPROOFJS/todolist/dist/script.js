class Note {
  constructor(title) {
    this.title = title;
    this.element = this.createElement(title);
  }
  
  createElement(title){
    let newNote = document.createElement('div');
    newNote.setAttribute("class","card");

    let newP = document.createElement("p");
    newP.innerHTML = title;

    newNote.appendChild(newP);   // <div class="card"><p>title</p></div>;

    let newA = document.createElement("a");
    newA.setAttribute("class","card-remove");
    newA.innerHTML("remove");

    newNote.appendChild(newA);
    newA.addEventListener('click',this.remove.bind(newNote));

    
    // HINT🤩 a.addEventListener('click', this.remove.bind(newNote));
    
    return newNote;
  }
  
  add(){
    // HINT🤩
    // this function should append the note to the screen somehow
    document.querySelector(".notes").appendChild(this.element);
  }
  
  saveToStorage(){
    // HINT🤩
    // localStorage only supports strings, not arrays
    // if you want to store arrays, look at JSON.parse and JSON.stringify
  }
  
  remove(){
    // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
    // in this function, 'this' will refer to the current note element

  } 
}

class App {
  constructor() {
    console.log("👊🏼 The Constructor!");
  
    // HINT🤩
    // clicking the button should work
    // pressing the enter key should also work
    this.keyAdd = document.getElementById('txtAddNote');
    this.keyAdd.addEventListener("keypress", enter => {
      if(enter.keyCode == 13){
        enter.preventDefault();
        document.getElementById('btnAddNote').click();
      }
    });

    this.btnAdd = document.querySelector("#btnAddNote");
    // this.btnAdd = ???
    this.btnAdd.addEventListener("click", this.createNote.bind(this));
    this.loadNotesFromStorage();
  }
  
  loadNotesFromStorage() {
    // HINT🤩
    // load all notes from storage here and add them to the screen
    // something like note.add() in a loop would be nice
  }
   
  createNote(e){
    // this function should create a new note by using the Note() class
    
    // HINT🤩
    let text = document.getElementById('txtAddNote').value;
    console.log(text);

    let note = new Note(text);
    note.add();
    // note.saveToStorage();
    // this.reset();
  }
  
  reset(){
    // this function should reset the form 
  }
  
}

let app = new App();