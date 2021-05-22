# Motate
Music notation rendering engine optimized for interactive applications. Motate renders measures independently, enabling efficient re-renders.

Motate is built off of [VexFlow](https://github.com/0xfe/vexflow).

## Example
Let's create a simple duet of the first measure of Twinkle Twinkle Little Star.

```javascript
import {System} from 'motate';

function App() {
    return (
        <System
            staves: [
                {
                    name: 'Violin',
                    clef: 'treble',
                    measures: [{
                        chords: [
                            {pitches: ['c4'], duration: 4},
                            {pitches: ['c4'], duration: 4},
                            {pitches: ['g4'], duration: 4},
                            {pitches: ['g4'], duration: 4},
                        ]
                    }],
                },
                {
                    name: 'String Bass',
                    clef: 'bass',
                    measures: [{
                        chords: [
                            {pitches: ['c2'], duration: 4},
                            {pitches: ['c3'], duration: 4},
                            {pitches: ['e3'], duration: 4},
                            {pitches: ['c3'], duration: 4},
                        ]
                    }],
                },
            ],
        />
    )
}

export default App;

```
![](https://i.imgur.com/6eEpvEy.png)

## Setup
1. Install dependencies
```bash
npm install
```
2. Run storybook
```
npm start
```
3. Navigate to `localhost:6006`
