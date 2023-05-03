import React, { useState } from 'react';
import { Image } from 'antd-mobile';
import PropTypes from 'prop-types';
import useRequest from '@/util/req';

import '@/public/theme.scss';
import '@/public/common.scss';
import './index.scss';

import imgBanner from '@/static/img-banner.svg';

/**
 * @description 使用场景：工作台大图文组件 （例：工作台地图）
 * @param dataRequest 单前组件接口
 * @param onCurrentSkip（item） 点击当前组件回调 item: 所有数据
 * */

export default function MobileBigNews({
  onCurrentSkip,
  dataRequest,
  dataFormatter,
  title,
  type = 'big-news-nb', // big-news-nb 1 big-news 0
}) {
  // 定义数据源
  const [tableSrc, setTableSrc] = useState([]);
  const enumType = {
    'big-news-nb': 1,
    'big-news': 0,
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

  return (
    <>
      {tableSrc.length > 0 && (
        <div
          className={!enumType[type] ? 'ssm-wb-news' : 'ssm-wb-news sp-margin'}
        >
          {title && (
            <div className="g-wb_tl">
              <label>{title}</label>
              <i>
                <span>{tableSrc[0].time}</span>
              </i>
            </div>
          )}
          <div className="m-bd">
            <Image
              className={!enumType[type] ? 'm-img' : 'm-img np'}
              src={tableSrc[0].image || imgBanner}
              fit="cover"
              onClick={() => onCurrentSkip(tableSrc[0], title || '爱心传递')}
            />
            {tableSrc[0].label && <p>{tableSrc[0].label}</p>}
          </div>
        </div>
      )}
    </>
  );
}


MobileBigNews.propTypes = {
  /** 标题 */
  title: PropTypes.string,
  /** 格式化函数 */
  dataFormatter: PropTypes.func,
  /** 数据请求链接 */
  dataRequest: PropTypes.string,
  /** 点击函数 */
  onCurrentSkip: PropTypes.func,
  /** 显示模式  
   - big-news-nb 没有空白 
   - big-news 有空白 <br>
   * */
  type:PropTypes.oneOf(['big-news-nb','big-news'])
};

MobileBigNews.defaultProps = {
  title: '默认标题',
  type: 'big-news-nb',
};