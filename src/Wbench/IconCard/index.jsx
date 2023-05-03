import React, { useState } from 'react';
import { Image } from 'antd-mobile';
import PropTypes from 'prop-types';
import useRequest from '@/util/req';
import net from '@/util/net';

import '@/public/theme.scss';
import '@/public/common.scss';
import './index.scss';

import qcard01 from '@/static/icon-qcard01.svg';
import qcard02 from '@/static/icon-qcard02.svg';
import qcard03 from '@/static/icon-qcard03.svg';
import qcard04 from '@/static/icon-qcard04.svg';
import qcard05 from '@/static/icon-qcard05.svg';
import qcard06 from '@/static/icon-qcard06.svg';
import iconRight  from '@/static/icon-right.svg';

const rainbowList = [
  'gradient-green',
  'gradient-red',
  'gradient-orange',
  'gradient-blue',
  'gradient-cyan',
  'gradient-purple',
];
const rainbowIcon = [qcard01, qcard02, qcard03, qcard04, qcard05, qcard06];

/**
 * @description 使用场景：工作台卡片区 （例：工作台卡片区）
 * @param dataRequest 当前组件接口
 * @param onCurrentSkip（item） 点击当前卡片回调 item: 当前卡片数据
 * @param dataUrl conf.json中的域名
 * */
export default function MobileIconCard({
  onCurrentSkip,
  dataRequest,
  dataFormatter,
  dataUrl,
  title,
  color = 'rainbow',
  moreUrl,
  type = 'icon-card', // icon-card-s 0  icon-card 1
}) {
  // 定义数据源
  const [tableSrc, setTableSrc] = useState([]);
  const enumType = {
    'icon-card': 0,
    'icon-card-s': 1,
  };
  // 请求
  useRequest(
    dataRequest,
    {
      showError: true,
    },
    dataFormatter,
    (r) => {
      setTableSrc(r?.dataSource || []);
    },
  );

  const modeCls = () => (enumType[type] ? 'sg' : '');
  const titleCls = () => (title ? 'ht' : 'nt');
  const colorCls = (i) => (color === 'rainbow' ? rainbowList[i % 6] : color);
  const defaultImg = (i, item) =>
    item?.image ? item?.image : rainbowIcon[i % 6];
  const getUrl = (item) => {
    net(`${dataUrl.workbench}/mobile/icon/getUrl?id=${item?.key}`).then((r) => {
      onCurrentSkip(item, r);
    });
  };

  return (
    <>
      {tableSrc.length > 0 && (
        <div className={`ssm-wb-qcard ${titleCls()}`}>
          {title && (
            <div className="g-wb_tl">
              <label>{title}</label>
              {moreUrl && (
                <i onClick={() => onCurrentSkip(moreUrl, title)}>
                  <span>查看更多</span>
                  <img src={iconRight} />
                </i>
              )}
            </div>
          )}
          <div className="m-list">
            {tableSrc?.map((item, i) => (
              <div
                className={`m-item ${colorCls(i)} ${modeCls()}`}
                key={i}
                onClick={() => getUrl(item)}
              >
                <div className="m-cnt">
                  <label>{item?.label}</label>
                  <span>{item?.subhead}</span>
                </div>
                <Image
                  className="m-img"
                  src={defaultImg(i, item)}
                  fit="cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}


MobileIconCard.propTypes = {
  /** 标题 */
  title: PropTypes.string,
  /** 格式化函数 */
  dataFormatter: PropTypes.func,
  /** 数据请求链接 */
  dataRequest: PropTypes.string,
  /** 点击函数 */
  onCurrentSkip: PropTypes.func,
  /** 链接域名 */
  dataUrl:PropTypes.object,
  /** 链接地址 */
  moreUrl: PropTypes.string,
  /** 色彩模式  */
  color: PropTypes.oneOf([
    'rainbow',
    'gradient-green',
    'gradient-red',
    'gradient-orange',
    'gradient-blue',
    'gradient-cyan',
    'gradient-purple',
  ]),
  /** 显示模式`单列|双列` */
  type:PropTypes.oneOf(['icon-card-s','icon-card'])
};

MobileIconCard.defaultProps = {
  title: '默认标题',
  dataRequest: '/data/IconCard.json',
  moreUrl: 'https://baidu.com',
  color: 'rainbow',
  type: 'icon-card-s',
};