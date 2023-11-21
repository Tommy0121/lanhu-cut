/*
 * @Date: 2023-11-20 20:15:01
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-11-21 10:17:44
 * @FilePath: /chrome-extension/src/hooks/useRepoInfoContext.ts
 */
import repoManagement from '@/utils/repoManagement';
import { createContext, useEffect, useState } from 'react';
export type RepoInfo = {
  token: string;
  domain: string;
};
type RepoContextParams = {
  repoInfo: RepoInfo;
  saveRepoInfo: (value: RepoInfo) => Promise<void>;
};

export const RepoContext = createContext<RepoContextParams>({
  repoInfo: { token: '', domain: '' },
  saveRepoInfo: async () => {
    await Promise.resolve();
  },
});

const useRepoInfo = (): {
  repoInfo: RepoInfo;
  RepoContext: React.Context<RepoContextParams>;
  saveRepoInfo: (value: RepoInfo) => Promise<void>;
} => {
  const [repoInfo, setRepoInfo] = useState({ token: '', domain: '' });
  useEffect(() => {
    repoManagement.getRepoInfo().then((res) => {
      setRepoInfo(res);
    });
  }, []);

  const saveRepoInfo = async (value: RepoInfo): Promise<void> => {
    console.log('save', repoInfo);
    await repoManagement.setRepoInfo(value);
    const res = await repoManagement.refresh();
    setRepoInfo(res);
  };

  return { repoInfo, saveRepoInfo, RepoContext };
};

export default useRepoInfo;
