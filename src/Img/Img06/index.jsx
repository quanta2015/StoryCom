import { presetPalettes} from '@ant-design/colors';
import React from 'react';
import Title from '../../Title';
import './index.less'
 

const Img06 =({data})=> {
  const colors=presetPalettes[data.color];

  return (
    <div className="sc-img06" style={{'--bgColor':colors[1]}}>
      <Title title={data?.title} line={data?.line} />
      {data?.list.map((item,i)=>
        <div className="m-item" key={i} style={{'--itemBgColor':colors[2]}}>
          <div className="m-img"><img src={item?.img}/></div>
          <div>
            <label><span>{item?.label}</span></label>
            <div>{item?.title}</div>
            <div>{item?.cnt}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Img06