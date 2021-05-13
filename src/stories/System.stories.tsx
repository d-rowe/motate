import React from 'react';
import System, {Props} from '../components/System';
import {CLEFS} from '../constants';
import { Story, Meta } from '@storybook/react';


export default {
  title: 'System',
  component: System,
  argTypes: {},
} as Meta;

const Template: Story<Props> = (args) => <System {...args} />;

export const Default = Template.bind({});
Default.args = {
    measures: 5,
    staves: [
        {
            name: 'Trumpet',
            clef: CLEFS.TREBLE,
        },
        {
            name: 'Flute',
            clef: CLEFS.TREBLE
        },
        {
            name: 'Trombone',
            clef: CLEFS.BASS
        },
        {
            name: 'Percussion',
            clef: CLEFS.PERCUSSION,
        }
    ],
    selectedMeasure: 0
};

