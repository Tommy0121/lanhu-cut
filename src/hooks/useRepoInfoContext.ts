/*
 * @Date: 2023-11-20 20:15:01
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-12-11 17:26:44
 * @FilePath: /chrome-extension/src/hooks/useRepoInfoContext.ts
 */
import repoManagement from '@/utils/repoManagement';
import { createContext, useEffect, useState } from 'react';
export type RepoInfo = {
  token: string;
  domain: string;
  projectId: string;
};
type RepoContextParams = {
  repoInfo: RepoInfo;
  saveRepoInfo: (value: RepoInfo) => Promise<void>;
};

export const RepoContext = createContext<RepoContextParams>({
  repoInfo: { token: '', domain: '', projectId: '' },
  saveRepoInfo: async () => {
    await Promise.resolve();
  },
});

const useRepoInfo = (): {
  repoInfo: RepoInfo;
  RepoContext: React.Context<RepoContextParams>;
  saveRepoInfo: (value: RepoInfo) => Promise<void>;
} => {
  const [repoInfo, setRepoInfo] = useState({ token: '', domain: '', projectId: '' });
  useEffect(() => {
    repoManagement.getRepoInfo().then((res) => {
      setRepoInfo(res);
    });
  }, []);

  const saveRepoInfo = async (value: RepoInfo): Promise<void> => {
    await repoManagement.setRepoInfo(value);
    const res = await repoManagement.refresh();
    setRepoInfo(res);
  };

  return { repoInfo, saveRepoInfo, RepoContext };
};

export default useRepoInfo;
