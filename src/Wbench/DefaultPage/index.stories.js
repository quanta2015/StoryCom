import React from 'react';
import PropTypes from 'prop-types';
import MobileDefaultPages from './index'


const props = {
  type: 0,
};

export default {
  title: 'WBench',
  component: MobileDefaultPages,
};

const Template = (args) => {
  return <MobileDefaultPages {...args} />;
}

export const _MobileDefaultPages = Template.bind({});
_MobileDefaultPages.args = {
  ...props,
};