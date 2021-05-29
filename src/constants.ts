import Vex from 'vexflow';

export const VF = Vex.Flow;

const TREBLE = 'treble';
const ALTO = 'alto';
const TENOR = 'tenor';
const BASS = 'bass';
const PERCUSSION = 'percussion';

export const CLEFS = {
    TREBLE,
    ALTO,
    TENOR,
    BASS,
    PERCUSSION,
};

export type VexFormatter = Vex.Flow.Formatter;
export type VexStave = Vex.Flow.Stave;
export type VexVoice = Vex.Flow.Voice;

export type Chord = {
    duration: number,
    pitches: string[],
};

export type Measure = {
    clef?: string,
    showClef?: boolean,
    timeSignature?: string,
    showTimeSignature?: boolean,
    width?: number,
    hasBegBarline?: boolean,
    hasEndBarline?: boolean,
    chords?: Chord[],
};

export type Stave = {
    name?: string,
    clef?: string,
    measures?: Measure[],
};
