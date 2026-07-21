import type { Note } from "../storage";

export class NoteEditor {
  open(
    note: Note,

    save: (note: Note) => void,
  ) {
    const old = document.querySelector(".note-editor-overlay");

    old?.remove();

    const overlay = document.createElement("div");

    overlay.className = "note-editor-overlay";

    overlay.innerHTML = `


<div class="note-editor">


<button class="note-editor-close">
×
</button>



<input

class="note-editor-title"

value="${note.title}"

placeholder="Tytuł"

>



<textarea

class="note-editor-content"

placeholder="Treść notatki"

>${note.content}</textarea>



</div>


`;

    document.body.appendChild(overlay);

    const title = overlay.querySelector(
      ".note-editor-title",
    ) as HTMLInputElement;

    const content = overlay.querySelector(
      ".note-editor-content",
    ) as HTMLTextAreaElement;

    const close = overlay.querySelector(
      ".note-editor-close",
    ) as HTMLButtonElement;

    close.onclick = () => {
      const updated: Note = {
        ...note,

        title: title.value,

        content: content.value,

        updatedAt: new Date().toISOString(),
      };

      save(updated);

      overlay.remove();
    };
  }
}

export const noteEditor = new NoteEditor();
