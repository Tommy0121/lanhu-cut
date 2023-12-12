/*
 * @Date: 2023-12-11 10:59:58
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-12-11 20:40:15
 * @FilePath: /chrome-extension/src/hooks/useRequest.ts
 */
import { useEffect, useState } from 'react';

type UseRequestReturn<T extends (...args: any) => Promise<any>> = {
  run: (...param: Parameters<T>) => Promise<PromiseReturn<T>>;
  loading: boolean;
  data: PromiseReturn<T> | null;
};

type PromiseReturn<T> = T extends (...args: any) => Promise<infer R> ? R : T;

type UseRequestOptions<T extends (...args: any) => any> = {
  manual?: boolean;
  params?: Parameters<T>;
};
export default <T extends (...args: any) => Promise<any>>(
  fn: T,
  options?: UseRequestOptions<T>,
): UseRequestReturn<T> => {
  const [data, setData] = useState<null | PromiseReturn<T>>(null);
  const [loading, setLoading] = useState(false);
  const run = async (...param: Parameters<T>): Promise<PromiseReturn<T>> => {
    setLoading(true);
    const result = await fn(...param);
    setData(result);
    setLoading(false);
    return result;
  };
  useEffect(() => {
    if (!options?.manual) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      run(options?.params ? [...options.params] : undefined);
    }
  }, []);

  return { run, loading, data };
};
