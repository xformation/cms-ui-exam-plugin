import gql from 'graphql-tag';

export const ADD_EXAM_REPORT = gql`

mutation addAcademicExamSettingData($input: [AcademicExamSettingUpdateFilter!]!){
  addAcademicExamSettingData(input:$input){
    statusCode
    statusDesc
 }
}
`;
