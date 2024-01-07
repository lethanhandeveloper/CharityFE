import PanelDetail from '@common/Panel';
import EnhancedTable, { Column } from '@components/Table';
import apiEndPoint from '@constants/apiEndPoint';
import Button from '@mui/material/Button';
import serviceAPI from '@services/api';

import { useState } from 'react';
import DetailUser from './detail';
import { UserUI } from '@models/user';
import { mapUserUI } from '@services/mapdata/user';
import { Grid } from '@mui/material';
import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';
import ConfirmDialog from '@components/ConfirmDialog';

interface UserTableProps {
  isActive: boolean;
}

const UserTable = (props: UserTableProps) => {
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [outSideLoad, setOutSideLoad] = useState<any>();
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
    {
      title: 'Hoạt động',
      nameField: 'isActive',
    },
  ];

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
        if (response.status === 204) {
          dispatch(setInfoAlert({ open: true, title: 'Thay đổi thành công', type: 'success' }));
        }
        handleClose();
      }
    } catch (e) {
      dispatch(setInfoAlert({ open: true, title: 'Hệ thống gặp lỗi', type: 'error' }));
    }
  };

  return (
    <>
      <EnhancedTable
        api={props.isActive ? apiEndPoint.user.getActiveList : apiEndPoint.user.getInActiveList}
        columns={columns}
        onRowEvent={handleRowEvent}
        outSideLoad={outSideLoad}
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
                <Button
                  onClick={handleClose}
                  variant='outlined'
                >
                  Đóng
                </Button>
              </Grid>
              <Grid item>
                {data.isActive ? (
                  <ConfirmDialog
                    buttonText='Khóa tài khoản'
                    message='Xác nhận khóa tài khoản'
                    onSucess={() => {
                      handleSetActive(false);
                      setOutSideLoad({ id: '1' });
                    }}
                    title='Xác nhận khóa'
                  />
                ) : (
                  <ConfirmDialog
                    buttonText='Mở khóa tài khoản'
                    message='Xác nhận mở khóa tài khoản'
                    onSucess={() => {
                      handleSetActive(true);
                      setOutSideLoad({ id: '1' });
                    }}
                    title='Xác nhận mở khóa'
                  />
                )}
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
