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
      <input type="checkbox" name="" id="" />
    </td>
    <td>
      <Link
        className="table-link link-color"
        to={`/plugins/ems-exam/page/academicExamSetting?id=${academicExamSetting.id}`}
      >
        {academicExamSetting.examType}
      </Link>
    </td>
    <td>{academicExamSetting.semester}</td>
    <td>{academicExamSetting.subject}</td>
    <td>{academicExamSetting.date}</td>
    <td>{academicExamSetting.day}</td>
    <td>{academicExamSetting.duration}</td>
    <td>{academicExamSetting.startTime}</td>
    <td>{academicExamSetting.endTime}</td>
    <td>{academicExamSetting.total}</td>
    <td>{academicExamSetting.passing}</td>
    <td>{academicExamSetting.actions}</td>
    <td>{academicExamSetting.department.name}</td>
    <td>{academicExamSetting.academicYear.year}</td>
    <td>{academicExamSetting.section.section}</td>
  </tr>
);

const AcademicExamSettingsTable = ({ academicExamSettings }: { academicExamSettings: AcademicExamSettingSummaryFragment[] }) => (
  <div> 
   <table id="academicexamsettinglistpage" className="striped-table fwidth bg-white">
      <thead>
        <tr>
          <th>
            <input type="checkbox" value="checkedall" name="" id="" />
          </th>
          <th>Exam Type</th>
          <th>Semester</th>
          <th>Subject</th>
          <th>Date</th>
          <th>Day</th>
          <th>Duration</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Total</th>
          <th>Passing</th>
          <th>Actions</th>
          <th>Department</th>
          <th>Section</th>
          <th>Academic Year</th>
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
      Admin - AcademicExamSetting Management
      </h3>
    <div className="plugin-bg-white p-1">
      <div className="m-b-1 dflex bg-heading">
        <h4 className="ptl-06">AcademicExamSetting Details</h4>
        <div>
          <Link
            to={`/plugins/ems-exam/page/addacademicExamSetting`}
            className="btn btn-primary m-r-1" style={w180}>Create New AcademicExamSetting
        </Link>
          <a className="btn btn-primary">Export</a>
        </div>
      </div>
      <AcademicExamSettingsTable academicExamSettings={academicExamSettings} />
    </div>
  </section>
);

export default graphql<AcademicExamSettingListQuery, AcademicExamSettingListPageOwnProps, AcademicExamSettingListPageProps>(
  AcademicExamSettingListQueryGql
)(withLoadingHandler(AcademicExamSettingListPage));
