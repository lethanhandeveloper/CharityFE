import EnhancedTable, { Column } from '@components/Table';
import apiEndPoint from '@constants/apiEndPoint';
import Button from '@mui/material/Button';
import serviceAPI from '@services/api';

import { useEffect, useState } from 'react';

import DetailProvince from './detail';
import { Grid } from '@mui/material';
import { ProvinceUI } from '@models/area';
import { mapProvinceUI } from '@services/mapdata/area';

interface ProvinceTableProps {
  isActive: boolean;
}

const ProvinceTable = (props: ProvinceTableProps) => {
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState();
  const [data, setData] = useState<ProvinceUI>();
  const columns: Column[] = [
    {
      title: 'Tỉnh',
      nameField: 'name',
      isShowImage: true,
    },

    { title: 'Hiển thị', nameField: 'isActive' },
  ];
  const loadData = async (page: number, noItemPerPage: number, searchText: string) => {
    const link = apiEndPoint.province.list;
    const api = await serviceAPI.common.getAPIList(link, page, noItemPerPage, searchText);
    setDataTable(api.data.result);
  };

  const handleRowEvent = (row: any) => {
    setData(mapProvinceUI(row));
    setOpenDetail(true);
  };

  const handleClose = () => {
    setOpenDetail(false);
  };
  useEffect(() => {
    loadData(1, 10, '');
  }, [props.isActive]);
  const renderButton = () => {
    return (
      <Grid container>
        <Grid item>
          <Button
            onClick={() => {
              setOpenDetail(true);
              setData(mapProvinceUI({}));
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
        data={dataTable}
        loadTable={loadData}
        onRowEvent={handleRowEvent}
        buttons={<> {renderButton()}</>}
      />
      {openDetail && data && (
        <DetailProvince
          openDetail={openDetail}
          data={data}
          loadTable={() => {
            loadData(1, 10, '');
          }}
          onClose={handleClose}
        />
      )}
    </>
  );
};
export default ProvinceTable;
