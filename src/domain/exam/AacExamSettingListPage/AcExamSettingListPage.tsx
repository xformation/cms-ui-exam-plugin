import * as React from 'react';

import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { graphql, QueryProps } from 'react-apollo';
import {AcExamSettingListQuery, AcExamSettingSummaryFragment} from  '../../types';

import * as AcExamSettingListQueryGql from './AcExamSettingListQuery.graphql';
import withLoadingHandler from '../../../components/withLoadingHandler';

const w180 = {
  width: '180px',
  marginRight: '10px',
};

const AcExamSettingRow = ({ acExamSetting }: { acExamSetting: AcExamSettingSummaryFragment }) => (
  <tr key={acExamSetting.id}>
     <td>{acExamSetting.brnch}</td>
    <td>{acExamSetting.examType} </td>
    <td>{acExamSetting.bctch}</td>
    <td>{acExamSetting.departmnt}</td>
    <td>{acExamSetting.sectn}</td>
    <td>{acExamSetting.subject}</td>
    <td>{acExamSetting.st}</td>
    <td>{acExamSetting.ed}</td>
    {/* <td> <a >
            <i className="fa fa-pencil-square-o fa-1-5x" aria-hidden="true"></i>
          </a>
          <a >
            <i className="fa fa-trash-o fa-1-5x table-p" aria-hidden="true"></i>
          </a>
    </td>    */}
   
  </tr>
);

const AcExamSettingsTable = ({ acExamSettings }: { acExamSettings: AcExamSettingSummaryFragment[] }) => (
  <div> 
   <table id="academicexamsettinglistpage" className="striped-table fwidth bg-white">
      <thead>
        <tr>
          <th>Branch</th>
          <th>Exam Type</th>
          <th>Year</th>          
          <th>Department</th>
          <th>Section</th>
          <th>Subjects</th>
          <th>Start Date</th>
          <th>End Date</th>
          {/* <th>Actions</th> */}
                   
        </tr>
      </thead>
      <tbody>
        {acExamSettings.map(acExamSetting => <AcExamSettingRow key={acExamSetting.id} acExamSetting={acExamSetting} />)}
      </tbody>
    </table>
  </div>
);

type AcExamSettingListPageOwnProps = RouteComponentProps<{}>;
type AcExamSettingListPageProps = {
  data: QueryProps & AcExamSettingListQuery;
};

const AcExamSettingListPage = ({ data: { acExamSettings } }: AcExamSettingListPageProps) => (
  <section className="customCss">
    <h3 className="bg-heading-exam p-1 m-b-0">
      <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '}
      Admin - Academic Exam Setting Management
      </h3>
    <div className="plugin-bg-white p-1">
      <div className="m-b-1 eflex bg-heading-exam">
        <h4 className="ptl-06">Academic Year 2018-2019 </h4>

        <div>
          {/* <Link
            to={`/plugins/ems-exam/page/addacExamSetting`}
            className="btn btn-primary m-r-1" style={w180}>Add Exam
        </Link> */}
         
        </div>
      </div>
      <AcExamSettingsTable acExamSettings={acExamSettings} />
    </div>
  </section>
);

export default graphql<AcExamSettingListQuery, AcExamSettingListPageOwnProps, AcExamSettingListPageProps>(
  AcExamSettingListQueryGql
)(withLoadingHandler(AcExamSettingListPage));