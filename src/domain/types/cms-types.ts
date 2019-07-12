// ------------------------------------ REACT ------------------------------------
export type ReactFunctionOrComponentClass<P> =
  | React.ComponentClass<P>
  | React.StatelessComponent<P>;

// --------------------------------------

export type AcExamSettingData = {
  examName: String;
  action: String;
  sbjct: String;
  examDate: Date;
  departmnt: String;
  bctch: String;
  sectn: String;
  st: String;
  ed: String;
};

export type ExamData = {
  // id: string;
  examName: String;
  action: String;
  day: String;
};

export type AddExamData = {
  examName: String;
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
