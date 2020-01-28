import gql from 'graphql-tag';

export const ADD_EXAM_SETTING = gql`
  mutation addAcademicExamSetting($input: [AddAcademicExamSettingInput!]!) {
    addAcademicExamSetting(input: $input) {
      academicExamSetting {
        id
        examName
        semester
        startTime
        endTime
        gradeType
        total
        passing
        actions
        countvalue
        departmentId
        sectionId

        subjectId
        academicyearId
        batchId
        branchId
      }
    }
  }
`;
