import React from 'react';
import PropTypes from 'prop-types';
import CardItem from './index'
// import data from './data'


const props = {
  item: {
    title: '标题',
    label: '内容 xxx xxx xxx xxx xxx xxx xxx',
    image: 'https://static.suosihulian.com/file/richText/img/img3.webp',
    time: '2021-2-27',
    typeDesc: '标签一',
    stateDesc: '状态一',
    amount: '11:22',
    state: 1,
  },
};

export default {
  title: 'ListItem',
  component: CardItem,
};

const Template = (args) => {
  return <CardItem {...args} />;
}

export const _CardItem = Template.bind({});
_CardItem.args = {
  ...props,
};