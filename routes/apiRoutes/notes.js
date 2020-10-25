const router = require("express").Router();
const { createNewNote, findById, deleteNote } = require("../../lib/notes.js");
const { notesArray } = require("../../data/db.json");
const shortid = require('shortid');

// A route to display the notes
router.get('/notes', (req, res) => {
    let results = notesArray;
    res.json(results);
});

// A route for giving unique ID to the notes and creating it
router.post("/notes", (req, res) => {
    req.body.id = shortid.generate();

    const note = createNewNote(req.body, notesArray);
    res.json(note);
});

// A route for deleting a note
router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const selectedNote = findById(noteId, notesArray);
    if (selectedNote) {
        const newNotes = deleteNote(noteId, notesArray);
        res.json(newNotes);
    }
    else {
        res.send(404);
    }
})

module.exports = router;