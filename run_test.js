const Mocha = require("mocha");

const mocha = new Mocha({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'mochawesome-report',            // Thư mục lưu báo cáo
    reportFilename: 'mochawesome',  // Tên file báo cáo
    overwrite: true,                // Ghi đè báo cáo cũ
    html: true,                     // Xuất báo cáo HTML
    json: true,                     // Xuất báo cáo JSON
  },
});

const testFiles = [
  "test/new_customer_testcase.js",
  "test/new_account_testcase.js",
  "test/edit_customer_testcase.js",
  "test/delete_customer_testcase.js",
];

testFiles.forEach((file) => mocha.addFile(file));

mocha.run((failures) => {
  process.exitCode = failures ? 1 : 0;
});
