import React from 'react';
import System, {Props} from '../components/System';
import {Story, Meta} from '@storybook/react';


export default {
  title: 'System',
  component: System,
  argTypes: {},
} as Meta;

const Template: Story<Props> = (args) => <System {...args} />;

export const Default = Template.bind({});
Default.args = {
    staves: [
        {
            name: 'Trumpet',
            clef: 'treble',
            measures: [
                {
                  chords: [
                    {pitches: ['c4', 'e4', 'g4'], duration: 4},
                    {pitches: ['c4', 'f4', 'a4'], duration: 4},
                    {pitches: ['b3', 'd4', 'f4', 'g4'], duration: 4},
                    {pitches: ['c4', 'e4', 'g4'], duration: 4},
                  ]
                },
                {
                  chords: [
                    {pitches: ['c4'], duration: 4},
                    {pitches: ['c4'], duration: 4},
                    {pitches: ['c4'], duration: 4},
                    {pitches: ['c4', 'e4', 'g4', 'b4'], duration: 4},
                  ]
                }
            ],
        },
        {
            name: 'Flute',
            clef: 'treble',
            measures: [
                {
                  chords: [
                    {pitches: ['c4', 'e4', 'g4'], duration: 4},
                    {pitches: ['c4', 'f4', 'a4'], duration: 4},
                    {pitches: ['b3', 'd4', 'f4', 'g4'], duration: 4},
                    {pitches: ['c4', 'e4', 'g4'], duration: 4},
                  ]
                },
                {
                  chords: [
                    {pitches: ['c4'], duration: 4},
                    {pitches: ['c4'], duration: 4},
                    {pitches: ['c4'], duration: 4},
                    {pitches: ['c4', 'e4', 'g4', 'b4'], duration: 4},
                  ]
                }
            ],
        },
        {
            name: 'Trombone',
            clef: 'bass',
            measures: [
                {
                  chords: [
                    {pitches: ['c3', 'e3', 'g3'], duration: 4},
                    {pitches: ['c3', 'f3', 'a3'], duration: 4},
                    {pitches: ['b2', 'd3', 'f3', 'g3'], duration: 4},
                    {pitches: ['c3', 'e3', 'g3'], duration: 4},
                  ]
                },
                {
                  chords: [
                    {pitches: ['c3'], duration: 4},
                    {pitches: ['c3'], duration: 4},
                    {pitches: ['c3'], duration: 4},
                    {pitches: ['c3', 'e3', 'g3', 'b3'], duration: 4},
                  ]
                }
            ],
        },
    ],
};

