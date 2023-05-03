import React from 'react';
import classnames from 'classnames';

import './index.scss';
import imgCard from '@/static/img-card.svg';

/**
 * @description 使用场景：工作台首页 --> 爱心传递列表
 * */

export default function BigNewsItem({ item }) {
  return (
    <div className="mobile-big-news-item">
      {item && (
        <div>
          <div
            className={classnames('shell-head', {
              'show-hidden': !item?.title,
            })}
          >
            <p className="item-title">{item?.title}</p>
            <p className="more">{item?.time}</p>
          </div>
          <div className="big-news">
            <img src={item?.image || imgCard} loading="lazy" />
            <div
              className={classnames('content-title', {
                'show-hidden': !item?.label,
              })}
            >
              <p>{item?.label}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
