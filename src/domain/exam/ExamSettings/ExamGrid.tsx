import * as React from 'react';

import {RouteComponentProps, Link} from 'react-router-dom';
import {graphql, QueryProps, compose, withApollo} from 'react-apollo';
import {AcExamSettingListQuery} from '../../types';

import * as AcExamSettingListQueryGql from './AcExamSettingListQuery.graphql';
import withLoadingHandler from '../../../components/withLoadingHandler';
import {ACEXAMLIST} from '../_queries';

export interface ExamProps extends React.HTMLAttributes<HTMLElement> {
  [data: string]: any;
  totalRecords?: number | string;
  type?: string;
  source?: string;
  sourceOfApplication?: string;
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
      list: this.props.data,
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
  }

  createRows(objAry: any) {
    const {source} = this.state;
    console.log('createRows() - Branch list on ExamGrid page:  ', objAry);
    if (objAry === undefined || objAry === null) {
      return;
    }
    const mutateResLength = objAry.length;
    const retVal = [];
    for (let i = 0; i < mutateResLength; i++) {
      const branchObj = objAry[i];
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
    const {list, branchObj} = this.state;
    return (
      <main>
        {/* <button
          className="btn btn-primary"
          style={{width: '150px'}}
          onClick={e => this.showModal(e, true, 'Add New Branch')}
        >
          <i className="fa fa-plus-circle" /> Add new Branch
        </button> */}

        {list !== null && list !== undefined && list.length > 0 ? (
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
              <tbody>{this.createRows(list)}</tbody>
            </table>
          </div>
        ) : null}
      </main>
    );
  }
}

export default withApollo(ExamGrid);
