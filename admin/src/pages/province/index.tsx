import EnhancedTable, { Column } from '@components/Table';
import apiEndPoint from '@constants/apiEndPoint';
import Button from '@mui/material/Button';

import { useState } from 'react';

import DetailProvince from './detail';
import { Grid } from '@mui/material';
import { ProvinceUI } from '@models/area';
import { mapProvinceUI } from '@services/mapdata/area';
import ExportToExcelButton from '@components/Excel';

const ProvinceTable = () => {
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  const [data, setData] = useState<ProvinceUI>();

  const columns: Column[] = [
    {
      title: 'Tỉnh',
      nameField: 'name',
      isShowImage: true,
    },

    { title: 'Hiển thị', nameField: 'isActive' },
  ];

  const handleRowEvent = (row: any) => {
    setData(mapProvinceUI(row));
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
              setData(mapProvinceUI({}));
            }}
          >
            Tạo mới
          </Button>
          <ExportToExcelButton
            nameFile='campaign'
            data={[
              ['Name', 'Age', 'City'],
              ['John', 25, 'New York'],
              ['Alice', 30, 'London'],
              ['Bob', 22, 'Paris'],
              ['Name', 'Age', 'City'],
              ['John', 25, 'New York'],
              ['Alice', 30, 'London'],
              ['Bob', 22, 'Paris'],
              ['Name', 'Age', 'City'],
              ['John', 25, 'New York'],
              ['Alice', 30, 'London'],
              ['Bob', 22, 'Paris'],
              ['Name', 'Age', 'City'],
              ['John', 25, 'New York'],
              ['Alice', 30, 'London'],
              ['Bob', 22, 'Paris'],
            ]}
          />
        </Grid>
      </Grid>
    );
  };
  return (
    <>
      <EnhancedTable
        columns={columns}
        api={apiEndPoint.province.list}
        onRowEvent={handleRowEvent}
        buttons={<> {renderButton()}</>}
      />
      {openDetail && data && (
        <DetailProvince
          openDetail={openDetail}
          data={data}
          loadTable={() => {
            console.log('zxcxz');
          }}
          onClose={handleClose}
        />
      )}
    </>
  );
};
export default ProvinceTable;
