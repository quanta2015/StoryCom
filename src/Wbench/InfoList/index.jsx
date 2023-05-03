import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd-mobile';
import get from 'lodash/get';
import classNames from 'classnames';
import useRequest from '@/util/req';


import '@/public/theme.scss';
import '@/public/common.scss';
import './index.scss';

import iconPhone from '@/static/icon-phone.svg';
import iconRight from '@/static/icon-right.svg';


/**
 * @description 使用场景：工作台最新活动区
 * @param dataRequest 当前组件接口
 * @param onCurrentSkip（item） 点击当前数据回调 item: 所有数据
 * @param onMoreSkip 点击查看更多回调
 * */

export default function MobileInfoList({
  onCurrentSkip,
  onMoreSkip,
  dataRequest,
  dataFormatter,
  title,
  moreUrl,
}) {
  const ua = window.navigator.userAgent.toLowerCase();
  const zlbApp = ua.indexOf('dtdreamweb') > -1; // 浙里办app
  const ios = ua.includes('iphone') || ua.includes('ipad');

  // 定义数据源
  const [tableSource, setTableSource] = useState([]);

  // 请求
  useRequest(
    dataRequest,
    {
      showError: true,
    },
    dataFormatter,
    (data) => {
      // 从 data 中得到 dataSource 数据
      const nextDataSource = get(data, 'dataSource', []);
      setTableSource(nextDataSource);
    },
  );

  const checkIsPhone = (item) => {
    // 有phone
    return Object.keys(item).findIndex((i) => i === 'phone') !== -1;
  };

  const callPhone = (e, item) => {
    e.stopPropagation();

    if (window.ZWJSBridge) {
      window.ZWJSBridge.phoneCall({
        corpId: item?.phone,
      })
        .then(() => {})
        .catch(() => {});
    }
  };

  const renderPhone = (item) => {
    if (zlbApp && !ios) {
      return (
        <div className="phone" onClick={(e) => callPhone(e, item)}>
          <a href="#">
            <img src={iconPhone} alt="" />
          </a>
        </div>
      );
    } else {
      return (
        <div className="phone">
          <a href={`tel:${item?.phone}`} onClick={(e) => e.stopPropagation()}>
            <img src={iconPhone} alt="" />
          </a>
        </div>
      );
    }
  };

  return (
    <>
      {tableSource?.length > 0 && (
        <div className="ssm-wb-list">
          <div className="g-wb_tl">
            <label> {title} </label>
            {moreUrl && (
              <i onClick={() => onMoreSkip(moreUrl, title)}>
                <span>查看更多</span>
                <img src={iconRight} />
              </i>
            )}
          </div>
          <div className="m-list">
            {tableSource?.map((item, i) => (
              <div
                key={i + 1}
                className="m-item"
                onClick={() => onCurrentSkip(item)}
              >
                {item?.image && (
                  <Image
                    className={classNames({
                      [`${checkIsPhone(item) ? 'img' : 'm-img'}`]: true,
                    })}
                    src={item?.image}
                    fit="cover"
                  />
                )}
                <div className="m-cnt">
                  <label>{item?.label}</label>
                  {(item?.time || item?.amount) && (
                    <div className="m-note">
                      <label>{item?.time}</label>
                      <span>{item?.amount}</span>
                    </div>
                  )}
                </div>
                {item?.phone && renderPhone(item)}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}




MobileInfoList.propTypes = {
  /** 标题 */
  title: PropTypes.string,
  /** 格式化函数 */
  dataFormatter: PropTypes.func,
  /** 数据请求链接 */
  dataRequest: PropTypes.string,
  /** 点击函数 */
  onMoreSkip: PropTypes.func,
  /** 点击函数 */
  onCurrentSkip: PropTypes.func,
  /** 链接地址 */
  moreUrl: PropTypes.string,
};

MobileInfoList.defaultProps = {
  title: '默认标题',
  dataRequest: '/data/infoList.json',
  moreUrl: 'https://baidu.com',
  onCurrentSkip:  (e)=>console.log(e, '当前'),
  onMoreSkip: (e)=>console.log(e, '更多'),
};
