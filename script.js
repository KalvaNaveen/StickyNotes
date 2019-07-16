
let data=[],id=0;

const TITLE = 'Title #',NOTE_TEXT='Add some note here....';

function OnPageLoad(){
    let locatdata= localStorage.Notesdata !== ''? JSON.parse(localStorage.Notesdata):[];
  locatdata.forEach(x => {
      id=x.id;
      data.push({id:id,title:x.title,note:x.note});
    LoadNote(id,x.title,x.note);
  }); 
};
const BACKGROUND_COLORS=['#ff5252','#d81b60','#1a237e','#006064','#1b5e20','#e65100','#ff5722','#263238','#424242'];
let emptyData= document.getElementById('emptyData');


function AddNote() {
    ++id;
    data.push({id:id,title:`${TITLE}${id}`,note:NOTE_TEXT});
    LoadNote(id,`${TITLE}${id}`,NOTE_TEXT);
    localStorage.setItem("Notesdata",JSON.stringify(data));
       
}

function RemoveNote(remove_note_Id){
    --id;
    document.getElementById(`note-${remove_note_Id}`).remove();
    data = data.filter(i=>{return remove_note_Id !== i.id});
    localStorage.Notesdata =JSON.stringify(data);
    IsNotesDataExist(data.length);

}
const LoadNote=(id,title,note)=>{
    IsNotesDataExist(data.length)
    let li= document.createElement('li');   
    li.id = `note-${id}`;
    let h2 =document.createElement('h2');
    h2.className='note__title';
    let tex =document.createTextNode(title);
    let p =document.createElement('p');
    let para=document.createTextNode(note);
    p.className='note__para';
    let btn_edit = document.createElement('button');
    btn_edit.id = `${id}`;
    btn_edit.className='note_btn note_btn_edit';
    btn_edit.innerText='E';
    btn_edit.setAttribute('onclick',`Edit(${id})`);
    let btn_rem = document.createElement('button');
    btn_rem.id = `${id}`;
    btn_rem.className='note_btn';
    btn_rem.innerText='X';
    btn_rem.setAttribute('onclick',`RemoveNote(${id})`);
    p.appendChild(para);
    h2.appendChild(tex);
    li.appendChild(h2)
    li.appendChild(btn_edit);
    li.appendChild(btn_rem);
    li.appendChild(p);
    li.style.backgroundColor= BACKGROUND_COLORS[Math.floor(Math.random()*9)];
    let main=document.getElementById('stickyNote')
    main.appendChild(li);
}

const IsNotesDataExist =(dataCount)=>{
    if(dataCount > 0){
        emptyData.hidden=true;
     }
     else{
        emptyData.hidden=false;
     }

}