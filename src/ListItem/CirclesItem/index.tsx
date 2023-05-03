import React, { useState, useRef, useEffect } from 'react';
import {
  Image,
  Toast,
  Dialog,
  ActionSheet,
  TextArea,
  Ellipsis,
  Button,
} from 'antd-mobile';
import type { Action, ActionSheetRef } from 'antd-mobile/es/components/action-sheet';
import { DialogShowRef } from 'antd-mobile/es/components/dialog';
import classnames from 'classnames';
import get from 'lodash/get';
import useRequest from '@/common/use-request';
import net from '@/common/net';

import './index.scss';
import MobileCirclesIssue from '../mobile-circles-issue';


import activityIcon from '@/Img/activeIcon.svg';
import avatarPng from '@/Img/default-avatar.png';
import actLabelSvg from '@/Img/activity_name_icon1.svg';
import returnWhite from '@/Img/return-white.svg';
import returnBlue from '@/Img/return-blue.svg';
import remark from '@/Img/remark.svg';
import collectOff from '@/Img/collect_off.svg';
import collectOn from '@/Img/collect_on.svg';
import likeOff from '@/Img/like_off.svg';
import likeOn from '@/Img/like_on.svg';
import iconRight  from '@/Img/arrow_right.svg';

/**
 * @description 使用场景：mobile-activity --> WorkDynamic（工作动态） || DynamicDetails（圈子详情页）
 * @param item 单条圈子的数据
 * @param conceal 数据全展控制 （当false时 展示完整数据如 详情页时）
 * @param onCurrentSkip（item） 点击当前圈子的回调 item：当前圈子的数据
 * @param onActivitySkip（item） 点击活动标签区回调 item：当前圈子的数据
 * @param dataUrl 读取conf.json中的域名
 * */

interface formColumnItem {
  name: string;
  label: string;
  uiType: string;
}

const contentFilters = (key: string) => {
  const mainContentArr = ['picId', 'content'];
  return mainContentArr.includes(key);
};

const ua = window.navigator.userAgent.toLowerCase();
const wxMS = ua.match(/micromessenger/i);
const wxWork = ua.match(/wxwork/i);
export default function MobileCirclesItem({
  item,
  conceal = true,
  onCurrentSkip = () => {},
  onActivitySkip = () => {},
  delCircles = () => {},
  dataFormatter,
  dataUrl,
  mode = 0,
  formColumn = [],
}: any) {
  // const [tableSource, setTableSource] = useState({});
  const [collecting, setCollecting] = useState(false); // 是否收藏
  const [easyLike, setEasyLike] = useState(false); // 是否点赞
  const [visible, setVisible] = useState(false); // 评论、回复控制
  // const searchRef = useRef<SearchRef>(null); // 焦点
  const handler = useRef<ActionSheetRef>();
  const result = useRef<DialogShowRef>();
  const [value, setValue] = useState(''); // 评论回复的数据
  const [likeFriend, setLikeFriend] = useState([]); // 点赞列表
  const [commentNews, setCommentNews] = useState([]); // 评论列表
  // const [dataProcessing, setDataProcessing] = useState({}); // 评论的数据处理
  const dataProcessingRef = useRef({}); // 评论的数据处理
  const [commentCount, setCommentCount] = useState(0); // 评论的数据处理
  const [likeCount, setLikeCount] = useState(0); // 评论的数据处理
  // const [say, setSay] = useState(false); // 是否是回复
  const sayRef = useRef(false); // 是否是回复
  // const overRef = useRef(''); // 溢出
  const [placeholder, setPlaceholder] = useState(''); // 回复 || 评论
  const [extraValues, setExtraValues] = useState({}); // 扩展字段

  // 组装扩展字段
  useEffect(() => {
    const obj = {};
    formColumn.forEach((val: formColumnItem) => {
      const { name, label, uiType } = val;
      obj[name] = {
        label,
        value: item[name],
        uiType,
      };
    });
    setExtraValues(obj);
  }, []);

  const actions: Action[] = [
    {
      text: '删除',
      key: 'del',
      onClick: () => {
        Toast.show({
          maskClickable: false,
          icon: 'loading',
          content: '加载中…',
          duration: 0,
        });
        // console.log(dataProcessing,dataProcessing)
        const { id, orgId } = dataProcessingRef.current;
        net(`${dataUrl.interaction}/mobile/interaction/deleteComment`, {
          method: 'post',
          data: {
            appCode: item?.appCode,
            id,
            orgId,
          },
        }).then((data) => {
          Toast.clear();
          const commentList = commentNews.filter((items) => {
            return items?.id !== data?.formValue?.id;
          });
          setCommentNews(commentList);
          setCommentCount(commentCount - 1);
          Toast.show({ icon: 'success', content: '删除成功！' });
          handler.current?.close();
        });
      },
    },
    {
      text: '取消',
      key: 'cancel',
      onClick: () => {
        handler.current?.close();
      },
    },
  ];

  useRequest(
    `${dataUrl.interaction}/mobile/interaction/detail`,
    {
      method: 'GET',
      data: {
        appCode: item?.appCode,
        orgId: item?.orgId,
        bizId: item?.key,
      },
    },
    dataFormatter,
    (data) => {
      // // 从 data 中得到 dataSource 数据
      const nextDataSource = get(data, 'formValue', {});
      // setTableSource(nextDataSource);
      setCollecting(nextDataSource?.collect);
      setEasyLike(nextDataSource?.like);
      setLikeFriend(nextDataSource?.likeFriend || []);
      setCommentNews(nextDataSource?.commentNews || []);
      setCommentCount(nextDataSource?.commentCount);
      setLikeCount(nextDataSource?.likeCount);
    },
  );

  // 点赞
  function giveALike() {
    const like = easyLike ? 'cancelLike' : 'like';
    net(`${dataUrl.interaction}/mobile/interaction/${like}`, {
      method: 'post',
      data: {
        appCode: item?.appCode,
        orgId: item?.orgId,
        bizId: item?.key,
        toOrgId: item?.orgId,
        toOperatorId: item?.createOperator,
        toOperatorName: item?.author,
      },
    }).then((data) => {
      setEasyLike(!easyLike);
      if (like === 'cancelLike') {
        const likeList = likeFriend.filter((name) => {
          return name !== data?.formValue?.operatorName;
        });
        setLikeFriend(likeList);
        setLikeCount(likeCount - 1);
      } else {
        setLikeFriend([...likeFriend, data?.formValue?.operatorName]);
        setLikeCount(likeCount + 1);
      }
    });
  }
  // 收藏
  function collect() {
    // console.log(collecting, '收藏收藏收藏收藏');
    const collectdata = collecting ? 'cancelCollect' : 'collect';
    Toast.show({
      maskClickable: false,
      icon: 'loading',
      content: '加载中…',
      duration: 0,
    });
    net(`${dataUrl.interaction}/mobile/interaction/${collectdata}`, {
      method: 'post',
      data: {
        appCode: item?.appCode,
        orgId: item?.orgId,
        bizId: item?.key,
        toOrgId: item?.orgId,
        toOperatorId: item?.createOperator,
        toOperatorName: item?.author,
        collectBiz: {
          content: item?.label,
          coverUrl: item?.images[0],
          publisher: item?.author,
        },
      },
    }).then(() => {
      Toast.clear();
      setCollecting(!collecting);
      Toast.show({
        icon: 'success',
        content: !collecting ? '收藏成功' : '取消收藏',
      });
    });
  }
  // 评论
  function comment() {
    // console.log(sayRef.current, '评论');
    const toOrgId = sayRef.current
      ? dataProcessingRef.current?.orgId
      : item?.orgId;
    const toOperatorName = sayRef.current
      ? dataProcessingRef.current?.fromOperatorName
      : item?.author;
    const toOperatorId = sayRef.current
      ? dataProcessingRef.current?.fromOperatorId
      : item?.createOperator;
    Toast.show({
      maskClickable: false,
      icon: 'loading',
      content: '加载中…',
      duration: 0,
    });
    net(`${dataUrl.interaction}/mobile/interaction/comment`, {
      method: 'post',
      data: {
        appCode: item?.appCode,
        commentOther: sayRef.current,
        content: value,
        orgId: item?.orgId,
        bizId: item?.key,
        toOrgId,
        toOperatorId,
        toOperatorName,
      },
    }).then((data) => {
      Toast.clear();
      setCommentNews([data.formValue, ...commentNews]);
      setCommentCount(commentCount + 1);
      setValue('');
      setVisible(false);
      setPlaceholder('');
      Toast.show({
        icon: 'success',
        content: '评论成功',
      });
    });
  }

  function delItem(itemId) {
    Toast.show({
      maskClickable: false,
      icon: 'loading',
      content: '加载中…',
      duration: 0,
    });
    net(`${dataUrl.circles}/mobile/tags/motion/del`, {
      method: 'post',
      data: {
        idList: [itemId],
      },
    }).then((data) => {
      Toast.clear();
      delCircles(data);
      result.current?.close();
      Toast.show({ icon: 'success', content: '删除成功' });
    });
  }

  return (
    <div className="mobile-circles-item">
      {item && (
        <div>
          <div
            className="user-message"
            onClick={() => {
              onCurrentSkip(item);
            }}
          >
            <div className="left-head">
              <img
                className="head-portrait"
                data-src={item?.avatar || avatarPng}
                alt=""
              />
              <div>
                <p
                  onClick={() => {
                    onCurrentSkip(item);
                  }}
                >
                  {item?.author}
                </p>
                <p className="time">
                  {item.time}
                  <span
                    className={classnames('del', { show: !item.personal })}
                    onClick={async (e) => {
                      e.stopPropagation();
                      result.current = await Dialog.show({
                        title: '提示',
                        content: '确认要删除吗？',
                        bodyClassName: 'del-text',
                        actions: [
                          [
                            {
                              key: 'cancel',
                              text: '取消',
                              className: 'del-cancel',
                              onClick: () => result.current?.close(),
                            },
                            {
                              key: 'delete',
                              text: '确认',
                              className: 'del-affirm',
                              onClick: () => delItem(item?.key),
                            },
                          ],
                        ],
                      });
                    }}
                  >
                    删除
                  </span>
                  <div
                    className={classnames('del-dynamic', {
                      show: !item.personal,
                    })}
                    onClick={async (e) => {
                      e.stopPropagation();
                      result.current = await Dialog.show({
                        title: '提示',
                        content: '确认要删除吗？',
                        bodyClassName: 'del-text',
                        actions: [
                          [
                            {
                              key: 'cancel',
                              text: '取消',
                              className: 'del-cancel',
                              onClick: () => result.current?.close(),
                            },
                            {
                              key: 'delete',
                              text: '确认',
                              className: 'del-affirm',
                              onClick: () => delItem(item?.key),
                            },
                          ],
                        ],
                      });
                    }}
                  />
                </p>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <img
                className="icon-svg"
                src={collecting ? collectOn : collectOff}
                alt=""
              />
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  collect();
                }}
                className="del-dynamic"
              />
            </div>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              onCurrentSkip(item);
            }}
            className="content-title"
          >
            <Ellipsis
              direction="end"
              rows={conceal ? 6 : 100}
              content={item?.label}
              expandText="全部"
            />
            <div
              className="conceal"
              onClick={(e) => {
                e.stopPropagation();
                onCurrentSkip(item);
              }}
            />
          </div>
          {item?.images.length ? (
            <div style={{ marginTop: '12px' }}>
              <MobileCirclesIssue imgList={item?.images} />
            </div>
          ) : null}

          {/* // 扩展字段--start */}
          <div className="m-extraValues">
            {Object.keys(extraValues).map((key) => {
              return contentFilters(key) ? null : (
                <div className="extra-value">
                  <span>{extraValues[key].label}</span>
                  <span>
                    {extraValues[key].value ? extraValues[key].value : '-'}
                  </span>
                </div>
              );
            })}
          </div>
          {/* // 扩展字段--end */}

          {(mode === 1 || mode === 0) && (
            <div
              className="operate-title"
              onClick={() => {
                onCurrentSkip(item);
              }}
            >
              <div
                className={classnames('left-activity', {
                  'back-color': !item?.busiTitle,
                })}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onActivitySkip(item);
                  }}
                  className={classnames('activity-size', {
                    show: !item?.busiTitle,
                  })}
                >
                  <div className="activity-icon">
                    <Image src={actLabelSvg} fit="cover" />
                  </div>

                  <span className="activity">{item?.busiTitle}</span>

                  <div className="activity-icon2">
                    <Image src={activityIcon} fit="cover" />
                  </div>
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onActivitySkip(item);
                  }}
                  className="hotspot-activity"
                />
              </div>
              {mode === 0 && (
                <div className="right-operate">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      giveALike();
                    }}
                    className={classnames('praise', { 'link-color': easyLike })}
                  >
                    <img
                      className="icon-svg"
                      src={easyLike ? likeOn : likeOff}
                      alt=""
                    />
                    <span>{likeCount < 1 ? '' : likeCount}</span>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        giveALike();
                      }}
                      className="hotspot-like"
                    />
                  </div>
                  <div
                    className="comment"
                    onClick={(e) => {
                      e.stopPropagation();
                      sayRef.current = false;
                      // setSay(false);
                      setPlaceholder('评论');
                      setVisible(true);
                    }}
                  >
                    <img className="icon-svg" src={remark} alt="" />
                    <span>{commentCount < 1 ? '' : commentCount}</span>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        sayRef.current = false;
                        // setSay(false);
                        setPlaceholder('评论');
                        setVisible(true);
                      }}
                      className="hotspot-comment"
                    />
                  </div>
                </div>
              )}

              {mode === 1 && (
                <div className="right-operate">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      giveALike();
                    }}
                    style={{ marginRight: 0 }}
                    className={classnames('praise', { 'link-color': easyLike })}
                  >
                    <img
                      className="icon-svg"
                      src={easyLike ? likeOn : likeOff}
                      alt=""
                    />
                    <span>{likeCount < 1 ? '' : likeCount}</span>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        giveALike();
                      }}
                      className="hotspot-like"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <div
            className={classnames('comments-section', {
              show: (!likeFriend.length && !commentNews.length) || mode === 2,
            })}
          >
            <div
              className={classnames(
                'praise-people',
                { 'praise-people-bot': commentCount > 0 && mode === 0 },
                { show: likeFriend?.length === 0 },
                { 'praise-people-conceal': conceal },
              )}
            >
              <img className="icon-svg icon-img" src={likeOn} alt="" />
              {likeFriend?.join('、')}
            </div>
            <div className={classnames({ show: mode === 1 })}>
              {commentNews?.map((critic, index) => {
                if (index > 2 && conceal) {
                  return;
                }
                return (
                  <div
                    className="critic-data"
                    onClick={() => {
                      // console.log(critic);
                      dataProcessingRef.current = critic;
                      // setDataProcessing(critic);
                      if (critic?.own) {
                        handler.current = ActionSheet.show({
                          actions,
                          onClose: () => {
                            // Toast.show('动作面板关闭');
                          },
                        });
                      } else {
                        sayRef.current = true;
                        // setSay(critic);
                        setPlaceholder('回复');
                        setVisible(true);
                      }
                    }}
                  >
                    <Image
                      className="chat-head"
                      src={critic?.fromOperatorAvatar || avatarPng}
                      fit="cover"
                    />
                    <span className="user">
                      {critic?.fromOperatorName}
                      <span
                        className={classnames('replier', {
                          show: !critic?.toOperatorName,
                        })}
                      >
                        回复
                      </span>
                      {critic?.toOperatorName}：
                    </span>
                    <span>{critic?.content}</span>
                  </div>
                );
              })}
            </div>
            <div
              onClick={() => {
                onCurrentSkip(item);
              }}
              className={classnames(
                'more',
                { show: commentCount < 4 },
                { show: !conceal },
              )}
            >
              <span>全部{commentCount}条评论</span>
              <img className="icon-more" src={iconRight} />
            </div>
          </div>
        </div>
      )}

      {visible && (
        <div className="circles-comment">
          <div className="circles-text">
            <div
              className={
                wxWork
                  ? 'wxWork-motif title-wrap'
                  : wxMS
                  ? 'wx-motif title-wrap'
                  : 'title-wrap'
              }
            >
              <img src={wxWork ? returnWhite : returnBlue} alt="" />
              <span>{placeholder}</span>
              <div
                className="title-wrap-icon"
                onClick={() => {
                  setVisible(false);
                  setPlaceholder('');
                }}
              />
            </div>
            <div className="textarea">
              <TextArea
                maxLength={200}
                value={value}
                onChange={(val) => {
                  setValue(val);
                }}
                placeholder="请输入"
                autoSize={{ maxRows: 5 }}
                rows={5}
              />
            </div>
          </div>
          <div className="circles-btn">
            <Button
              block
              color="primary"
              size="middle"
              disabled={value.replace(/\s+/g, ' ') === ' ' || !value}
              onClick={comment}
            >
              提交
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
