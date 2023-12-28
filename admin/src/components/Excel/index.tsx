import * as React from 'react';
import * as XLSX from 'xlsx';

const ExportToExcelButton: React.FC<{ data: Array<Array<any>> }> = ({ data }) => {
  const exportToExcel = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Add a worksheet to the workbook
    const ws = XLSX.utils.aoa_to_sheet(data);

    // Assign the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Create an array from the workbook using XLSX.write with type 'array'
    const arrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Create a Blob from the array
    const blob = new Blob([arrayBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    // Create a download link and trigger a click event to download the file
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'exported_data.xlsx';
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
  };

  return <button onClick={exportToExcel}>Export to Excel</button>;
};

export default ExportToExcelButton;
