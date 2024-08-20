var express = require('express');
var router = express.Router();
var Project = require('../models/Project');
var Event = require('../models/Event');
var File = require('../models/File');
var { loggedin } = require('../middleware/ensureLogin');
var upload = require('../middleware/multer');
var fs = require('fs');
var path = require('path');
var stream = require('stream');
const DefenseCall = require('../models/DefenseCall');
const moment = require('moment-timezone');

router.post('/createteams', function (req, res, next) {
  //console.log(teamname)
  var projectname = req.body.projectname;
  var description = req.body.description;
  // var std = req.body.std;
  var teamname = req.body.teamname;
  var username = req.user.username;
  var semester = req.body.sems;
  var faculty = req.body.faculty;
  var subject = req.body.subject;
  var level = req.body.level;
  if (level == 'masters') {
    semester = 'unselected';
    faculty = 'unselected';
    subject = 'unselected';
  }

  (supervisor = [req.body.supervisor1, req.body.supervisor2]),
    (team = [
      req.body.std1,
      req.body.std2,
      req.body.std3,
      req.body.std4,
      req.body.std5,
    ]);

  // team=["Ranju G.C.","Rahul Shah","Supriya Khadka","Prabin Paudel"]
  if (!projectname) {
    errors.push({
      msg: 'Please fill in all fields',
    });
  }
  console.log('1', req.body.std1);
  console.log('2', req.body.std2);
  console.log('3', req.body.std3);
  console.log('4', req.body.std4);
  console.log('5', req.body.std5);
  console.log('teamname', team);
  const project = new Project();
  project.projectname = projectname;
  project.description = description;
  project.supervisor = supervisor;
  project.team = team;
  project.createdBy = req.user.email;
  project.updatedBy = req.user.email;
  project.faculty = faculty;
  project.semester = semester;
  project.subject = subject;
  project.teamname = teamname;
  project.level = level;
  Project.createProject(project, function (err, projects) {
    //Save to database
    if (err) {
      console.log(err);
      res.status(500).send('Database error occured');
    } else {
      res.redirect('/dashboard');
    }
  });
});

router.post('/editteams/:pId', function (req, res, next) {
  pId = req.params.pId;
  var projectname = req.body.projectname;
  var description = req.body.description;
  // var std = req.body.std;
  var teamname = req.body.teamname;
  var semester = req.body.sems;
  var username = req.user.username;
  (supervisor = [req.body.supervisor1, req.body.supervisor2]),
    (team = [
      req.body.std1,
      req.body.std2,
      req.body.std3,
      req.body.std4,
      req.body.std5,
    ]);
  // team=["Ranju G.C.","Rahul Shah","Supriya Khadka","Prabin Paudel"]
  if (!projectname) {
    errors.push({
      msg: 'Please fill in all fields',
    });
  }

  const project = new Project();
  project.projectname = projectname;
  project.description = description;
  project.supervisor = supervisor;
  project.team = team;
  project.createdBy = req.user.email;
  project.updatedBy = req.user.email;
  // project.faculty = faculty;
  project.semester = semester;
  // project.subject = subject;
  project.teamname = teamname;
  console.log(project);
  Project.updateProject(pId, project, function (err, projects) {
    //Save to database
    if (err) {
      console.log(err);
      res.status(500).send('Database error occured');
    } else {
      res.redirect('/dashboard');
    }
  });
});

router.post(
  '/uploadFiles/:projectId',
  upload.array('uploadedFiles', 10),
  (req, res, next) => {
    //console.log(teamname)
    var pId = req.params.projectId;
    try {
      console.log(JSON.stringify(req.body));
      let errors = [];

      var uploadedFile = new Array();
      for (let i = 0; i < req.files.length; i++) {
        var data = {
          name: req.files[i].filename,
          fileId: ID(),
          docs: {
            data: fs.readFileSync(
              path.join(
                __dirname,
                '..' + '/public/uploads/' + req.files[i].filename
              )
            ),
            contentType: req.files[i].mimetype,
          },
        };
        uploadedFile.push(data);
      }

      const file = new File();
      file.projectId = req.params.projectId;
      file.title = req.body.title;
      file.description = req.body.description;
      file.attachment = uploadedFile;

      File.addFile(file, function (err, projects) {
        //Save to database
        if (err) {
          console.log(err);
          res.status(500).send('Database error occured');
        } else {
          res.redirect('/dashboard');
        }
      });
    } catch (err) {
      req.flash('message', 'Unexpected error'.concat(err));
      // res.redirect("/student/eachProject/" + pId);
      res.render(err);
      // res.redirect("/student/eachProject");
      // res.render
    }
  }
);

var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

router.get('/files/download', function (req, response) {
  console.log(req.query);
  File.findOne(
    {
      'attachment.fileId': req.query.data,
    },
    function (err, file) {
      console.log(file);
      if (err) {
        return next(err);
      } else {
        file.attachment.forEach((element) => {
          if (element.fileId == req.query.data) {
            let fileType = element.docs.contentType;
            let fileName = element.name.substring(
              element.name.indexOf('-') + 1
            );
            let fileData = element.docs.data;

            var fileContents = Buffer.from(fileData, 'base64');
            var readStream = new stream.PassThrough();
            readStream.end(fileContents);

            response.set(
              'Content-disposition',
              'attachment; filename=' + fileName
            );
            response.set('Content-Type', fileType);

            readStream.pipe(response);
          }
        });
      }
    }
  );
});

router.post('/event/save/:pId', (req, res, next) => {
  try {
    console.log(JSON.stringify(req.body));
    let errors = [];

    var title = req.body.title;
    var dueDate = new Date(req.body.eventDate);
    dueDate.setHours(23);
    dueDate.setMinutes(59);
    dueDate.setSeconds(59);
    var description = req.body.description;
    var pId = req.params.pId;
    if (!title) {
      errors.push({
        msg: 'Add event field cannot be empty!',
      });
    }

    // var mId = mongoose.Types.ObjectId(req.params.mId);

    const event = new Event();
    event.projectId = pId;
    event.event = title;
    event.dueDate = dueDate;
    event.createdBy = req.user.username;
    event.description = description;
    console.log(event);

    Event.createEvent(event, function (err, events) {
      //Save to database
      if (err) {
        console.log(err);
        req.flash('message', 'Error Saving Event');
        if (req.user.userstatus == 'student') {
          res.redirect('/student/eachProject/'.concat(pId));
        } else if (req.user.userstatus == 'teacher') {
          res.redirect('/teacher/eachProject/'.concat(pId));
        }
      } else {
        req.flash('message', 'Event Added');
        if (req.user.userstatus == 'student') {
          res.redirect('/student/eachProject/'.concat(pId));
        } else if (req.user.userstatus == 'teacher') {
          res.redirect('/teacher/eachProject/'.concat(pId));
        }
      }
    });
  } catch (err) {
    console.error(err);
  }
});

router.post('/defenceComment/:pId', (req, res, next) => {
  try {
    console.log(JSON.stringify(req.body));
    let errors = [];

    var pId = req.params.pId;

    Project.findById(pId, function (err, project) {
      //Save to database
      console.log(project);
      if (err) {
        console.log(err);
        res.status(500).send('Database error occured');
      } else {
        if (project.midDefence.approved == true) {
          var message = {
            comment: req.body.cmt,
            option: 'final',
            commentedBy: req.user.username,
          };
        } else {
          var message = {
            comment: req.body.cmt,
            option: 'mid',
            commentedBy: req.user.username,
          };
        }
        Project.comment(pId, message, function (err) {
          //Save to database
          if (err) {
            console.log(err);
            res.status(500).send('Database error occured');
          } else {
            if (req.user.userstatus == 'student') {
              res.redirect('/student/eachProject/'.concat(pId));
            } else if (req.user.userstatus == 'teacher') {
              res.redirect('/teacher/eachProject/'.concat(pId));
            }
          }
        });
      }
    });
  } catch (err) {
    console.error(err);
  }
});

router.post('/requestApproveDefence/:pId', loggedin, (req, res, next) => {
  pId = req.params.pId;
  userstatus = req.user.userstatus;
  console.log(userstatus);
  var message = req.body.message;
  Project.findById(pId, function (err, project) {
    //Save to database
    console.log(project);
    if (err) {
      console.log(err);
      res.status(500).send('Database error occured');
    } else {
      if (project.midDefence.approved == true) {
        if (userstatus == 'student') {
          Project.requestFinalDefence(pId, message, function (err, projects) {
            //Save to database
            if (err) {
              console.log(err);
              res.status(500).send('Database error occured');
            }
          });
        } else if (userstatus == 'teacher') {
          Project.approveFinalDefence(pId, function (err, projects) {
            //Save to database
            if (err) {
              console.log(err);
              res.status(500).send('Database error occured');
            }
          });
        }
      } else {
        if (userstatus == 'student') {
          Project.requestMidDefence(pId, message, function (err, projects) {
            //Save to database
            if (err) {
              console.log(err);
              res.status(500).send('Database error occured');
            }
          });
        } else if (userstatus == 'teacher') {
          Project.approveMidDefence(pId, function (err, projects) {
            //Save to database
            if (err) {
              console.log(err);
              res.status(500).send('Database error occured');
            }
          });
        }
      }
      if (req.user.userstatus == 'student') {
        res.redirect('/student/eachProject/'.concat(pId));
      } else if (req.user.userstatus == 'teacher') {
        res.redirect('/teacher/eachProject/'.concat(pId));
      }
    }
  });
});

router.post('/defenseCall', loggedin, async (req, res, next) => {
  try {
    const {
      terms: defenseType,
      level,
      faculty,
      sems: semester,
      subject,
      defenseDate,
      formattedDefenseTime: defenseTime, // Use formatted time with AM/PM
      description,
    } = req.body;

    // Prepare the defense object based on the level
    const defense = {
      term: defenseType,
      level,
      faculty: level === 'masters' ? 'unselected' : faculty,
      defenseDate: new Date(defenseDate),
      defenseTime, // This will now include AM/PM
      description,
      createdBy: req.user._id, // Assuming req.user contains the logged-in user's info
    };

    // Add semester and subject only for bachelors level
    if (level === 'bachelors') {
      defense.semester = parseInt(semester); // Convert semester to a number
      defense.subject = subject;
    }

    // Save defense call data to the DefenseCall collection
    const newDefenseCall = new DefenseCall(defense);
    await newDefenseCall.save();

    // Prepare the query based on the level
    let query = {};

    if (level === 'masters') {
      query.level = 'masters'; // Only filter by level for masters
    } else {
      query = {
        faculty,
        subject,
        semester: parseInt(semester), // Ensure semester is a number
        level: 'bachelors', // Ensure bachelors-level filtering
      };
    }

    // Now find the projects based on the query and update their defense information
    const projects = await Project.find(query);

    for (const project of projects) {
      if (defense.term === 'Mid') {
        await Project.callMidDefence(project._id, defense);
        await Event.findOneAndUpdate(
          { event: 'Mid-Term Defense', projectId: project._id },
          {
            event: 'Mid-Term Defense',
            dueDate: defense.defenseDate,
            createdBy: 'Coordinator',
            description: defense.description,
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      } else if (defense.term === 'Final') {
        await Project.callFinalDefence(project._id, defense);
        await Event.findOneAndUpdate(
          { event: 'Final Defense', projectId: project._id },
          {
            event: 'Final Defense',
            dueDate: defense.defenseDate,
            createdBy: 'Coordinator',
            description: defense.description,
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      }
    }

    // Redirect or send a success response
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send('An error occurred while processing the defense call.');
  }
})
router.get('/defenses/all', async (req, res) => {
  try {
    // Get the current time in the Nepal time zone (UTC +5:45)
    const nepalTime = moment.tz('Asia/Kathmandu');

    // Create the start of the day in Nepal timezone (00:00)
    const todayStartNepalTime = nepalTime.clone().startOf('day').toDate();

    // Create the end of the day in Nepal timezone (23:59)
    const todayEndNepalTime = nepalTime.clone().endOf('day').toDate();

    // Fetch all types of defenses
    const upcomingDefenses = await DefenseCall.find({
      defenseDate: { $gt: todayEndNepalTime }, // Any date after the end of the current day
    }).populate('createdBy', 'name email');

    const ongoingDefenses = await DefenseCall.find({
      defenseDate: { $gte: todayStartNepalTime, $lte: todayEndNepalTime }, // Within today in Nepal timezone
    }).populate('createdBy', 'name email');

    const completedDefenses = await DefenseCall.find({
      defenseDate: { $lt: todayStartNepalTime }, // Any date before the start of the current day
    }).populate('createdBy', 'name email');

    // Send a response containing all three categories
    res.status(200).json({
      message: 'Defenses fetched successfully',
      upcomingDefenses,
      ongoingDefenses,
      completedDefenses,
    });
  } catch (err) {
    console.error('Error fetching defenses:', err);
    res.status(500).send('Error fetching defenses.');
  }
});

router.use('/event/completed/:pId/:id/:title', loggedin, (req, res, next) => {
  Event.Completed(req.params.id, function (err, events) {
    var pId = req.params.pId;
    if (req.params.title == 'Final Defense') {
      Project.completeProject(pId, function (err) {});
    }
    if (err) {
      req.flash('message', 'Cannot Complete task : '.concat(err));
      return next(err);
    } else {
      req.flash('message', 'Task Completed');
      if (req.user.userstatus == 'student') {
        res.redirect('/student/eachProject/'.concat(pId));
      } else if (req.user.userstatus == 'teacher') {
        res.redirect('/teacher/eachProject/'.concat(pId));
      }
    }
  });
});

router.use('/event/remaining/:pId/:id', loggedin, (req, res, next) => {
  Event.Remaining(req.params.id, function (err, events) {
    var pId = req.params.pId;
    if (err) {
      req.flash('message', 'Cannot Complete task : '.concat(err));
      return next(err);
    } else {
      if (req.user.userstatus == 'student') {
        res.redirect('/student/eachProject/'.concat(pId));
      } else if (req.user.userstatus == 'teacher') {
        res.redirect('/teacher/eachProject/'.concat(pId));
      }
    }
  });
});

module.exports = router;
