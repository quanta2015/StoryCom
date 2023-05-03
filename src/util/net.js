import { Toast } from 'antd-mobile';
import packageData from '../../package.json';
import { parse } from 'qs';

export default function net(url, options = {}) {
  const { method = 'get', data } = options;

  let _appCode = parse(url.split('?')[1]);
  let appCode = _appCode || parse(window.location.search.slice(1)).appCode;
  let pageLog = `suo-mobile-all=${packageData.version}&appCode=${appCode}`;

  return new Promise((resolve, reject) => {
    
    fetch(url, {
      method,
      mode: 'cors',
      ...options,
      headers: {
        Authorization: window.token,
        'page-log': pageLog,
        'app-code': appCode,
      },
    }).then((r) => r.json())
      .then((r) => {
        console.log(r)
        if (r.code === 200 || r.code === 0) {
          resolve(r.data || r.result);
        } else {
          Toast.show({
            content: r.data,
          });
          reject(r.data);
        }
      })
      .catch((response) => {
        reject(response);
      });
  });
}
