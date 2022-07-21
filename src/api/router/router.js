const express = require("express");
const router = new express.Router();
const auth = require('../middleware/auth');
const StudentRouter = require('../controllers/students.controller');
const userrouter = require('../controllers/user.controller');

//======================================
//      User API Router start
//======================================


router.post('/registration', userrouter.registration);
router.post('/login', userrouter.login);


//======================================
//      User API Router End
//======================================



//======================================
//      Students API Router start
//======================================

router.post('/createstudents', StudentRouter.createstudents);
router.post('/bulkuploadstudents', StudentRouter.bulkuploadstudents);
router.get('/getstudents', StudentRouter.getstudents);
router.get('/getstudents/:id', auth, StudentRouter.getstudentsbyid);
router.delete('/deletestudent/:id', StudentRouter.deletestudent);
router.patch('/updatestudent/:id', StudentRouter.updatestudent);
router.post('/bulkdatabyexcel', StudentRouter.bulkdatabyexcel);
router.get('/exportdatainexcel', StudentRouter.exportdatainexcel);
router.get('/exportdataincsv', StudentRouter.exportdataincsv);

//======================================
//      Students API Router End
//======================================


module.exports = router;