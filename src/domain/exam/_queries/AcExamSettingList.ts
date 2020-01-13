import gql from 'graphql-tag';

export const AC_EXAM_SETTING_LIST = gql`
  fragment acexamsettingSummary on AcExamSetting {
    ...acExamSetting
  }

  query acexamsettingList {
    acExamSettings {
      ...acexamsettingSummary
    }
  }
`;
