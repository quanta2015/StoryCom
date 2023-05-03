import { Image, Tag } from 'antd';
import React from 'react';
import Title from '../../Title';
import './index.less'

const Img01 = ({ data }) => {


  return (
    <div className="sc-Img01">
      <Title title={data?.title} line={data?.line} />

      <div className="m-bd">
        {data?.list.map((item, i) =>
          <div className="m-item" key={i}>
            {item?.img &&
              <div className="m-img">
                <img src={item.img} alt="" />
              </div>
            }

            <div className='m-cnt'>
              <div className={`m-lab `}>
                <div className="m-ti">
                  {item?.title &&
                    <label>
                      {item?.title}
                    </label>
                  }
                </div>
                <div className="m-tl">
                  {item?.label &&
                    <label> {item?.label}</label>
                  }
                </div>
              </div>


              <div className='m-wd'>
                {item?.cnt &&
                  <p>
                    {item?.cnt}
                  </p>
                }
                {item?.list && item.list.map((o, j) =>

                  <span key={j} >
                    {data?.id && <label>{j + 1}. </label>} {o} <br />
                  </span>

                )}
              </div>
            </div>
          </div>
        )}
      </div>


    </div>
  )
}

export default Img01