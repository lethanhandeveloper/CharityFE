import EnhancedTable, { Column } from '@components/Table';
import apiEndPoint from '@constants/apiEndPoint';
import Button from '@mui/material/Button';
import serviceAPI from '@services/api';

import { useEffect, useState } from 'react';
import DetailDistrict from './detail';
import { Grid } from '@mui/material';
import { DistrictUI } from '@models/area';
import { mapDistrictUI } from '@services/mapdata/area';

interface DistrictTableProps {
  isActive: boolean;
}

const DistrictTable = (props: DistrictTableProps) => {
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState();
  const [data, setData] = useState<DistrictUI>();
  const columns: Column[] = [
    {
      title: 'Tên đường',
      nameField: 'name',
      isShowImage: true,
    },
  ];
  const loadData = async (page: number, noItemPerPage: number, searchText: string) => {
    const link = apiEndPoint.district.list;
    const api = await serviceAPI.common.getAPIList(link, page, noItemPerPage, searchText);
    setDataTable(api.data.result);
  };

  const handleRowEvent = (row: any) => {
    setData(mapDistrictUI(row));
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
              setData(mapDistrictUI({}));
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
        <DetailDistrict
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
export default DistrictTable;
