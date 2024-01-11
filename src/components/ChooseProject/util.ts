/*
 * @Date: 2024-01-02 15:00:35
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2024-01-04 09:42:59
 * @FilePath: /chrome-extension/src/components/ChooseProject/util.ts
 */
import { createBranch, getBranchByName } from '@/api';

export const createBranchIfNotExist = async (
  projectId: string,
  branchName: string,
): Promise<void> => {
  try {
    await getBranchByName(projectId, branchName);
  } catch (error) {
    const e = error as Response;
    if (e.status === 404) {
      await createBranch(projectId, branchName);
    }
  }
};
