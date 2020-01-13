import * as React from 'react';
// import { graphql, QueryProps, MutationFunc, compose } from 'react-apollo';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import MarkExam from './ExamSettings/MarkSubjectExam';
import ExamReportSrc from './ExamSettings/ExamReportSrc';
import AcExamListPage from './ExamSettings/AcExamSettingListPage';
// import { FaUserGraduate } from 'react-icons/fa';
import '../../css/tabs.css';
import ExamSettings from './ExamSettings';


export default class ExamTab extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: 0,
    };
    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab(tabNo: any) {
    this.setState({
      activeTab: tabNo,
    });
  }

  render() {
    const { activeTab} = this.state;
    return (
      <section className="tab-container">
        <div>
          {/* <img src="../../img/students.png" alt="" /> */}
          {/* <h5><FaUserGraduate className="m-1 fa-2x" /></h5> */}
          <h5> 
          </h5>
        </div>
        <Nav tabs className="pl-3 pl-3 mb-4 mt-4 bottom-box-shadow">
          <NavItem className="cursor-pointer">
            <NavLink
              className={`${activeTab === 0 ? 'active' : ''}`}
              onClick={() => {
                this.toggleTab(0);
              }}>
              Exam
            </NavLink>
          </NavItem>
        </Nav>
          {/* <NavItem className="cursor-pointer">
            <NavLink
              className={`${activeTab === 1 ? 'active' : ''}`}
              onClick={() => {
                this.toggleTab(1);
              }}
            >
              Add Exam
            </NavLink>
           </NavItem>

            <NavItem className="cursor-pointer">
            <NavLink
              className={`${activeTab === 2 ? 'active' : ''}`}
              onClick={() => {
                this.toggleTab(2);
              }}
            >
              Report
            </NavLink>
          </NavItem>
        </Nav> */}

        <TabContent activeTab={activeTab} className="border-right">

          <TabPane tabId={0}>
            <ExamSettings />
          </TabPane>
          {/* <TabPane tabId={1}>
            // <MarkExam />
          </TabPane>
          <TabPane tabId={2}>
          <ExamReportSrc />
          </TabPane>
           */}
        </TabContent>
      </section>
    );
  }
}