import React from 'react';
import PropTypes from 'prop-types';
import MobileIconCard from './index'


const props = {
  title: '标题参数',
  type: 'icon-card-s',
  color: 'rainbow',
  onCurrentSkip: ()=>{ console.log('click') },
  // dataRequest: '/data/IconCard.json',
  dataUrl: { workbench: 'http://localhost' },
};

export default {
  title: 'WBench',
  component: MobileIconCard,
};

const Template = (args) => {
  return <MobileIconCard {...args} />;
}

export const _MobileIconCard = Template.bind({});
_MobileIconCard.args = {
  ...props,
};