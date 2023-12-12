/*
 * @Date: 2023-12-11 10:26:06
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-12-11 20:00:48
 * @FilePath: /chrome-extension/src/api/index.ts
 */
import Request from '@/utils/request';

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
    method: 'GET',
  });
};
