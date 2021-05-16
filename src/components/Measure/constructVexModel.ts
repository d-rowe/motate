import Vex from 'vexflow';
import {CLEFS} from '../../constants';

import type {Note} from '../../constants';

const DEFAULT_CLEF_TYPE = CLEFS.TREBLE;
const DEFAULT_TIME_SIGNATURE = 'C';
const NO_BARLINE = Vex.Flow.Barline.type.NONE;

type VexModel = {
    stave: Vex.Flow.Stave,
    voice: Vex.Flow.Voice,
    minWidth: number,
};

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

function constructVexModel(config: Config): VexModel {
    const {
        clefType = DEFAULT_CLEF_TYPE,
        timeSignature = DEFAULT_TIME_SIGNATURE,
        showClef,
        showTimeSignature,
        notes = [],
        width,
        hasEndBarline = true,
        hasBegBarline = true,
    } = config;
    const stave = new Vex.Flow.Stave(0, 2.5, width - 1);
    const vexNotes = createVexNotes(notes);

    showClef && setClef();
    showTimeSignature && setTimeSignature();

    const voice = new Vex.Flow.Voice({num_beats: 4, beat_value: 4});
    setBarlines();
    voice.addTickables(vexNotes);
    let minWidth = stave.getWidth();;
    const formatter = new Vex.Flow.Formatter();

    const voices = [voice];
    if (notes.length) {
        format();
        const voiceWidth = formatter.getMinTotalWidth() * 2.5;
        minWidth = stave.getNoteStartX() + voiceWidth;
        stave.setWidth(minWidth);
        format();
        formatter.format([voice], voiceWidth);
    }

    return {
        stave,
        voice,
        minWidth,
    };

    function format() {
        formatter.joinVoices(voices);
        formatter.preCalculateMinTotalWidth(voices);
    }

    function setBarlines() {
        if (!hasBegBarline) {
            stave.setBegBarType(NO_BARLINE);
        }
        if (!hasEndBarline) {
            stave.setEndBarType(NO_BARLINE)
        }
    }

    function createVexNotes(notes: Note[]) {
        return notes.map(({keys, duration}) => new Vex.Flow.StaveNote({
                clef: clefType,
                keys,
                duration,
            })
        );
    }

    function setClef() {
        try {
            stave?.addClef(clefType);
        } catch {
            console.warn('Unsupported clef type:', clefType);
        }
    }

    function setTimeSignature() {
        try {
            stave?.addTimeSignature(timeSignature);
        } catch {
            console.warn('Unsupported time signature:', timeSignature)
        }
    }
}

export default constructVexModel;
