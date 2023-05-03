import React from 'react';
import classNames from 'classnames';

import imgAvatar from  '@/static/img-avatar.png';
import iconPraise from '@/static/icon-praise.svg';

import './index.scss';

/**
 * @description 使用场景：mobile-activity --> ME --> NewsList(点赞评论列表)
 * */

export default function NewsItem({ item, onCurrentSkip }: any) {
  return (
    <div className="mobile-news-item">
      {item && (
        <div
          className="news-item"
          onClick={() => {
            onCurrentSkip(item);
          }}
        >
          <div className="image">
            <img
              className="image"
              src={item?.fromUserAvatar || imgAvatar}
            />
          </div>
          <div className="news-user">
            <div className="title">
              <span>{item?.fromUserName}</span>
              <span className="time">{item?.gmtCreate}</span>
            </div>
            <div className="news-data">
              <span>{item?.attach}</span>
              <span className={classNames({ show: item?.type !== 2 })}>
                <span
                  className={classNames({ show: !item?.commentOther })}
                  style={{ color: '#000' }}
                >
                  回复了
                </span>
                {item?.content}
              </span>
              <div className={classNames({ show: item?.type !== 1 })}>
                <img
                  src={iconPraise}
                  style={{ width: '16px', height: '16px' }}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
