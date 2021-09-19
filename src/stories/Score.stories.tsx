import React from 'react';
import Score from '../components/Score';
import {Story, Meta} from '@storybook/react';


export default {
  title: 'Score',
  component: Score,
  argTypes: {},
} as Meta;

const Template: Story<any> = (args) => <Score {...args} />;

export const Default = Template.bind({});
Default.args = {
    staves: [
        {
            name: 'Violin',
            clef: 'treble',
            measures: [
                {
                  chords: [
                    {pitches: ['c4'], duration: 16},
                    {pitches: ['c4'], duration: 16},
                    {pitches: ['c4'], duration: 16},
                    {pitches: ['c4'], duration: 16},
                    {pitches: ['c4'], duration: 4},
                    {pitches: ['g4'], duration: 4},
                    {pitches: ['g4'], duration: 4},
                  ]
                },
                {
                  chords: [
                    {pitches: ['a4'], duration: 4},
                    {pitches: ['a4'], duration: 4},
                    {pitches: ['g4'], duration: 2},
                  ]
                },
                {
                  chords: [
                    {pitches: ['c4'], duration: 16},
                    {pitches: ['c4'], duration: 16},
                    {pitches: ['c4'], duration: 16},
                    {pitches: ['c4'], duration: 16},
                    {pitches: ['c4'], duration: 4},
                    {pitches: ['g4'], duration: 4},
                    {pitches: ['g4'], duration: 4},
                  ]
                },
                {
                  chords: [
                    {pitches: ['a4'], duration: 4},
                    {pitches: ['a4'], duration: 4},
                    {pitches: ['g4'], duration: 2},
                  ]
                },
                {
                  chords: [
                    {pitches: ['c4'], duration: 16},
                    {pitches: ['c4'], duration: 16},
                    {pitches: ['c4'], duration: 16},
                    {pitches: ['c4'], duration: 16},
                    {pitches: ['c4'], duration: 4},
                    {pitches: ['g4'], duration: 4},
                    {pitches: ['g4'], duration: 4},
                  ]
                },
                {
                  chords: [
                    {pitches: ['a4'], duration: 4},
                    {pitches: ['a4'], duration: 4},
                    {pitches: ['g4'], duration: 2},
                  ]
                },
                {
                  chords: [
                    {pitches: ['c4'], duration: 16},
                    {pitches: ['c4'], duration: 16},
                    {pitches: ['c4'], duration: 16},
                    {pitches: ['c4'], duration: 16},
                    {pitches: ['c4'], duration: 4},
                    {pitches: ['g4'], duration: 4},
                    {pitches: ['g4'], duration: 4},
                  ]
                },
                {
                  chords: [
                    {pitches: ['a4'], duration: 4},
                    {pitches: ['a4'], duration: 4},
                    {pitches: ['g4'], duration: 2},
                  ]
                },

            ],
        },
        {
          name: 'Trumpet',
          clef: 'treble',
          measures: [
              {
                chords: [
                  {pitches: ['c4'], duration: 16},
                  {pitches: ['c4'], duration: 16},
                  {pitches: ['c4'], duration: 16},
                  {pitches: ['c4'], duration: 16},
                  {pitches: ['c4'], duration: 4},
                  {pitches: ['e4'], duration: 4},
                  {pitches: ['e4'], duration: 4},
                ]
              },
              {
                chords: [
                  {pitches: ['d4'], duration: 4},
                  {pitches: ['d4'], duration: 4},
                  {pitches: ['c4'], duration: 2},
                ]
              },
              {
                chords: [
                  {pitches: ['c4'], duration: 16},
                  {pitches: ['c4'], duration: 16},
                  {pitches: ['c4'], duration: 16},
                  {pitches: ['c4'], duration: 16},
                  {pitches: ['c4'], duration: 4},
                  {pitches: ['e4'], duration: 4},
                  {pitches: ['e4'], duration: 4},
                ]
              },
              {
                chords: [
                  {pitches: ['d4'], duration: 4},
                  {pitches: ['d4'], duration: 4},
                  {pitches: ['c4'], duration: 2},
                ]
              },
              {
                chords: [
                  {pitches: ['c4'], duration: 16},
                  {pitches: ['c4'], duration: 16},
                  {pitches: ['c4'], duration: 16},
                  {pitches: ['c4'], duration: 16},
                  {pitches: ['c4'], duration: 4},
                  {pitches: ['e4'], duration: 4},
                  {pitches: ['e4'], duration: 4},
                ]
              },
              {
                chords: [
                  {pitches: ['d4'], duration: 4},
                  {pitches: ['d4'], duration: 4},
                  {pitches: ['c4'], duration: 2},
                ]
              },
              {
                chords: [
                  {pitches: ['c4'], duration: 16},
                  {pitches: ['c4'], duration: 16},
                  {pitches: ['c4'], duration: 16},
                  {pitches: ['c4'], duration: 16},
                  {pitches: ['c4'], duration: 4},
                  {pitches: ['e4'], duration: 4},
                  {pitches: ['e4'], duration: 4},
                ]
              },
              {
                chords: [
                  {pitches: ['d4'], duration: 4},
                  {pitches: ['d4'], duration: 4},
                  {pitches: ['c4'], duration: 2},
                ]
              },
          ],
      },
        {
            name: 'String Bass',
            clef: 'bass',
            measures: [
                {
                  chords: [
                    {pitches: ['c2'], duration: 4},
                    {pitches: ['c3'], duration: 4},
                    {pitches: ['e3'], duration: 4},
                    {pitches: ['c3'], duration: 4},
                  ]
                },
                {
                  chords: [
                    {pitches: ['g3'], duration: 8},
                    {pitches: ['d3'], duration: 8},
                    {pitches: ['c3'], duration: 4},
                    {pitches: ['c3'], duration: 4},
                    {pitches: ['c3'], duration: 4},
                  ]
                },
                {
                  chords: [
                    {pitches: ['c2'], duration: 4},
                    {pitches: ['c3'], duration: 4},
                    {pitches: ['e3'], duration: 4},
                    {pitches: ['c3'], duration: 4},
                  ]
                },
                {
                  chords: [
                    {pitches: ['g3'], duration: 8},
                    {pitches: ['d3'], duration: 8},
                    {pitches: ['c3'], duration: 4},
                    {pitches: ['c3'], duration: 4},
                    {pitches: ['c3'], duration: 4},
                  ]
                },
                {
                  chords: [
                    {pitches: ['c2'], duration: 4},
                    {pitches: ['c3'], duration: 4},
                    {pitches: ['e3'], duration: 4},
                    {pitches: ['c3'], duration: 4},
                  ]
                },
                {
                  chords: [
                    {pitches: ['g3'], duration: 8},
                    {pitches: ['d3'], duration: 8},
                    {pitches: ['c3'], duration: 4},
                    {pitches: ['c3'], duration: 4},
                    {pitches: ['c3'], duration: 4},
                  ]
                },
                {
                  chords: [
                    {pitches: ['c2'], duration: 4},
                    {pitches: ['c3'], duration: 4},
                    {pitches: ['e3'], duration: 4},
                    {pitches: ['c3'], duration: 4},
                  ]
                },
                {
                  chords: [
                    {pitches: ['g3'], duration: 8},
                    {pitches: ['d3'], duration: 8},
                    {pitches: ['c3'], duration: 4},
                    {pitches: ['c3'], duration: 4},
                    {pitches: ['c3'], duration: 4},
                  ]
                },
            ],
        },
    ],
};

