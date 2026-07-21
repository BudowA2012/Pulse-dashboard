import { loadStorage, saveStorage } from "../storage";

import type { Note } from "../storage";

// =======================
// NOTES
// =======================

export function loadNotes(): Note[] {
  const storage = loadStorage();

  return storage.notes;
}

export function saveNotes(notes: Note[]) {
  const storage = loadStorage();

  storage.notes = notes;

  saveStorage(storage);
}

export function addNote(note: Note) {
  const storage = loadStorage();

  storage.notes.push(note);

  saveStorage(storage);
}

export function removeNote(id: string) {
  const storage = loadStorage();

  storage.notes = storage.notes.filter((note) => note.id !== id);

  saveStorage(storage);
}

export function updateNote(updatedNote: Note) {
  const storage = loadStorage();

  const index = storage.notes.findIndex((note) => note.id === updatedNote.id);

  if (index === -1) return;

  storage.notes[index] = updatedNote;

  saveStorage(storage);
}
