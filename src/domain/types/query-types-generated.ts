export type AcademicExamSettingListQuery = {
  // Return all known Pet Institutes
  academicExamSettings: Array<{
    id: number;
    examType: string;
    semester: string;
    subject: string;
    date: Date;
    day: string;
    duration: string;
    startTime: string;
    endTime: string;
    total: number;
    passing: number;
    actions: string;
    department: {
      name: string;
    };
    academicYear: {
      year: any;
    };
    section: {
      section: any;
    };
  }>;
};

export type AcademicExamSettingQueryVariables = {
  academicExamSettingId: number;
};

export type AcademicExamSettingQuery = {
  academicExamSetting: {
    id: number;
    examType: string;
    semester: string;
    subject: string;
    date: Date;
    day: string;
    duration: string;
    startTime: string;
    endTime: string;
    total: number;
    passing: number;
    actions: string;
    department: {
      name: string;
    };
    academicYear: {
      year: any;
    };
    section: {
      section: any;
    };
  };
};

export type AcademicExamSettingFragment = {
  id: number;
  examType: string;
  semester: string;
  subject: string;
  date: Date;
  day: string;
  duration: string;
  startTime: string;
  endTime: string;
  total: number;
  passing: number;
  actions: string;
  department: {
    name: string;
  };
  academicYear: {
    year: any;
  };
  section: {
    section: any;
  };
};

export type AcademicExamSettingDetailsFragment = {
  id: number;
  examType: string;
  semester: string;
  subject: string;
  date: Date;
  day: string;
  duration: string;
  startTime: string;
  endTime: string;
  total: number;
  passing: number;
  actions: string;
  department: {
    name: string;
  };
  academicYear: {
    year: any;
  };
  section: {
    section: any;
  };
};

export type AcademicExamSettingSummaryFragment = {
  id: number;
  examType: string;
  semester: string;
  subject: string;
  date: Date;
  day: string;
  duration: string;
  startTime: string;
  endTime: string;
  total: number;
  passing: number;
  actions: string;
  department: {
    name: string;
  };
  academicYear: {
    year: any;
  };
  section: {
    section: any;
  };
};
