import React from 'react';
import System, {Props} from '../components/System';
import {CLEFS} from '../constants';
import {Story, Meta} from '@storybook/react';


export default {
  title: 'System',
  component: System,
  argTypes: {},
} as Meta;

const Template: Story<Props> = (args) => <System {...args} />;

export const Default = Template.bind({});
Default.args = {
    measures: 4,
    staves: [
        {
            name: 'Trumpet',
            clef: CLEFS.TREBLE,
            measureNotes: [
                [
                    {keys: ["c/4"], duration: "q"},
                    {keys: ["f/3"], duration: "q"},
                    {keys: ["b/4"], duration: "qr"},
                    {keys: ["c/4", "e/4", "g/4"], duration: "q"},
                ],
                [
                    {keys: ["c/4"], duration: "q"},
                    {keys: ["f/3"], duration: "q"},
                    {keys: ["b/4"], duration: "qr"},
                    {keys: ["c/4", "e/4", "g/4"], duration: "q"},
                ],
                [
                    {keys: ["c/4"], duration: "q"},
                    {keys: ["f/3"], duration: "q"},
                    {keys: ["b/4"], duration: "qr"},
                    {keys: ["c/4", "e/4", "g/4"], duration: "q"},
                ],
                [
                    {keys: ["c/4"], duration: "q"},
                    {keys: ["f/3"], duration: "q"},
                    {keys: ["b/4"], duration: "qr"},
                    {keys: ["c/4", "e/4", "g/4"], duration: "q"},
                ],               
            ]
        },
        {
            name: 'Flute',
            clef: CLEFS.TREBLE,
            measureNotes: [
                [
                    {keys: ["c/4"], duration: "q"},
                    {keys: ["f/3"], duration: "q"},
                    {keys: ["b/4"], duration: "qr"},
                    {keys: ["c/4", "e/4", "g/4"], duration: "q"},
                ],
                [
                    {keys: ["c/4"], duration: "q"},
                    {keys: ["f/3"], duration: "q"},
                    {keys: ["b/4"], duration: "qr"},
                    {keys: ["c/4", "e/4", "g/4"], duration: "q"},
                ],
                [
                    {keys: ["c/4"], duration: "q"},
                    {keys: ["f/3"], duration: "q"},
                    {keys: ["b/4"], duration: "qr"},
                    {keys: ["c/4", "e/4", "g/4"], duration: "q"},
                ],
                [
                    {keys: ["c/4"], duration: "q"},
                    {keys: ["f/3"], duration: "q"},
                    {keys: ["b/4"], duration: "qr"},
                    {keys: ["c/4", "e/4", "g/4"], duration: "q"},
                ],           
            ]
        },
        {
            name: 'Trombone',
            clef: CLEFS.BASS,
            measureNotes: [
                [
                    {keys: ["c/3"], duration: "q"},
                    {keys: ["f/2"], duration: "q"},
                    {keys: ["d/3"], duration: "qr"},
                    {keys: ["c/3", "e/3", "g/3"], duration: "q"},
                ],
                [
                    {keys: ["c/3"], duration: "q"},
                    {keys: ["f/2"], duration: "q"},
                    {keys: ["d/3"], duration: "qr"},
                    {keys: ["c/3", "e/3", "g/3"], duration: "q"},
                ],
                [
                    {keys: ["c/3"], duration: "q"},
                    {keys: ["f/2"], duration: "q"},
                    {keys: ["d/3"], duration: "qr"},
                    {keys: ["c/3", "e/3", "g/3"], duration: "q"},
                ],
                [
                    {keys: ["c/3"], duration: "q"},
                    {keys: ["f/2"], duration: "q"},
                    {keys: ["d/3"], duration: "qr"},
                    {keys: ["c/3", "e/3", "g/3"], duration: "q"},
                ],            
            ]
        },
    ],
    selectedMeasure: 0
};

