import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd-mobile';
import net from '@/util/net';

import MobileDefaultPages from '../DefaultPage';
import './index.scss';


/**
 * @description 使用场景：mobile-microsite --> IconMatrix 宣传管理icon矩阵
 * @param dataRequest 当前组件接口
 * @param onCurrentSkip（item） 点击当前icon回调 item: 所有数据
 * @param categoryId 栏目id
 * */
export default function MobileIconMatrix({
  onCurrentSkip,
  categoryId,
  dataRequest,
}) {
  // 定义Icon数据源
  const [tableSource, setTableSource] = useState([]);
  const [onload, setOnload] = useState(false);

  // 请求
  useEffect(() => {
    net(`${dataRequest}?categoryId=${categoryId}`, { method: 'GET' }).then(
      (data) => {
        setTableSource(data?.dataSource || []);
        setOnload(true);
      },
    );
  }, [dataRequest, categoryId]);

  return (
    <>
      {tableSource.length > 0 ? (
        <div className="mobile-icon-matrix">
          {tableSource?.map((item) => {
            return (
              <div
                key={item?.key}
                onClick={() => {
                  onCurrentSkip(item);
                }}
                className="icon-item"
              >
                <div>
                  <Image src={item?.iconUrl} className="icon-img" fit="cover" />
                </div>
                <span className="icon-app-title">{item?.accountName}</span>
              </div>
            );
          })}
        </div>
      ) : onload ? (
        <div className="icon-matrix-default">
          <MobileDefaultPages />
        </div>
      ) : null}
    </>
  );
}




MobileIconMatrix.propTypes = {
  /** 栏目 id */
  categoryId: PropTypes.func,
  /** 数据请求链接 */
  dataRequest: PropTypes.string,
  /** 点击函数 */
  onCurrentSkip: PropTypes.func,
};

MobileIconMatrix.defaultProps = {
  dataRequest: '/data/iconMatrix.json',
  onCurrentSkip: (e)=> console.log(e),
};