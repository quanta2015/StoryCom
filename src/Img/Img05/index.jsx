import React from 'react';
import Title from '../../Title';
import './index.less'


const Img05 =({data})=> {
  return (
    <div className="sc-img05">
      <Title title={data?.title} line={data?.line} />
     {data?.img1 &&
        <div className="m-img">
          <img src={data.img1} />
          <div></div>
        </div>}

      {data?.img2 &&
        <div className="m-img">
          <div></div>
          <img src={data.img2} />
        </div>}
        
      <div>
        {data?.label &&
          <label className={data.bg? "bg":""}> {data?.label}</label>
        }</div>
      <div className='m-cnt'>{data?.cnt}</div>
    </div>
  )
}

export default Img05