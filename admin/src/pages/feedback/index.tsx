import EnhancedTable, { Column } from '@components/Table';
import apiEndPoint from '@constants/apiEndPoint';
import Button from '@mui/material/Button';

import { useState } from 'react';
import DetailFeedback from './detail';
import { Grid } from '@mui/material';
import { FeedbackUI } from '@models/feedback';
import { mapFeedbackUI } from '@services/mapdata/feedback';

const FeedbackTable = () => {
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [outSideLoad, setOutSideLoad] = useState<any>();
  const [data, setData] = useState<FeedbackUI>();

  const columns: Column[] = [
    {
      title: 'Tiêu đề',
      nameField: 'userTitle',
      isShowImage: true,
    },

    { title: 'Hiển thị', nameField: 'isShowInHomePage' },
  ];

  const handleRowEvent = (row: any) => {
    setData(mapFeedbackUI(row));
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
            setData(mapFeedbackUI({}));
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
        api={apiEndPoint.feedback.list}
        onRowEvent={handleRowEvent}
        outSideLoad={outSideLoad}
        buttons={renderButton()}
      />
      {openDetail && data && (
        <DetailFeedback
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
export default FeedbackTable;
