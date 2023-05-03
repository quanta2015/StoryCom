import React from 'react';
import PropTypes from 'prop-types';

import StateItem from './index'


const props = {
  item: {
    title: '标题',
    remarks: [
      { label: '标题1', value: '数值1' },
      { label: '标题2', value: '数值2' },
    ],
    iconImg: 'https://static.suosihulian.com/file/richText/img/img3.webp',
    readStatus: '阅读状态',
    dataStatus: '数据状态',
    dataStatusDesc: '数据状态描述',
    status: 1,
    statusDesc: '状态描述',
    time: '2022-03-19',
    author: '作者',
    amount: '188',
    attach1: '附件1',
    attach2: '附件2',
    attach3: '附件3',
  },
};

export default {
  title: 'ListItem',
  component: StateItem,
};

const Template = (args) => {
  return <StateItem {...args} />;
}

export const _StateItem = Template.bind({});
_StateItem.args = {
  ...props,
};