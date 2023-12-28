import EnhancedTable, { Column } from '@components/Table';

import { useState } from 'react';
import DetailProvince from './detail';

import { RequestUI } from '@models/request';
import { mapRequestUI } from '@services/mapdata/request';
import apiEndPoint from '@constants/apiEndPoint';

interface RequestTableProps {
  isActive: boolean;
}

const RequestTable = (props: RequestTableProps) => {
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  console.log(props);
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
        api={apiEndPoint.request.list}
        onRowEvent={handleRowEvent}
        buttons={<> {renderButton()}</>}
      />
      {openDetail && data && (
        <DetailProvince
          openDetail={openDetail}
          data={data}
          loadTable={() => {
            console.log('check');
          }}
          onClose={handleClose}
        />
      )}
    </>
  );
};
export default RequestTable;
