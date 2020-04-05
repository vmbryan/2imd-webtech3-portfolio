class Note {
  constructor(title) {
    this.title = title;
    this.element = this.createElement(title);
  }
  
  createElement(title){
    let newNote = document.createElement(`div`);
    
    // HINT🤩 a.addEventListener('click', this.remove.bind(newNote));
    newNote.innerHTML = `<p>${title}</p> <a href="#" class="card-remove">Remove</a>`;
    newNote.classList = `card`;

    let removeBind = newNote.querySelector(`.card-remove`);
    removeBind.addEventListener(`click`, this.remove.bind(newNote));
    return newNote;
    
  }
  
  add(){
    // HINT🤩
    // this function should append the note to the screen somehow
    let todo = this.element;
    document.querySelector(".notes").append(todo);
  }
  
  saveToStorage(){
    // HINT🤩
    // localStorage only supports strings, not arrays
    // if you want to store arrays, look at JSON.parse and JSON.stringify
    let localData = JSON.parse(localStorage.getItem(`localData`));
    if(localData == null) {
      localData = [];
    }
    localData.push(this.title);
    console.log(localData);
    localStorage.setItem(`localData`, JSON.stringify(localData));
  }
  
  remove(){
    // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
    // in this function, 'this' will refer to the current note element
    let removeBind = this;
    // console.log(removeBind);

    removeBind.addEventListener(`click`, e => {
      e.preventDefault();
    });

    let localArray = JSON.parse(localStorage.getItem(`localData`));
    let title = this.querySelector(`p`).innerHTML;
    let ArrayIndex = localArray.indexOf(title); 
    localArray.splice(ArrayIndex, 1); 

    localStorage.setItem(`localData`, JSON.stringify(localArray));  
    
    removeBind.classList.add("animated");
    removeBind.classList.add("fadeOutLeft");
     
    setTimeout(e => {
       this.remove();
    }, 500);
    
  }  
}

class App {
  constructor() {
    console.log("👊🏼 The Constructor!");
  
    // HINT🤩
    // clicking the button should work
    this.btnAdd = document.getElementById("btnAddNote");
    this.btnAdd.addEventListener('click',this.createNote.bind(this));
    // pressing the enter key should also work
    this.keyAdd = document.getElementById('txtAddNote');
    this.keyAdd.addEventListener("keydown", enter => {
      if(enter.keyCode == 13){
        enter.preventDefault();
        document.getElementById('btnAddNote').click();
        return true;
      }
    });
    this.loadNotesFromStorage();
  }
  
  loadNotesFromStorage() {
    // HINT🤩
    // load all notes from storage here and add them to the screen
    // something like note.add() in a loop would be nice
    let dataStorage = JSON.parse(localStorage.getItem(`localData`));
    if(dataStorage.length > 0) {
      dataStorage.forEach(title => {
        let note = new Note(title);
        note.add();
      });
    }
  }
   
  createNote(e){
    // this function should create a new note by using the Note() class
    
    // HINT🤩
    let text = document.getElementById('txtAddNote').value;
    console.log(text);

    let note = new Note(text);
    note.add();
    note.saveToStorage();
    this.reset();
  }
  
  reset(){
    // this function should reset the form 
  }
  
}

let app = new App();