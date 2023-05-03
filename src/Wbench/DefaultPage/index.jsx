import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd-mobile';

import './index.scss';

import iconDef1 from '@/static/icon-def01.svg';
import iconDef2 from '@/static/icon-def02.svg';
import iconDef3 from '@/static/icon-def03.svg';
import iconDef4 from '@/static/icon-def04.svg';
import iconDef5 from '@/static/icon-def05.svg';

const dpData = [
  { label: '网络异常，请再次重试', icon: iconDef1 },
  { label: '暂无数据', icon: iconDef2 },
  { label: '没有搜索到相关内容', icon: iconDef3 },
  { label: '内容已撤回', icon: iconDef4 },
  { label: '内容已删除', icon: iconDef5 },
];
/**
 * @description 缺省页
 * @param type 缺省页类型 (默认暂无数据) :Number
 * */
export default function MobileDefaultPages({ type = 0 }) {
  return (
    <div className="ssm-default-pages">
      <div>
        <Image src={dpData[type % 5]?.icon} fit="cover" />
      </div>
      <div>
        <span>{dpData[type % 5]?.label}</span>
      </div>
    </div>
  );
}



MobileDefaultPages.propTypes = {
  /** 标题 */
  type:PropTypes.oneOf([0,1,2,3,4])
};

MobileDefaultPages.defaultProps = {
  title: '默认标题',
  type: 0
};