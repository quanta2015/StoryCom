import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useRequest from '@/util/req';

import '@/public/theme.scss';
import '@/public/common.scss';
import './index.scss';

import iconRight from '@/static/icon-right.svg';

const fmt = (e) => {
  return parseInt(e, 10) >= 10000
    ? `${e.toString().substring(0, e.toString().length - 4)}w+`
    : e;
};

/**
 * @description 使用场景：工作台关键数据区
 * @param dataRequest 当前组件接口
 * @param onCurrentSkip（item） 点击当前数据回调 item: 所有数据
 * @param onMoreSkip 点击查看更多回调
 * */

export default function MobileMessage({
  onMoreSkip,
  onCurrentSkip,
  dataRequest,
  dataFormatter,
  title,
  moreUrl,
}) {
  // 定义数据源
  const [tableSource, setTableSource] = useState([]);

  // 请求
  useRequest(
    dataRequest,
    {
      showError: true,
    },
    dataFormatter,
    (r) => {
      const nextDataSource = r?.dataSource || [];
      setTableSource(nextDataSource?.slice(0, 4) || []);
    },
  );

  return (
    <>
      {tableSource.length > 0 && (
        <div className="ssm-wb-msg">
          <div className="g-wb_tl">
            <label> {title} </label>
            {moreUrl && (
              <i onClick={() => onMoreSkip(moreUrl, title)}>
                <span>查看更多</span>
                <img src={iconRight} />
              </i>
            )}
          </div>
          <div className="m-bd">
            {tableSource?.map((item, i) => (
              <div
                className="m-item"
                key={i}
                onClick={() => onCurrentSkip(item)}
              >
                <label>{item?.label}</label>
                <span className="amount">{fmt(item?.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}



MobileMessage.propTypes = {
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

MobileMessage.defaultProps = {
  title: '默认标题',
  dataRequest: '/data/message.json',
  moreUrl: 'https://baidu.com',
  onCurrentSkip:  (e)=>console.log(e, '当前'),
  onMoreSkip: (e)=>console.log(e, '更多'),
};

