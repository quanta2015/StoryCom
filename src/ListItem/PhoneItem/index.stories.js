import React from 'react';
import PropTypes from 'prop-types';

import PhoneItem from './index'


const props = {
    item: {
      key: 1,
      label: '我是文本单行标题示例',
      attach1: '辅助文本字段',
      image: 'https://static.suosihulian.com/file/richText/img/img1.png',
      phone: '17399883345',
    },
    onCurrentSkip: (item) => {
      console.log(item);
    },
  };

export default {
  title: 'ListItem',
  component: PhoneItem,
};

const Template = (args) => {
  return <PhoneItem {...args} />;
}

export const _PhoneItem = Template.bind({});
_PhoneItem.args = {
  ...props,
};