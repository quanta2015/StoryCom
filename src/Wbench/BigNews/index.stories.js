import React from 'react';
import PropTypes from 'prop-types';
import MobileBigNews from './index'


const props = {
  title: '标题参数',
  dataRequest: '/data/BigNews.json',
};

export default {
  title: 'WBench',
  component: MobileBigNews,
};

const Template = (args) => {
  return <MobileBigNews {...args} />;
}

export const _MobileBigNews = Template.bind({});
_MobileBigNews.args = {
  ...props,
};