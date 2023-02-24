import { NoteDate, Tag } from "./App";
import { Noteform } from "./Noteform";

type NewNoteProps = {
  onSubmit: (data: NoteDate) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <Noteform
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
