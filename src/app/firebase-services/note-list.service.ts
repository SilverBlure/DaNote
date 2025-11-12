import { Injectable } from '@angular/core';
import { Firestore, collection, collectionChanges, collectionData, doc, onSnapshot } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  // items;
  // items$;

  firestore: Firestore = inject(Firestore);

  unsubNotes;
  unsubTrash;

  constructor() {

    this.unsubNotes = this.subNotesList();
    this.unsubTrash = this.subTrashList();

  }


  ngOnDestroy() {
    this.unsubTrash;
    this.unsubNotes;
  }



subNotesList(){
return onSnapshot(this.getNotesRef(), (list) => {
      list.forEach(element => {
        console.log(this.setNotesObject(element.data(), element.id));
      })
    })
}

subTrashList(){
return  onSnapshot(this.getTrashRef(), (list) => {
      list.forEach(element =>{
        console.log(this.setTrashObject(element.data(), element.id))
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
