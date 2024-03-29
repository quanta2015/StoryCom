import React from 'react';
import PropTypes from 'prop-types';
import Title from '../../Title/index.jsx';
import './index.scss'

const List04 =({title,background,color,line,icon,list})=> {

 
  return (
    <div className="sc-list04" style={{background:`${background}`, color:`${color}`}}>
      <Title title={title} line={line} />

      <div className="m-bd">
        {list.map((item,i)=>
          <div className="m-item" key={i}>
            <label className={(icon)?'icon':''}>{item.title}</label>
            <p>
              {item.cnt.map((o,j)=>
                <span>{o}</span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}


List04.propTypes = {
  /** 背景色 */
  background: PropTypes.string,
  /** 文字色 */
  color: PropTypes.string,
  /** 标题 */
  title: PropTypes.string,
  /** 标题是否显示线段 */
  line: PropTypes.bool,
  /** 是否显示图标 */
  icon: PropTypes.bool,
  /** 是否显示虚线 */
  dash: PropTypes.bool,
  /** 数据内容 */
  list: PropTypes.array, 
};

List04.defaultProps = {
  background: '#fff',
  color:'#333',
  title: 'xxx',
  line:true,
  list: []
};

export default List04

