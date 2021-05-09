console.log('working');
shownotes();

// if user add a node too local storage 
let addbtn=document.getElementById('addbtn')
addbtn.addEventListener('click',function(e){
    let addTxt=document.getElementById('addtxt');
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }else{
        notesObj=JSON.parse(notes);
    }
    notesObj.push(addTxt.value)
    localStorage.setItem('notes',JSON.stringify(notesObj));
    addTxt.value="";
    // console.log(notesObj);
    shownotes();
});

// function to show element 
function shownotes(){
    let notes=localStorage.getItem("notes");

    if(notes==null){
        notesObj=[];
    }else{
        notesObj=JSON.parse(notes);
    }
    let html="";
    
    notesObj.forEach(function(element,index) {
        html+=`
        <div class="card noteCard" >
                
                <div class=" card-body">
                  <h5 class="card-title">Note ${index+1}</h5>
                  <p class="card-text">${element}</p>
                  <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete note</button>
                </div>

            </div>`
        
    });

    let notesElm=document.getElementById("notes");
    if(notesObj.length !=0){
        notesElm.innerHTML=html;
    }else{
        notesElm.innerHTML="<h2>Nothing to show you! Add a new note </h2>";
    }

}

// function to delete a note 
function deleteNote(index){
    console.log('i m deleting'+index);
    let notes=localStorage.getItem("notes");

    if(notes==null){
        notesObj=[];
    }else{
        notesObj=JSON.parse(notes);
    }
    notesObj.splice(index,1)
    localStorage.setItem('notes',JSON.stringify(notesObj));
    shownotes();
}

let search=document.getElementById('searchtxt');
search.addEventListener('input',function(){
    let inputval=search.value.toLowerCase();
    console.log('input fired',inputval);
    let notesCards=document.getElementsByClassName("noteCard");
    Array.from(notesCards).forEach(function(element){
        let cardtxt=element.getElementsByTagName("p")[0].innerText;
        if(cardtxt.includes(inputval)){
            element.style.display="block";
        }else{
            element.style.display="none";
        }
        // console.log(cardtxt);
    })
})