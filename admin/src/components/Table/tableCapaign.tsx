/* eslint-disable no-mixed-operators */
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

import { Avatar, Box, InputAdornment, TextField } from '@mui/material';
import campaign from '@services/ethers/campaign';
import serviceAPI from '@services/api';

import { mapUserUI } from '@services/mapdata/user';
import { styled } from '@mui/material/styles';

import { HistoryContractUI } from '@models/contract';
import { mapHistoryContracts } from '@services/mapdata/contract';
import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';
import EmptyOverlayGrid from '@components/Grid';
import { mapCampainUI } from '@services/mapdata/campain';

const SearchInputWrapper = styled(TextField)(
  ({ theme }) => `
    background: ${theme.colors.alpha.white[100]};

    .MuiInputBase-input {
        font-size: ${theme.typography.pxToRem(17)};
    }
`,
);
interface Column {
  id: 'user' | 'amount' | 'time' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'user', label: 'Tài khoản', minWidth: 170 },
  {
    id: 'amount',
    label: 'Số tiền',
    minWidth: 100,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'time',
    label: 'Thời gian',
    minWidth: 170,
  },
];

export default function TableRender({ id, isCampaign }: { id: string; isCampaign: boolean }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [list, setList] = React.useState<HistoryContractUI[]>();
  const [userList, setUserList] = React.useState<any>([]);
  const dispatch = useAppDispatch();
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  React.useEffect(() => {
    const initData = async () => {
      try {
        let history;
        if (isCampaign) {
          history = await campaign.getHistoryByCampaign(id);
        } else {
          history = await campaign.getHistoryByUser(id);
        }
        const dataList = mapHistoryContracts(history);
        setList(dataList);

        const checkList = [];
        if (isCampaign) {
          for (let index = 0; index < dataList.length; index++) {
            const data = await serviceAPI.auth.getUserById(dataList[index].userId);
            checkList.push(mapUserUI(data.data.result));
          }
        } else {
          for (let index = 0; index < dataList.length; index++) {
            const data = await serviceAPI.campain.getCampainDetail(dataList[index].campaignId);
            checkList.push(mapCampainUI(data.data.result));
          }
        }
        setUserList(checkList);
      } catch (e) {
        setList([]);
        dispatch(
          setInfoAlert({
            open: true,
            title: 'Đăng nhập ví MetaMask để kiểm tra thông tin',
            type: 'error',
          }),
        );
      }
    };
    initData();
  }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {list?.length || 0 > 0 ? (
        <>
          <SearchInputWrapper
            autoFocus={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchTwoToneIcon />
                </InputAdornment>
              ),
            }}
            placeholder='Tìm kiếm người ủng hộ...'
            fullWidth
            size='small'
            sx={{
              margin: '10px 0 10px 0',
            }}
          />
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table
              stickyHeader
              aria-label='sticky table'
            >
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        textTransform: 'none',
                        paddingTop: '8px',
                        paddingBottom: '8px',
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {list?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                    >
                      <TableCell>
                        <Box
                          display={'flex'}
                          flexDirection={'row'}
                          alignItems={'center'}
                          gap={3}
                        >
                          {isCampaign ? (
                            <>
                              <Avatar
                                alt={userList.find((item: any) => item.id === row.userId)?.fullname}
                                src={userList.find((item: any) => item.id === row.userId)?.imageUrl}
                              />
                              {userList.find((item: any) => item.id === row.userId)?.fullname}
                            </>
                          ) : (
                            <>
                              <Avatar
                                alt={
                                  userList.find((item: any) => item.id === row.campaignId)?.title
                                }
                                src={
                                  userList.find((item: any) => item.id === row.campaignId)?.imageUrl
                                }
                              />
                              {userList.find((item: any) => item.id === row.campaignId)?.title}
                            </>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>{row.value}</TableCell>
                      <TableCell>{row.timeString}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={list?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <EmptyOverlayGrid />
      )}
    </Paper>
  );
}
