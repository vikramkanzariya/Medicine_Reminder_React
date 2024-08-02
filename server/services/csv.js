const csvWriter = require("csv-writer").createObjectCsvWriter

const csvGenerator = (filePath, header, records, append = false)=>{
    const getCSV = csvWriter({
        path: filePath,
        header:header,
        append:append
    });
    return getCSV.writeRecords(records)
}


module.exports = csvGenerator;