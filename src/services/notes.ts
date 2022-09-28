import { getNoteData, updateNoteData, gateDatesFromDescription } from "../ helpers/helpers";
import { IBaseNote, INote } from "../models/note";


export const findAll = async (): Promise<INote[]> => {
  let notes: INote[] = JSON.parse(getNoteData());
  return Object.values(notes)
};

export const find = async (id: number): Promise<INote | null> => {
  let notes: INote[] = JSON.parse(getNoteData());
  let existingNote = notes.find(note => note.id === id);

  return existingNote ? existingNote : null;
}

export const create = async (newNote: IBaseNote): Promise<INote | null> => {
  let notes: INote[] = JSON.parse(getNoteData());
  let id = Math.floor(Math.random() * 100);
  let dates: string[] | null = gateDatesFromDescription(newNote.description);

  let note: INote = {
    id,
    isArchived: false,
    dates,
    createdDate: new Date().toString(),
    ...newNote
  };

  notes.push(note);
  updateNoteData(notes);

  return find(id);
};

export const update = async (id: number, itemUpdate: IBaseNote): Promise<INote | null> => {
  let notes: INote[] = JSON.parse(getNoteData());
  const index = notes.findIndex(note => note.id == id)

  if (index < 0) {
    return null;
  }

  let dates: string[] | null = gateDatesFromDescription(itemUpdate.description);

  notes[index] = {
    id,
    isArchived: notes[index].isArchived,
    createdDate: notes[index].createdDate,
    dates,
    title: itemUpdate.title,
    description: itemUpdate.description,
    category: itemUpdate.category,
  };
  updateNoteData(notes);

  return find(id);
};

export const archive = async (id: number): Promise<INote | null> => {
  let notes: INote[] = JSON.parse(getNoteData());
  const index = notes.findIndex(note => note.id == id);

  if (index < 0) {
    return null;
  }

  notes[index].isArchived = !notes[index].isArchived;
  updateNoteData(notes);

  return notes[index];
};

export const remove = async (id: number): Promise<INote[]> => {
  let notes: INote[] = JSON.parse(getNoteData());
  notes = notes.filter(note => note.id !== id)
  updateNoteData(notes);
  return notes;
};
