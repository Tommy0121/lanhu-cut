/*
 * @Date: 2023-12-11 10:26:06
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2024-01-02 16:46:23
 * @FilePath: /chrome-extension/src/api/index.ts
 */
import Request from '@/utils/request';
import { type UserInfo } from './types';

export type ResponseProject = {
  id: string;
  name: string;
  path: string;
  mode: string;
  type: 'tree' | 'blob';
};
type ResponseTree = ResponseProject[];
export const getRepositoryTree = async (
  projectId: string,
  subDir?: string,
): Promise<ResponseTree> => {
  return await Request(`/projects/${projectId}/repository/tree`, {
    body: { path: subDir },
    bodyInQuery: true,
    method: 'GET',
  });
};

export const getUserInfo = async (): Promise<UserInfo> => {
  return await Request('/user', {
    method: 'GET',
  });
};

// TODO

export const getBranchByName = async (projectId: string, branchName: string) => {
  return await Request(`/projects/${projectId}/repository/branches/${branchName}`, {
    method: 'GET',
  });
};

export const createBranch = async (projectId: string, branchName: string) => {
  return await Request(`/projects/${projectId}/repository/branches`, {
    body: { branch: branchName, ref: 'master' },
    bodyInQuery: true,
    method: 'POST',
  });
};

export const createCommitToBranch = async (
  projectId: string,
  branchName: string,
  folder: string | string[],
  fileName: string,
  content: string,
) => {
  let actions = [];
  if (Array.isArray(folder)) {
    for (let i = 0; i < folder.length; i++) {
      actions.push({
        action: 'create',
        file_path: `${folder[i]}/${fileName}`,
        content,
        encoding: 'base64',
      });
    }
  } else {
    actions = [
      { action: 'create', file_path: `${folder}/${fileName}`, content, encoding: 'base64' },
    ];
  }
  return await Request(`/projects/${projectId}/repository/commits`, {
    body: JSON.stringify({
      branch: branchName,
      commit_message: 'add image',
      actions,
      id: projectId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
};

export const syncMasterToCurrentBranch = async (projectId: string) => {
  return await Request(`/projects/${projectId}/repository/branches/sync`, {
    method: 'POST',
  });
};

export const createMergeRequest = async (
  projectId: string,
  sourceBranch: string,
  targetBranch: string = 'master',
) => {
  return await Request(`/projects/${projectId}/merge_requests`, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source_branch: sourceBranch,
      target_branch: targetBranch,
      title: 'new image',
    }),
    method: 'POST',
  });
};
