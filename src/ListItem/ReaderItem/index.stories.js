import React from 'react';
import PropTypes from 'prop-types';

import ReaderItem from './index'


const props = {
  item: {
    userName: '标题',
    readTime: '2021-2-27',
    deptNames: ['部门 A', '部门 B', '部门 C'],
  },
  onCurrentSkip: ()=>{}
};

export default {
  title: 'ListItem',
  component: ReaderItem,
};

const Template = (args) => {
  return <ReaderItem {...args} />;
}

export const _ReaderItem = Template.bind({});
_ReaderItem.args = {
  ...props,
};