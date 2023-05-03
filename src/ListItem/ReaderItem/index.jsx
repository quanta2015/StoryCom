import React from 'react';
import { Ellipsis, Popover } from 'antd-mobile';
import './index.scss';

/**
 * @description 使用场景：mobile-notice --> ReaderList (阅读组件)
 * */
export default function ReaderItem({ item, onCurrentSkip }) {
  return (
    <div
      className="mobile-reader-item"
      onClick={() => {
        onCurrentSkip(item);
      }}
    >
      <div className="title">
        <span className="title-name">{item?.userName}</span>
        <span>{item?.readTime}</span>
      </div>
      {item?.deptNames?.map((val) => {
        return (
          <div className="dept-names">
            <Popover content={val} placement="topLeft" trigger="click">
              <div className="department">
                <Ellipsis direction="middle" content={val} expandText="查看" />
                <div className="popover" />
              </div>
            </Popover>
          </div>
        );
      })}
    </div>
  );
}
