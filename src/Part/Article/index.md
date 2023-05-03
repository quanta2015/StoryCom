
## Article

```tsx
import React, { useState, useEffect } from 'react';
import { Article } from 'japanCom';


const [line, setLine] = useState(false)
const [img,  setImg] = useState(true)
const [btn,  setBtn] = useState(true)


const doColor=()=> {
  document.querySelector('html').classList.add('red')
}

const data = {
  title:"サイトカイン点滴",
  list:["加齢に伴い私たちの身体は、しみ・しわ・たるみの増加、視力・聴力の低下、筋力や抵抗力の減少など、さまざまな老化サインを見せ始めます。そんな身体の衰えに対し、体質改善や全身の若返りを行う究極のエイジングケアのことです。","最新医療技術を駆使した幹細胞培養培養治療をおこなうことで、肌の悩みや身体の悩みを細胞レベルで改善していきます。当クリニックでは「脂肪由来 幹細胞培養液」「歯髄 幹細胞培養液」の2種類を導入・ご提供しております。"],
  img: "https://mqcai.top/cdn/hpcom_article.jpg",
  line: line,
  btn: {
    name: "詳細はこちら",
    url: "#",
  },
  showImg: img,
  showBtn: btn,
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
      <span style={s} onClick={setImg.bind(this,!img)}>IMG</span>
      <span style={s} onClick={setBtn.bind(this,!btn)}>BUTTON</span>
    </div>
    <Article data={data} />
  </div>

  );
```
