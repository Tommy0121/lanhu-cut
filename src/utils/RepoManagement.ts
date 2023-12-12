/*
 * @Date: 2023-11-20 20:36:07
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-12-11 17:17:15
 * @FilePath: /chrome-extension/src/utils/repoManagement.ts
 */

import { type RepoInfo } from '@/hooks/useRepoInfoContext';
import { getStorageKey } from './index';

const TokenKey = getStorageKey('token');
const DomainKey = getStorageKey('domain');
const projectIdKey = getStorageKey('projectId');
class RepoManagement {
  private repoInfo: RepoInfo = {
    token: '',
    domain: '',
    projectId: '',
  };

  setRepoInfo = async (repoInfo: RepoInfo): Promise<void> => {
    this.repoInfo = repoInfo;
    await chrome.storage.local.set({
      [TokenKey]: repoInfo.token,
      [DomainKey]: repoInfo.domain,
      [projectIdKey]: repoInfo.projectId,
    });
  };

  getRepoInfo = async (): Promise<RepoInfo> => {
    if (this.repoInfo.domain && this.repoInfo.token) {
      return this.repoInfo;
    }
    const result = await chrome.storage.local.get([TokenKey, DomainKey, projectIdKey]);
    this.repoInfo = {
      token: result[TokenKey],
      domain: result[DomainKey],
      projectId: result[projectIdKey],
    };
    return this.repoInfo;
  };

  async refresh(): Promise<RepoInfo> {
    const result = await chrome.storage.local.get([TokenKey, DomainKey]);
    this.repoInfo = {
      token: result[TokenKey],
      domain: result[DomainKey],
      projectId: result[projectIdKey],
    };
    return this.repoInfo;
  }
}

export default new RepoManagement();
