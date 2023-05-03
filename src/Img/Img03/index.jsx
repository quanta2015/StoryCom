import React from 'react';
import Title from '../../Title';
import './index.less';

const Img03 = ({ data }) => {
  return (
    <div className="sc-Img03">
      <div className="m-bd">
        {data?.list.map(
          (item, i) =>
            i <= 2 && (
              <div className="m-item" key={i}>
                <div className="m-img">
                  <img src={item.img} alt="" />
                </div>
                <div className={`m-rt ${!item.change ^ data.change ? 'm-ch' : ''}`}>
                  {item?.title && <Title title={item?.title} line={data?.line} />}
                  {item?.label && 
                    data?.label &&
                      <div className={`m-lab`}>{item.label}</div>
                  }
                  {item?.cnt && <div className="m-cnt">{item.cnt}</div>}
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default Img03;
