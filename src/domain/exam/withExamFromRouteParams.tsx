import * as React from "react";
import { RouteComponentProps } from "react-router";
import { gql, graphql, QueryProps } from "react-apollo";

import * as ExamQueryGql from "./ExamQuery.graphql";
import { ReactFunctionOrComponentClass, ExamQuery, ExamDetailsFragment } from "../types";
import withLoadingHandler from "../../components/withLoadingHandler";

var queryString = require('query-string');

// Specifies the parameters taken from the route definition (/.../:examId)
type ExamPageRouteParams = {
  examId: any
};

// Specifies the Properties that are passed to
type ExamPageProps = RouteComponentProps<ExamPageRouteParams>;

// The "full set" of properties passed to the target component
// (that is with the properties from GraphQL including the loaded exam)
type ExamPageFullProps = ExamPageProps & {
  data: QueryProps & ExamQuery;
  exam: ExamDetailsFragment;
};

// this function takes a Component, that must have ExamPageProps-compatible properties.
// The function loads the Exam with the examId specified in the route params
// and passes the loaded exam to the specified Component
const withExamFromRouteParams = (
  TheExamComponent: ReactFunctionOrComponentClass<{
    exam: ExamDetailsFragment;
  }>
) => {
  const withExamFromRouteParamsWrapper = (props: ExamPageFullProps) => <TheExamComponent exam={props.data.exam} />;
  return graphql<ExamQuery, ExamPageProps, ExamPageFullProps>(ExamQueryGql, {
    options: ({ match }) => (
      {
        variables: {
          examId: queryString.parse(location.search).id
        }
      })
  })(withLoadingHandler(withExamFromRouteParamsWrapper));
};

export default withExamFromRouteParams;
