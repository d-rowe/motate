import {CLEFS, VF} from '../constants';
import createVexNotes from '../components/Measure/createVexNotes';
import Formatter from '../formatters/MeasureFormatter';

import type {
    Measure,
    VexBeam,
    VexStave,
    VexVoice
} from '../constants';

const DEFAULT_CLEF_TYPE = CLEFS.TREBLE;
const DEFAULT_TIME_SIGNATURE = 'C';
const NO_BARLINE = VF.Barline.type.NONE;
const DEFAULT_INITIAL_WIDTH = 200;

class MeasureModel {
    beams: VexBeam[];
    stave: VexStave;
    voice: VexVoice;
    width: number;
    measureIndex?: number;
    staveIndex?: number;
    formatter: Formatter;
    private config: Measure;
    private clef: string;
    private timeSignature: string;

    constructor(config: Measure) {
        this.config = config;
        const {
            clef,
            timeSignature,
            showClef,
            showTimeSignature,
            chords = [],
            width,
            measureIndex,
            staveIndex,
            formatter,
        } = config;

        this.measureIndex = measureIndex;
        this.staveIndex = staveIndex;
        this.clef = clef || DEFAULT_CLEF_TYPE;
        this.timeSignature = timeSignature || DEFAULT_TIME_SIGNATURE;
    
        const initWidth = width || DEFAULT_INITIAL_WIDTH;
        this.stave = new VF.Stave(0, 2.5, initWidth);
        this.voice = new VF.Voice({num_beats: 4, beat_value: 4});

        this.setBarlines();
        showClef && this.setClef();
        showTimeSignature && this.setTimeSignature();
    
        const vexNotes = createVexNotes(chords, this.clef);
        this.voice.addTickables(vexNotes);
        this.beams = VF.Beam.generateBeams(vexNotes);

        const staveWidth = this.stave.getWidth();
        this.formatter = formatter || new Formatter({width: width && staveWidth});
    
        if (chords.length) {
            this.formatter.setMeasure(this);
            this.formatter.format();
            this.width = this.formatter.getMeasureWidth(this) || DEFAULT_INITIAL_WIDTH;
        } else {
            this.width = staveWidth;
        }
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
        const {clef, stave} = this;
        try {
            stave.addClef(clef);
        } catch {
            console.warn('Unsupported clef type:', clef);
        }
    }

    private setTimeSignature() {
        const {timeSignature, stave} = this;
        try {
            stave.addTimeSignature(timeSignature);
        } catch {
            console.warn('Unsupported time signature:', timeSignature);
        }
    }
}

export default MeasureModel;
