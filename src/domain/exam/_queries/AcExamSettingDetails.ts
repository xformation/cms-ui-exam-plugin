import gql from 'graphql-tag';
// import "./acExamSetting.graphql"
export const AC_EXAM_SETTING_LIST_DETAILS = gql`
  fragment acExamSettingDetails on AcExamSetting {
    ...getacExamSetting
  }
`;
