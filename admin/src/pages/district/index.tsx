import EnhancedTable, { Column } from '@components/Table';
import apiEndPoint from '@constants/apiEndPoint';
import Button from '@mui/material/Button';

import { useState } from 'react';
import DetailDistrict from './detail';
import { Grid } from '@mui/material';
import { DistrictUI } from '@models/area';
import { mapDistrictUI } from '@services/mapdata/area';

const DistrictTable = () => {
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [data, setData] = useState<DistrictUI>();
  const [outSideLoad, setOutSideLoad] = useState<any>();
  const columns: Column[] = [
    {
      title: 'Tên đường',
      nameField: 'name',
      isShowImage: true,
    },
  ];

  const handleRowEvent = (row: any) => {
    setData(mapDistrictUI(row));
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
            setData(mapDistrictUI({}));
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
        api={apiEndPoint.district.list}
        onRowEvent={handleRowEvent}
        buttons={renderButton()}
        outSideLoad={outSideLoad}
      />
      {openDetail && data && (
        <DetailDistrict
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
export default DistrictTable;
