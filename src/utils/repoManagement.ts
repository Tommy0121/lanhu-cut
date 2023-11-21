/*
 * @Date: 2023-11-20 20:36:07
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-11-21 09:43:40
 * @FilePath: /chrome-extension/src/utils/repoManagement.ts
 */

import { getStorageKey } from './index';

const TokenKey = getStorageKey('token');
const DomainKey = getStorageKey('domain');
class RepoManagement {
  private repoInfo: {
    token: string;
    domain: string;
  } = {
    token: '',
    domain: '',
  };

  setRepoInfo = async (repoInfo: { token: string; domain: string }): Promise<void> => {
    this.repoInfo = repoInfo;
    await chrome.storage.local.set(repoInfo);
  };

  getRepoInfo = async (): Promise<{ token: string; domain: string }> => {
    if (this.repoInfo.domain && this.repoInfo.token) {
      return this.repoInfo;
    }
    const result = await chrome.storage.local.get([TokenKey, DomainKey]);
    this.repoInfo = {
      token: result[TokenKey],
      domain: result[DomainKey],
    };
    return this.repoInfo;
  };

  async refresh(): Promise<{ token: string; domain: string }> {
    const result = await chrome.storage.local.get([TokenKey, DomainKey]);
    this.repoInfo = {
      token: result[TokenKey],
      domain: result[DomainKey],
    };
    return this.repoInfo;
  }
}

export default new RepoManagement();
