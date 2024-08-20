var express = require('express');
var router = express.Router();
var Faculty = require('../models/Faculty');
const { ensureAdmin } = require('../middleware/ensureLogin');
//process minute form
// POST /minutes/add

router.use('/save', ensureAdmin, async (req, res, next) => {
  try {
    const faculties = [
      {
        name: 'Computer Engineering',
        courses: [
          {
            semester: 1,
            subjects: [
              'Mathematics I [SH401]',
              'Computer Programming [CT401]',
              'Engineering Drawing I [ME401]',
              'Engineering Physics [SH452]',
              'Applied Mechanics [CE451]',
              'Basic Electrical Engineering [EE451]',
            ],
          },
          {
            semester: 2,
            subjects: [
              'Mathematics II [SH451]',
              'Engineering Drawing II [ME451]',
              'Basic Electronics Engineering [EX451]',
              'Engineering Chemistry [SH403]',
              'Fundamental of Thermodynamics & Heat Transfer [ME402]',
              'Workshop Technology',
            ],
          },
          {
            semester: 3,
            subjects: [
              'Mathematics III [SH501]',
              'Object Oriented Programming [CT 501]',
              'Electrical Circuit Theory [EE 501]',
              'Theory of Computation [CT 502]',
              'Electronics Devices and Circuit [EX 501]',
              'Digital Logic [EX 502]',
              'Electromagnetism [EX 503]',
            ],
          },
          {
            semester: 4,
            subjects: [
              'Electrical Machine [EE 554]',
              'Numerical Method [SH 553]',
              'Applied Mathematics [SH 551]',
              'Instrumentation I [EE 552]',
              'Data Structure and Algorithm [CT 552]',
              'Microprocessor [EX 551]',
              'Discrete Structure [CT 551]',
            ],
          },
          {
            semester: 5,
            subjects: [
              'Communication English [EG604SH]',
              'Probability and Statistics',
              'Computer Organization and Architecture',
              'Software Engineering',
              'Computer Graphics',
              'Instrumentation II',
              'Data Communication',
            ],
          },
          {
            semester: 6,
            subjects: [
              'Engineering Economics [CE 655]',
              'Object Oriented Analysis and Design [CT 651]',
              'Artificial Intelligence [CT 653]',
              'Operating System [CT656]',
              'Embedded System [CT 655]',
              'Database Management System [CT 652]',
              'Minor Project',
            ],
          },
          {
            semester: 7,
            subjects: [
              'ICT Project Management',
              'Organization and Management [ME 708]',
              'Energy Environment and Society',
              'Distributed System',
              'Computer Networks and Security',
              'Digital Signal Analysis and Processing',
              'Elective I',
              'Project I',
            ],
          },
          {
            semester: 8,
            subjects: [
              'Engineering Professional Practice',
              'Information System',
              'Internet and Intranet',
              'Simulation and Modeling',
              'Elective II',
              'Elective III',
              'Project II',
            ],
          },
        ],
      },
      {
        name: 'Aerospace Engineering',
        courses: [
          {
            semester: 1,
            subjects: [
              'Mathematics I',
              'Applied Mechanics',
              'Engineering Drawing I',
              'Engineering Physics',
              'Basic Electrical Engineering',
              'Workshop Technology',
            ],
          },
          {
            semester: 2,
            subjects: [
              'Mathematics II',
              'Engineering Drawing II',
              'Basic Electronics Engineering',
              'Engineering Chemistry',
              'C Programming',
              'Fundamental of Thermodynamics & Heat Transfer',
            ],
          },
          {
            semester: 3,
            subjects: [
              'Applied Thermodynamics and Heat Transfer',
              'Computer Aided Design and Manufacturing',
              'Engineering Mechanics',
              'Fluid Mechanics',
              'Fundamental of Aerospace Engineering',
              'Engineering Mathemathics III',
            ],
          },
          {
            semester: 4,
            subjects: [
              'Theory of Mechanism and Machine I',
              'Aerodynamics',
              'Aerospace Materials',
              'Control System',
              'Probabillity and Statistics',
              'Strength of Materials',
            ],
          },
          {
            semester: 5,
            subjects: [
              'Aircraft Manufacturing Process',
              'Aircraft Propulsion',
              'Continuum Mechanics',
              'Fault Monitoring and Diagnosis',
              'Numerical Methods',
              'Theory of Vibration',
            ],
          },
          {
            semester: 6,
            subjects: [
              'Avionics',
              'Finite Element Method',
              'Aircraft Maintenance Engineering',
              'Aircraft Environment Control System',
              'Flight Dynamics',
              'Unmanned Air Vehicle Synthesis',
            ],
          },
          {
            semester: 7,
            subjects: [
              'Aircraft Preliminary Design',
              'Computational Fluid Dynamics',
              'Air Traffic Management',
              'Aircraft Structures',
              'Embedded Systems in Avionics',
              'Project(Part I)',
              'Elective I',
            ],
          },
          {
            semester: 8,
            subjects: [
              'Internship',
              'Aviation Professional Practices',
              'Factor in Aviation',
              'Elective II',
              'Elective III',
              'Project(Part II)',
            ],
          },
        ],
      },
      {
        name: 'Civil Engineering',
        courses: [
          {
            semester: 1,
            subjects: [
              'Engineering Mathematics I [SH401]',
              'Engineering Drawing I [ME401]',
              'Engineering Chemistry [SH403]',
              'Fundamental of Thermodynamics & Heat Transfer [ME402]',
              'Computer Programming [CT401]',
              'Workshop Technology',
            ],
          },
          {
            semester: 2,
            subjects: [
              'Applied Mechanics [CE451]',
              'Engineering Mathematics II [SH451]',
              'Engineering Physics [SH452]',
              'Basic Electronics Engineering [EX451]',
              'Engineering Drawing II [ME451]',
              'Basic Electrical Engineering [EE451]',
            ],
          },
          {
            semester: 3,
            subjects: [
              'Civil Engineering Materials [CE506]',
              'Engineering Mathematics III [SH501]',
              'Applied Mechanics (Dynamics) [CE503]',
              'Engineering Geology I [CE503]',
              'Strength of Materials [CE 502]',
              'Surveying I [CE 504]',
              'Fluid Mechanics [CE505]',
            ],
          },
          {
            semester: 4,
            subjects: [
              'Hydraulics [CE555]',
              'Surveying II [CE554]',
              'Theory of Structure [CE551]',
              'Probability & Statistics [SH552]',
              'Engineering Geology [CE553]',
              'Building Drawing [CE556]',
              'Soil Mechanics [CE552]',
            ],
          },
          {
            semester: 5,
            subjects: [
              'Theory of Structures II [CE601]',
              'Water Supply Engineering [CE605]',
              'Engineering Hydrology [CE606]',
              'Concrete Technology and Masonry Structure [CE603]',
              'Numerical Methods [SH603]',
              'Foundation Engineering [CE602]',
            ],
          },
          {
            semester: 6,
            subjects: [
              'Design of Steel and Timber Structure [CE651]',
              'Communication English [SH651]',
              'Engineering Economics [CE655]',
              'Building Technology [CE652]',
              'Sanitary Engineering [CE656]',
              'Transportation Engineering [CE653]',
              'Irrigation and Drainage [CE654]',
              'Survey Camp',
            ],
          },
          {
            semester: 7,
            subjects: [
              'Hydropower Engineering [CE704]',
              'Project Engineering [CE701]',
              'Transportation Engineering II [CE703]',
              'Estimating & Costing [CE705]',
              'Elective I [CE725]',
              'Design of RCC Structure [CE702]',
            ],
          },
          {
            semester: 8,
            subjects: [
              'Computational Techniques in Civil Engineering',
              'Engineering Professional Practice',
              'Technology Environment and Society',
              'Construction Management',
              'Project (Part II)',
              'Elective II',
              'Elective III',
            ],
          },
        ],
      },
      {
        name: 'Electronics and Communication Engineering',
        courses: [
          {
            semester: 1,
            subjects: [
              'Mathematics I',
              'Computer Programming',
              'Engineering Drawing I',
              'Engineering Physics',
              'Applied Mechanics',
              'Basic Electrical Engineering',
            ],
          },
          {
            semester: 2,
            subjects: [
              'Mathematics II',
              'Engineering Drawing II',
              'Basic Electronics Engineering',
              'Engineering Chemistry',
              'Fundamental of Thermodynamics & Heat Transfer',
              'Workshop Technology',
            ],
          },
          {
            semester: 3,
            subjects: [
              'Mathematics III',
              'Object Oriented Programming',
              'Electrical Circuit Theory',
              'Electrical Engineering Material',
              'Electronics Devices and Circuit',
              'Digital Logic',
              'Electromagnetism',
            ],
          },
          {
            semester: 4,
            subjects: [
              'Electrical Machine',
              'Numerical Method',
              'Applied Mathematics',
              'Instrumentation I',
              'Power System',
              'Microprocessor',
              'Discrete Structure',
            ],
          },
          {
            semester: 5,
            subjects: [
              'Communication English',
              'Probability and Statistics',
              'Computer Organization and Architecture',
              'Control System',
              'Advanced Electronics',
              'Instrumentation II',
              'Computer Graphics',
            ],
          },
          {
            semester: 6,
            subjects: [
              'Engineering Economics',
              'Signal Analysis',
              'Communication System I',
              'Antenna and Propagation',
              'Embedded System',
              'Computer Networks',
              'Minor Project',
            ],
          },
          {
            semester: 7,
            subjects: [
              'Project Management',
              'Organization and Management',
              'Energy Environment and Society',
              'Filter Design',
              'Communication System II',
              'Telecommunication',
              'Elective I',
              'Project (Part A)',
            ],
          },
          {
            semester: 8,
            subjects: [
              'Engineering Professional Practice',
              'Digital Signal Processing',
              'Wireless Communication',
              'RF and Microwave Engineering',
              'Elective II',
              'Elective III',
              'Project (Part B)',
            ],
          },
        ],
      },
      {
        name: 'Architecture',
        courses: [
          {
            semester: 1,
            subjects: [
              'Engineering Mathematics I',
              'Applied Mechanics',
              'Basic Design I',
              'Introduction to Architecture',
              'Building Materials I',
              'Drafting I',
              'Free Hand Sketching I',
            ],
          },
          {
            semester: 2,
            subjects: [
              'Engineering Mathematics II',
              'Drafting II',
              'Basic Design II',
              'Free Hand Sketching II',
              'Art and Graphics II',
              'Building Construction I',
              'Basic Skill Workshop',
            ],
          },
          {
            semester: 3,
            subjects: [
              'Design Studio III',
              'Theory I',
              'Building Materials II',
              'Building Science II',
              'Freehand Sketch II',
              'Building Construction II',
              'History of Western Architecture',
              'Structures I',
            ],
          },
          {
            semester: 4,
            subjects: [
              'Design Studio IV',
              'Theory II',
              'Building Services I',
              'Building Construction III',
              'History of Eastern Architecture',
              'Structures II',
              'Survey I',
            ],
          },
          {
            semester: 5,
            subjects: [
              'Design Studio V',
              'Theory III',
              'Building Services II',
              'Building Construction IV',
              'History of Nepalese Architecture',
              'Structures III',
              'Survey II',
            ],
          },
          {
            semester: 6,
            subjects: [
              'Design Studio VI',
              'Working Drawings',
              'History of Modern Architecture & Human Settlement Planning I (Urban)',
              'Estimating',
              'Specifications',
              'Sociology/Economics',
            ],
          },
          {
            semester: 7,
            subjects: [
              'Design Studio VII',
              'Building Science III',
              'Architecture Conservation',
              'Human Settlement Planning II (Rural)',
              'Computer Aided Design',
              'Structures IV',
              'Electives',
            ],
          },
          {
            semester: 8,
            subjects: [
              'Design Studio VIII',
              'Building Construction V',
              'Construction Management',
              'Seminar',
              'Directed Studies',
              'Structures V',
              'Electives',
            ],
          },
          {
            semester: 9,
            subjects: ['Thesis', 'Professional Practice'],
          },
        ],
      },
      {
        name: 'Mechanical Engineering',
        courses: [
          {
            semester: 1,
            subjects: [
              'Mathematics I',
              'Computer Programming',
              'Engineering Drawing I',
              'Engineering Chemistry',
              'Fundamental of Thermodynamics & Heat Transfer',
              'Workshop Technology',
            ],
          },
          {
            semester: 2,
            subjects: [
              'Mathematics II',
              'Engineering Drawing II',
              'Basic Electronics Engineering',
              'Engineering Physics',
              'Basic Electrical Engineering',
              'Applied Mechanics',
            ],
          },
          {
            semester: 3,
            subjects: [
              'Mathematics III',
              'Material Science',
              'Engineering Mechanics',
              'Metrology',
              'Applied Thermodynamics',
              'Computer Aided Drawing',
              'Electromagnetism',
            ],
          },
          {
            semester: 4,
            subjects: [
              'Probability And Statistics',
              'Electrical Machine',
              'Manufacturing And Production Processes',
              'Strength of Materials',
              'Instrumentation and Measurement',
              'Fluid Mechanics',
            ],
          },
          {
            semester: 5,
            subjects: [
              'Numerical Methods',
              'Control System',
              'Organization and Management',
              'Mechanics of Solids',
              'Heat Transfer',
              'Fluid Machines',
            ],
          },
          {
            semester: 6,
            subjects: [
              'Communication English',
              'Machine Design I',
              'Industrial Engineering and Management',
              'Theory of Mechanism and Machine I',
              'Internal Combustion Engines',
              'Energy Resources',
            ],
          },
          {
            semester: 7,
            subjects: [
              'Machine Design II',
              'Theory of Mechanism and Machine II',
              'Engineering Economics',
              'Turbo Machines',
              'Environment and Pollution Control',
              'Industrial Attachment',
            ],
          },
          {
            semester: 8,
            subjects: [
              'Project Engineering',
              'Finite Element Method',
              'Engineering Professional Practice',
              'Project I & II',
            ],
          },
        ],
      },
      {
        name: 'Electrical Engineering',
        courses: [
          {
            semester: 1,
            subjects: [
              'Engineering Mathematics I',
              'Computer Programming',
              'Engineering Drawing I',
              'Engineering Physics',
              'Applied Mechanics',
              'Basic Electrical Engineering',
            ],
          },
          {
            semester: 2,
            subjects: [
              'Mathematics II',
              'Engineering Drawing',
              'Basic Electronics Engineering',
              'Chemistry',
              'Fundamental of Thermodynamics',
              'Workshop Technology',
            ],
          },
          {
            semester: 3,
            subjects: [
              'Mathematics III',
              'Object Oriented Programming',
              'Electric Circuit Theory',
              'Electrical Engineering Material',
              'Electronics Devices and Circuits',
              'Digital Logic',
              'Electromagnetic',
            ],
          },
          {
            semester: 4,
            subjects: [
              'Electrical Machine I',
              'Numerical Method',
              'Applied Mathematics',
              'Instrumentation I',
              'Power System Analysis I',
              'Microprocessor',
            ],
          },
          {
            semester: 5,
            subjects: [
              'Communication English',
              'Probability and Statistic',
              'Control System',
              'Instrumentation II',
              'Power System Analysis II',
              'Electrical Machine Design',
              'Electrical Machine II',
            ],
          },
          {
            semester: 6,
            subjects: [
              'Engineering Economics',
              'Digital Control System',
              'Signal Analysis',
              'Switchgear and Protection',
              'Industrial Distribution and Illumination',
              'Hydro Power',
            ],
          },
          {
            semester: 7,
            subjects: [
              'Project Engineering',
              'Organization and Management',
              'Technology Environment and Society',
              'Power Electronics',
              'Utilization of Electrical Energy',
              'Elective I',
              'Power Plant Equipment',
              'Project (Part A)',
            ],
          },
          {
            semester: 8,
            subjects: [
              'Engineering Professional Practice',
              'High Voltage Engineering',
              'Power Plant Design',
              'Transmission and Distribution Design',
              'Elective II',
              'Elective III',
              'Project (Part B)',
            ],
          },
        ],
      },
      // Add other faculties here
    ];

    let allFacultiesExist = true;

    for (const faculty of faculties) {
      const existingFaculty = await Faculty.findOne({ name: faculty.name });

      if (existingFaculty) {
        let isDuplicate = true;

        // Check for exact match of subjects across semesters
        for (let i = 0; i < faculty.courses.length; i++) {
          const existingCourse = existingFaculty.courses.find(
            course => course.semester === faculty.courses[i].semester
          );
          
          if (
            !existingCourse || 
            JSON.stringify(existingCourse.subjects) !== JSON.stringify(faculty.courses[i].subjects)
          ) {
            isDuplicate = false;
            allFacultiesExist = false; // If any faculty is different, mark it as not completely duplicate
            break;
          }
        }

        if (!isDuplicate) {
          allFacultiesExist = false;
          // Save the faculty if subjects are different
          const newFaculty = new Faculty(faculty);
          await newFaculty.save();
        }
      } else {
        allFacultiesExist = false;
        // Save the faculty if it doesn't exist at all
        const newFaculty = new Faculty(faculty);
        await newFaculty.save();
      }
    }

    if (allFacultiesExist) {
      res.status(200).send({message:'Faculties have already been added.'});
    } else {
      res.status(200).send({message:'All new faculties have been saved successfully.'});
    }
  }
  catch (err) {
    console.error('Error saving faculties:', err);
    res.status(500).send({message:'Error saving faculties.'});
  }
});

router.use('/getall', async (req, res, next) => {
  const all = await Faculty.find({});
  global.faculty = all;
});

module.exports = router;

//TO-DO
