import React, { useState, useEffect } from 'react';
import { Carousel } from 'antd';
import Title from '../../Title';
import './index.less'


const Caro =({data})=> {


  return (
    <div className="sc-carousel">
      <Title title={data?.title} line={data?.line} />

      <div className="m-bd">
        <Carousel autoplay style={{"width":"100%"}}>
          {data.list.map((item,i)=>
            <div>
              <img src={item.img} />
            </div>
          )}
        </Carousel>
        
        
      </div>
    </div>
  )
}

export default Caro
