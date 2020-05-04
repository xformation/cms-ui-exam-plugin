import gql from 'graphql-tag';

export const GET_EXAM_DATA = gql`
  mutation getExamList($filter: ExamListFilterInput!) {
    getExamList(filter: $filter) {
      id
      examName
      semester
      examDate
      strexamDate
      day
      duration
      startTime
      gradeType
      endTime
      total
      passing
      actions
      groupValue
      countValue
      departmentId
      batchId
      sectionId
      branchId
      academicyearId
      subjectId
      academicyear {
        id
        year
        startDate
        endDate
      }
      subject {
        id
        subjectDesc
      }
      branch {
        id
        branchName
      }
      department {
        id
        name
      }
      section {
        id
        section
      }
      batch {
        id
        batch
      }
    }
  }
`;
