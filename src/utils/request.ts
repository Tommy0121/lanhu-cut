/*
 * @Date: 2023-12-11 10:14:52
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-12-11 20:49:55
 * @FilePath: /chrome-extension/src/utils/request.ts
 */
import repoManagement from '@/utils/repoManagement';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface RequestOptions extends RequestInit {
  body?: any;
}

const getUrlParam = (obj: Record<string, any>): string => {
  if (!obj) {
    return '';
  }
  const noEmptyObj = Object.fromEntries(Object.entries(obj).filter(([_, v]) => !!v));
  return Object.keys(noEmptyObj)
    .map((key) => `${key}=${obj[key]}`)
    .join('&');
};
export default async (url: string, opt?: RequestOptions): Promise<any> => {
  return await new Promise((resolve, reject) => {
    repoManagement
      .getRepoInfo()
      .then((baseInfo) => {
        const { token, domain } = baseInfo;
        const options = { ...opt };
        if (options?.method === 'GET') {
          const query = getUrlParam(options.body);
          if (query) {
            url = `${url}?${query}`;
          }
          delete options.body;
        }
        if (!token) {
          reject(new Error('no gitlab token'));
        }
        fetch(`${domain}/api/v4${url}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          ...options,
        })
          .then(async (res) => await res.json())
          .then((res) => {
            resolve(res);
          })
          .catch((e) => {
            reject(e);
          });
      })
      .catch((e) => {
        reject(e);
      });
  });
};
