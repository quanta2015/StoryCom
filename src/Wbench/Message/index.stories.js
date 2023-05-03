import React from 'react';
import PropTypes from 'prop-types';
import MobileMessage from './index'


const props = {
  title: '最新信息',
  moreUrl: 'https://baidu.com',
  // dataRequest: '/data/message.json',
};

export default {
  title: 'WBench',
  component: MobileMessage,
};

const Template = (args) => {
  return <MobileMessage {...args} />;
}

export const _MobileMessage = Template.bind({});
_MobileMessage.args = {
  ...props,
};