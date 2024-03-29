import EnhancedTable, { Column } from '@components/Table';

import { useState } from 'react';
import DetailRequest from './detail';

import { RequestUI } from '@models/request';
import { mapRequestUI } from '@services/mapdata/request';
import apiEndPoint from '@constants/apiEndPoint';

interface RequestTableProps {
  isActive: boolean;
}

const RequestTable = (props: RequestTableProps) => {
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  const [outSideLoad, setOutSideLoad] = useState<any>();
  const [data, setData] = useState<RequestUI>();
  const columns: Column[] = [
    {
      title: 'Tên',
      nameField: 'personalGeneralInfo.name',
    },
    {
      title: 'Số điện thoại',
      nameField: 'personalGeneralInfo.phoneNumber',
    },
    {
      title: 'Địa chỉ',
      nameField: 'personalGeneralInfo.address',
    },
    {
      title: 'Quyền',
      nameField: 'type',
    },
    {
      title: 'Trạng thái',
      nameField: 'status',
    },
  ];

  const handleRowEvent = (row: any) => {
    setData(mapRequestUI(row));
    setOpenDetail(true);
  };

  const handleClose = () => {
    setOpenDetail(false);
  };

  const renderButton = () => {
    return <></>;
  };
  return (
    <>
      <EnhancedTable
        columns={columns}
        api={
          props.isActive ? apiEndPoint.request.list('done') : apiEndPoint.request.list('pending')
        }
        onRowEvent={handleRowEvent}
        buttons={renderButton()}
        outSideLoad={outSideLoad}
      />
      {openDetail && data && (
        <DetailRequest
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
export default RequestTable;
