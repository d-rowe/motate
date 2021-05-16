import Vex from 'vexflow';

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

export type Formatter = Vex.Flow.Formatter;
export type Stave = Vex.Flow.Stave;
export type Voice = Vex.Flow.Voice;

export type Note = {
    keys: string[],
    duration: string,
};
