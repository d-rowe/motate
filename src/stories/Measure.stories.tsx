import React from 'react';
import Measure, {Props} from '../components/Measure';
import { Story, Meta } from '@storybook/react';


export default {
  title: 'Measure',
  component: Measure,
  argTypes: {},
} as Meta;

const Template: Story<Props> = (args) => <Measure {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: 100,
  height: 200,
  showClef: true,
  clefType: 'treble',
};

export const Selected = Template.bind({});
Selected.args = {
  width: 100,
  height: 200,
  showClef: true,
  isSelected: true,
  clefType: 'treble',
};
