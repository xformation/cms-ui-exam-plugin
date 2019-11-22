import * as React from 'react';
import * as _ from 'lodash';

import {withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { graphql, QueryProps, MutationFunc, compose } from "react-apollo";
//import { AcExamSettingListQuery } from '../../typ/es';
import * as AcExamSettingListQueryGql from './AcExamSettingListQuery.graphql';
//import withLoadingHandler from '../../../components/withLoadingHandler';
import withLoadingHandler from '../withLoadingHandler';
import { EXAM_SETTING_LIST, CREATE_FILTER_DATA_CACHE } from '../_queries';
import { render } from 'react-dom';
import { LoadExamSubjQueryCacheForAdmin, AcExamSettingListQuery } from '../../types';
// import withExamSubjDataLoader from '../Grade/withExamSubjDataLoader';

const w180 = {
  width: '180px',
  marginRight: '10px',
};


interface type {
  checked: boolean;
}

// type ExamRootProps = RouteComponentProps<{
//   academicYearId: string;
//   collegeId: string;
// }> & {
//   data: QueryProps & LoadExamSubjQueryCacheForAdmin;
// };



// type ExamPageProps = ExamRootProps & {
//   mutate: MutationFunc<AcExamSettingListQuery>;
// };

type ExamTableState = {
  examData: any,
  exams: any,
  search: any,
  selectedExams: any,
  pageSize: any
};

class AcExamListPage extends React.Component<any, ExamTableState> {

  constructor(props: any) {
    super(props);
    this.state = {
      exams: {},
      examData: {
        mutateResult: [],
        search: "",
 },
      selectedExams: [],
      pageSize: 5,
      search: ''
};
    this.checkAllExams = this.checkAllExams.bind(this);
    this.onClickCheckbox = this.onClickCheckbox.bind(this);
    this.createExamRows = this.createExamRows.bind(this);
    this.onClickContinueButton = this.onClickContinueButton.bind(this);

  }

        onClickContinueButton(index: any, e: any) {
    localStorage.setItem("selectedExams", JSON.stringify(this.state.selectedExams));
  }

  checkAllExams(e: any) {
    const { examData } = this.state;
    const mutateResLength = examData.mutateResult.length;
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
   
    const { id } = e.nativeEvent.target;
    let chkBox: any = document.querySelector("#" + id);
    chkBox.checked = e.nativeEvent.target.checked;
  }



  createExamRows(objAry: any) {
    let { search } = this.state.examData;
    search = search.trim();
    const mutateResLength = objAry.length;
    const retVal = [];
    for (let x = 0; x < mutateResLength; x++) {
      const tempObj = objAry[x];
      const exams = tempObj.data.acexamsettingList;
      const length = exams.length;
      for (let i = 0; i < length; i++) {
        const exam = exams[i];
        if(search){
          if(exam.examName.indexOf(search) !== -1){
            retVal.push(
              <tr key={exam.id}>                
              <td>{exam.examName}</td>
              <td>{exam.action}</td>
              <td>{exam.sbjct}</td>
              <td>{exam.examDate}</td>
              <td>{exam.departmnt}</td>
              <td>{exam.bctch}</td>
              <td>{exam.brnch}</td>
              <td>{exam.sectn}</td>
              <td>{exam.st}</td>
              <td>{exam.ed}</td>
              <td>{exam.subExamDate}</td>
              <td>{exam.countvalue}</td>
            </tr>
            );
            }}else{
            retVal.push(
              <tr key={exam.id}>                
              <td>{exam.examName}</td>
              <td>{exam.action}</td>
              <td>{exam.sbjct}</td>
              <td>{exam.examDate}</td>
              <td>{exam.departmnt}</td>
              <td>{exam.bctch}</td>
              <td>{exam.brnch}</td>
              <td>{exam.sectn}</td>
              <td>{exam.st}</td>
              <td>{exam.ed}</td>
              <td>{exam.subExamDate}</td>
              <td>{exam.countvalue}</td>
              </tr>
            );
          }
      }
    }
    return retVal;
  
}

onChange = (e: any) => {
  const { search } = e.nativeEvent.target;
  const { name, value } = e.nativeEvent.target;
  const { examData } = this.state;
   if (name === "batch") {
    this.setState({
      examData: {
        ...examData,
        batch: {
          id: value
        },
        
        subject: {
          id: ""
        }
      }
    });
  }else {
    this.setState({
      examData: {
        ...examData,
        [name]: value
      }
    });
  }
}



onClick = (e: any) => {
  const { name, value } = e.nativeEvent.target;
  const { mutate } = this.props;
  const { examData } = this.state;
  e.preventDefault();


  let examFilterInputObject = {
    
    // batchId: examData.batch.id,
    
    // subjectId: examData.subject.id
  };

  return mutate({
    variables: { filter: examFilterInputObject },
  }).then((data: any) => {
    const sdt = data;
    examData.mutateResult = [];
    examData.mutateResult.push(sdt);
    this.setState({
      examData: examData
    });
    console.log('Exam filter mutation result ::::: ', examData.mutateResult);
  }).catch((error: any) => {
    console.log('there was an error sending the query result', error);
    return Promise.reject(`Could not retrieve exam data: ${error}`);
  });

}

render() {
  const{ examData } = this.state;

  return (
    <section className="customCss">
      <h3 className="plugin-bg-white p-1">
        <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '}
        Admin - Academic Exam Setting Management
     </h3>
      <div className="container-fluid p-1 ">
        <div className="m-b-1 bg-heading-bgStudent studentListFlex">
        <div className="plugin-bg-white p-1">
      <div className="m-b-1 eflex bg-heading-exam">
        <h4 className="ptl-06">Academic Year 2018-2019 </h4>
        
          {/* <Link
            to={`/plugins/ems-exam/page/addexam`}
            className="btn btn-primary m-r-1" style={w180}>Add Exam
          </Link> */}

      </div>
     
    </div>
          <div className="">
            <h4 className="">Exam Type</h4>
          </div>
         
        </div>
        
      <div className="student-flex">
            


          <div className="margin-bott max-width-22">
              <label htmlFor="">Search</label>
              <input type="text" name="search" value={examData.search} onChange={this.onChange} />
          </div>
          <div className="m-b-1 bg-heading-bg studentSearch">
              <button className="btn btn-primary max-width-13" id="btnFind" name="btnFind" onClick={this.onClick} style={w180}>Search Exam</button>
            </div>
          </div>
         

          <table id="examlistpage" className="striped-table fwidth bg-white">
            <thead>
              <tr>                
                <th>EXAM TYPE</th>
                <th>YEAR</th>
                <th>DEPARTMENT</th>
                <th>SECTION</th>
                <th>SUBJECT</th>
                <th>Sub-ExamDate</th>
                <th>START DATE</th>
                <th>END DATE</th>
                <th>Details</th>
             </tr>      
            </thead>
            <tbody>
              {
                this.createExamRows(this.state.examData.mutateResult)
              }
            </tbody>
          </table>
         
      </div>
      </section>

  );
 }
}
const AcExamSettingListPage = ({ data: { acExamSettings } }: any) => (
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
            to={`/plugins/ems-exam/page/addexam`}
            className="btn btn-primary m-r-1" style={w180}>Add Exam
          </Link> */}

        </div>
      </div>
      <AcExamListPage acExamSettings={acExamSettings} />
    </div>
  </section>
);
  

export default graphql(CREATE_FILTER_DATA_CACHE,{
  options: ({ }) => ({
    variables: {
      collegeId:1801,
      academicYearId: 1701
    }
  })
}) (withLoadingHandler(
  compose(
    graphql(EXAM_SETTING_LIST, { name: "mutate" }),
  )

    (AcExamListPage) as any
));
  