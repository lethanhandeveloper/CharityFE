import AlertDialogSlide from '@common/Panel';
import EnhancedTable, { Column } from '@components/Table';
import apiEndPoint from '@constants/apiEndPoint';
import serviceAPI from '@services/api';

import { useEffect, useState } from 'react';
interface CommuneTableProps {
  isActive: boolean;
}
const CommuneTable = (props: CommuneTableProps) => {
  const [openDetail, setOpenDetail] = useState({
    id: '',
    open: false,
  });
  const [data, setData] = useState();
  const columns: Column[] = [
    {
      title: 'Email',
      nameField: 'email',
    },

    { title: 'Họ và tên', nameField: 'name' },
    {
      title: 'Tuổi',
      nameField: 'age',
    },
    {
      title: 'Sđt liên hệ',
      nameField: 'phoneNumber',
    },
  ];
  const loadData = async (page: number, noItemPerPage: number, searchText: string) => {
    const link = props.isActive ? apiEndPoint.user.getActiveList : apiEndPoint.user.getInActiveList;
    const api = await serviceAPI.common.getAPIList(link, page, noItemPerPage, searchText);
    setData(api.data.result);
  };
  useEffect(() => {
    loadData(1, 10, '');
  }, [props.isActive]);

  return (
    <>
      {openDetail.open && <div></div>}
      <EnhancedTable
        columns={columns}
        data={data}
        loadTable={loadData}
        onRowEvent={setOpenDetail}
      />
      <AlertDialogSlide />
    </>
  );
};
export default CommuneTable;
