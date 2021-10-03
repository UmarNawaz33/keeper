import { Fab, Zoom } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useState } from "react";

function CreateArea(props) {

    const [isExpanded, setExpanded] = useState(false);
    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    function expand() {
        setExpanded(true);
    }

    function handleChange(event) {
        const {name, value} = event.target;
        setNote(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    function submitNote(event) {
        props.onAdd(note);
        setNote({
            title: "",
            content: ""
        });
        event.preventDefault();
        setExpanded(false);
    }

    return (
        <div>
            <form className="create-note">
                {isExpanded && <input onChange={handleChange} name="title" value={note.title} placeholder="Title"></input>}
                <textarea onClick={expand} onChange={handleChange} name="content" value={note.content} placeholder="Take a note..." rows={isExpanded ? "3" : "1"}></textarea>
                <Zoom in={isExpanded}><Fab onClick={submitNote}><Add /></Fab></Zoom>
            </form>
        </div>

    )
}

export default CreateArea;