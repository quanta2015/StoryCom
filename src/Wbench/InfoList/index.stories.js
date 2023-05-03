import React from 'react';
import PropTypes from 'prop-types';
import MobileInfoList from './index'


const props = {
  title: '最新信息',
  moreUrl: 'https://xxx',
  dataRequest: '/data/infoList.json',
  
};

export default {
  title: 'WBench',
  component: MobileInfoList,
};

const Template = (args) => {
  return <MobileInfoList {...args} />;
}

export const _MobileInfoList = Template.bind({});
_MobileInfoList.args = {
  ...props,
};