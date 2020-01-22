import * as React from 'react';
// import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import {withApollo} from 'react-apollo';

import '../../../css/exam-settings.css';
import AcExamListPage from './ExamGrid';
import ExamReportSrc from './ExamReportSrc';
import {
  GET_DEPARTMENT_LIST,
  GET_BATCH_LIST,
  GET_EXAM_SETTING_LIST,
  GET_SECTION_LIST,
  CREATE_FILTER_DATA_CACHE,
  GET_EXAM_DATA,
  ACEXAMLIST,
} from '../_queries';
import MarkSubjectExam from './MarkSubjectExam';
import ExamGrid from './ExamGrid';
import Grading from './Grading';

class ExamSettings extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: 0,
      examList: null,
      departmentList: null,
      batchList: null,
      sectionList: null,
    };
    this.toggleTab = this.toggleTab.bind(this);
    this.acExamSettings = this.acExamSettings.bind(this);
    this.getDepartmentList = this.getDepartmentList.bind(this);
    this.getBatchList = this.getBatchList.bind(this);
    this.getSectionList = this.getSectionList.bind(this);
  }

  async toggleTab(tabNo: any) {
    this.setState({
      examList: null,
      activeTab: tabNo,
    });
    let bid = 34;
    let aid = 56;

    // if (tabNo === 1 || tabNo === 2) {
    this.acExamSettings();

    this.setState({
      activeTab: tabNo,
    });
  }

  async acExamSettings() {
    const {data} = await this.props.client.query({
      query: ACEXAMLIST,
      fetchPolicy: 'no-cache',
    });

    this.setState({
      examList: data,
    });
  }

  async getDepartmentList(bid: any, aid: any) {
    const {data} = await this.props.client.query({
      query: GET_DEPARTMENT_LIST,
      fetchPolicy: 'no-cache',
    });

    this.setState({
      departmentList: data,
    });
  }

  async getBatchList(bid: any, aid: any) {
    const {data} = await this.props.client.query({
      query: GET_BATCH_LIST,
      fetchPolicy: 'no-cache',
    });

    this.setState({
      batchList: data,
    });
  }

  async getSectionList(bid: any, aid: any) {
    const {data} = await this.props.client.query({
      query: GET_SECTION_LIST,
      fetchPolicy: 'no-cache',
    });

    this.setState({
      sectionList: data,
    });
  }

  render() {
    const {activeTab, examList} = this.state;
    return (
      <section className="tab-container row vertical-tab-container">
        <Nav tabs className="pl-3 pl-3 mb-4 mt-4 col-sm-2">
          <NavItem className="cursor-pointer">
            <NavLink
              className={`vertical-nav-link ${activeTab === 0 ? 'side-active' : ''}`}
              onClick={() => {
                this.toggleTab(0);
              }}
            >
              Exams List
            </NavLink>
          </NavItem>
          <NavItem className="cursor-pointer">
            <NavLink
              className={`vertical-nav-link ${activeTab === 1 ? 'side-active' : ''}`}
              onClick={() => {
                this.toggleTab(1);
              }}
            >
              Add Exam
            </NavLink>
          </NavItem>
          <NavItem className="cursor-pointer">
            <NavLink
              className={`vertical-nav-link ${activeTab === 2 ? 'side-active' : ''}`}
              onClick={() => {
                this.toggleTab(2);
              }}
            >
              Report
            </NavLink>
          </NavItem>
          <NavItem className="cursor-pointer">
            <NavLink
              className={`vertical-nav-link ${activeTab === 3 ? 'side-active' : ''}`}
              onClick={() => {
                this.toggleTab(3);
              }}
            >
              Grading
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab} className="col-sm-9 border-left p-t-1">
          <TabPane tabId={0}>
            {/* <AcExamListPage /> */}
            {examList !== null && <ExamGrid data={examList.acExamSettings} />}
          </TabPane>

          <TabPane tabId={1}>
            <MarkSubjectExam />
          </TabPane>

          <TabPane tabId={2}>
            <ExamReportSrc />
          </TabPane>

          <TabPane tabId={3}>
            <Grading />
          </TabPane>
        </TabContent>
      </section>
    );
  }
}

export default withApollo(ExamSettings);
