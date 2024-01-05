import EnhancedTable, { Column } from '@components/Table';
import apiEndPoint from '@constants/apiEndPoint';
import Button from '@mui/material/Button';

import { useState } from 'react';

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
  const [outSideLoad, setOutSideLoad] = useState<any>();
  const [data, setData] = useState<CampainUI>();

  const columns: Column[] = [
    {
      title: 'Tiêu đề',
      nameField: 'title',
      isShowImage: true,
    },
    {
      title: 'Loại',
      nameField: 'itemTypeId.name',
    },
    {
      title: 'Danh mục',
      nameField: 'categoryId.name',
    },
    {
      title: 'Người tạo',
      nameField: 'creatorId.email',
    },
    {
      title: 'Ngày kết thúc',
      nameField: 'endDate',
      isDate: true,
    },
  ];

  const handleRowEvent = (row: any) => {
    setData(mapCampainUI(row));
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
        api={`${apiEndPoint.campain.list}/${props.status}`}
        onRowEvent={handleRowEvent}
        buttons={<> {renderButton()}</>}
        outSideLoad={outSideLoad}
      />
      {openDetail && data && (
        <DetailCampaign
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
export default CampaignTable;
