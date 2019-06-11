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
