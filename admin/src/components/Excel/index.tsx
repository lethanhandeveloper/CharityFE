import { Column } from '@components/Table';
import Button from '@mui/material/Button/Button';
import * as React from 'react';
import * as XLSX from 'xlsx';
const handleGetData = (row: any, name: string) => {
  const spilitName = name.split('.');
  if (spilitName.length > 1) {
    const data = row[spilitName[0]];
    return data?.[spilitName[1]];
  } else {
    return row[name];
  }
};
const ExportToExcelButton: React.FC<{ data: Array<Array<any>>; fields: Column[] }> = ({
  data,
  fields,
}) => {
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const dataFilter: any[] = [];
    dataFilter.push(fields.map((field) => field.title));
    data.forEach((item) => {
      const itemFilter = fields.map((field) => handleGetData(item, field.nameField));
      dataFilter.push(itemFilter);
    });

    const ws = XLSX.utils.aoa_to_sheet(dataFilter);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const arrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([arrayBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `export-${new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date())}.xlsx`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={exportToExcel}
      variant='outlined'
    >
      Xuất file
    </Button>
  );
};

export default ExportToExcelButton;
