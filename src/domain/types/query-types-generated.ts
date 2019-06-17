export type AcExamSettingListQuery = {
  // Return all known Pet Institutes
  acExamSettings: Array<{
    id: any;
    examType: String;
    action: String;
    subject: String;
    endDate: Date;
    startDate: Date;
    examDate: Date;
    departmnt: String;
    bctch: String;
    sectn: String;
    st: String;
    ed: String;
  }>;
};

export type AcExamSettingQueryVariables = {
  acExamSettingId: any;
};

export type AcExamSettingQuery = {
  acExamSetting: {
    id: any;
    examType: String;
    action: String;
    subject: String;
    endDate: Date;
    startDate: Date;
    examDate: Date;
    departmnt: String;
    bctch: String;
    sectn: String;
    st: String;
    ed: String;
  };
};

export type AcExamSettingFragment = {
  id: any;
  examType: String;
  action: String;
  subject: String;
  endDate: Date;
  startDate: Date;
  examDate: Date;
  departmnt: String;
  bctch: String;
  sectn: String;
  st: String;
  ed: String;
};

export type AcExamSettingDetailsFragment = {
  id: any;
  examType: String;
  action: String;
  subject: String;
  endDate: Date;
  startDate: Date;
  examDate: Date;
  departmnt: String;
  bctch: String;
  sectn: String;
  st: String;
  ed: String;
};

export type AcExamSettingSummaryFragment = {
  id: any;
  examType: String;
  action: String;
  subject: String;
  endDate: Date;
  startDate: Date;
  examDate: Date;
  departmnt: String;
  bctch: String;
  sectn: String;
  st: String;
  ed: String;
};
export type LoadExamFilterDataCacheType = {
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
    sections: Array<{
      id: number;
      section: string;
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
  addExam: {
    academicExamSetting: {
      id: any;
      examType: String;
      action: String;
      subject: String;
      endDate: Date;
      startTime: String;
      endTime: String;
      day: String;
      batch: {
        batch: any;
      };
      section: {
        section: any;
      };
      branch: {
        branchName: any;
      };
      department: {
        name: any;
      };
    };
  };
};
