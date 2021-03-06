import Vex from 'vexflow';

import type BaseFormatter from './formatters/BaseFormatter';

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

export type VexBeam = Vex.Flow.Beam;
export type VexFormatter = Vex.Flow.Formatter;
export type VexStave = Vex.Flow.Stave;
export type VexVoice = Vex.Flow.Voice;

export type ChordConfig = {
    duration: number,
    pitches: string[],
};

export type MeasureConfig = {
    clef?: string,
    showClef?: boolean,
    timeSignature?: string,
    showTimeSignature?: boolean,
    hasBegBarline?: boolean,
    hasEndBarline?: boolean,
    chords?: ChordConfig[],
    measureIndex?: number,
    staveIndex?: number,
    formatter?: BaseFormatter,
};

export type StaveConfig = {
    name?: string,
    clef?: string,
    measures?: MeasureConfig[],
};
