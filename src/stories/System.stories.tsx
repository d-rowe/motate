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
            name: 'Violin',
            clef: 'treble',
            measures: [
                {
                  chordConfigs: [
                    {pitches: ['c4'], duration: 4},
                    {pitches: ['c4'], duration: 4},
                    {pitches: ['g4'], duration: 4},
                    {pitches: ['g4'], duration: 4},
                  ]
                },
                {
                  chordConfigs: [
                    {pitches: ['a4'], duration: 4},
                    {pitches: ['a4'], duration: 4},
                    {pitches: ['g4'], duration: 2},
                    // {pitches: ['g4'], duration: 4},
                  ]
                },
            ],
        },
        {
            name: 'String Bass',
            clef: 'bass',
            measures: [
                {
                  chordConfigs: [
                    {pitches: ['c2'], duration: 4},
                    {pitches: ['c3'], duration: 4},
                    {pitches: ['e3'], duration: 4},
                    {pitches: ['c3'], duration: 4},
                  ]
                },
                {
                  chordConfigs: [
                    {pitches: ['g3'], duration: 4},
                    {pitches: ['d3'], duration: 4},
                    {pitches: ['c3'], duration: 2},
                    // {pitches: ['c3'], duration: 4},
                  ]
                },
            ],
        },
    ],
};

