import React from 'react';
import Stave, {Props} from '../components/Stave';
import { Story, Meta } from '@storybook/react';


export default {
  title: 'Stave',
  component: Stave,
  argTypes: {},
} as Meta;

const Template: Story<Props> = (args) => <Stave {...args} />;

export const Default = Template.bind({});
Default.args = {
  measures: 4,
  clef: 'treble'
};

