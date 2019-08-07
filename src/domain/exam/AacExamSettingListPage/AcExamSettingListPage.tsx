import * as React from 'react';

import {RouteComponentProps, Link } from 'react-router-dom';
import { graphql, QueryProps } from 'react-apollo';
import {AcExamSettingListQuery} from  '../../types';

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
  search: any,
  selectedExams: any
};
class AcExamSettingsTable extends React.Component<ExamTableProps, ExamTableStates> {

  constructor(props: any) {
    super(props);
    this.state = {
      acExamSettings: props.acExamSettings,
      search: "",
      selectedExams: []
      // enquiryData: {}

    };
    this.checkAllExams = this.checkAllExams.bind(this);
    this.onClickCheckbox = this.onClickCheckbox.bind(this);
    this.createExamRows=this.createExamRows.bind(this);
     this.onClickContinueButton = this.onClickContinueButton.bind(this);

  }

  onClickContinueButton(e: any){
    localStorage.setItem("selectedExams", JSON.stringify(this.state.selectedExams));
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
  onClickCheckbox(index: any, arr: any, e: any) {
    this.setState({
      selectedExams: arr
    });
  }

  // onClick = (e: any) => {
  //   const { name, value } = e.nativeEvent.target;
  //   const { data } = this.props;
  //   const { studentData } = this.state;
  //   e.preventDefault();

  //   let studentFilterInputObject = {
  //     branchId: studentData.branch.id,
  //     departmentId: studentData.department.id,
  //     batchId: studentData.batch.id,
  //     sectionId: studentData.section.id,
  //     gender: studentData.gender.id,
  //     studentType: studentData.studentType.id
  //   };


  //   return mutate({
  //     variables: { filter: studentFilterInputObject },
  //   }).then(data => {
  //     const sdt = data;
  //     studentData.mutateResult = [];
  //     studentData.mutateResult.push(sdt);
  //     this.setState({
  //       studentData: studentData
  //     });
  //     console.log('Student filter mutation result ::::: ', studentData.mutateResult);
  //   }).catch((error: any) => {
  //     console.log('there was an error sending the query result', error);
  //     return Promise.reject(`Could not retrieve student data: ${error}`);
  //   });

  // }

  createExamRows(obj: any) {
    let consolidatedObj: any = {};
    const length = obj.length;
    for (let counter = 0; counter < length; counter++) {
      let acExamSetting = obj[counter];
      let acExamSettingArr = consolidatedObj[acExamSetting.countvalue] || [];
      acExamSettingArr.push(acExamSetting);
      consolidatedObj[acExamSetting.countvalue] = acExamSettingArr;
    }
    const retVal = [];    
    const keys = Object.keys(consolidatedObj);
    const lengthKeys = keys.length;
    for (let i = 0; i < lengthKeys; i++) {
      let acExamSettingArr = consolidatedObj[keys[i]];
      for (let j = 0; j < acExamSettingArr.length; j++) {
        let acExamSetting = acExamSettingArr[j]; 
      retVal.push(
        <tr>
         {j === 0 &&
              <td rowSpan={acExamSettingArr.length}>
                <input onClick={(e: any) => this.onClickCheckbox(keys[i], acExamSettingArr, e)} type="radio" name="grades" id={"chk" + keys[i]} />
              </td>
            }
          <td>{acExamSetting.countvalue}</td>
          <td>
            <Link
              className="table-link link-color"
              to={`/plugins/ems-exam/page/acExamSetting?countvalue=${acExamSetting.countvalue}`}
            >
             {acExamSetting.examName}
            </Link>
          </td>
          <td>{acExamSetting.bctch}</td>
          <td>{acExamSetting.departmnt}</td>
          <td>{acExamSetting.sectn}</td>
          <td>{acExamSetting.sbjct}</td>
          <td>{acExamSetting.subExamDate}</td>
          <td>{acExamSetting.st}</td>
          <td>{acExamSetting.ed}</td>         
          <td> <a >
            <i className="fa fa-pencil-square-o fa-1-5x" aria-hidden="true"></i>
          </a>
          <a >
            <i className="fa fa-trash-o fa-1-5x table-p" aria-hidden="true"></i>
          </a></td> 
          <td> 
          <Link
            to={`/plugins/ems-exam/page/addexam`}
            className="btn btn-primary m-r-1" style={w180} onClick={this.onClickContinueButton}>Details
          </Link>
          </td>
          
          {/* <td> <button className="btn btn-primary" onClick={e => this.showDetail(acExamSetting)}>Details</button></td> */}
        </tr>
      );
      }
    }
    return retVal;
  }

  render() {
    const { acExamSettings, selectedExams} = this.state;
    console.log(selectedExams);
    return (
      <div>     

        <table id="studentlistpage" className="striped-table fwidth bg-white">
          <thead>
            <tr>
            <th>
                <input type="radio" value="checkedall" name="" id="chkCheckedAll" />
                    </th>
            <th>Id</th>
            <th>EXAM TYPE</th>
           <th>YEAR</th>          
           <th>DEPARTMENT</th>           
            <th>SECTION</th>
           <th>SUBJECT</th>
           <th>Sub-ExamDate</th>
           <th>START DATE</th>
           <th>END DATE</th>
           <th>Actions</th> 
           <th>Details</th>
           

            <span>
            
          {/* <Link
            to={`/plugins/ems-exam/page/addexam`}
            className="btn btn-primary m-r-1" style={w180} onClick={this.onClickContinueButton}>Details
          </Link> */}
            
          </span>
           }
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
         
          <Link
            to={`/plugins/ems-exam/page/addexam`}
            className="btn btn-primary m-r-1" style={w180}>Add Exam
          </Link>
          
        </div>
      </div>
      <AcExamSettingsTable acExamSettings={acExamSettings} />
    </div>
  </section>
);
      
  export default graphql<AcExamSettingListQuery, AcExamSettingListPageOwnProps, AcExamSettingListPageProps>(
    AcExamSettingListQueryGql
  )(withLoadingHandler(AcExamSettingListPage));