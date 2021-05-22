import React from 'react';
import Measure, {Props} from '../components/Measure';
import {Story} from '@storybook/react';


export default {
  title: 'Measure',
  component: Measure,
  argTypes: {},
};

const Template: Story<Props> = (args) => <Measure {...args} />;

export const Default = Template.bind({});
Default.args = {
  showClef: true,
  showTimeSignature: true,
  clefType: 'treble',
  chords: [
    {pitches: ['c4', 'e4', 'g4', 'b4'], duration: 8},
    {pitches: ['c4', 'e4', 'g4', 'b4'], duration: 8},
    {pitches: ['C4'], duration: 4},
    {pitches: ['C4'], duration: 4},
    {pitches: ['C4'], duration: 4},
  ],
};
