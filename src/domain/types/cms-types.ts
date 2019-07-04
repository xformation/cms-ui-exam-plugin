// ------------------------------------ REACT ------------------------------------
export type ReactFunctionOrComponentClass<P> =
  | React.ComponentClass<P>
  | React.StatelessComponent<P>;

// --------------------------------------

export type AcExamSettingData = {
  examType: String;
  action: String;
  sbjct: String;
  endDate: Date;
  startDate: Date;
  examDate: Date;
  departmnt: String;
  bctch: String;
  sectn: String;
  st: String;
  ed: String;
};

export type ExamData = {
  // id: string;
  examType: String;
  action: String;
  day: String;
};

export type AddExamData = {
  examType: String;
  semester: String;
  subject: String;
  examDate: Date;
  day: String;
  duration: String;
  startTime: String;
  endTime: String;
  gradeType: String;
  total: number;
  passing: number;
  actions: String;
  startDate: Date;
  endDate: Date;
  academicyear: {
    academicyear: any;
  };
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
