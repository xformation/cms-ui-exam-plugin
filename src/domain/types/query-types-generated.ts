import {any} from 'prop-types';

export type AcExamSettingListQuery = {
  // Return all known Pet Institutes
  acExamSettings: Array<{
    id: any;
    examName: String;
    action: String;
    sbjct: String;
    examDate: Date;
    departmnt: String;
    bctch: String;
    sectn: String;
    st: String;
    ed: String;
    countvalue: any;
  }>;
};

export type AcExamSettingQueryVariables = {
  acExamSettingId: any;
};

export type AcExamSettingQuery = {
  acExamSetting: {
    id: any;
    examName: String;
    action: String;
    sbjct: String;
    examDate: Date;
    departmnt: String;
    bctch: String;
    sectn: String;
    st: String;
    ed: String;
    countvalue: any;
  };
};

export type AcExamSettingFragment = {
  id: any;
  examName: String;
  action: String;
  sbjct: String;
  examDate: Date;
  departmnt: String;
  bctch: String;
  sectn: String;
  st: String;
  ed: String;
  countvalue: any;
};

export type AcExamSettingDetailsFragment = {
  id: any;
  examName: String;
  action: String;
  sbjct: String;
  examDate: Date;
  departmnt: String;
  bctch: String;
  sectn: String;
  st: String;
  ed: String;
  countvalue: any;
};

export type AcExamSettingSummaryFragment = {
  id: any;
  examName: String;
  action: String;
  subject: String;
  examDate: Date;
  departmnt: String;
  bctch: String;
  sectn: String;
  st: String;
  ed: String;
  countvalue: any;
};

// grading

export type TypeOfGradings = {
  typeOfGradings: Array<{
    id: any;
    minMarks: string;
    maxMarks: string;
    grades: string;
    groupvalue: any;
  }>;
};

export type LoadExamSubjQueryCacheForAdmin = {
  createExamFilterDataCache: {
    branches: Array<{
      id: number;
      branchName: string;
    }>;
    departments: Array<{
      id: number;
      name: string;
      branch: {
        id: number;
      };
      academicyear: {
        id: number;
      };
    }>;
    batches: Array<{
      id: number;
      batch: string;
      department: {
        id: number;
      };
    }>;
    academicExamSettings: Array<{
      id: number;
      examName: string;
      total: number;
      batch: {
        id: number;
      };
    }>;
    sections: Array<{
      id: number;
      section: string;
      batch: {
        id: number;
      };
    }>;
    subjects: Array<{
      id: number;
      subjectCode: string;
      batch: {
        id: number;
      };
    }>;
    semesters: Array<{
      id: number;
      description: string;
    }>;
  };
};

export type AcdemicExamSettingQueryVariables = {
  academicExamSettingId: any;
};

export type AddExamMutation = {
  addAcademicExamSetting: Array<{
    examName: String;
    actions: String;
    total: number;
    passing: number;
    subject: {
      id: number;
      subjectDesc: string;
    };
    startTime: String;
    endTime: String;
    examDate: Date;
    semester: String;
    gradeType: String;
    batch: {
      id: number;
      branchName: string;
    };
    section: {
      id: number;
    };
    branch: {
      id: number;
      branchName: string;
    };
    department: {
      id: number;
      name: string;
    };
    academicyear: {
      id: number;
      year: string;
    };
  }>;
};

export type ExamListQueryTypeForAdmin = {
  getSubjectandStudents: Array<{
    id: any;
    marksObtained: any;
    comments: any;
    createdBy: any;
    updatedBy: any;
    typeOfGrading: {
      id: any;
      minMarks: any;
      maxMarks: any;
      grades: any;
    };
    academicExamSetting: {
      id: any;
      gradeType: any;
      total: any;
      examName: any;
    };
    student: {
      id: any;
      studentName: any;
      rollNo: any;
    };
    academicyear: {
      id: any;
      year: any;
    };
  }>;
};
export type StudentReportQueryTypeForAdmin = {
  searchStudentExamReport: Array<{
    id: number;
    marksObtained: number;
    comments: String;
    actions: String;

    typeOfGradingId: any;
    studnet: {
      id: any;
      studentName: String;
      rollNo: any;
    };
    batch: {
      id: number;
    };
    academicExamSetting: {
      id: number;
      total: number;
      examName: String;
    };
    academicyear: {
      id: number;
      year: string;
    };
  }>;
};

export type AddReportMutation = {
  addAcademicExamSettingData: {
    statusCode: string;
    statusDesc: string;
  };
};

// export type AddReportMutation = {
//   addStudentExamReport: Array<{
//     marksObtained: any;
//     comments: any;

//     studnet: {
//       id: any;
//       studentName: any;
//       rollNo: any;
//     };
//     academicExamSetting: {
//       id: any;
//     };
//     typeOfGrading: {
//       id: any;
//     };
//     batch: {
//       id: any;
//     };
//     academicyear: {
//       id: any;
//       year: any;
//     };
//   }>;
// };
export type AddTypeOfGrading = {
  addTypeOfGrading: Array<{
    id: number;
    minMarks: number;
    maxMarks: number;
    grades: string;
  }>;
};
