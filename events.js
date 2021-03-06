let editing;

function start () {
    editing = new Editing();

    $("#notes").on("click", ".note", function () {
        editing.chooseNote($(this).attr("id"));
    });
    
    
    $("#subjects").on("click", ".subject", function () {
        editing.chooseSubject($(this).attr("id"));
    })


    $("#delete").click(function () {
        editing.deleteNote(function () {
            editing.save()
            editing.destroyEditor();
            editing.displayNotes();
        })
    })
    
    $("#subjects").on("click", ".delete", function () {
        let id = $(this).data("deletes");
        editing.deleteSubject(id, function () {
            editing.save();
            
            if (editing.currentSubject === id) {
                editing.currentSubject = null;
                editing.currentSubjectLabel = null;
                
                editing.displaySubjects();
                editing.destroyEditor()
                editing.displayNotes()
            }

            $(".subject").first().click();
        })
    })

    $("#new-subject").click(function () {
        editing.createSubject(name, function (id) {
            editing.save();
            editing.displaySubjects();
            editing.chooseSubject(id);
        })
    })


    $("#new-note").click(function () {
        editing.createNote(name, function (id) {
            editing.save();
            editing.displayNotes();
            editing.chooseNote(id);
        })
    });
    
    $("#subjects").on("click", ".edit", function () {
        let id = $(this).data("edits");
        bootbox.prompt("Pick a new name for your subject...", function (result) {
            if (result !== null) {
                let name = result;
                editing.data.subjects[editing.currentSubject].name = name;
                
                editing.save();
                editing.displaySubjects();
                editing.chooseSubject(id);
                
                if (editing.currentNote !== null) {
                    editing.chooseNote(editing.currentNote);   
                }
            }
        });
    });
    
    $("#notes").on("click", ".edit", function () {
        let id = $(this).data("edits");
        bootbox.prompt("Pick a new name for your note...", function (result) {
            if (result !== null) {
                let name = result;
                editing.data.subjects[editing.currentSubject].notes[id].name = name;
                
                editing.save();
                editing.destroyEditor();
                editing.displaySubjects();
                editing.chooseSubject(editing.currentSubject);
                editing.chooseNote(id);
            }
        });
    });

    // Pick top subject
    $(".subject").first().click();
    editing.displayNotes();
}