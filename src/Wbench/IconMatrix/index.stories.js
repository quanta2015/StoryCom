import React from 'react';
import PropTypes from 'prop-types';
import MobileIconMatrix from './index'


const props = {
  // dataRequest: '/data/iconMatrix.json',
};

export default {
  title: 'WBench',
  component: MobileIconMatrix,
};

const Template = (args) => {
  return <MobileIconMatrix {...args} />;
}

export const _MobileIconMatrix = Template.bind({});
_MobileIconMatrix.args = {
  ...props,
};