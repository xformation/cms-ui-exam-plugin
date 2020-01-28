import * as React from 'react';
// import { graphql, QueryProps, MutationFunc, compose } from 'react-apollo';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
// import MarkExam from './ExamSettings/MarkSubjectExam';
// import ExamReportSrc from './ExamSettings/ExamReportSrc';
// import AcExamListPage from './ExamSettings/ExamGrid';
// import { FaUserGraduate } from 'react-icons/fa';
import '../../css/tabs.css';
import ExamSettings from './ExamSettings';
import {config} from '../../config';

export default class ExamTab extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: 0,
      user: null,
    };
    this.toggleTab = this.toggleTab.bind(this);
  }

  async componentDidMount(){
    try{
      const response = await fetch(config.LOGGED_IN_USER_URL);
      if (!response.ok) {
        console.log("exam plugin. Response error : ",response.statusText);
        return;
      }
      const json = await response.json();
      this.setState({ user: json });
    }catch(error){
      console.log("exam plugin. Fetch user error: ",error);
    }

    console.log("exam plugin. USER -- ",this.state.user); 
  }

  toggleTab(tabNo: any) {
    this.setState({
      activeTab: tabNo,
    });
  }

  render() {
    const {activeTab, user} = this.state;
    return (
      <section className="tab-container">
        <Nav tabs className="pl-3 pl-3 mb-4 mt-4 bottom-box-shadow">
          <NavItem className="cursor-pointer">
            <NavLink className={`${activeTab === 0 ? 'active' : ''}`} onClick={() => { this.toggleTab(0); }} >
              Exam
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab} className="border-right">
          <TabPane tabId={0}>
            {
                user !== null && (
                  <ExamSettings user={user}/>
                )
            }
            
          </TabPane>
        </TabContent>
      </section>
    );
  }
}
