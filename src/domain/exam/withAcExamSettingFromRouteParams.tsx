import * as React from "react";
import { RouteComponentProps } from "react-router";
import { gql, graphql, QueryProps } from "react-apollo";

import * as AcExamSettingQueryGql from "./acExamSettingQuery.graphql";
import { ReactFunctionOrComponentClass, AcExamSettingQuery,  AcExamSettingDetailsFragment } from "../types";
import withLoadingHandler from "../../components/withLoadingHandler";
var queryString = require('query-string');

// Specifies the parameters taken from the route definition (/.../:examId)
type AcExamSettingPageRouteParams = {
  acExamSettingId: any
};

// Specifies the Properties that are passed to
type AcExamSettingPageProps = RouteComponentProps<AcExamSettingPageRouteParams>;

// The "full set" of properties passed to the target component
// (that is with the properties from GraphQL including the loaded exam)
type AcExamSettingPageFullProps = AcExamSettingPageProps & {
  data: QueryProps & AcExamSettingQuery;
  exam: AcExamSettingDetailsFragment;
};

// this function takes a Component, that must have ExamPageProps-compatible properties.
// The function loads the Exam with the examId specified in the route params
// and passes the loaded exam to the specified Component
const withAcExamSettingFromRouteParams = (
  TheAcExamSettingComponent: ReactFunctionOrComponentClass<{
    acExamSetting: AcExamSettingDetailsFragment;
  }>
) => {
  const withAcExamSettingFromRouteParamsWrapper = (props: AcExamSettingPageFullProps) => <TheAcExamSettingComponent acExamSetting={props.data.acExamSetting} />;
  return graphql<AcExamSettingQuery, AcExamSettingPageProps, AcExamSettingPageFullProps>(AcExamSettingQueryGql, {
    options: ({ match }) => (
      {
        variables: {
          acExamSettingId: queryString.parse(location.search).id
        }
      })
  })(withLoadingHandler(withAcExamSettingFromRouteParamsWrapper));
};

export default withAcExamSettingFromRouteParams;
