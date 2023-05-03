import React, { useState } from 'react';
// import useRequest from '@/common/use-request';
import useRequest from '@/common/req';

import '@/css/theme.less';
import '@/css/common.less';
import './index.less';
import './lib.less';

/**
 * @description 使用场景：工作台icon （例：工作台icon区）
 * @param dataRequest 当前组件接口
 * @param onCurrentSkip（item） 点击当前icon回调 item: 当前icon数据
 * @param dataUrl conf.json中的域名
 * */
export default function MobileIconList({
  dataRequest,
  dataFormatter,
  title,
}) {
  const [data, setData] = useState([]);
  // const [title, setTitle] = useState('');

  useRequest(
    dataRequest,
    {
      showError: true,
    },
    dataFormatter,
    (r) => {
      // console.log(r);
      setData(r?.content || '');
      // setTitle(r?.title || '');
    },
  );

  // console.log(data);

  return (
    <>
      {data && (
        <div className="ssm-wb-richtext">
          <div className="g-wb_tl">
            <label> {title}</label>
          </div>
          <div className="m-list" dangerouslySetInnerHTML={{ __html: data }} />
        </div>
      )}
    </>
  );
}
