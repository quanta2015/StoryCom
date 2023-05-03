import { Image, Tag, Button } from 'antd';
import React from 'react';
import Title from '../../Title';
import './index.less'

const Img02 = ({ data }) => {


  return (
    <div className="sc-Img02">
      <Title title={data?.title} line={data?.line} />

      <div className="m-bd">
        {data?.list.map((item, i) => 
            i<=2&&(<div className="m-item" key={i}>
              <div className="m-img">
                <img src={item.img} alt="" />
              </div>
              <div className='m-cnt'>

                {item?.title &&
                  <div className="m-cnt-g1">{item?.title}</div>
                }

                {item?.cnt &&
                  <p className="m-cnt-g2">{item?.cnt}</p>
                }

                <div className='m-btn'>
                  {item?.btn &&
                    data?.btn &&
                    <a href={item?.link&&item?.link}><button >{item.btn}</button></a>
                  }
                </div>
              </div>
            </div>)
        )}
      </div>


    </div>
  )
}

export default Img02