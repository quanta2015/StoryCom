import React, { useState } from 'react';
import { Swiper, Image } from 'antd-mobile';
import get from 'lodash/get';
// import useRequest from '@/common/use-request';
import useRequest from '@/common/req';

import '@/css/theme.less';
import '@/css/common.less';
import './index.less';
import banner from '@/Img/banner.svg';
import iconRight  from '@/Img/arrow_right.svg';
/**
 * @description 使用场景：工作台banner区
 * @param dataRequest 当前组件接口
 * @param onCurrentSkip（item） 点击当前数据回调 item: 所有数据
 * @param onMoreSkip 点击查看更多回调
 * */
export default function WbBanner({
  dataRequest,
  dataFormatter,
  onMoreSkip,
  onCurrentSkip,
  title,
  moreUrl,
}: any) {
  // 定义轮播图swiper数据源
  const [tableSource, setTableSource] = useState([]);
  const [label, setLabel] = useState('');
  // const [moreUrl, setMoreUrl] = useState('');
  // const [title, setTitle] = useState('');

  // 请求
  useRequest(dataRequest, { showError: true }, dataFormatter, (data) => {
    const ds = get(data, 'dataSource', []);
    setTableSource(ds);
    setLabel(ds[0]?.label || '');
    // setMoreUrl(data?.moreUrl || '');
    // setTitle(data?.title || '');
  });

  const chgTitle = (index) => {
    setLabel(tableSource[index]?.label);
  };

  return (
    <>
      {tableSource?.length > 0 && (
        <div className="ssm-wb-banner">
          <Swiper
            className="m-swiper"
            indicatorProps={{ color: 'white' }}
            autoplay
            loop
            onIndexChange={chgTitle}
          >
            {tableSource?.map((item, i) => {
              return (
                <Swiper.Item key={i} onClick={() => onCurrentSkip(item)}>
                  <Image
                    className="m-img"
                    fit="cover"
                    src={item?.image || banner}
                  />
                </Swiper.Item>
              );
            })}
          </Swiper>
          {label && (
            <div className="m-ft">
              <label>{label}</label>
              {moreUrl && (
                <i onClick={() => onMoreSkip(moreUrl, title)}>
                  <span>更多</span>
                  <img className="m-icon" src={iconRight} />
                </i>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
