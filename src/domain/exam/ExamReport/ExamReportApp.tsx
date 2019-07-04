import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { ApolloProvider } from "react-apollo";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { createGraphQLClient } from "../../../createGraphQLClient";
import '../../../css/dark.css';
import ExamReportSrc from "./ExamReportSrc";

const graphQLClient = createGraphQLClient();

export default function init() {
    setTimeout(function () {
        ReactDOM.render(
            <ApolloProvider client={graphQLClient}>
                <BrowserRouter>
                    <Switch>
                        {/* <Route path="/plugins/ems-attendance/page/markattendance" component={MarkAttendance} /> */}
                        <Route path="/plugins/ems-exam/page/report" component={ExamReportSrc} />
                    </Switch>
                </BrowserRouter>
            </ApolloProvider>,
            document.getElementById("examReport"));
    }, 100);
}