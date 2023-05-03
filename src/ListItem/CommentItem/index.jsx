import React, { useState, useImperativeHandle } from 'react';
import { Image, Radio, TextArea } from 'antd-mobile';


import imgAvatar   from '@/static/img-avatar.png';
import iconComment from '@/static/icon-comment.svg';

import '@/public/theme.scss';
import './index.scss';

export default function CommentItem({ cRef }) {
  const [value, setValue] = useState('');
  const [textValue, setTextValue] = useState('');

  useImperativeHandle(cRef, () => ({
    changeVal: () => {
      return { name: { pj: value, pf: textValue } };
    },
  }));

  return (
    <div className="mobile-comment-item">
      <div className="comment">
        <div className="comment-user">
          <div className="user-img">
            <Image src={imgAvatar} fit="cover" />
          </div>
          <span>所思互联</span>
        </div>
        <div className="comment-radio">
          <span>评价</span>
          <Radio.Group
            value={value}
            onChange={(val: string) => {
              setValue(val);
            }}
          >
            <Radio value="apple">不满意</Radio>
            <Radio value="orange">一般</Radio>
            <Radio value="banana">满意</Radio>
          </Radio.Group>
        </div>
        <div className="comment-describe">
          <span>详细评价</span>
          <TextArea
            placeholder="请输入"
            rows={4}
            onChange={(val) => {
              setTextValue(val);
            }}
          />
        </div>
      </div>

      <div className="comment">
        <div className="comment-user">
          <div className="user-img">
            <Image src={imgAvatar} fit="cover" />
          </div>
          <span>所思互联</span>
        </div>
        <div className="comment-grade">
          <div className="grade">
            <span>评价</span>
            <div className="grade-icon">
              <Image src={iconComment} fit="cover" />
            </div>
            <span className="font-color">满意</span>
          </div>
          <div className="font-color">
            <span>20:00</span>
          </div>
        </div>
        <div className="comment-describe">
          <span>详细评价</span>
          <div className="details">
            <span>评价内容</span>
          </div>
        </div>
      </div>
    </div>
  );
}
