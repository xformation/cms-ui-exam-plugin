import * as React from 'react';

import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { graphql, QueryProps } from 'react-apollo';
import {AcademicExamSettingListQuery, AcademicExamSettingSummaryFragment} from  '../../types';
import * as AcademicExamSettingListQueryGql from './AcademicExamSettingListQuery.graphql';
import withLoadingHandler from '../../../components/withLoadingHandler';

const w180 = {
  width: '180px',
  marginRight: '10px',
};

const AcademicExamSettingRow = ({ academicExamSetting }: { academicExamSetting: AcademicExamSettingSummaryFragment }) => (
  <tr key={academicExamSetting.id}>
    <td>
      <Link
        className="table-link link-color"
        to={`/plugins/ems-exam/page/academicExamSetting?id=${academicExamSetting.id}`}
      >
        {academicExamSetting.examType}
      </Link>
    </td>
    <td>{academicExamSetting.department.name}</td>
    <td>{academicExamSetting.academicYear.year}</td>
    <td>{academicExamSetting.section.section}</td>
    <td>{academicExamSetting.date}</td>
    <td>{academicExamSetting.date}</td>
    <td> <a >
            <i className="fa fa-pencil-square-o fa-1-5x" aria-hidden="true"></i>
          </a>
          <a >
            <i className="fa fa-trash-o fa-1-5x table-p" aria-hidden="true"></i>
          </a></td>   
   
  </tr>
);

const AcademicExamSettingsTable = ({ academicExamSettings }: { academicExamSettings: AcademicExamSettingSummaryFragment[] }) => (
  <div> 
   <table id="academicexamsettinglistpage" className="striped-table fwidth bg-white">
      <thead>
        <tr>
          <th>Exam Type</th>
          <th>Department</th>
          <th>Academic Year</th>
          <th>Section</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Actions</th>
                   
        </tr>
      </thead>
      <tbody>
        {academicExamSettings.map(academicExamSetting => <AcademicExamSettingRow key={academicExamSetting.id} academicExamSetting={academicExamSetting} />)}
      </tbody>
    </table>
  </div>
);

type AcademicExamSettingListPageOwnProps = RouteComponentProps<{}>;
type AcademicExamSettingListPageProps = {
  data: QueryProps & AcademicExamSettingListQuery;
};

const AcademicExamSettingListPage = ({ data: { academicExamSettings } }: AcademicExamSettingListPageProps) => (
  <section className="customCss">
    <h3 className="bg-heading p-1 m-b-0">
      <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '}
      Admin - Academic Exam Setting Management
      </h3>
    <div className="plugin-bg-white p-1">
      <div className="m-b-1 eflex bg-heading">
        <h4 className="ptl-06">Academic Year</h4>
        <div>
          <Link
            to={`/plugins/ems-exam/page/addacademicExamSetting`}
            className="btn btn-primary m-r-1" style={w180}>Add Exam
        </Link>
         
        </div>
      </div>
      <AcademicExamSettingsTable academicExamSettings={academicExamSettings} />
    </div>
  </section>
);

export default graphql<AcademicExamSettingListQuery, AcademicExamSettingListPageOwnProps, AcademicExamSettingListPageProps>(
  AcademicExamSettingListQueryGql
)(withLoadingHandler(AcademicExamSettingListPage));
