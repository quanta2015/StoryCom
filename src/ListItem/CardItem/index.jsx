import React from 'react';
import {  Tag } from 'antd-mobile';
import classnames from 'classnames';

import './index.scss';

import iconLoad from  '@/static/icon-load.svg'
import imgCard  from  '@/static/img-card.svg';
import iconClock from '@/static/icon-clock.svg';

const dealStateColor = ['#EF8839', '#33C669', '#999999', '#FF1515'];


/**
 * @description 使用场景：mobile-wish --> TinyWish(微心愿首页)
 * */

export default function CardItem({ item }) {
  return (
    <div className="mobile-card-item">
      <div className="card-top">
        <div className="top-img">
          <img src={item?.image || imgCard} />
          <div
            className={classnames('tag', { 'show-hidden': !item?.typeDesc })}
          >
            <Tag color="#ff9e5d">{item?.typeDesc}</Tag>
          </div>
        </div>
        <div className="card-content">
          <div className="title">
            <span>{item?.label}</span>
          </div>
        </div>
      </div>
      <div className="card-botom">
        {item?.stateDesc || item?.time || item?.amount ? (
          <div className="bottom-state">
            <div
              className="amount"
              style={{
                flex: '1',
                marginRight: '4px',
                color:
                  item?.state < 4
                    ? dealStateColor[item?.state]
                    : dealStateColor[2],
              }}
            >
              {item?.state === 0 || item?.state ? (
                <img src={iconClock} />
              ) : null}
              <span>{item?.stateDesc || item?.time}</span>
            </div>
            <span
              className={
                (item?.stateDesc || item?.time) && item?.amount
                  ? 'amount card-both'
                  : 'amount'
              }
            >
              {item?.amount}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
