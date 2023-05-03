import React from 'react';
import classNames from 'classnames';

import './index.scss';
/**
 * @description 使用场景：mobile-activity --> ME --> EnshrineList(我的收藏列表)
 * */
export default function EnshrineItem({ item, onCurrentSkip }) {
  return (
    <div className="mobile-enshrine-item">
      {item && (
        <div
          onClick={() => {
            onCurrentSkip(item);
          }}
        >
          <div className="enshrine-time">收藏时间：{item?.gmtCreate}</div>
          <div className="item">
            <div className={classNames('image', { show: !item?.coverUrl })}>
              <img className="item-img" src={item?.coverUrl} alt="" />
              <div className="shade" />
            </div>
            <div className="content">
              <p className="content-title">{item?.content}</p>
              <div className="content-note">
                <span>{item?.time}</span>
                <span>{item?.publisher}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
