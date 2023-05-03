import React from 'react';
import PropTypes from 'prop-types';

import VideoItem from './index'


const props = {
  item: {
    image: 'https://static.suosihulian.com/file/richText/img/img3.webp',
    label: '标签一',
    time: '2022-03-19',
    amount: '128',
  },
};

export default {
  title: 'ListItem',
  component: VideoItem,
};

const Template = (args) => {
  return <VideoItem {...args} />;
}

export const _VideoItem = Template.bind({});
_VideoItem.args = {
  ...props,
};