import React from 'react';
import Stave, {Props} from '../components/Stave';
import {Story, Meta} from '@storybook/react';


export default {
  title: 'Stave',
  component: Stave,
  argTypes: {},
} as Meta;

const Template: Story<Props> = (args) => <Stave {...args} />;

export const Default = Template.bind({});
Default.args = {
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
};

