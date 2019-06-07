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
    sectn: String;
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
    sectn: String;
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
  sectn: String;
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
  sectn: String;
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
  sectn: String;
};
