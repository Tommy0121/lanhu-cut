/*
 * @Date: 2023-11-20 20:15:01
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2024-01-03 14:53:14
 * @FilePath: /chrome-extension/src/hooks/useRepoInfoContext.ts
 */
import repoManagement from '@/utils/repoManagement';
import { createContext, useEffect, useState } from 'react';
export type RepoInfo = {
  token: string;
  domain: string;
  projectId: string;
  baseOSSUrl: string;
  baseDir?: string;
};
type RepoContextParams = {
  repoInfo: RepoInfo;
  saveRepoInfo: (value: RepoInfo) => Promise<void>;
};

export const RepoContext = createContext<RepoContextParams>({
  repoInfo: { token: '', domain: '', projectId: '', baseOSSUrl: '' },
  saveRepoInfo: async () => {
    await Promise.resolve();
  },
});

const useRepoInfo = (): {
  repoInfo: RepoInfo;
  RepoContext: React.Context<RepoContextParams>;
  saveRepoInfo: (value: RepoInfo) => Promise<void>;
} => {
  const [repoInfo, setRepoInfo] = useState<RepoInfo>({
    token: '',
    domain: '',
    projectId: '',
    baseOSSUrl: '',
  });
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
