const Students = require("../models/students");
var XLSX = require("xlsx");
const json2xls = require('json2xls');
const objectstocsv = require('objects-to-csv');
const excelJS = require("exceljs");
var path   = require('path');
const CsvParser = require("json2csv").Parser;

//  Create Student API


exports.createstudents =  (req, res) => {
    const user =  new Students(req.body)
    user.save().then(() =>{
        res.status(200).json({
            status:"Success",
            data: user
        });
    }).catch((e) =>{
        res.status(400).json({
            status:"Failed",
            error: e
        });
    })
}



//  Create Student API

exports.bulkuploadstudents = (req, res) => {

    try{
    user = req.body
        Students.insertMany(user).then(() =>{
            res.status(200).json({
                status:"Success",
                data: user
            });
        }).catch((e) =>{
            res.status(400).json({
                status:"Failed",
                error: e
            });
        })
    }catch(e){
        res.status(400).json({
            status:"Failed",
            error: e
        });
    }
    //const user =  new Students(req.body)
  
}


//  Get Student API
exports.getstudents = async (req, res) =>{
    try{
        const studentsdata = await Students.find();
        res.status(200).json({
            status:"Success",
            data:studentsdata
        });
    }catch(e){
        res.status(404).json({
            status:"Fail",
            error: e
        });
    }
}


//  Get Student by id API

exports.getstudentsbyid =  async (req, res) =>{
    try{
        const _id = req.params.id;
        const studentdata = await Students.findById(_id);
        if (!studentdata) {
            res.status(404)
            return res.send("Id not found")
        }else{
            res.status(200).json({
                status:"Success",
                data: studentdata
            });
        }
    }catch(e){
        res.status(404).json({
            status:"Fail",
            error: e
        });
    }
}

//  Delete Student API

exports.deletestudent = async (req, res) =>{
    try{
        const _id = req.params.id;
        const studentdata = await Students.findByIdAndDelete(_id);
        if (!studentdata) {
            res.status(404)
            return res.send(studentdata);
        }else{
            res.status(200).json({
                status:"Success",
                data: studentdata
            });
        }
    }catch(e){
        res.status(404).json({
            status:"Fail",
            error: e
        });
    }
}

//  Update Student API

exports.updatestudent = async (req, res) =>{
    try{
        const _id = req.params.id;
        const studentdata = await Students.findByIdAndUpdate(_id, req.body, {
            new:true
        });
        if (!studentdata) {
            res.status(404).json({
                status:"Fail",
                statusmsg: "Id not Found"
            });
        }else{
            res.status(200).json({
                status:"Success",
                data: studentdata
            });
        }
    }catch(e){
        res.status(404).json({
            status:"Fail",
            error: e
        });
    }
}

exports.bulkdatabyexcel =  (req, res) => {
   // const user =  new Students(req.body);
   //const studentsdata = await Students.find();
  // const file = XLSX.readFile(req);
 // console.log(file);
// let data = []
  console.log(req.file);
//  const sheets = req.SheetNames
//   console.log(sheets);
// for(let i = 0; i < sheets.length; i++)
// {
//    const temp = reader.utils.sheet_to_json(
//         file.Sheets[file.SheetNames[i]])
//    temp.forEach((res) => {
//       data.push(res)
//    })
// }
  //res.send(JSON.stringify(req))
// Printing data
 //console.log(data)

   //console.log("hii");
    //console.log(req);
    //let readdata =  XLSX.readFile(file);

    //console.log(readdata);
    //res.send(req);
    // user.save().then(() =>{
    //     res.status(200).json({
    //         status:"Success",
    //         data: user
    //     });
    // }).catch((e) =>{
    //     res.status(400).json({
    //         status:"Failed",
    //         error: e
    //     });
    // })
}


exports.exportdatainexcel =  async (req, res) => {


   // const studentsdata = await Students.find();

    var wb = XLSX.utils.book_new(); //new workbook
    Students.find((err,data)=>{
        if(err){
            console.log(err)
        }else{
            var temp = JSON.stringify(data);
            temp = JSON.parse(temp);
            var ws = XLSX.utils.json_to_sheet(temp);
            var down = __dirname+'/file/exportdata.xlsx'
           XLSX.utils.book_append_sheet(wb,ws,"sheet1");
           XLSX.writeFile(wb,down);
           res.download(down);
        }
    });

 }



 exports.exportdataincsv =  async (req, res) => {

    // const studentsdata = await Students.find();
 
   
     Students.find((err,data)=>{
         if(err){
             console.log(err)
         }else{
            const csvFields = ["_id", "name", "email", "number", "address"];
            const csvParser = new CsvParser({ csvFields });
            const csvData = csvParser.parse(data);
            res.setHeader("Content-Type", "text/csv");
            res.setHeader("Content-Disposition", "attachment; filename=tutorials.csv");
            res.status(200).end(csvData);
         }
     });
 
  }