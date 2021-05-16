import Vex from 'vexflow';
import {CLEFS} from '../../constants';

import type {Note, Formatter, Stave, Voice} from '../../constants';

const VF = Vex.Flow;
const DEFAULT_CLEF_TYPE = CLEFS.TREBLE;
const DEFAULT_TIME_SIGNATURE = 'C';
const NO_BARLINE = VF.Barline.type.NONE;

type Config = {
    width: number,
    clefType?: string,
    showClef?: boolean,
    timeSignature?: string,
    showTimeSignature?: boolean,
    hasBegBarline?: boolean,
    hasEndBarline?: boolean,
    notes?: Note[],
};

class MeasureModel {
    private config: Config;
    private formatter: Formatter;
    private stave: Stave;
    private voice: Voice;
    private clefType: string;
    private timeSignature: string;
    private minWidth: number;

    constructor(config: Config) {
        this.config = config;
        const {
            clefType,
            timeSignature,
            showClef,
            showTimeSignature,
            notes = [],
            width,
        } = config;

        this.clefType = clefType || DEFAULT_CLEF_TYPE;
        this.timeSignature = timeSignature || DEFAULT_TIME_SIGNATURE;
    
        this.formatter = new VF.Formatter();
        this.stave = new VF.Stave(0, 2.5, width - 1);
        this.voice = new VF.Voice({num_beats: 4, beat_value: 4});

        this.setBarlines();
        showClef && this.setClef();
        showTimeSignature && this.setTimeSignature();
    
        const vexNotes = this.createVexNotes(notes);
        this.voice.addTickables(vexNotes);
        this.minWidth = this.stave.getWidth();
    
        notes.length && this.format();
    }

    getStave(): Stave {
        return this.stave;
    }

    getVoice(): Voice {
        return this.voice;
    }

    getMinWidth(): number {
        return this.minWidth;
    }

    private createVexNotes(notes: Note[]) {
        return notes.map(({keys, duration}) => (
            new VF.StaveNote({
                clef: this.clefType,
                keys,
                duration,
            })
        ));
    }

    private format() {
        const voices = [this.voice];
        this.formatter.joinVoices(voices);
        this.formatter.preCalculateMinTotalWidth(voices);

        const voiceWidth = this.formatter.getMinTotalWidth() * 2.5;
        this.minWidth = this.stave.getNoteStartX() + voiceWidth;
        this.stave.setWidth(this.minWidth);
        this.formatter.preCalculateMinTotalWidth(voices);
        this.formatter.format([this.voice], voiceWidth);
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