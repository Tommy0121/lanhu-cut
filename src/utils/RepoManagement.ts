/*
 * @Date: 2023-11-20 20:36:07
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2024-01-03 14:53:38
 * @FilePath: /chrome-extension/src/utils/repoManagement.ts
 */

import { type RepoInfo } from '@/hooks/useRepoInfoContext';
import { getStorageKey } from './index';

const TokenKey = getStorageKey('token');
const DomainKey = getStorageKey('domain');
const projectIdKey = getStorageKey('projectId');
const baseOSSUrlKey = getStorageKey('baseOSSUrl');
class RepoManagement {
  private repoInfo: RepoInfo = {
    token: '',
    domain: '',
    projectId: '',
    baseOSSUrl: '',
  };

  setRepoInfo = async (repoInfo: RepoInfo): Promise<void> => {
    this.repoInfo = repoInfo;

    await chrome.storage.local.set({
      [TokenKey]: repoInfo.token,
      [DomainKey]: repoInfo.domain,
      [projectIdKey]: repoInfo.projectId,
      [baseOSSUrlKey]: repoInfo.baseOSSUrl,
    });
  };

  getRepoInfo = async (): Promise<RepoInfo> => {
    if (
      this.repoInfo.token &&
      this.repoInfo.domain &&
      this.repoInfo.projectId &&
      this.repoInfo.baseOSSUrl
    ) {
      return this.repoInfo;
    }
    const result = await chrome.storage.local.get([
      TokenKey,
      DomainKey,
      projectIdKey,
      baseOSSUrlKey,
    ]);
    this.repoInfo = {
      token: result[TokenKey],
      domain: result[DomainKey],
      projectId: result[projectIdKey],
      baseOSSUrl: result[baseOSSUrlKey],
    };
    return this.repoInfo;
  };

  async refresh(): Promise<RepoInfo> {
    const result = await chrome.storage.local.get([
      TokenKey,
      DomainKey,
      projectIdKey,
      baseOSSUrlKey,
    ]);
    this.repoInfo = {
      token: result[TokenKey],
      domain: result[DomainKey],
      projectId: result[projectIdKey],
      baseOSSUrl: result[baseOSSUrlKey],
    };
    return this.repoInfo;
  }
}

export default new RepoManagement();
