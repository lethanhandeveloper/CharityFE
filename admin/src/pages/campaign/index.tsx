import EnhancedTable, { Column } from '@components/Table';
import apiEndPoint from '@constants/apiEndPoint';
import Button from '@mui/material/Button';
import serviceAPI from '@services/api';

import { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import { CampaignStatus, CampainUI } from '@models/campain';
import { mapCampainUI } from '@services/mapdata/campain';
import DetailCampaign from './detail';

interface CampaignTableProps {
  isActive: boolean;
  status: CampaignStatus;
}

const CampaignTable = (props: CampaignTableProps) => {
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState();
  const [data, setData] = useState<CampainUI>();
  const columns: Column[] = [
    {
      title: 'Tiêu đề',
      nameField: 'title',
      isShowImage: true,
    },
  ];
  const loadData = async (page: number, noItemPerPage: number, searchText: string) => {
    const link = apiEndPoint.campain.list;
    const api = await serviceAPI.common.getAPIList(link, page, noItemPerPage, searchText);
    setDataTable(api.data.result);
  };

  const handleRowEvent = (row: any) => {
    setData(mapCampainUI(row));
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
              setData(mapCampainUI({}));
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
        <DetailCampaign
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
