import EnhancedTable, { Column } from '@components/Table';
import serviceAPI from '@services/api';
import { useEffect, useState } from 'react';
import DetailProvince from './detail';
import apiEndPoint from '@constants/apiEndPoint';
import { RequestUI } from '@models/request';
import { mapRequestUI } from '@services/mapdata/request';

interface RequestTableProps {
  isActive: boolean;
}

const RequestTable = (props: RequestTableProps) => {
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState();
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
  const loadData = async (page: number, noItemPerPage: number, searchText: string) => {
    const link = apiEndPoint.request.list;
    const api = await serviceAPI.common.getAPIList(link, page, noItemPerPage, searchText);
    setDataTable(api.data.result);
  };

  const handleRowEvent = (row: any) => {
    setData(mapRequestUI(row));
    setOpenDetail(true);
  };

  const handleClose = () => {
    setOpenDetail(false);
  };
  useEffect(() => {
    loadData(1, 10, '');
  }, [props.isActive]);
  const renderButton = () => {
    return <></>;
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
export default RequestTable;
