import Papa from 'papaparse';

const acceptables = ["csv"]
export const parseCSVFile = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const fileName = file.name.toLowerCase();
    const extension = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);

    if (extension == "csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function(result) {
          return resolve(result.data);
        },
        error: (error) => {
          reject(new Error("Error parsing CSV: " + error.message));
        }
      });
    } else {
      reject(new Error("Invalid file type. Please upload a CSV file."));
    }
  });
};