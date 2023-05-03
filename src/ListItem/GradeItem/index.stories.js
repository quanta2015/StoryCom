import React from 'react';
import PropTypes from 'prop-types';
import GradeItem from './index'

const props = {
  item: {
    label: '标题',
    attach1: '附件1',
    attach2: '附件2',
    attach3: '附件3',
  },
};

export default {
  title: 'ListItem',
  component: GradeItem,
};

const Template = (args) => {
  return <GradeItem {...args} />;
}

export const _GradeItem = Template.bind({});
_GradeItem.args = {
  ...props,
};