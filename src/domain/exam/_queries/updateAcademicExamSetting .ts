import gql from 'graphql-tag';

export const UPDATE_EXAM_SETTING = gql`
  mutation updateAcademicExamSetting($input: UpdateAcademicExamSettingInput!) {
    updateAcademicExamSetting(input: $input) {
      academicExamSetting {
        id
        examName
        semester
        examDate
        startTime
        endTime
        gradeType
        total
        passing
        actions
        groupvalue
        countvalue
        branchId
        subjectId
        departmentId
        academicyearId
        sectionId
        batchId
        typeOfGrading {
          id
        }
      }
    }
  }
`;
