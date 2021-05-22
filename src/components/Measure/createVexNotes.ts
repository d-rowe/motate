import Vex from 'vexflow';

import type {Chord} from '../../constants';

const VF = Vex.Flow;
const SPN_REGEX = /^([a-gA-G])([b|#|x]*)?(-?[0-9]*)?$/;

type ParsedPitch = {
    letter: string,
    accidental: string | null,
    octave: string | null,
};


export default function createVexNotes(chords: Chord[], clef: string) {
    return chords.map(chord => {
        const {duration, pitches} = chord;
        return createSingleVexNote(pitches, clef, duration);
    });
}

function createSingleVexNote(pitches: string[], clef: string, duration: number) {
    const accidentals: Map<number, string> = new Map();

    const keys = pitches.map((pitch, i) => {
        const parsedPitch = parsePitch(pitch);
        const {accidental} = parsedPitch;
        if (accidental) {
            accidentals.set(i, accidental);
        }
        return getVexKey(parsedPitch);
    });

    const staveNote = new VF.StaveNote({
        clef,
        keys,
        duration: duration.toString(),
    });

    // TODO: Add accidentals to staveNote

    return staveNote;
}


function getVexKey(parsedPitch: ParsedPitch): string {
    const {letter, octave} = parsedPitch;

    return `${letter}/${octave}`;
}

function parsePitch(pitch: string): ParsedPitch {
    const parsedPitch = SPN_REGEX.exec(pitch);

    if (!parsedPitch) {
        throw new Error('Pitch is not in scientific pitch notation');
    }

    const [
        ,
        letter,
        accidental = null,
        octave = null
    ] = parsedPitch;

    return {
        letter: letter.toLowerCase(),
        accidental,
        octave
    };
}
