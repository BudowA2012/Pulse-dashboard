import type { Note } from "../storage";

export class NoteCard {
  constructor(private note: Note) {}

  getId() {
    return this.note.id;
  }

  getNote() {
    return this.note;
  }

  render() {
    return `

<div class="note-card" id="${this.note.id}">


<button class="note-remove">
×
</button>


<h3 class="note-title-display">
${this.note.title || "Nowa notatka"}
</h3>


<p class="note-preview">
${this.note.content || "Kliknij aby edytować..."}
</p>


<div class="note-date">

${new Date(this.note.updatedAt).toLocaleDateString()}

</div>


</div>

`;
  }
}
