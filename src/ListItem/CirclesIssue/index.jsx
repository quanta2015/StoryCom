import React, { useEffect, useState, useRef } from 'react';
import { ImageUploader } from 'antd-mobile';
import { useInViewport } from 'ahooks';

import './index.scss';

/**
 * @description 用于图片查看（圈子的九宫图组件）
 * @param imgList 多图片列表
 * */
export default function CirclesIssue({ imgList }) {
  const [fileList, setFileList] = useState([]);
  const ref = useRef(null);
  const cache = useRef(null);
  const [inViewport] = useInViewport(ref);
  if (!cache.current && inViewport) {
    cache.current = fileList;
  }
  useEffect(() => {
    const imageList = [];
    imgList.map((item) => {
      imageList.push({ url: item });
    });
    setFileList(imageList);
  }, [imgList]);

  return (
    <div className="ssm-circles-issue" ref={ref}>
      <ImageUploader
        value={cache.current ? cache.current : inViewport ? fileList : []}
        upload={mockUpload}
        maxCount={10}
        showUpload={false}
      />
    </div>
  );
}
async function mockUpload(file) {
  return {
    url: URL.createObjectURL(file),
  };
}
