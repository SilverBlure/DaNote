import { Injectable } from '@angular/core';
import { Firestore, collection, collectionChanges, collectionData, doc, onSnapshot } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  items;
  items$;

  firestore: Firestore = inject(Firestore);

  unsubList;

  constructor() {

    this.unsubList = onSnapshot(this.getNotesRef(), (list) => {
      list.forEach(element => {
        console.log(element.data());
      })
    })

    


    this.items$ = collectionData(this.getNotesRef());
    this.items = this.items$.subscribe((list)=>{
      list.forEach(element  =>{
        console.log(element);
      })
    })

  }


  ngOnDestroy() {
    this.unsubList();
    this.items.unsubscribe();
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
