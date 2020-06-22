import XLSX from 'xlsx';

const useCategoryParser = () => {
  /* Boilerplate to set up FileReader */
  const reader = new FileReader();
  const rABS = !!reader.readAsBinaryString;

  const readData = (e) => {
    /* Parse data */
    const bstr = e.target.result;
    const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });

    const headers = [], categories = [], sheet_error = [];
    let rownum = 0;
    // eslint-disable-next-line
    for (const wsname of wb.SheetNames) {
      /* Get worksheet */
      const ws = wb.Sheets[wsname];
      const match = wsname.trim().match(/^(\d+)\.\s*([a-zA-Z]+)$/);
      if (!match) {
        sheet_error.push(wsname);
        continue;
      }
      // eslint-disable-next-line
      const [_, cat_code, label] = match;
      const category = { cat_code, label, items: [] };
      categories.push(category);

      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null });
      const header_data = data.splice(0, 1)[0];

      if (!headers.length) {
        headers.push(...header_data.map(head => head && head.trim()));
      }
      // eslint-disable-next-line 
      const items = data.map((row, rowIndex) => {
        let item = {};

        // parse excel date format into unix timestamp
        headers.forEach((header, index) => {
          let value = row[index];
          item[header] = value;
        });
        item["Category Label"] = category.label;
        item["Category Code"] = category.cat_code;
        item.rownum = ++rownum;
        return item;
      });
      category.items.push(...items);
    }

    const category_items = categories.reduce((accum, category) => accum.concat(category.items), []);
    headers.unshift("Category Label");
    headers.unshift("Category Code");
    return { headers, categories, category_items, sheet_error };
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

export default useCategoryParser;