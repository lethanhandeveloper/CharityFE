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
import { UserUI } from '@models/user';
import { HistoryContractUI } from '@models/contract';
import { mapHistoryContracts } from '@services/mapdata/contract';

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
  const [userList, setUserList] = React.useState<UserUI[]>([]);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  React.useEffect(() => {
    const initData = async () => {
      let history;
      if (isCampaign) {
        history = await campaign.getHistoryByCampaign(id);
      } else {
        history = await campaign.getHistoryByUser(id);
      }
      setList(mapHistoryContracts(history));
      const users: UserUI[] = [];
      for (let index = 0; index < history.length; index++) {
        const data = await serviceAPI.auth.getUserById(history[index].donatorId);
        users.push(mapUserUI(data.data.result));
      }
      setUserList(users);
    };
    initData();
  }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                  style={{ minWidth: column.minWidth }}
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
                      <Avatar
                        alt={userList.find((item) => item.id === row.userId)?.fullname}
                        src={userList.find((item) => item.id === row.userId)?.imageUrl}
                      />
                      {userList.find((item) => item.id === row.userId)?.fullname}
                    </Box>
                  </TableCell>
                  <TableCell>{row.value}</TableCell>
                  <TableCell>{row.time.toString()}</TableCell>
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
    </Paper>
  );
}
