import { useState, useEffect } from 'react'
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import 
  {
    addDoc,onSnapshot, deleteDoc, setDoc, doc, getDoc
  }
from "firebase/firestore"
import { notescollection, db } from  "../firebase"

export default function App() {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState("");

  console.log(currentNoteId);

  const currentNote = notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
  
  useEffect(() => {
    const unsubscribe = onSnapshot(notescollection, (snapshot) => {
      const notesArr = snapshot.docs.map(doc => (
        {
          ...doc.data(),
          id: doc.id
        }
      ))

      notesArr.sort((a, b) => b.updatedAt - a.updatedAt);

      setNotes(notesArr)
    })
    return unsubscribe
  }, []);

  useEffect(() => {
    if (!currentNoteId) {
    setCurrentNoteId(notes[0]?.id);
    }
  }, [notes]);


  async function createNewNote() {
    const newNote = {
      body: "# Type your markdown note's title here",
      createAt: Date.now(),
      updatedAt: Date.now(),
    };
    const newNoteRef = await addDoc(notescollection, newNote)
    setCurrentNoteId(newNoteRef.id);
  }

  async function updateNote(text) {
      const docRef = doc(db, "notes", currentNoteId)
      await setDoc(docRef, { body: text, createAt: Date.now()}, { merge: true })
  };

  async function deleteNote(noteId) {
    const docRef = doc(db, "notes", noteId)
    await deleteDoc(docRef);
  };


  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
        <Editor currentNote={currentNote} updateNote={updateNote} />
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
