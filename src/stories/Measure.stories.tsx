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
  width: 100,
  showClef: true,
  clefType: 'treble',
  notes: [
    {keys: ["c/4"], duration: "q"},
    {keys: ["f/3"], duration: "q"},
    {keys: ["b/4"], duration: "qr"},
    {keys: ["c/4", "e/4", "g/4"], duration: "q"},
  ]
};
