import XLSX from 'xlsx';
import moment from 'moment';

const excelDateParse = (date) => moment((date - (25567 + 1)) * 86400 * 1000).format("DD/MM/YY");

const useParser = () => {
  /* Boilerplate to set up FileReader */
  const reader = new FileReader();
  const rABS = !!reader.readAsBinaryString;

  const readData = (e) => {
    /* Parse data */
    const bstr = e.target.result;
    const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
    /* Get first worksheet */
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    /* Convert array of arrays */
    const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null });
    const headers = data.splice(0, 1)[0].map(head => head && head.trim());

    const items = data.map((row, rowIndex) => {
      let item = {};

      // parse excel date format into unix timestamp
      headers.forEach((header, index) => {
        let value = row[index];
        if (header === "Date of Collection") value = excelDateParse(value);
        item[header] = value;
      });
      item.rownum = rowIndex + 1;
      return item;
    });

    return { headers, items }
  };

  return async file => {
    return new Promise((resolve, reject) => {
      try {

        reader.onload = (e) => {
          const data = readData(e);
          resolve(data);
        };

        if (rABS) reader.readAsBinaryString(file);
        else reader.readAsArrayBuffer(file);

      } catch (error) {
        reject(error);
      }
    });
  };
};

export default useParser;