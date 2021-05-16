import type {Note} from "../../constants";

export type StaveOptions = {
    name?: string,
    clef?: string,
    measureNotes?: Array<Note[]>
};
