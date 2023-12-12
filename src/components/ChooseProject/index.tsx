/*
 * @Date: 2023-12-04 14:02:46
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-12-12 09:28:41
 * @FilePath: /chrome-extension/src/components/ChooseProject/index.tsx
 */
import React, { type ReactElement, useMemo, useState } from 'react';
import { type ResponseProject, getRepositoryTree } from '@/api';
import useRequest from '@/hooks/useRequest';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './index.scss';
const ChooseProject = (): ReactElement => {
  // TODO 测试代码
  const { data } = useRequest(getRepositoryTree, { params: ['144'] });
  const { run } = useRequest(getRepositoryTree, { manual: true });
  // const fileUrl = new URLSearchParams(window.location.search)?.get('file');
  // console.log(fileUrl, 'fileUrl');
  // if (fileUrl) {
  //   fetch(fileUrl).then((res) => {
  //     console.log(res, 'fetch 图片');
  //   });
  // }
  const [selectFolder, setSelectFolder] = useState<string[]>([]);
  const showedTree = useMemo(() => data?.filter((item) => item.type === 'tree'), [data]);
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
    return selectFolder.includes(item.id);
  };
  const handeSelect = (item: ResponseProject): void => {
    if (isChecked(item)) {
      setSelectFolder(selectFolder.filter((id) => id !== item.id));
    } else {
      setSelectFolder([...selectFolder, item.id]);
    }
  };
  const handlePreviewImage = async (item: ResponseProject): Promise<void> => {
    if (showedPreview[item.id]) {
      setShowedPreview({ ...showedPreview, [item.id]: !showedPreview[item.id] });
      return;
    }
    // TODO 测试代码
    const allFolderImage = (await run('144', item.path))
      .filter((item) => item.type === 'blob' && /\.(png|jpg)$/i.test(item.name))
      .map((item) => item.name);
    setFolderImageList({ ...folderImageList, [item.id]: allFolderImage });
    setShowedPreview({ ...showedPreview, [item.id]: true });
  };
  const previewImageArea = (item: ResponseProject): ReactElement | null => {
    if (showedPreview[item.id]) {
      return <div></div>;
    }
    return null;
  };
  return (
    <FormGroup>
      {showedTree?.map((item) => (
        <>
          <div className="check-item" key={item.id}>
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
              <KeyboardArrowUpIcon />
              查看已有图片
            </div>
          </div>
          <div key={item.id + 'preview'}>{previewImageArea(item)}</div>
        </>
      ))}
    </FormGroup>
  );
};

export default ChooseProject;
