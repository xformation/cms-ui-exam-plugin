import * as React from 'react';
import wsCmsBackendServiceSingletonClient from '../../../wsCmsBackendServiceClient';
import {RouteComponentProps, Link} from 'react-router-dom';
import {graphql, QueryProps, compose, withApollo} from 'react-apollo';
import {AcExamSettingListQuery} from '../../types';

import * as AcExamSettingListQueryGql from './AcExamSettingListQuery.graphql';
import withLoadingHandler from '../../../components/withLoadingHandler';
import {ACEXAMLIST} from '../_queries';

export interface ExamProps extends React.HTMLAttributes<HTMLElement> {
  [data: string]: any;
  examList?: any;
  totalRecords?: number | string;
  type?: string;
  source?: string;
  sourceOfApplication?: string;
  user?: any;
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
      examList: this.props.examList,
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
      modelHeader: '',
    };
    this.registerSocket = this.registerSocket.bind(this);
  }

  async componentDidMount(){
    await this.registerSocket();
  }

  registerSocket() {
    const socket = wsCmsBackendServiceSingletonClient.getInstance();

    socket.onmessage = (response: any) => {
        let message = JSON.parse(response.data);
        console.log("ExamGrid. message received from server ::: ", message);
        this.setState({
            branchId: message.selectedBranchId,
            academicYearId: message.selectedAcademicYearId,
            departmentId: message.selectedDepartmentId,
        });
        console.log("ExamGrid. branchId: ",this.state.branchId);
        console.log("ExamGrid. departmentId: ",this.state.departmentId); 
        console.log("ExamGrid. ayId: ",this.state.academicYearId);  
    }

    socket.onopen = () => {
        console.log("ExamGrid. Opening websocekt connection to cmsbackend. User : ",this.state.user.login);
        socket.send(this.state.user.login);
    }

    window.onbeforeunload = () => {
        console.log("ExamGrid. Closing websocket connection with cms backend service");
    }
  }

  createRows(objAry: any) {
    const {branchId, departmentId} = this.state;
    console.log('createRows() - Exam list on ExamGrid page:  ', objAry);
    if (objAry === undefined || objAry === null) {
      return;
    }
    const mutateResLength = objAry.length;
    const retVal = [];
    for (let i = 0; i < mutateResLength; i++) {
      const branchObj = objAry[i];
      // if(parseInt(branchObj.cmsBranchVo.id,10) === parseInt(branchId,10) &&
      //         parseInt(branchObj.cmsDepartmentVo.id,10) === parseInt(departmentId,10)){
                retVal.push(
                  <tr>
                    {/* id examName action sbjct examDate departmnt bctch sectn st ed subExamDate countvalue */}
                    {/* <td>{branchObj.countvalue}</td> */}
                    <td>{branchObj.examName}</td>
                    <td>{branchObj.bctch}</td>
                    <td>{branchObj.departmnt}</td>
                    <td>{branchObj.sectn}</td>
                    <td>{branchObj.sbjct}</td>
                    <td>{branchObj.st}</td>
                    <td>{branchObj.ed}</td>
          
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
      // }
      
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
    const {examList, branchObj} = this.state;
    return (
      <main>
        {/* <button
          className="btn btn-primary"
          style={{width: '150px'}}
          onClick={e => this.showModal(e, true, 'Add New Branch')}
        >
          <i className="fa fa-plus-circle" /> Add new Branch
        </button> */}
        
        {examList !== null && examList !== undefined && examList.length > 0 ? (
          <div style={{width: '100%', height: '500px', overflow: 'auto'}}>
            <table id="branchTable" className="striped-table fwidth bg-white p-2 m-t-1">
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
                </tr>
              </thead>
              <tbody>{this.createRows(examList)}</tbody>
            </table>
          </div>
        ) : <div>No Record Found</div>
        }
      </main>
    );
  }
}

export default withApollo(ExamGrid);
