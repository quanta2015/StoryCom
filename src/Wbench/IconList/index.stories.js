import React from 'react';
import PropTypes from 'prop-types';
import MobileIconList from './index'


const props = {
  title: '标题参数',
  onCurrentSkip: ()=>{ console.log('click') },
  // dataRequest: '/data/IconList.json',
  dataUrl: { workbench: 'http://localhost' },
};

export default {
  title: 'WBench',
  component: MobileIconList,
};

const Template = (args) => {
  return <MobileIconList {...args} />;
}

export const _MobileIconList = Template.bind({});
_MobileIconList.args = {
  ...props,
};