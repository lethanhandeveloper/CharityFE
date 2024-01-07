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
  const [outSideLoad, setOutSideLoad] = useState<any>();
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
    );
  };
  return (
    <>
      <EnhancedTable
        columns={columns}
        api={apiEndPoint.banner.list}
        onRowEvent={handleRowEvent}
        buttons={renderButton()}
        outSideLoad={outSideLoad}
      />
      {openDetail && data && (
        <DetailBanner
          openDetail={openDetail}
          data={data}
          loadTable={() => {
            setOutSideLoad({ load: true });
          }}
          onClose={handleClose}
        />
      )}
    </>
  );
};
export default BannerTable;
