
## Carousel

```tsx
import React, { useState, useEffect } from 'react';
import { Carousel } from 'japanCom';


const [line, setLine]  = useState(false)
const [text,  setText] = useState(false)


const doColor=()=> {
  document.querySelector('html').classList.add('red')
}

const data = {
  title:"サイトカイン点滴",
  list:[{
    img: "https://mqcai.top/cdn/carousel01.jpg",
    txt: "info 1"
    },{
    img: "https://mqcai.top/cdn/carousel02.jpg",
    txt: "info 2"
    },{
    img: "https://mqcai.top/cdn/carousel03.jpg",
    txt: "info 3"
    },{
    img: "https://mqcai.top/cdn/carousel04.jpg",
    txt: "info 4"
    }],
  line: line,
  text: text,
}

const s = {
  padding: '10px 15px',
  border: '1px solid #eee',
  width: '120px',
  textAlign: 'center',
  fontSize: '16px',
  cursor: 'pointer',
  transition: '.2 ease',
  flex: 1,
}

export default () => (
  <div>
    <div className="m-btn" style={{"display": "flex"}}>
      <span style={s} onClick={setLine.bind(this,!line)}>LINE</span>
      <span style={s} onClick={setText.bind(this,!text)}>TEXT</span>
    </div>

    <Carousel data={data} />
  </div>

  );
```
