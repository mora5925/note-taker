const fs = require('fs');
const path = require('path');

// Function to create new notes
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../data/db.json'),
        JSON.stringify({ notesArray }, null, 2)
    );
    return note;
}

// Function to get a note in the json data by its ID
function findById(id, notes) {
    const result = notes.filter(note => note.id === id)[0];
    return result;
}

// Function to delete the note with reference to its ID
function deleteNote(id, notesArray) {
    const toBeDeleted = notesArray.filter(note => note.id === id)[0];
    const indexResult = notesArray.indexOf(toBeDeleted);

    notesArray.splice(indexResult, 1);

    fs.writeFileSync(
        path.join(__dirname, '../data/db.json'),
        JSON.stringify({ notesArray }, null, 2)
    )
    // return the new notes array
    return notesArray;
}

module.exports = {
    createNewNote,
    findById,
    deleteNote
};