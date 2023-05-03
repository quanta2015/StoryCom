import React from 'react';
import { Badge, Tag } from 'antd-mobile';

import classNames from 'classnames';
import './index.scss';

/**
 * @description 使用场景：mobile-notice --> NewsBox (消息通知列表)
 * */

const dataStateColor = [
  ['#F4E8DF', '#EF8839'],
  ['#DFEFE5', '#33C669'],
  ['#EAEAEA', '#999999'],
  ['#F6DBDB', '#FF1515'],
];

const dealStateColor = [
  '#999999',
  '#33C669',
  '#999999',
  '#EF8839',
  '#33C669',
  '#EF8839',
];

export default function StateItem({ item }) {
  return (
    <div className="mobile-state-item">
      {item && (
        <div className="item-wrap">
          <div className="item-wrap-footer">
            <div className="task-title">
              {item?.iconImg ? (
                <div className="image">
                  <Badge
                    color="red"
                    content={item?.readStatus === '未阅' ? Badge.dot : null}
                  >
                    <img
                      className="title-img"
                      src={item?.iconImg}
                      alt=""
                    />
                  </Badge>
                </div>
              ) : null}
              {item?.dataStatusDesc ? (
                <div className="title-data">
                  <Tag
                    className="text-color"
                    style={{
                      backgroundColor:
                        item?.dataStatus < 4
                          ? dataStateColor[item?.dataStatus][0]
                          : dataStateColor[0][0],
                      color:
                        item?.dataStatus < 4
                          ? dataStateColor[item?.dataStatus][1]
                          : dataStateColor[0][1],
                    }}
                  >
                    {item?.dataStatusDesc}
                  </Tag>
                </div>
              ) : null}
              <span
                className={classNames(
                  { 'item-title-state': item?.statusDesc },
                  'item-title',
                )}
              >
                {item?.label}
              </span>
              {item?.statusDesc ? (
                <div className="state">
                  <ul
                    style={{
                      color:
                        item?.status < 6
                          ? dealStateColor[item?.status]
                          : dealStateColor[0],
                    }}
                    className="text-color"
                  >
                    <li>{item?.statusDesc}</li>
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
          {item?.remarks?.length ? (
            <div className="subheads">
              {item?.remarks.map((remark) => {
                return (
                  <p className="subjoin-data">
                    {remark?.label}
                    {` : ${remark?.value}`}
                  </p>
                );
              })}
            </div>
          ) : item?.attach1 ? (
            <div className="subheads">
              {item?.attach1 ? (
                <p className="subjoin-data">{item?.attach1}</p>
              ) : null}
              {item?.attach2 ? (
                <p className="subjoin-data">{item?.attach2}</p>
              ) : null}
              {item?.attach3 ? (
                <p className="subjoin-data">{item?.attach3}</p>
              ) : null}
            </div>
          ) : null}
          <div className="item-wrap-footer topsol-id">
            <span>{item?.time}</span>
            {item?.author || item?.amount ? (
              <span>{item?.author || item?.amount}</span>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
