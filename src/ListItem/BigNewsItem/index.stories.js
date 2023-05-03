import React from 'react';
import PropTypes from 'prop-types';

import BigNewsItem from './index'
// import data from './data'
const props = {
  item: {
    title: '标题',
    label: '内容 xxx xxx xxx xxx xxx xxx xxx',
    image: 'https://static.suosihulian.com/file/richText/img/img3.webp',
    time: '2021-2-27',
  },
};

export default {
  title: 'ListItem',
  component: BigNewsItem,
};

const Template = (args) => {
  return <BigNewsItem {...args} />;
}

export const _BigNewsItem = Template.bind({});
_BigNewsItem.args = {
  ...props,
};