import gql from 'graphql-tag';

export const GET_EXAM_DATA = gql`

mutation getSubjectandStudents($filter: ExamReportFilterInput!) {
  getSubjectandStudents(filter: $filter) {
  id
    marksObtained
    comments
  
    typeOfGrading{
      id,
      minMarks,
      maxMarks,
      grades
    }
    academicExamSetting
    {
      id,
      gradeType,
      total,
      examName
    }
    student{
      id,
      studentName,
      rollNo
    }
academicyear{
        id,
        year
      }
  }
}
`;
