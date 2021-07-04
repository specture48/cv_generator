const express = require("express");
import PDFDocument from 'pdfkit'

const router = express.Router();
const {Base64Encode} = require('base64-stream');

const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.post("/pdf", (req, res) => {
  let data = req.body
  const isPreview = data.isPreview

  if (!isPreview) {
    res.setHeader('Content-disposition', 'attachment; filename="' + 'filename' + '"')
    res.setHeader('Content-type', 'application/pdf')
  }

  let doc = new PDFDocument();

  if (!isPreview) {
    doc.pipe(res)
  }

  let base64String = ''; // contains the base64 string
  let stream;

  if (isPreview) {
     stream = doc.pipe(new Base64Encode());
  }


//
//   // Fit the image in the dimensions, and center it both horizontally and vertically
//   // doc.image('assets/a.jpg', 430, 15, {fit: [100, 100], align: 'justify', valign: 'center'})
  // doc.image('assets/a.jpg', 0, 15, {width: 150,height:150})
//   // doc.image(data.img, 430, 100, {fit:[100,100],width: 150,height:150})
//   // doc.image('assets/a.jpg', 430, 100, {fit:[100,100],width: 150,height:150})
//

  doc.fontSize(25).text(data.personalInfo.name, {align: 'center'});
  doc.moveDown()
  doc.fontSize(14).text(data.personalInfo.city);
  doc.fontSize(14).text(data.personalInfo.phone);
  doc.fontSize(14).text(data.personalInfo.email);
  doc.moveDown()

  doc.fontSize(20).text('About', {align: 'justify'});
  doc.fontSize(12).text(data.personalInfo.about, {align: 'justify'})
  doc.moveDown()



//education
  if (data.edu.length > 0) {
    doc.moveDown()
    doc.fontSize(20).text('Education');
    data.edu.forEach(element => console.log(element));
    data.edu.forEach((element, index) => {
      let singleEdu = element.graduation_year + ' ' + element.institution + ' ' + element.degree + ' ' + element.study_field
      doc.fontSize(12).text(singleEdu);
      doc.moveDown(0.3)
    })
  }
//
//
//
//   //work experience
  if (data.emp.length > 0) {
    doc.moveDown()
    doc.fontSize(20).text('Work Experience');
    data.emp.forEach((element, index) => {
      let singleEmp = element.industry +
        ' ' + element.job_title
        + ' ' + element.company_name
        + ' ' + element.job_category
        + ' ' + element.job_subcategory
      doc.fontSize(12).text(singleEmp);
      doc.moveDown(0.2)
      doc.fontSize(12).text(element.job_description)
      doc.moveDown()
    })
  }
//
//skills
  if (data.skills.length > 0) {
    doc.moveDown()
    doc.fontSize(20).text('Skills');
    doc.fontSize(12)
    doc.list(data.skills.map(item => item))
    doc.moveDown()
  }

  //languages
  if (data.languages.length > 0) {
    doc.moveDown()
    doc.fontSize(20).text('Languages');
    doc.fontSize(12)
    doc.list(data.languages)
    doc.moveDown()
  }

  doc.end()

  if (isPreview) {
    stream.on('data', function (chunk) {
      base64String += chunk;
    });

    stream.on('end', function () {
      // the stream is at its end, so push the resulting base64 string to the response
      res.json(base64String);
    });
  }
});

module.exports = {
  path: '/api',
  handler: router
}
