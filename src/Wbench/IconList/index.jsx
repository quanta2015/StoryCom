import React, { useState } from 'react';
import { Image } from 'antd-mobile';
import get from 'lodash/get';
import net from '@/util/net';
import PropTypes from 'prop-types';
import useRequest from '@/util/req';

import '@/public/theme.scss';
import '@/public/common.scss';
import './index.scss';


/**
 * @description 使用场景：工作台icon （例：工作台icon区）
 * @param dataRequest 当前组件接口
 * @param onCurrentSkip（item） 点击当前icon回调 item: 当前icon数据
 * @param dataUrl conf.json中的域名
 * */
export default function MobileIconList({
  onCurrentSkip,
  dataRequest,
  dataFormatter,
  dataUrl,
  title,
}) {
  // 定义Icon数据源
  const [tableSource, setTableSource] = useState([]);
  // 请求
  useRequest(
    dataRequest,
    {
      showError: true,
    },
    dataFormatter,
    (data) => {
      const nextDataSource = get(data, 'dataSource', []);
      setTableSource(nextDataSource);
    },
  );

  const getUrl = (item) => {
    net(`${dataUrl.workbench}/mobile/icon/getUrl?id=${item?.key}`).then(
      (data) => {
        onCurrentSkip(item, data);
      },
    );
  };

  return (
    <>
      {tableSource?.length > 0 && (
        <div className="ssm-wb-qicon">
          <div className="g-wb_tl g-mb-16">
            <label> {title}</label>
          </div>
          <div className="m-list">
            {tableSource?.map((item, i) => (
              <div key={i} className="m-item" onClick={() => getUrl(item)}>
                <Image className="m-img" src={item?.image} fit="cover" />
                <label>{item?.label}</label>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}


MobileIconList.propTypes = {
  /** 标题 */
  title: PropTypes.string,
  /** 格式化函数 */
  dataFormatter: PropTypes.func,
  /** 数据请求链接 */
  dataRequest: PropTypes.string,
  /** 链接域名 */
  dataUrl:PropTypes.object,
  /** 点击函数 */
  onCurrentSkip: PropTypes.func,
};

MobileIconList.defaultProps = {
  title: '默认标题',
  dataRequest: '/data/IconList.json',
};