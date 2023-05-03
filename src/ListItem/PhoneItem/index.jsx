import React from 'react';
import { isN } from '@/util/api';

import iconPhone from '@/static/icon-phone.svg';
// import iconHome  from '@/static/icon-home.svg'
import './index.scss';


/**
 * @description 使用场景：mobile-microsite --> Homepage (宣传管理首页列表)
 * */
export default function PhoneItem({ item }) {
  const ua = window.navigator.userAgent.toLowerCase();
  const zlbApp = ua.indexOf('dtdreamweb') > -1; // 浙里办app
  const ios = ua.includes('iphone') || ua.includes('ipad');

  const callPhone = (e, o) => {
    e.stopPropagation();

    if (window.ZWJSBridge) {
      window.ZWJSBridge.phoneCall({
        corpId: o?.phone,
      })
        .then(() => {})
        .catch(() => {});
    }
  };

  const renderPhone = (o) => {
    if (zlbApp && !ios) {
      return (
        <div className="m-rt">
          <a href="#" onClick={(e) => callPhone(e, o)}>
            <img src={iconPhone} alt="" />
          </a>
        </div>
      );
    } else {
      return (
        <div className="m-rt">
          <a href={`tel:${o?.phone}`} onClick={(e) => e.stopPropagation()}>
            <img src={iconPhone} alt="" />
          </a>
        </div>
      );
    }
  };

  return (
    <>
      {item && (
        <div key={item.key} className="ssm-phone-item">
          {!isN(item.image) && <img src={item.image} />}
          <div className={isN(item.image) ? 'm-info no' : 'm-info'}>
            <label>{item.label}</label>
            {item.attach1 && <span>{item.attach1}</span>}
          </div>
          {item?.phone && renderPhone(item)}
        </div>
      )}
    </>
  );
}
