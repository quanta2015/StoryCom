import React, { useState } from 'react';
import get from 'lodash/get';
import classnames from 'classnames';
import MobileCirclesItem from '@/components/List-item/mobile-circles-item';
// import useRequest from '@/common/use-request';
import useRequest from '@/common/req';
import './index.less';
import iconRight  from '@/Img/arrow_right.svg';
/**
 * @description 使用场景：工作台圈子 （例：工作台活动）
 * @param onMoreSkip 点击查看更多的回调
 * @param dataRequest 当前组件接口
 * @param onCurrentSkip（item） 点击当前组件回调 item: 所有数据
 * @param onActivitySkip（item） 点击活动标签的回调 item: 所有数据
 * @param dataUrl conf.json中的域名
 * */
export default function MobileCircles({
  onMoreSkip,
  onCurrentSkip,
  onActivitySkip,
  dataRequest = '/data/mobile-circles.json',
  dataFormatter,
  dataUrl,
  title,
  moreUrl,
  type = 'friend-circle-nc',
}: any) {
  // 定义数据源
  const [tableSource, setTableSource] = useState([]);

  // const [title, setTitle] = useState('');
  // 定义查看更多的url数据
  // const [moreUrl, setMoreUrl] = useState('');

  const enumType = {
    'friend-circle-ncl': 2,
    'friend-circle-nc': 1,
    'friend-circle': 0,
  };

  // 请求
  useRequest(
    dataRequest,
    {
      showError: true,
    },
    dataFormatter,
    (data) => {
      const nextDataSource = get(data, 'dataSource', []);
      // setTitle(get(data, 'title', ''));
      // setMoreUrl(get(data, 'moreUrl', ''));
      setTableSource(nextDataSource || []);
    },
  );
  // console.log(tableSource, 'tableSource');
  return (
    <>
      {tableSource.length ? (
        <div className="mobile-circles">
          <div className={classnames('shell-head', { 'show-hidden': !title })}>
            <div className="item-title">
              <div className="title-sign" />
              <p>{title}</p>
            </div>
            {moreUrl && (
              <p
                onClick={() => {
                  onMoreSkip(moreUrl, title);
                }}
                className={classnames('more')}
              >
                查看更多
                <img src={iconRight} />
              </p>
            )}
          </div>
          <div>
            {tableSource?.map((item) => {
              return (
                <div key={item.key} className="circles-data">
                  <MobileCirclesItem
                    item={item}
                    mode={enumType[type]}
                    onCurrentSkip={onCurrentSkip}
                    onActivitySkip={onActivitySkip}
                    dataUrl={dataUrl}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
}
