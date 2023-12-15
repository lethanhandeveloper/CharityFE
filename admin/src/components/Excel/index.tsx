import * as ExcelJS from 'exceljs';
import { dialog } from 'electron';
interface Data {
  [key: string]: string | number;
}

function exportToExcel(data: Data[]): void {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');
  const getFilePath = (): string | undefined => {
    const result = dialog.showSaveDialogSync({
      title: 'Save Excel File',
      defaultPath: 'example.xlsx',
      filters: [{ name: 'Excel Files', extensions: ['xlsx'] }],
    });

    return result;
  };

  // Get the file path from the user
  const filePath = getFilePath();
  // Add headers
  const headers = Object.keys(data[0]);
  worksheet.addRow(headers);

  // Add data
  data.forEach((item) => {
    const row: any[] = [];
    headers.forEach((header) => {
      row.push(item[header]);
    });
    worksheet.addRow(row);
  });

  // Save the workbook to a file
  workbook.xlsx
    .writeFile(filePath || '')
    .then(() => {
      console.log(`Excel file saved at: ${filePath}`);
    })
    .catch((error) => {
      console.error('Error saving Excel file:', error);
    });
}

// Example usage
const sampleData: Data[] = [
  { name: 'John Doe', age: 30, email: 'john@example.com' },
  { name: 'Jane Doe', age: 25, email: 'jane@example.com' },
];

exportToExcel(sampleData);
