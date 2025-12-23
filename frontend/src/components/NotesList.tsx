import { useNotes } from "@/hooks/useNotes";
import { Note } from "@/models/note.model";
import { Button, List, ListItem, ListItemText, TextField } from "@mui/material";
import { useState } from "react";

export const NotesList = ({ tenantId }: { tenantId: string }) => {
  const { data, createNote } = useNotes(tenantId);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  return (
    <div style={{ padding: "2rem" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createNote.mutate(newNote);
          setNewNote({ title: "", content: "" });
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "500px",
        }}
      >
        <TextField
          label="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          variant="outlined"
        />
        <TextField
          label="Content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          variant="outlined"
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Note
        </Button>
      </form>
      <List style={{ marginTop: "2rem" }}>
        {data?.map((note: Note) => (
          <ListItem
            key={note.id}
            style={{ border: "1px solid #eee", marginBottom: "0.5rem" }}
          >
            <ListItemText primary={note.title} secondary={note.content} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
