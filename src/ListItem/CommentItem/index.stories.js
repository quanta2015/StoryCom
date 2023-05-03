import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './index'

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
  component: CommentItem,
};

const Template = (args) => {
  return <CommentItem {...args} />;
}

export const _CommentItem = Template.bind({});
_CommentItem.args = {
  ...props,
};