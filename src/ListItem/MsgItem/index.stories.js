import React from 'react';
import PropTypes from 'prop-types';
import MsgItem from './index'
// import data from './data'


const props = {
  item: {
    noticeTitle: '标题',
    noticeTotal: 18,
    gmtModify: '2022-03-18',
    appName: '所思互联',
    appIcon: '',
    time: '2021-2-27',
  },
};

export default {
  title: 'ListItem',
  component: MsgItem,
};

const Template = (args) => {
  return <MsgItem {...args} />;
}

export const _MsgItem = Template.bind({});
_MsgItem.args = {
  ...props,
};