import Vex from 'vexflow';
import {CLEFS} from '../../constants';
import createVexNotes from './createVexNotes';

import type {Chord, Formatter, Stave, Voice} from '../../constants';

const VF = Vex.Flow;
const DEFAULT_CLEF_TYPE = CLEFS.TREBLE;
const DEFAULT_TIME_SIGNATURE = 'C';
const NO_BARLINE = VF.Barline.type.NONE;
const WIDTH_FACTOR = 2.5;
const DEFAULT_INITIAL_WIDTH = 200;

type Config = {
    width?: number,
    clefType?: string,
    showClef?: boolean,
    timeSignature?: string,
    showTimeSignature?: boolean,
    hasBegBarline?: boolean,
    hasEndBarline?: boolean,
    chords?: Chord[],
};

class MeasureModel {
    stave: Stave;
    voice: Voice;
    width: number;
    private config: Config;
    private formatter: Formatter;
    private clefType: string;
    private timeSignature: string;

    constructor(config: Config) {
        this.config = config;
        const {
            clefType,
            timeSignature,
            showClef,
            showTimeSignature,
            chords = [],
            width,
        } = config;

        this.clefType = clefType || DEFAULT_CLEF_TYPE;
        this.timeSignature = timeSignature || DEFAULT_TIME_SIGNATURE;
    
        this.formatter = new VF.Formatter();
        const initWidth = width || DEFAULT_INITIAL_WIDTH;
        this.stave = new VF.Stave(0, 2.5, initWidth - 1);
        this.voice = new VF.Voice({num_beats: 4, beat_value: 4});

        this.setBarlines();
        showClef && this.setClef();
        showTimeSignature && this.setTimeSignature();
    
        const vexNotes = createVexNotes(chords, this.clefType);
        this.voice.addTickables(vexNotes);
        this.width = this.stave.getWidth();
    
        chords.length && this.format();
    }

    private format() {
        const voices = [this.voice];
        this.formatter.joinVoices(voices);
        const startX = this.stave.getNoteStartX();

        if (this.config.width) {
            this.formatter.format(voices, this.width - startX);
            return;
        }

        // No width provided - calculate appropriate width
        this.formatter.preCalculateMinTotalWidth(voices);
        const voiceWidth = this.formatter.getMinTotalWidth() * WIDTH_FACTOR;
        this.width = startX + voiceWidth;
        this.stave.setWidth(this.width);
        this.formatter.format(voices, voiceWidth);
    }

    private setBarlines() {
        const {hasBegBarline, hasEndBarline} = this.config;
        if (hasBegBarline === false) {
            this.stave.setBegBarType(NO_BARLINE);
        }
        if (hasEndBarline === false) {
            this.stave.setEndBarType(NO_BARLINE)
        }
    }

    private setClef() {
        const {clefType, stave} = this;
        try {
            stave.addClef(clefType);
        } catch {
            console.warn('Unsupported clef type:', clefType);
        }
    }

    private setTimeSignature() {
        const {timeSignature, stave} = this;
        try {
            stave.addTimeSignature(timeSignature);
        } catch {
            console.warn('Unsupported time signature:', timeSignature)
        }
    }
}

export default MeasureModel;
