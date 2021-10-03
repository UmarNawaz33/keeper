import React, { useState, useEffect } from "react";

import Header from './Header'
import Footer from "./Footer";
import Note from './Note'

import CreateArea from "./CreateArea";

function App() {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem('notes'));
        if(storedNotes) {
            setNotes(storedNotes);
        }
    }, [])

    function updateLocalStorage(notesArray) {
        localStorage.setItem('notes', JSON.stringify(notesArray));
    }

    function addNote(newNote) {
        setNotes(prevNotes => {
            updateLocalStorage([...prevNotes, newNote]);
            return [...prevNotes, newNote];
        });
    }

    function deleteNote(id) {
        setNotes(prevNotes => {
            const newItems = prevNotes.filter((noteItem, index) => {
                return index !== id;
            });
            updateLocalStorage(newItems);
            return newItems;
        })
    }

    return <div>
        <Header />
        <CreateArea onAdd={addNote} />
        {notes.map((noteItem, index) => {
            return <Note key={index} id={index} title={noteItem.title} content={noteItem.content} onDelete={deleteNote} />;
        })}

        {/* <Note key={1} title="Note title" content="Note content" /> */}
        {/* {notes.map(notes => (<Note key={notes.key} title={notes.title} content={notes.content} />) )} */}
        <Footer />
    </div>
};

export default App;