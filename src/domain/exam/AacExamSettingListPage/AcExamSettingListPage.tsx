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



type AcExamSettingListPageOwnProps = RouteComponentProps<{}>;
type AcExamSettingListPageProps = {
  data: QueryProps & AcExamSettingListQuery;
};

type ExamTableProps = {
  acExamSettings: any
};
type ExamTableStates = {
  acExamSettings: any,
  search: any
};
class AcExamSettingsTable extends React.Component<ExamTableProps, ExamTableStates> {

  constructor(props: any) {
    super(props);
    this.state = {
      acExamSettings: props.acExamSettings,
      search: "",
      // enquiryData: {}

    };
    this.checkAllExams = this.checkAllExams.bind(this);
    this.onClickCheckbox = this.onClickCheckbox.bind(this);
    this.createExamRows=this.createExamRows.bind(this);
    // this.createDetailsDiv = this.createDetailsDiv.bind(this);

  }

  checkAllExams(e: any) {
    const { acExamSettings } = this.state;
    const mutateResLength = acExamSettings.length;
    let chkAll = e.nativeEvent.target.checked;
    let els = document.querySelectorAll("input[type=checkbox]");

    var empty = [].filter.call(els, function (el: any) {
      if (chkAll) {
        el.checked = true;
      } else {
        el.checked = false;
      }
    });
  }
  onClickCheckbox(index: any, e: any) {
  
    const { id } = e.nativeEvent.target;
    let chkBox: any = document.querySelector("#" + id);
    chkBox.checked = e.nativeEvent.target.checked;
  }


  createExamRows(acExamSettings: any) {
    const length = acExamSettings.length;
    const retVal = [];
    for (let i = 0; i < length; i++) {
      const acExamSetting = acExamSettings[i];
     
      
      retVal.push(
        <tr key={acExamSetting.id}>
          <td>
            <input onClick={(e: any) => this.onClickCheckbox(i, e)} checked={acExamSetting.isChecked} type="checkbox" name="" id="" />
          </td>
          <td>{acExamSetting.action}</td>
          <td>
            <Link
              className="table-link link-color"
              to={`/plugins/ems-exam/page/exam?id=${acExamSetting.id}`}
            >
             {acExamSetting.examType}
            </Link>
          </td>
        
          <td>{acExamSetting.bctch}</td>
          <td>{acExamSetting.departmnt}</td>
          <td>{acExamSetting.sectn}</td>
          <td>{acExamSetting.sbjct}</td>
          <td>{acExamSetting.st}</td>
          <td>{acExamSetting.ed}</td>
          {/* <td> <button className="btn btn-primary" onClick={e => this.showDetail(acExamSetting)}>Details</button></td> */}
        </tr>
      );
    }
    return retVal;
  }
 





  render() {
    const { acExamSettings } = this.state;
    return (
      <div>
       

        <table id="studentlistpage" className="striped-table fwidth bg-white">
          <thead>
            <tr>
              <th>
                <input type="checkbox" onClick={(e: any) => this.checkAllExams(e)} value="checkedall" name="" id="" />
              </th>
            <th>Id</th>
            <th>EXAM TYPE</th>
           <th>YEAR</th>          
           <th>DEPARTMENT</th>           
            <th>SECTION</th>
           <th>SUBJECT</th>
           <th>START DATE</th>
           <th>END DATE</th>
          
            </tr>
          </thead>
          <tbody>
            {this.createExamRows(acExamSettings)}
          </tbody>
        </table>
      </div>
    );
  }
}

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