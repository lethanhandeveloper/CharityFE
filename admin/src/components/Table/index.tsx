import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { Avatar, InputAdornment } from '@mui/material';
import SearchField from '@common/SearchField';
import serviceAPI from '@services/api';

interface Data {
  id: number;
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

export interface Column {
  title: string;
  nameField: string;
  isShowImage?: boolean;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array?.map((el, index) => [el, index] as [T, number]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

// interface HeadCell {
//   disablePadding: boolean;
//   id: keyof Data;
//   label: string;
//   numeric: boolean;
// }

interface EnhancedTableHeaderProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  columns: Column[];
}

function EnhancedTableHead(props: EnhancedTableHeaderProps) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead sx={{ background: 'rgb(243, 246, 249)' }}>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {props.columns.map((headCell) => (
          <TableCell
            key={headCell.nameField}
            align={'left'}
            padding={'normal'}
            sortDirection={false}
          >
            <TableSortLabel
              active={true}
              direction={'asc'}
            >
              {headCell.title}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  buttons: React.ReactNode;
  setSearchText: (value: string) => void;
  onLoad: () => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        margin: '10px',
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {props.buttons}

      <SearchField
        sx={{ width: '350px', paddingRight: '30px' }}
        placeholder='Nhập thông tin tìm kiếm ...'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <SearchTwoToneIcon />
            </InputAdornment>
          ),
        }}
        size='small'
        onChange={(e) => {
          props.setSearchText(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.code === 'Enter') {
            props.onLoad();
          }
        }}
      />
    </Toolbar>
  );
}

interface EnhancedTableProps {
  columns: Column[];
  api: string;
  onRowEvent?: (data: any) => void;
  onToggle?: () => void;
  buttons?: React.ReactNode;
}

export default function EnhancedTable(props: EnhancedTableProps) {
  const [dataTable, setDataTable] = React.useState<any>();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [searchText, setSearchText] = React.useState<string>('');
  const [totalItems, setTotalItems] = React.useState<number>(0);

  const loadTable = async (page: number, noItemPerPage: number, searchText: string) => {
    const api = await serviceAPI.common.getAPIList(props.api, page, noItemPerPage, searchText);
    setDataTable(api.data.result);
    setTotalItems(api.data.totalItems);
  };
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = dataTable?.map((n: any) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    loadTable(newPage, rowsPerPage, searchText);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  // eslint-disable-next-line no-mixed-operators
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataTable?.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(dataTable, getComparator(order, orderBy))?.slice(
        page * rowsPerPage,
        // eslint-disable-next-line no-mixed-operators
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, dataTable?.length],
  );
  const handleGetData = (row: any, name: string) => {
    const spilitName = name.split('.');
    if (spilitName.length > 1) {
      const data = row[spilitName[0]];
      return data?.[spilitName[1]];
    } else {
      return row[name];
    }
  };
  const handleGetDataImage = (row: any, name: string) => {
    const spilitName = name.split('.');
    if (spilitName.length > 1) {
      const data = row[spilitName[0]];
      return data?.image_url;
    } else {
      return row.image_url;
    }
  };
  React.useEffect(() => {
    if (props.api) {
      loadTable(page, rowsPerPage, searchText);
    }
  }, [props.api]);
  return (
    <Box
      sx={{
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        boxShadow:
          '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
      }}
    >
      <Paper sx={{ width: '100%', mb: 2, minHeight: 570, maxHeight: 570, padding: '10px' }}>
        <EnhancedTableToolbar
          setSearchText={setSearchText}
          onLoad={() => {
            loadTable(page, rowsPerPage, searchText);
          }}
          numSelected={selected.length}
          buttons={props.buttons}
        />
        <TableContainer sx={{ maxHeight: 500, overflow: 'auto' }}>
          <Table
            aria-labelledby='tableTitle'
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={dataTable?.length}
              columns={props.columns}
            />
            <TableBody>
              {visibleRows?.map((row, index) => {
                const isItemSelected = isSelected(row.id as number);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={() => {
                      if (typeof props.onRowEvent === 'function') {
                        props.onRowEvent(row);
                      }
                    }}
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                        color='primary'
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    {props.columns?.map((item) => (
                      <TableCell align='left'>
                        {item.nameField === 'email' ? (
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            <Avatar
                              alt='Remy Sharp'
                              src={handleGetDataImage(row, item.nameField)}
                            />
                            <Typography marginLeft={'10px'}>
                              {handleGetData(row, item.nameField)}
                            </Typography>
                          </Box>
                        ) : (
                          <Typography marginLeft={'10px'}>
                            {handleGetData(row, item.nameField)}
                          </Typography>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{
            position: 'absolute',
            right: 0,
            bottom: 20,
          }}
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={totalItems}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
