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
  addAcademicExamSetting: Array<{
    id: number;
    examName: String;
    action: String;
    subject: String;
    endDate: Date;
    startTime: String;
    endTime: String;

    day: String;
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
export type StudentReportQueryTypeForAdmin = {
  searchStudentExamReport: Array<{
    id: number;
    marksObtained: number;
    comments: String;
    action: String;
    createdBy: String;
    createdOn: Date;
    updatedOn: Date;
    updatedBy: String;
    typeOfGradingId: number;
    studnet: {
      id: number;
      studentName: String;
      rollNo: number;
    };
    batch: {
      id: number;
    };
    academicExamSetting: {
      id: number;
      total: number;
      examType: String;
    };
    academicyear: {
      id: number;
      year: string;
    };
  }>;
};

export type AddReportMutation = {
  addStudentExamReport: Array<{
    marksObtained: number;
    comments: String;
    createdOn: Date;
    createdBy: String;
    updatedOn: Date;
    updatedBy: String;
    studnet: {
      id: number;
      studentName: String;
      rollNo: number;
    };
    academicExamSetting: {
      id: number;
    };
    typeOfGrading: {
      id: number;
    };
    batch: {
      id: number;
    };
    academicyear: {
      id: number;
      year: string;
    };
  }>;
};
export type AddTypeOfGrading = {
  addTypeOfGrading: Array<{
    id: number;
    minMarks: number;
    maxMarks: number;
    grades: string;
  }>;
};
