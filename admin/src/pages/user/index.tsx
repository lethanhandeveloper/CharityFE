import PanelDetail from '@common/Panel';
import EnhancedTable, { Column } from '@components/Table';
import apiEndPoint from '@constants/apiEndPoint';
import Button from '@mui/material/Button';
import serviceAPI from '@services/api';

import { useEffect, useState } from 'react';
import DetailUser from './detail';
import { UserUI } from '@models/user';
import { mapUserUI } from '@services/mapdata/user';
import { Grid } from '@mui/material';
import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';

interface UserTableProps {
  isActive: boolean;
}

const UserTable = (props: UserTableProps) => {
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState();
  const [data, setData] = useState<UserUI>();
  const dispatch = useAppDispatch();
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

  const handleSetActive = async (isActive: boolean) => {
    try {
      if (data?.id) {
        const response = await serviceAPI.auth.setActive(data.id, isActive);
        if (response.status === 200) {
          dispatch(setInfoAlert({ open: true, title: 'Thay đổi thành công', type: 'success' }));
        } else {
          dispatch(setInfoAlert({ open: true, title: 'Thay đổi không thành công', type: 'error' }));
        }
        handleClose();
      }
    } catch (e) {
      dispatch(setInfoAlert({ open: true, title: 'Hệ thống gặp lỗi', type: 'error' }));
    }
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
            <Grid
              container
              justifyContent={'space-between'}
            >
              <Grid item>
                <Button onClick={handleClose}>Đóng</Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    handleSetActive(false);
                  }}
                >
                  Khóa tài khoản
                </Button>
                <Button
                  onClick={() => {
                    handleSetActive(true);
                  }}
                >
                  Mở khóa tài khoản
                </Button>
              </Grid>
            </Grid>
          }
          open={openDetail}
        >
          <DetailUser
            data={data}
            setData={setData}
          />
        </PanelDetail>
      )}
    </>
  );
};
export default UserTable;
