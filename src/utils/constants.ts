/*
 * @Date: 2023-11-15 14:21:39
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2024-01-02 16:51:52
 * @FilePath: /chrome-extension/src/utils/constants.ts
 */
export const env = process.env.NODE_ENV;

export const isProd = env === 'production';

export const STORAGE_PREFIX = 'CUT_';

export const OPEN_WINDOW_MESSAGE = `${STORAGE_PREFIX}open`;

export const INTERCEPT_FILE = `${STORAGE_PREFIX}intercept_file`;

export const baseFolderPath = 'image';

// TODO 请填入自己的oss地址
export const commonImageOSSPrefix = '';
