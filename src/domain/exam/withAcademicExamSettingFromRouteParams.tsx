import * as React from "react";
import { RouteComponentProps } from "react-router";
import { gql, graphql, QueryProps } from "react-apollo";

import * as AcademicExamSettingQueryGql from "./cademicExamSettingQuery.graphql";
import { ReactFunctionOrComponentClass, AcademicExamSettingQuery,  AcademicExamSettingDetailsFragment } from "../types";
import withLoadingHandler from "../../components/withLoadingHandler";
var queryString = require('query-string');

// Specifies the parameters taken from the route definition (/.../:examId)
type AcademicExamSettingPageRouteParams = {
  academicExamSettingId: any
};

// Specifies the Properties that are passed to
type AcademicExamSettingPageProps = RouteComponentProps<AcademicExamSettingPageRouteParams>;

// The "full set" of properties passed to the target component
// (that is with the properties from GraphQL including the loaded exam)
type AcademicExamSettingPageFullProps = AcademicExamSettingPageProps & {
  data: QueryProps & AcademicExamSettingQuery;
  exam: AcademicExamSettingDetailsFragment;
};

// this function takes a Component, that must have ExamPageProps-compatible properties.
// The function loads the Exam with the examId specified in the route params
// and passes the loaded exam to the specified Component
const withAcademicExamSettingFromRouteParams = (
  TheAcademicExamSettingComponent: ReactFunctionOrComponentClass<{
    academicExamSetting: AcademicExamSettingDetailsFragment;
  }>
) => {
  const withAcademicExamSettingFromRouteParamsWrapper = (props: AcademicExamSettingPageFullProps) => <TheAcademicExamSettingComponent academicExamSetting={props.data.academicExamSetting} />;
  return graphql<AcademicExamSettingQuery, AcademicExamSettingPageProps, AcademicExamSettingPageFullProps>(AcademicExamSettingQueryGql, {
    options: ({ match }) => (
      {
        variables: {
          academicExamSettingId: queryString.parse(location.search).id
        }
      })
  })(withLoadingHandler(withAcademicExamSettingFromRouteParamsWrapper));
};

export default withAcademicExamSettingFromRouteParams;
