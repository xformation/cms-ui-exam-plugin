/* tslint:disable */
//  This file was automatically generated and should not be edited.

/* Location */

export type locationListQuery = {
  locations: Array<{
    id: string;
    name: string;
    address: string;
    appliesTo: string;
  }>;
};

export type locationQueryVariables = {
  locationId: any;
};

export type locationQuery = {
  location: {
    id: any;
    name: string;
    address: string;
    appliesTo: string;
  };
};

export type locationDetailsFragment = {
  id: any;
  name: string;
  address: string;
  appliesTo: string;
};

export type locationSummaryFragment = {
  id: any;
  name: string;
  address: string;
  appliesTo: string;
};

/* Student */

export type ExamEnquiryQuery = {
  // Return all known Pet Institutes
  exams: Array<{
    id: any;
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
  }>;
};

export type ExamQueryVariables = {
  examId: number;
};

export type ExamQuery = {
  exam: {
    id: any;
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
};

export type ExamFragment = {
  id: any;
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

export type ExamDetailsFragment = {
  id: any;
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

export type ExamSummaryFragment = {
  id: any;
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

/* tslint:enable */
