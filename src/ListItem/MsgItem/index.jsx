import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Image } from 'antd-mobile';
import './index.scss';

import iconHome from '@/static/icon-home.svg';
import iconEdit from '@/static/icon-edit.svg';


const MsgItem = ({ item, onCurrentSkip }) => {
  return (
    <div
      className="mobile-app-message-item"
      onClick={() => {
        onCurrentSkip(item);
      }}
    >
      <div className="ssm-badge">
        <Badge content={item?.noticeTotal >= 99 ? '99+' : item?.noticeTotal}>
          {item?.icon ? (
            <Image src={iconHome} fit="cover" className="message-icon" />
          ) : null}
          {item?.appIcon ? (
            <img className="message-icon" data-src={item?.appIcon} alt="" />
          ) : !item?.icon ? (
            <div className="icon-shell">
              <Image className="dl-icon" src={iconEdit} fit="cover" />
            </div>
          ) : null}
        </Badge>
      </div>
      <div className="message">
        <div className="title-time">
          <span className="title">{item?.appName}</span>
          <span>{item?.gmtModify}</span>
        </div>
        <p>{item?.noticeTitle}</p>
      </div>
    </div>
  );
}


MsgItem.propTypes = {
  /** 数据对象 */
  item: PropTypes.object,
  /** 点击函数 */
  onCurrentSkip: PropTypes.func,
};

MsgItem.defaultProps = {
  item: {},
  onCurrentSkip: ()=>{}
};


export default MsgItem;