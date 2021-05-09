import React from 'react';
import System, {Props} from '../components/System';
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
  clefs: [
      'treble',
      'alto',
      'tenor',
      'bass',
      'percussion'
    ],
    selectedMeasure: 0
};

