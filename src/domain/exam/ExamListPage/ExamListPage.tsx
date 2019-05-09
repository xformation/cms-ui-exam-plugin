import * as React from 'react';

import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { graphql, QueryProps } from 'react-apollo';

import * as ExamListQueryGql from './ExamListQuery.graphql';
import { ExamListQuery, ExamSummaryFragment } from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';

const w180 = {
  width: '180px',
  marginRight: '10px',
};

const ExamRow = ({ exam }: { exam: ExamSummaryFragment }) => (
  <tr key={exam.id}>
    <td>
      <input type="checkbox" name="" id="" />
    </td>
    <td>
      <Link
        className="table-link link-color"
        to={`/plugins/ems-exam/page/exam?id=${exam.id}`}
      >
        {exam.examType}
      </Link>
    </td>
    <td>{exam.startDate}</td>
    <td>{exam.endDate}</td>
    <td>{exam.department.name}</td>
    <td>{exam.year.year}</td>
    <td>{exam.section.section}</td>
    
  </tr>
);

const ExamsTable = ({ exams }: { exams: ExamSummaryFragment[] }) => (
<div>
  <div className="exam-flex">
    <div>
      <label htmlFor="">Department</label>
      <select>
        <option value="">Computer Science</option>
        <option value="">Electric Engineering</option>
        <option value="">Petroleum Engineering</option>
        <option value="">Electronic Engineering</option>
      </select>
    </div>
    <div>
      <label htmlFor="">Year</label>
      <select>
        <option value="">First Year</option>
        <option value="">Second Year</option>
        <option value="">Third Year</option>
        <option value="">Fourth Year</option>
      </select>
    </div>
    <div>
      <label htmlFor="">Semister</label>
      <select>
        <option value="">1</option>
        <option value="">2</option>
      </select>
    </div>


    <div className="margin-bott">
      <label htmlFor="">Search</label>
      <input type="search" name="" id="" />
    </div>
  </div>

  <table id="examlistpage" className="striped-table fwidth bg-white">
    <thead>
      <tr>
        <th>
          <input type="checkbox" value="checkedall" name="" id="" />
        </th>
        <th>Exam Type</th>
        <th>Department</th>
        <th>Year</th>
        <th>Start Date</th>
        <th>End Date</th>
      </tr>
    </thead>
    <tbody>
      {exams.map(exam => <ExamRow key={exam.id} exam={exam} />)}
    </tbody>
  </table>
</div>);

type ExamListPageOwnProps = RouteComponentProps<{}>;
type ExamListPageProps = {
  data: QueryProps & ExamListQuery;
};

const ExamListPage = ({ data: { exams } }: ExamListPageProps) => (
  <section className="customCss">
    <h3 className="bg-heading p-1 m-b-0">
      <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '}
      Admin - Exam Management
      </h3>
    <div className="plugin-bg-white p-1">
      <div className="m-b-1 dflex bg-heading">
        <h4 className="ptl-06">Exam Details</h4>
        <div>
          <Link
            to={`/plugins/ems-exam/page/addExam`}
            className="btn btn-primary m-r-1" style={w180}>Create New Exam
        </Link>
          <a className="btn btn-primary">Export</a>
        </div>
      </div>
      <ExamsTable exams={exams}/>
    </div>
  </section>
);

export default graphql<ExamListQuery, ExamListPageOwnProps, ExamListPageProps>(
  ExamListQueryGql
)(withLoadingHandler(ExamListPage));
