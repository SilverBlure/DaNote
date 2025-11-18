import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionChanges, updateDoc, collectionData, doc, onSnapshot } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../interfaces/note.interface';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  // items;
  // items$;

  firestore: Firestore = inject(Firestore);

  unsubNotes;
  unsubTrash;


  trashNotes: Note [] = [];
  normalNotes:Note [] = [];

  constructor() {

    this.unsubNotes = this.subNotesList();
    this.unsubTrash = this.subTrashList();

  }


  ngOnDestroy() {
    this.unsubTrash;
    this.unsubNotes;
  }

async addNote(item: Note){
  await addDoc(this.getNotesRef(),item).catch(
    (err) =>{console.error(err)

    }
  ).then((docRef)=>{

  console.log('Writen with id:' ,docRef?.id)})
}

subNotesList(){
return onSnapshot(this.getNotesRef(), (list) => {
      this.normalNotes = [],
      list.forEach(element => {
        this.normalNotes.push(this.setNotesObject(element.data(), element.id));
      })
    })
}

subTrashList(){
return  onSnapshot(this.getTrashRef(), (list) => {
  this.trashNotes = [];
      list.forEach(element =>{
        this.trashNotes.push(this.setTrashObject(element.data(), element.id))
      })
    })
}



  setNotesObject(obj:any, id:string){
    return{
    id: id || "",
    type: obj.type || "note",
    title: obj.title || "",
    content: obj.content || "",
    marked: obj.marked || false,
    }
}

   setTrashObject(obj:any, id:string){
    return{
    id: id || "",
    type: obj.type || "trash",
    title: obj.title || "",
    content: obj.content || "",
    marked: obj.marked || true,
    }
}

  getNotesRef() {
    return collection(this.firestore, 'note')
  }

  getTrashRef() {
    return collection(this.firestore, 'trash')
  }

  getSingelDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);

  }

}
