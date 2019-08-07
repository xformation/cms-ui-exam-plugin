import * as React from 'react';
import { AcExamSettingFragment } from '../../types';

import { Link } from 'react-router-dom';

export default ({ acExamSetting }: { acExamSetting: AcExamSettingFragment }) => (
  <section className="student-profile-container">
    <h3 className="bg-heading p-1 m-b-0">
      <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '}
      Admin -  Exam Details
      </h3>
      
    <div className="plugin-bg-white p-1">
      <div className="m-b-1 dflex bg-heading">
        <h4 className="ptl-06">Exam Profile</h4>
        <div className="dont-print">
          <a className="btn btn-primary m-r-1" onClick={(e: any) => { print() }}>
            Print
          </a>
          
        </div>
      </div>
       
    </div>
  </section>
);
