import EnhancedTable, { Column } from '@components/Table';
import apiEndPoint from '@constants/apiEndPoint';
import Button from '@mui/material/Button';
import serviceAPI from '@services/api';

import { useEffect, useState } from 'react';

import DetailCommune from './detail';
import { Grid } from '@mui/material';
import { CommuneUI } from '@models/area';
import { mapCommuneUI } from '@services/mapdata/area';

interface CampaignTableProps {
  isActive: boolean;
}

const CampaignTable = (props: CampaignTableProps) => {
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState();
  const [data, setData] = useState<CommuneUI>();
  const columns: Column[] = [
    {
      title: 'Tên',
      nameField: 'name',
      isShowImage: true,
    },
  ];
  const loadData = async (page: number, noItemPerPage: number, searchText: string) => {
    const link = apiEndPoint.commune.list;
    const api = await serviceAPI.common.getAPIList(link, page, noItemPerPage, searchText);
    setDataTable(api.data.result);
  };

  const handleRowEvent = (row: any) => {
    setData(mapCommuneUI(row));
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
              setData(mapCommuneUI({}));
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
        <DetailCommune
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
export default CampaignTable;
