// ------------------------------------ REACT ------------------------------------
export type ReactFunctionOrComponentClass<P> =
  | React.ComponentClass<P>
  | React.StatelessComponent<P>;

// --------------------------------------

export type ExamData = {
  // id: any;
  studentName: string;
  mobileNumber: string;
  alternateMobileNumber: string;
  email: string;
  courseApplyingFor: string;
  modeOfEnquiry: string;
  status: string;
  description: string;
  enquiryDate: string;
  updatedOn: string;
  updatedBy: string;
  branch: {
    branchName: string;
  };
  examApplication: {
    examStatus: string;
  };
};
