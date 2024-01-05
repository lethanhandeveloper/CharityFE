import EnhancedTable, { Column } from '@components/Table';
import apiEndPoint from '@constants/apiEndPoint';
import Button from '@mui/material/Button';

import { useState } from 'react';

import DetailCommune from './detail';
import { Grid } from '@mui/material';
import { CommuneUI } from '@models/area';
import { mapCommuneUI } from '@services/mapdata/area';

const CampaignTable = () => {
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [outSideLoad, setOutSideLoad] = useState<any>();
  const [data, setData] = useState<CommuneUI>();

  const columns: Column[] = [
    {
      title: 'Tên',
      nameField: 'name',
      isShowImage: true,
    },
  ];

  const handleRowEvent = (row: any) => {
    setData(mapCommuneUI(row));
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
        api={apiEndPoint.commune.list}
        onRowEvent={handleRowEvent}
        buttons={<> {renderButton()}</>}
        outSideLoad={outSideLoad}
      />
      {openDetail && data && (
        <DetailCommune
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
