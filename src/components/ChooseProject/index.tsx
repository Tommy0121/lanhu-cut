/*
 * @Date: 2023-12-04 14:02:46
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2024-01-02 16:58:19
 * @FilePath: /chrome-extension/src/components/ChooseProject/index.tsx
 */
import React, {
  type ReactElement,
  useMemo,
  useState,
  useContext,
  type ReactNode,
  useEffect,
} from 'react';
import {
  type ResponseProject,
  getRepositoryTree,
  getUserInfo,
  createCommitToBranch,
  createMergeRequest,
} from '@/api';
import useRequest from '@/hooks/useRequest';
import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './index.scss';
import { KeyboardArrowDown } from '@mui/icons-material';
import { RepoContext } from '@/hooks/useRepoInfoContext';
import { createBranchIfNotExist } from './util';
import { blobUrlToBase64 } from '@/utils/blob';
import { baseFolderPath, commonImageOSSPrefix } from '@/utils/constants';

const fileUrl = new URLSearchParams(window.location.search)?.get('file');
const array = fileUrl?.split('/');
let fileName = '';

if (array) {
  fileName = array[array.length - 1];
}

const ChooseProject = (): ReactNode => {
  const { repoInfo } = useContext(RepoContext);
  const [saved, setSaved] = useState(false);

  const { data, run: getTree } = useRequest(getRepositoryTree, {
    manual: true,
  });
  const [selectFolder, setSelectFolder] = useState<string[]>([]);
  const showedTree = useMemo(() => data?.filter?.((item) => item.type === 'tree') ?? [], [data]);
  const initPreview = useMemo(
    () =>
      showedTree?.reduce((pre, cur) => {
        return {
          ...pre,
          [cur.id]: false,
        };
      }, {}),
    [showedTree],
  );
  const [showedPreview, setShowedPreview] = useState<any>(initPreview ?? {});
  const [folderImageList, setFolderImageList] = useState<Record<string, string[]>>({});

  const isChecked = (item: ResponseProject): boolean => {
    return selectFolder.includes(item.path);
  };
  const isShowed = (item: ResponseProject): boolean => {
    return showedPreview[item.path];
  };
  const handeSelect = (item: ResponseProject): void => {
    if (isChecked(item)) {
      setSelectFolder(selectFolder.filter((id) => id !== item.path));
    } else {
      setSelectFolder([...selectFolder, item.path]);
    }
  };
  const handlePreviewImage = async (item: ResponseProject): Promise<void> => {
    if (showedPreview[item.path]) {
      setShowedPreview({ ...showedPreview, [item.path]: !showedPreview[item.path] });
      return;
    }
    const allFolderImage = (await getTree(repoInfo.projectId, item.path))
      .filter((item) => item.type === 'blob' && /\.(png|jpg)$/i.test(item.name))
      .map((item) => item.name);
    setFolderImageList({ ...folderImageList, [item.path]: allFolderImage });
    setShowedPreview({ ...showedPreview, [item.path]: true });
  };
  const previewImageArea = (item: ResponseProject): ReactNode => {
    if (showedPreview[item.path]) {
      return (
        <>
          {folderImageList[item.path].map((image) => (
            <img key={image} src={image} />
          ))}
        </>
      );
    }
    return null;
  };

  const handleSaveImage = async (): Promise<void> => {
    console.log(selectFolder);
    if (selectFolder.length === 0) {
      return;
    }

    if (fileUrl) {
      const base64 = await blobUrlToBase64(fileUrl);
      const { email } = await getUserInfo();
      await createBranchIfNotExist(repoInfo.projectId, email);
      await createCommitToBranch(
        repoInfo.projectId,
        email,
        selectFolder,
        `${fileName}.png`,
        base64,
      );
      chrome.storage.local.set({ selectFolder });
      try {
        createMergeRequest(repoInfo.projectId, email);
      } catch (error) {
      } finally {
        setSaved(true);
      }
    }
  };

  const handleCopyLink = (link: string): void => {};
  useEffect(() => {
    if (repoInfo.projectId) {
      getTree(repoInfo.projectId, baseFolderPath);
    }
  }, [repoInfo.projectId]);
  if (!repoInfo.projectId) {
    return null;
  }
  // TODO 这里应该是根据特定的条件来决定具体的图片路径
  return saved ? (
    selectFolder.map((item) => {
      return (
        <div key={item}>
          <div>{`${commonImageOSSPrefix}/${item}/${fileName}`}</div>
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              handleCopyLink(`${commonImageOSSPrefix}/${item}/${fileName}`);
            }}
          >
            复制
          </Button>
        </div>
      );
    })
  ) : (
    <>
      <FormGroup>
        {showedTree?.map((item) => (
          <div key={item.name + 'preview'}>
            <div className="check-item" key={item.path}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked(item)}
                    onChange={() => {
                      handeSelect(item);
                    }}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label={item.name}
              />
              <div
                className="check-exist-image"
                onClick={() => {
                  handlePreviewImage(item);
                }}
              >
                {isShowed(item) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDown />}
                查看已有图片
              </div>
            </div>
            <div>{previewImageArea(item)}</div>
          </div>
        ))}
      </FormGroup>

      <Button type="button" variant="contained" onClick={handleSaveImage}>
        保存
      </Button>
    </>
  );
};

export default ChooseProject;
