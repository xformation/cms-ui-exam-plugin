import * as React from 'react';
import wsCmsBackendServiceSingletonClient from '../../../wsCmsBackendServiceClient';
import {RouteComponentProps, Link} from 'react-router-dom';
import {graphql, QueryProps, compose, withApollo} from 'react-apollo';
import {AcExamSettingListQuery} from '../../types';
import {NavItem,NavLink, TabPane, TabContent} from 'reactstrap';

import * as AcExamSettingListQueryGql from './AcExamSettingListQuery.graphql';
import withLoadingHandler from '../../../components/withLoadingHandler';
import {ACEXAMLIST, CREATE_FILTER_DATA_CACHE} from '../_queries';
import ExamDetailsPage from './ExamDetailsPage';
import EditExam from './EditExam'


type ExamState = {
  isModalOpen: any;
  user: any;
  examData: any;
  branches: any;
  academicYears: any;
  departments: any;
  batches: any;
  subjects: any;
  semesters: any;
  sections: any;
  submitted: any;
  noOfExams: number;
  dateofExam: any;
  dayValue: any;
  isSubjectSame: any;
  startDate: any;
  gradeType: any;
  selectedGrade: any;
  groupValue: any;
  gradingId: any;

  branchId: any;
  academicYearId: any;
  departmentId: any;
  examFilterCacheList: any;
  typesOfGradingList: any;
  exObj:any;
  ExObj:any;

};
export interface ExamProps extends React.HTMLAttributes<HTMLElement> {
  [data: string]: any;
  examList?: any;
  totalRecords?: number | string;
  type?: string;
  source?: string;
  sourceOfApplication?: string;
  user?: any;
  examObj: any,
  activeTab: any,

  exam:any,
  examFilterCacheList:any,
  // stateList?: any;
  // cityList?: any;
  // originalCityList?: any;
}

// const ERROR_MESSAGE_MANDATORY_FIELD_MISSING = "Mandatory fields missing";
// const ERROR_MESSAGE_SERVER_SIDE_ERROR = "Due to some error in preferences service, branch could not be saved. Please check preferences service logs";
// const SUCCESS_MESSAGE_BRANCH_ADDED = "New branch saved successfully";
// const SUCCESS_MESSAGE_BRANCH_UPDATED = "Branch updated successfully";

class ExamGrid<T = {[data: string]: any}> extends React.Component<ExamProps, any> {
  constructor(props: ExamProps) {
    super(props);
    this.state = {
      activeTab: 0,
      examList: this.props.examList,
      examFilterCacheList : this.props.examFilterCacheList,
      examObj: {},
      user: this.props.user,
      branchId: null,

      academicYearId: null,
      departmentId: null,
      totalRecords: this.props.totalRecords,
      type: this.props.type,
      isModalOpen: false,
      branchObj: {
        stateId: '',
        cityId: '',
        branchName: '',
        address: '',
        pinCode: '',
        branchHead: '',
        status: '',
      },
      errorMessage: '',
      successMessage: '',
      source: this.props.source,
      sourceOfApplication: this.props.sourceOfApplication,
      // stateList: this.props.stateList,
      // cityList: this.props.cityList,
      // originalCityList: this.props.cityList,
      batches: [],
      sections: [],
      modelHeader: '',
      selectedDepartment: {},
    };
    this.createBatches = this.createBatches.bind(this);
    this.createSections = this.createSections.bind(this);
    this.registerSocket = this.registerSocket.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.getExamFilter = this.getExamFilter.bind(this);
  }

  async toggleTab(tabNo: any) {
    await this.setState({
      activeTab: tabNo,
    });
  }

  async componentDidMount() {
    await this.registerSocket();
    console.log(
      '5. check create catch batches:',
      this.state.examFilterCacheList.batches
    );
  }
  registerSocket() {
    const socket = wsCmsBackendServiceSingletonClient.getInstance();

    socket.onmessage = (response: any) => {
        let message = JSON.parse(response.data);
        console.log("1. ExamGrid. message received from server ::: ", message);
        this.setState({
            branchId: message.selectedBranchId,
            academicYearId: message.selectedAcademicYearId,
            departmentId: message.selectedDepartmentId,
            selectedDepartment: message.department,
        });
        console.log("ExamGrid. branchId: ",this.state.branchId);
        console.log("ExamGrid. departmentId: ",this.state.departmentId); 
        console.log("ExamGrid. ayId: ",this.state.academicYearId);  
        console.log("ExamGrid. selectedDepartment: ",this.state.selectedDepartment); 
    }

    socket.onopen = () => {
        console.log("ExamGrid. Opening websocekt connection to cmsbackend. User : ",this.state.user.login);
        socket.send(this.state.user.login);
    }

    window.onbeforeunload = () => {
        console.log("ExamGrid. Closing websocket connection with cms backend service");
    }
  }

  createBatches(batches: any, selectedDepartmentId: any) {
    let batchesOptions = [
      <option key={0} value="">
        Select Year
      </option>,
    ];
    for (let i = 0; i < batches.length; i++) {
      let id = batches[i].id;
      let dptId = '' + batches[i].department.id;
      if (dptId == selectedDepartmentId) {
        batchesOptions.push(
          <option key={id} value={id}>
            {batches[i].batch}
          </option>
        );
      }
    }
    return batchesOptions;
  }

  createSections(sections: any, selectedBatchId: any) {
    let sectionsOptions = [
      <option key={0} value="">
        Select Section
      </option>,
    ];
    for (let i = 0; i < sections.length; i++) {
      let id = sections[i].id;
      let sbthId = '' + sections[i].batch.id;
      if (sbthId == selectedBatchId) {
        sectionsOptions.push(
          <option key={id} value={id}>
            {sections[i].section}
          </option>
        );
      }
    }
    return sectionsOptions;
  }

  async showDetail(obj: any, e: any) {
    await this.SetObject(obj);
    console.log('3. data in examObj:', this.state.examObj);
    await this.toggleTab(1);
  }
  async getStDetail(obj: any, e: any,) {
    await this.SetObject(obj);
    console.log('3. data in examObj:', this.state.examObj);
    await this.toggleTab(2);
  }

  async SetObject(obj: any) {
    console.log('1. setting object :', obj);
    await this.setState({
      examObj: obj,
    });
    console.log('2. data in obj:', obj);
  }

  async getExamFilter() {
    const {branchId, academicYearId} = this.state;
    console.log('exam branch Id:', branchId);
    const {data} = await this.props.client.query({
      query: CREATE_FILTER_DATA_CACHE,
      variables: {
        collegeId: '' + branchId,
        academicYearId: '' + academicYearId,
      },

      fetchPolicy: 'no-cache',
    });
    this.setState({
      examFilterCacheList: data,
    });
  }

  createRows(objAry: any) {
    const {selectedDepartment} = this.state;
    console.log('2. ExamGrid createRows() - selectedDepartment.name:  ', selectedDepartment.name);
    console.log('3. ExamGrid createRows() - Exam list on ExamGrid page:  ', objAry);
    if (objAry === undefined || objAry === null) {
      return;
    }
    const mutateResLength = objAry.length;
    const retVal = [];
    for (let i = 0; i < mutateResLength; i++) {
      const branchObj = objAry[i];
      if(branchObj.departmnt === selectedDepartment.name){
                retVal.push(
                  <tr>
                    {/* id examName action sbjct examDate departmnt bctch sectn st ed subExamDate countvalue */}
                    {/* <td>{branchObj.countvalue}</td> */}
                    <td>
                <a onClick={(e: any) => this.showDetail(branchObj, e)}>
                  {branchObj.examName}
                </a>
              </td>
                    <td>{branchObj.bctch}</td>
                    <td>{branchObj.departmnt}</td>
                    <td>{branchObj.sectn}</td>
                    <td>{branchObj.sbjct}</td>
                    <td>{branchObj.st}</td>
                    <td>{branchObj.ed}</td>
                    <td>
                  <button
                    className="btn btn-primary"
                    onClick={(e: any) => this.getStDetail(branchObj, e)}
                  >
                    {' '}
                    Edit{' '}
                  </button>
                </td>
          
                    {/* <td>{branchObj.action}</td> */}
                    {/* <td>{branchObj.countvalue}</td> */}
          

                    {/* <td>
                      {
                        <button
                          className="btn btn-primary"
                          onClick={e => this.showDetail(e, true, branchObj, 'Edit Branch')}
                        >
                          Edit
                        </button>
                      }
                    </td> */}
                  </tr>
                );
      }
      
    }
    return retVal;
  }

  async acExamSettings(e: any) {
    console.log('Refreshing branch list');
    const {data} = await this.props.client.query({
      query: ACEXAMLIST,
      fetchPolicy: 'no-cache',
    });
    const temp = data.acExamSettings;
    this.setState({
      list: temp,
    });
  }

  render() {
    const {examList, branchObj,activeTab,user,examFilterCacheList,exam} = this.state;
    return (
      <main >
        {/* <button
          className="btn btn-primary"
          style={{width: '150px'}}
          onClick={e => this.showModal(e, true, 'Add New Branch')}
        >
          <i className="fa fa-plus-circle" /> Add new Branch
        </button> */}
        <TabContent activeTab={activeTab}>
          <TabPane tabId={0}>
          <div className="container-fluid p-1 ">
          
        {examList !== null && examList !== undefined && examList.length > 0 ? (
          <div style={{width: '100%', height: '500px', overflow: 'auto'}}>
            <table id="branchTable" className="markAttendance">
              <thead>
                <tr>
                  {/* <th>Id</th> */}
                  <th>Exam Name</th>
                  <th>Year</th>
                  <th>Department</th>
                  <th>Section</th>
                  <th>Subjects</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{this.createRows(examList)}</tbody>
            </table>
          </div>
        ) : <div>No Record Found</div>
        }
        </div>
         </TabPane>
         <TabPane tabId={1}>
            <div className="container-fluid" style={{padding: '0px'}}>
              <div className="m-b-1 bg-heading-bgStudent studentListFlex p-point5">
                
                  <div className="">
                  <h4 className="ptl-06">Exam Details</h4>
                </div>
                <div className="">
                  <a
                    className="btn btn-primary m-l-1  pull-right"
                    onClick={() => {
                      this.toggleTab(1);
                    }}
                  >
                    Back
                  </a>
                  <a
                    className="btn btn-primary m-l-1 pull-right"
                    onClick={(e: any) => {
                      print();
                    }}
                  >
                    Print
                  </a>
                </div>
              </div>
              {this.state.examObj !== null && this.state.examObj !== undefined && (
                <ExamDetailsPage data={this.state.examObj} />
              )}
               
            </div>
            
          </TabPane>
          <TabPane tabId={2}>
          <div className="container-fluid" style={{padding: '0px'}}>
              <div className="m-b-1 bg-heading-bgStudent studentListFlex p-point5">
                <div className="">
                  <h4 className="ptl-06">Student Details</h4>
                </div>
                <div className="">
                  <a
                    className="btn btn-primary m-l-1"
                    onClick={() => {
                      this.toggleTab(0);
                    }}
                  >
                    Back
                  </a>
                </div>
              </div>
              {user !== null &&
                this.state.examObj !== null &&
                this.state.examObj !== undefined && (
                  <EditExam
                    // user={user}
                    // data={this.state.examObj}
                    // examObj={this.state.examObj}
                    //   batches={this.state.examFiterCacheList.batches}
                    //   sections={this.state.examFiterCacheList.sections}
                  />
                )}
              {/* {this.state.StdObj !== null && this.state.StdObj !== undefined && (
                <EditStudentPage data={this.state.StdObj} />
              )} */}
            </div>
          </TabPane>
       </TabContent>
       </main >
    );
  }
}

export default withApollo(ExamGrid);
