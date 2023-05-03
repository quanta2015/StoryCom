import React from 'react';
import Title from '../../Title';
import './index.less'


const List12 =({data})=> {
  return (
    <div className="sc-list12">
      <Title title={data?.des} line={data?.line} />
      <div className='m-item'>
        <div className='m-title'>{data?.title}</div>
        <div className='m-cnt-g1'>{data?.cnt_g1}</div>
        <div className='m-cnt-g2'>{data?.cnt_g2}</div>
        <div className={data.hr? "hr":""}></div>
        <div className='m-cnt-g3'>{data?.cnt_g3}</div>
      </div>
    </div>
  )
}

export default List12