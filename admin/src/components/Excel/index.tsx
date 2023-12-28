import Button from '@mui/material/Button/Button';
import * as React from 'react';
import * as XLSX from 'xlsx';

const ExportToExcelButton: React.FC<{ data: Array<Array<any>>; nameFile: string }> = ({
  data,
  nameFile,
}) => {
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const arrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([arrayBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${nameFile}-${new Intl.DateTimeFormat('en-US', {
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
