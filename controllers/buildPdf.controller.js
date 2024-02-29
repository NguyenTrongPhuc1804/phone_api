const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const { mkdirp } = require("mkdirp");
const puppeteer = require("puppeteer");
const screenShot = async (req, res) => {
  const { name, age } = req.body;

  // const doc = new PDFDocument();
  // const make = mkdirp.sync(`./public/upload/billPdf`);
  const dayNow = Date.now();
  // const filePath = path.join(
  //   __dirname,
  //   `../public/upload/billPdf`,
  //   `${dayNow}-bill.pdf`
  // );
  // doc.pipe(fs.createWriteStream(filePath));
  // doc.image("public/upload/category/1706809017533_gundam.jpg", {
  //   fit: [250, 300],
  //   align: "center",
  //   valign: "center",
  // });
  // doc.end();

  const generatePDF = async (html) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html);
    const pdfBuffer = await page.pdf({
      path: `public/upload/billPdf/${dayNow}-bill.pdf`,
      format: "A4",
    });

    await page.close();
    await browser.close();

    return pdfBuffer;
  };
  const pdf = await generatePDF(`
  <html>
    <head>
      <title>Test PDF</title>
      <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #FAFAFA;
        font: 12pt "Tohoma";
    }
    * {
        box-sizing: border-box;
        -moz-box-sizing: border-box;
    }
    .page {
        width: 21cm;
        overflow:hidden;
        min-height:297mm;
        padding: 2.5cm;
        margin-left:auto;
        margin-right:auto;
        background: white;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }
    .subpage {
        padding: 1cm;
        border: 5px red solid;
        height: 237mm;
        outline: 2cm #FFEAEA solid;
    }
     @page {
     size: A4;
     margin: 0;
    }
    button {
        width:100px;
        height: 24px;
    }
    .header {
        overflow:hidden;
    }
    .logo {
        background-color:#FFFFFF;
        text-align:left;
        float:left;
    }
    .company {
        padding-top:24px;
        text-transform:uppercase;
        background-color:#FFFFFF;
        text-align:right;
        float:right;
        font-size:16px;
    }
    .title {
        text-align:center;
        position:relative;
        color:#0000FF;
        font-size: 24px;
        top:1px;
    }
    .footer-left {
        text-align:center;
        text-transform:uppercase;
        padding-top:24px;
        position:relative;
        height: 150px;
        width:50%;
        color:#000;
        float:left;
        font-size: 12px;
        bottom:1px;
    }
    .footer-right {
        text-align:center;
        text-transform:uppercase;
        padding-top:24px;
        position:relative;
        height: 150px;
        width:50%;
        color:#000;
        font-size: 12px;
        float:right;
        bottom:1px;
    }
    .TableData {
        background:#ffffff;
        font: 11px;
        width:100%;
        border-collapse:collapse;
        font-family:Verdana, Arial, Helvetica, sans-serif;
        font-size:12px;
        border:thin solid #d3d3d3;
    }
    .TableData TH {
        background: rgba(0,0,255,0.1);
        text-align: center;
        font-weight: bold;
        color: #000;
        border: solid 1px #ccc;
        height: 24px;
    }
    .TableData TR {
        height: 24px;
        border:thin solid #d3d3d3;
    }
    .TableData TR TD {
        padding-right: 2px;
        padding-left: 2px;
        border:thin solid #d3d3d3;
    }
    .TableData TR:hover {
        background: rgba(0,0,0,0.05);
    }
    .TableData .cotSTT {
        text-align:center;
        width: 10%;
    }
    .TableData .cotTenSanPham {
        text-align:left;
        width: 40%;
    }
    .TableData .cotHangSanXuat {
        text-align:left;
        width: 20%;
    }
    .TableData .cotGia {
        text-align:right;
        width: 120px;
    }
    .TableData .cotSoLuong {
        text-align: center;
        width: 50px;
    }
    .TableData .cotSo {
        text-align: right;
        width: 120px;
    }
    .TableData .tong {
        text-align: right;
        font-weight:bold;
        text-transform:uppercase;
        padding-right: 4px;
    }
    .TableData .cotSoLuong input {
        text-align: center;
    }
    @media print {
     @page {
     margin: 0;
     border: initial;
     border-radius: initial;
     width: initial;
     min-height: initial;
     box-shadow: initial;
     background: initial;
     page-break-after: always;
    }
    }
</style>
    </head>
    <body>
    <div id="page" class="page">
    <div class="header">
        <div class="logo"><img src="../images/logo.jpg"/></div>
        <div class="company">C.Ty TNHH Salomon</div>
    </div>
  <br/>
  <div class="title">
        HÓA ĐƠN THANH TOÁN
        <br/>
        -------oOo-------
  </div>
  <br/>
  <br/>
  <table class="TableData">
    <tr>
      <th>STT</th>
      <th>Tên</th>
      <th>Đơn giá</th>
      <th>Số</th>
      <th>Thành tiền</th>
    </tr>
   
    <tr>
      <td colspan="4" class="tong">Tổng cộng</td>
      <td class="cotSo"><?php echo number_format(($tongsotien),0,",",".")?></td>
    </tr>
  </table>
  <div class="footer-left"> Cần thơ, ngày 16 tháng 12 năm 2014<br/>
    Khách hàng </div>
  <div class="footer-right"> Cần thơ, ngày 16 tháng 12 năm 2014<br/>
    Nhân viên </div>
</div>
    </body>
  </html>
`);
  res.set("Content-Type", "application/pdf");
  res.send(pdf);
};
module.exports = {
  screenShot,
};
