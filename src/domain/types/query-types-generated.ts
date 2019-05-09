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

export type ExamListQuery = {
  // Return all known Pet Institutes
  exams: Array<{
    id: number;
    examType: string;
    startDate: number;
    endDate: number;
    department: {
      name: string;
    };
    year: {
      year: any;
    };
    section: {
      section: any;
    };
  }>;
};

export type ExamQueryVariables = {
  examId: number;
};

export type ExamQuery = {
  exam: {
    id: number;
    examType: string;
    startDate: number;
    endDate: number;
    department: {
      name: string;
    };
    year: {
      year: any;
    };
    section: {
      section: any;
    };
  };
};

export type ExamFragment = {
  id: number;
  examType: string;
  startDate: number;
  endDate: number;
  department: {
    name: string;
  };
  year: {
    year: any;
  };
  section: {
    section: any;
  };
};

export type ExamDetailsFragment = {
  id: number;
  examType: string;
  startDate: number;
  endDate: number;
  department: {
    name: string;
  };
  year: {
    year: any;
  };
  section: {
    section: any;
  };
};

export type ExamSummaryFragment = {
  id: number;
  examType: string;
  startDate: number;
  endDate: number;
  department: {
    name: string;
  };
  year: {
    year: any;
  };
  section: {
    section: any;
  };
};

/* tslint:enable */
