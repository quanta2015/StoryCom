import React from 'react';
import PropTypes from 'prop-types';

const Title = _ref => {
  let {
    title,
    line
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    className: line ? "sc-title line" : "sc-title"
  }, title && /*#__PURE__*/React.createElement("span", null, title));
};

const List01 = _ref => {
  let {
    background,
    color,
    title,
    line,
    id1,
    id2,
    id3,
    list
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    className: "sc-list01",
    style: {
      background: `${background}`,
      color: `${color}`
    }
  }, /*#__PURE__*/React.createElement(Title, {
    title: title,
    line: line
  }), /*#__PURE__*/React.createElement("div", {
    className: "m-bd"
  }, list.map((item, i) => /*#__PURE__*/React.createElement("div", {
    className: "m-item",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-tl"
  }, item?.title && /*#__PURE__*/React.createElement("label", null, id1 && /*#__PURE__*/React.createElement("span", null, i + 1, " ."), " ", item?.title)), item.cnt.map((o, j) => /*#__PURE__*/React.createElement("span", {
    key: j
  }, id2 && /*#__PURE__*/React.createElement("label", null, j + 1, ". "), " ", o)), item.list.map((o, j) => /*#__PURE__*/React.createElement("li", {
    className: id3 ? '' : 'np',
    key: j
  }, /*#__PURE__*/React.createElement("span", null, o)))))));
};

List01.propTypes = {
  /** 背景色 */
  background: PropTypes.string,

  /** 文字色 */
  color: PropTypes.string,

  /** 标题 */
  title: PropTypes.string,

  /** 标题是否显示线段 */
  line: PropTypes.bool,

  /** 一级标题序号 */
  id1: PropTypes.bool,

  /** 二级标题序号 */
  id2: PropTypes.bool,

  /** 三级标题序号 */
  id3: PropTypes.bool,

  /** 数据内容 */
  list: PropTypes.array
};
List01.defaultProps = {
  background: '#fff',
  color: '#333',
  title: 'xxx',
  line: true,
  id1: true,
  id2: true,
  id3: true,
  list: []
};

export { List01 };
