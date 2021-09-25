import Vex from 'vexflow';

import type {ChordConfig} from '../constants';

const VF = Vex.Flow;
const SPN_REGEX = /^([a-gA-G])([b|#|x]*)?(-?[0-9]*)?$/;

type ParsedPitch = {
    letter: string,
    accidental: string | null,
    octave: string | null,
};

export default function createVexNotes(chordConfigs: ChordConfig[], clef: string) {
    return chordConfigs.map(({duration, pitches}) => createSingleVexNote(pitches, clef, duration));
}

function createSingleVexNote(pitches: string[], clef: string, duration: number) {
    const accidentalsByPitchIndex: Map<number, string> = new Map();

    const keys = pitches.map((pitch, i) => {
        const parsedPitch = parsePitch(pitch);
        const {accidental, letter, octave} = parsedPitch;
        if (accidental) {
            accidentalsByPitchIndex.set(i, accidental);
        }
        return `${letter}/${octave}`;
    });

    const staveNote = new VF.StaveNote({
        clef,
        keys,
        duration: duration.toString(),
    });

    accidentalsByPitchIndex.forEach((accidental, pitchIndex) => {
        staveNote.addAccidental(pitchIndex, new VF.Accidental(accidental));
    });

    return staveNote;
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
        octave,
    };
}
