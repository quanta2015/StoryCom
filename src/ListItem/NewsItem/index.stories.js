import React from 'react';
import PropTypes from 'prop-types';

import NewsItem from './index'

const props = {
  item: {
    gmtCreate: '2021-2-27',
    fromUserName: '用户A',
    type: 1,
    commentOther: '用户B',
    content: ' 内容有很多内容有很多内容有很多内容有很多内容有很多内容有很多',
  },
  onCurrentSkip: (item) => {
    console.log(item, '当前');
  },
};

export default {
  title: 'ListItem',
  component: NewsItem,
};

const Template = (args) => {
  return <NewsItem {...args} />;
}

export const _NewsItem = Template.bind({});
_NewsItem.args = {
  ...props,
};