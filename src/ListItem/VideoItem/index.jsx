import React from 'react';
import classNames from 'classnames';

import './index.scss';
import imgAvatar from  '@/static/img-avatar.png';

/**
 * @description 使用场景：mobile-microsite --> Homepage (宣传管理首页列表)
 * */
export default function VideoItem({ item }: any) {
  return (
    <div className="mobile-videotex-item">
      {item && (
        <>
          <div
            className={classNames('use-info', { show: !item?.resourceName })}
          >
            <div>
              <img
                className="chat-head"
                src={item?.iconUrl || imgAvatar}
                alt=""
              />
            </div>
            <span className="nickname">{item?.resourceName}</span>
          </div>
          <div className="videotex-item">
            <div className={classNames('image', { show: !item?.image })}>
              <img className="item-img" src={item?.image} alt="" />
              <div className="shade" />
            </div>
            <div className="content">
              <p className="content-title">{item?.label}</p>
              <div className="content-note">
                <span>{item?.time}</span>
                <span>{item?.amount}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
