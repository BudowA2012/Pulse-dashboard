import { Widget } from "./widget";

import { addNoteCard } from "../components/add-note-card";

import { NoteCard } from "../components/note-card";

import { noteEditor } from "../components/note-editor";

import { loadNotes, saveNotes } from "../services/note-storage";

import type { Note } from "../storage";

class NotesWidget extends Widget {
  private cards: NoteCard[] = [];

  constructor() {
    super("notes", "📝 Notatki");
  }

  render() {
    return `

<div class="notes-widget">


<h2>
${this.title}
</h2>


<div

class="note-grid"

id="note-grid"

>


${addNoteCard.render()}


</div>


</div>

`;
  }

  setup() {
    this.cards = loadNotes().map((note) => new NoteCard(note));

    this.renderCards();
  }

  private createNote() {
    const note: Note = {
      id: crypto.randomUUID(),

      title: "Nowa notatka",

      content: "",

      createdAt: new Date().toISOString(),

      updatedAt: new Date().toISOString(),
    };

    this.cards.push(new NoteCard(note));

    this.save();

    this.renderCards();
  }

  private renderCards() {
    const grid = document.getElementById("note-grid");

    if (!grid) return;

    grid.innerHTML = "";

    this.cards.forEach((card) => {
      grid.insertAdjacentHTML(
        "beforeend",

        card.render(),
      );
    });

    grid.insertAdjacentHTML(
      "beforeend",

      addNoteCard.render(),
    );

    this.bindAdd();

    this.bindCards();
  }

  private bindAdd() {
    document.querySelector(".add-note-card")?.addEventListener(
      "click",

      () => {
        this.createNote();
      },
    );
  }

  private bindCards() {
    this.cards.forEach((card) => {
      const element = document.getElementById(card.getId());

      if (!element) return;

      element.onclick = () => {
        noteEditor.open(
          card.getNote(),

          (updated) => {
            const index = this.cards.findIndex((c) => c.getId() === updated.id);

            if (index !== -1) {
              this.cards[index] = new NoteCard(updated);
            }

            this.save();

            this.renderCards();
          },
        );
      };

      const remove = element.querySelector(".note-remove") as HTMLButtonElement;

      remove.onclick = (e) => {
        e.stopPropagation();

        this.cards = this.cards.filter((c) => c.getId() !== card.getId());

        this.save();

        this.renderCards();
      };
    });
  }

  private save() {
    saveNotes(this.cards.map((card) => card.getNote()));
  }
}

export const notesWidget = new NotesWidget();
