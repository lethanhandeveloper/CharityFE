import PanelDetail from '@common/Panel';
import EnhancedTable, { Column } from '@components/Table';
import apiEndPoint from '@constants/apiEndPoint';
import Button from '@mui/material/Button';
import serviceAPI from '@services/api';

import { useEffect, useState } from 'react';
import DetailUser from './detail';
import { UserUI } from '@models/user';
import { mapUserUI } from '@services/mapdata/user';

interface UserTableProps {
  isActive: boolean;
}

const UserTable = (props: UserTableProps) => {
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState();
  const [data, setData] = useState<UserUI>();
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
    setDataTable(api.data.result);
  };

  const handleRowEvent = (row: any) => {
    setData(mapUserUI(row));
    setOpenDetail(true);
  };

  const handleClose = () => {
    setOpenDetail(false);
  };
  useEffect(() => {
    loadData(1, 10, '');
  }, [props.isActive]);

  return (
    <>
      <EnhancedTable
        columns={columns}
        data={dataTable}
        loadTable={loadData}
        onRowEvent={handleRowEvent}
      />
      {openDetail && data && (
        <PanelDetail
          title={'Chi tiết người dùng'}
          buttonChildren={
            <>
              <Button onClick={handleClose}>Save</Button>
            </>
          }
          open={openDetail}
        >
          <DetailUser data={data} />
        </PanelDetail>
      )}
    </>
  );
};
export default UserTable;
