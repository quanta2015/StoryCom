
## Map

```tsx
import React, { useState, useEffect } from 'react';
import { Map } from 'japanCom';

const data = {
  center: {
    lat: 35.671088,
    lng: 139.766306
  },
  zoom: 17,
  name: 'BREATH CLINIC GINZA',
  code: '〒104-0061',
  phone: '03-6278-8881',
  fax:  '03-6264-2888',
  addr: '東京都中央区銀座2-11-1 GINZA LAND BLDG.7F.8F'
}



export default () => (
  <div>
    <Map {...data}/>
  </div>

  );
```
