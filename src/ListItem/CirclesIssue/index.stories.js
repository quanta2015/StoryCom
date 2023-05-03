import React from 'react';
import PropTypes from 'prop-types';
import CirclesIssue from './index'
// import data from './data'


const props = {
    imgList: [
      'https://static.suosihulian.com/file/richText/img/img2.png',
      'https://static.suosihulian.com/file/richText/img/img1.png',
    ],
  };

export default {
  title: 'ListItem',
  component: CirclesIssue,
};

const Template = (args) => {
  return <CirclesIssue {...args} />;
}

export const _CirclesIssue = Template.bind({});
_CirclesIssue.args = {
  ...props,
};