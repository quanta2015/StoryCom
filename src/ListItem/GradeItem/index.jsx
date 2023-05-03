import React from 'react';
import './index.scss';
/**
 * @description 使用场景：暂无使用
 * */
export default function GradeItem({ item }) {
  return (
    <div className="mobile-grade-item">
      {item && (
        <div className="item-wrap">
          <div className="item-wrap-footer">
            <div className="task-title">
              <span className="item-title">{item?.label}</span>
            </div>
          </div>
          <div className="subheads">
            <p>{item?.attach1}</p>
            <p>{item?.attach2}</p>
            <p>{item?.attach3}</p>
          </div>
        </div>
      )}
    </div>
  );
}
