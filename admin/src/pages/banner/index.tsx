import EnhancedTable, { Column } from '@components/Table';
import apiEndPoint from '@constants/apiEndPoint';
import Button from '@mui/material/Button';

import { useState } from 'react';
import { BannerUI } from '@models/banner';
import { mapBannerUI } from '@services/mapdata/banner';
import DetailBanner from './detail';
import { Grid } from '@mui/material';

const BannerTable = () => {
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  const [data, setData] = useState<BannerUI>();
  const columns: Column[] = [
    {
      title: 'Tiêu đề',
      nameField: 'title',
      isShowImage: true,
    },

    { title: 'Hiển thị', nameField: 'isActive' },
  ];

  const handleRowEvent = (row: any) => {
    setData(mapBannerUI(row));
    setOpenDetail(true);
  };

  const handleClose = () => {
    setOpenDetail(false);
  };

  const renderButton = () => {
    return (
      <Grid container>
        <Grid item>
          <Button
            variant='contained'
            onClick={() => {
              setOpenDetail(true);
              setData(mapBannerUI({}));
            }}
          >
            Tạo mới
          </Button>
        </Grid>
      </Grid>
    );
  };
  return (
    <>
      <EnhancedTable
        columns={columns}
        api={apiEndPoint.banner.list}
        onRowEvent={handleRowEvent}
        buttons={<> {renderButton()}</>}
      />
      {openDetail && data && (
        <DetailBanner
          openDetail={openDetail}
          data={data}
          loadTable={() => {
            console.log('zxczx');
          }}
          onClose={handleClose}
        />
      )}
    </>
  );
};
export default BannerTable;
