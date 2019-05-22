// ------------------------------------ REACT ------------------------------------
export type ReactFunctionOrComponentClass<P> =
  | React.ComponentClass<P>
  | React.StatelessComponent<P>;

// --------------------------------------

export type AcademicExamSettingData = {
  // id: any;
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
  academicyear: {
    year: any;
  };
  section: {
    section: any;
  };
};
