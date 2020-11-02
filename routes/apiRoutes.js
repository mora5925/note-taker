let notes = require("../db/store");
const fs = require("fs");


module.exports = function (app) {
    
    app.get("/api/notes", function (req, res) {
        fs.readFile("./db/db.json", "utf8", function(err, data) {
            if (err) throw err;
            res.json(JSON.parse(data));
        });
    });
  
    app.post("/api/notes", function (req, res) {
        console.log(req.body);
        
        const newNote = req.body;
      
        newNote.id = notes.length;
        console.log(newNote.id);
        
        fs.readFile("./db/db.json", "utf8", function(err, data){
            if (err) throw err;
            notes = JSON.parse(data);
           
            notes.push(newNote);
          
            fs.writeFile("./db/db.json", JSON.stringify(notes), function(err){
                if (err) throw err;
            });
        });
     
        res.json(newNote);
    });

   
    app.delete("/api/notes/:id", function (req, res) {
        fs.readFile("./db/db.json", "utf8", function(err, data){
            if (err) throw err;
            notes = JSON.parse(data);
        });
   
        const id = parseInt(req.params.id);
       
        notes = notes.filter(function(note){
            if (id == note.id){
                return false;
            }
            else {
                return true;
            }
        });
       
        fs.writeFile("./db/db.json", JSON.stringify(notes), function (err) {
            if (err) throw err
        });
        res.json(notes);
    });

}
