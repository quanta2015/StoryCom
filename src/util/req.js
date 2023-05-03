import { useState, useEffect, useRef } from 'react';
import { parse } from 'qs';
import packageData from '../../package.json';

export default function useRequest(request, options, dataFormatter, effect) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const requestId = useRef(0);

  useEffect(() => {
    if (!request) return;

    let thisRid = ++requestId.current;
    let { url, method, params } =
      typeof request === 'string'
        ? { url: request, method: 'GET', params: {} }
        : request;
    let _appCode =
      typeof request === 'string' ? parse(url.split('?')[1]) : params.appCode;
    let appCode = _appCode || parse(window.location.search.slice(1)).appCode;
    let pageLog = `suo-mobile-all=${packageData.version}&appCode=${appCode}`;

    setLoading(true);

    fetch(url, {
      method,
      mode: 'cors',
      ...options,
      headers: {
        Authorization: window.token,
        'page-log': pageLog,
        'app-code': appCode,
      },
    })
      .then((r) => r.json())
      .then((r) => {
        // 有新的请求，丢弃本次回调操作
        if (thisRid !== requestId.current) {
          return;
        }
        setData(r.data);
      })
      .catch((error) => {
        console.log('error',error)
        // 有新的请求，丢弃本次回调操作
        if (thisRid !== requestId.current) {
          return;
        }
        setError(error || {});
      })
      .finally(() => {
        // 有新的请求，丢弃本次回调操作
        if (thisRid !== requestId.current) {
          return;
        }
        setLoading(false);
      });
  }, [JSON.stringify(request), JSON.stringify(options)]);

  useEffect(() => {
    effect && effect(dataFormatter ? dataFormatter(data) : data);
  }, [data]);

  return [dataFormatter ? dataFormatter(data) : data, loading, error];
}
