import React from 'react';
import PropTypes from 'prop-types';
import EnshrineItem from './index'

const props = {
  item: {
    coverUrl: 'https://static.suosihulian.com/file/richText/img/img3.webp',
    time: '2021-2-27',
    gmtCreate: '2021-2-28',
    content: '内容 xxx xxx xxx xxx xxx xxx xxx',
    publisher: '张三',
  },
  onCurrentSkip: (e)=> { console.log(e) }
};

export default {
  title: 'ListItem',
  component: EnshrineItem,
};

const Template = (args) => {
  return <EnshrineItem {...args} />;
}

export const _EnshrineItem = Template.bind({});
_EnshrineItem.args = {
  ...props,
};