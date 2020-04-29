import * as moment from 'moment';
import * as React from 'react';
import {RouteComponentProps, withRouter, Link} from 'react-router-dom';
import {graphql, QueryProps, MutationFunc, compose, withApollo} from 'react-apollo';
//import * as ExamListQueryTypeForAdminGql from './ExamListQueryTypeForAdmin.graphql';
//import * as AddReportMutationGql from './AddReportMutation.graphql';
//import { LoadExamSubjQueryCacheForAdmin, ExamListQueryTypeForAdmin, AddReportMutation } from '../../types';
//import withExamSubjDataLoader from './withExamSubjDataLoader';
import {CREATE_FILTER_DATA_CACHE, ADD_EXAM_REPORT, GET_EXAM_DATA} from '../_queries';
import withLoadingHandler from '../withLoadingHandler';
import wsCmsBackendServiceSingletonClient from '../../../wsCmsBackendServiceClient';

import {type} from 'os';

const w180 = {
  width: '180px',
};

interface type {
  checked: boolean;
}

// type ExamRootProps = RouteComponentProps<{
//  academicyearId: string;
//  collegeId: string;
// }> & {
//  data: QueryProps & LoadExamSubjQueryCacheForAdmin;
// };

//type ExamPageProps = ExamRootProps & {
//  mutate: MutationFunc<ExamListQueryTypeForAdmin>;
//  mutateUpd: MutationFunc<AddReportMutation>;
//};

type ExamState = {
  examData: any;
  branches: any;
  academicyears: any;
  departments: any;
  batches: any;
  academicExamSettings: any;
  subjects: any;
  sections: any;
  dtPicker: any;
  submitted: any;
  dateofExam: any;
  dayValue: any;
  duratn: number;

  user: any;
  examFilterCacheList: any;
  branchId: any;
  academicYearId: any;
  departmentId: any;
};

class SaData {
  marksObtain: any;
  studentId: any;
  typeOfGradingId: any;
  academicExamSettingId: any;
  departmentId: any;
  sectionId: any;
  batchId: any;
  subjectId: any;
  pOg: any;
  comments: any;
  constructor(
    marksObtain: any,
    studentId: any,
    typeOfGradingId: any,
    academicExamSettingId: any,
    departmentId: any,
    sectionId: any,
    batchId: any,
    subjectId: any,
    pOg: any,
    comments: any
  ) {
    this.marksObtain = marksObtain;
    this.studentId = studentId;
    this.typeOfGradingId = typeOfGradingId;
    this.academicExamSettingId = academicExamSettingId;
    this.departmentId = departmentId;
    this.sectionId = sectionId;
    this.batchId = batchId;
    this.subjectId = subjectId;
    this.pOg = pOg;
    this.comments = comments;
  }
}

export interface ExamReportSrcProps extends React.HTMLAttributes<HTMLElement> {
  [data: string]: any;
  user?: any;
  examFilterCacheList?: any;
  
}

class ExamReportSrc extends React.Component<ExamReportSrcProps, ExamState> {
  constructor(props: ExamReportSrcProps) {
    super(props);
    this.state = {
      user: this.props.user,
      examFilterCacheList: this.props.examFilterCacheList,
      branchId: null,
      academicYearId: null,
      departmentId: null,
      dayValue: [],
      duratn: 0,
      dateofExam: '',
      examData: {
        // branch: {id: 1951},
        // academicyear: {id: 1701},
        // department: {id: ''},
        batch: {id: ''},
        section: {id: ''},
        academicExamSetting: {id: ''}, // 1051  //1701
        subject: {id: ''},
        examReport: {id: ''},
        mutateResult: [],
        filtered: [],
        selectedIds: '',
        payLoad: [],
        textValueMap: {},
        exmMarks: {},
        exmTotal: {},
        exmPassMarks: {},
        exmgrd: {},
        txtCmtVal: {},
      },
      branches: [],
      academicyears: [],
      departments: [],
      batches: [],
      sections: [],
      academicExamSettings: [],
      dtPicker: [],
      subjects: [],
      submitted: false,
    };

    this.createDepartments = this.createDepartments.bind(this);
    this.createBatches = this.createBatches.bind(this);
    this.createacademicExamSettings = this.createacademicExamSettings.bind(this);
    this.createSubjects = this.createSubjects.bind(this);
    this.createSections = this.createSections.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createGrid = this.createGrid.bind(this);
    // this.handleMarksObtainedChange = this.handleMarksObtainedChange.bind(this);
    this.handletotalChange = this.handletotalChange.bind(this);

    this.registerSocket = this.registerSocket.bind(this);
  }

  async componentDidMount(){
    await this.registerSocket();
  }

  registerSocket() {
    const socket = wsCmsBackendServiceSingletonClient.getInstance();

    socket.onmessage = (response: any) => {
        let message = JSON.parse(response.data);
        console.log("MarkSubjectExam. message received from server ::: ", message);
        this.setState({
            branchId: message.selectedBranchId,
            academicYearId: message.selectedAcademicYearId,
            departmentId: message.selectedDepartmentId,
        });
        console.log("MarkSubjectExam. branchId: ",this.state.branchId);
        console.log("MarkSubjectExam. departmentId: ",this.state.departmentId);  
        console.log("MarkSubjectExam. ayId: ",this.state.academicYearId);  
    }

    socket.onopen = () => {
        console.log("MarkSubjectExam. Opening websocekt connection to cmsbackend. User : ",this.state.user.login);
        socket.send(this.state.user.login);
    }

    window.onbeforeunload = () => {
        console.log("MarkSubjectExam. Closing websocket connection with cms backend service");
    }
  }

  createDepartments(departments: any, selectedBranchId: any) {
    let departmentsOptions = [
      <option key={0} value="">
        Select Department
      </option>,
    ];
    for (let i = 0; i < departments.length; i++) {
      if (selectedBranchId == departments[i].branch.id) {
        departmentsOptions.push(
          <option key={departments[i].id} value={departments[i].id}>
            {departments[i].name}
          </option>
        );
      }
    }
    return departmentsOptions;
  }
  createBranches(branches: any) {
    let branchesOptions = [
      <option key={0} value="">
        Select Branch
      </option>,
    ];
    for (let i = 0; i < branches.length; i++) {
      branchesOptions.push(
        <option key={branches[i].id} value={branches[i].id}>
          {branches[i].branchName}
        </option>
      );
    }
    return branchesOptions;
  }
  createBatches(batches: any, selectedDepartmentId: any) {
    let batchesOptions = [
      <option key={0} value="">
        Select Year
      </option>,
    ];
    for (let i = 0; i < batches.length; i++) {
      let id = batches[i].id;
      let dptId = '' + batches[i].department.id;
      if (parseInt(dptId, 10) === parseInt(selectedDepartmentId, 10)) {
        batchesOptions.push(
          <option key={id} value={id}>
            {batches[i].batch}
          </option>
        );
      }
    }
    return batchesOptions;
  }
  createSections(sections: any, selectedBatchId: any) {
    let sectionsOptions = [
      <option key={0} value="">
        Select Section
      </option>,
    ];
    for (let i = 0; i < sections.length; i++) {
      let id = sections[i].id;
      let sbthId = '' + sections[i].batch.id;
      if (parseInt(sbthId, 10) === parseInt(selectedBatchId,10)) {
        sectionsOptions.push(
          <option key={id} value={id}>
            {sections[i].section}
          </option>
        );
      }
    }
    return sectionsOptions;
  }
  createacademicExamSettings( academicExamSettings: any, selectedDepartmentId: any, selectedBatchId: any ) {
    let examOptions = [
      <option key={0} value="">
        Select Exam
      </option>,
    ];
    for (let i = 0; i < academicExamSettings.length; i++) {
      let id = academicExamSettings[i].id;
      if (
        parseInt(academicExamSettings[i].departmentId, 10) === parseInt(selectedDepartmentId, 10) &&
        parseInt(academicExamSettings[i].batchId,10) === parseInt(selectedBatchId, 10)
      ) {
        examOptions.push(
          <option key={id} value={id}>
            {academicExamSettings[i].examName}
          </option>
        );
      }
    }
    return examOptions;
  }
  createSubjects(subjects: any, selectedDepartmentId: any, selectedBatchId: any) {
    let subjectsOptions = [
      <option key={0} value="">
        Select Subject
      </option>,
    ];
    for (let i = 0; i < subjects.length; i++) {
      let id = subjects[i].id;
      if (
        parseInt(subjects[i].department.id, 10) === parseInt(selectedDepartmentId, 10) &&
        parseInt(subjects[i].batch.id, 10) === parseInt(selectedBatchId, 10)
      ) {
        subjectsOptions.push(
          <option key={id} value={id}>
            {subjects[i].subjectDesc}
          </option>
        );
      }
    }
    return subjectsOptions;
  }

  onFormSubmit = (e: any) => {
    this.setState({
      submitted: true,
    });

    const {mutate} = this.props;
    const {examData, departmentId} = this.state;
    e.preventDefault();

    if ( departmentId && examData.batch.id && examData.section.id && examData.academicExamSetting.id && examData.subject.id ) {
      e.target.querySelector('#detailGridTable').removeAttribute('class');

      let examInputData = {
        departmentId: departmentId,
        batchId: examData.batch.id,
        sectionId: examData.section.id,
        academicExamSettingId: examData.academicExamSetting.id,
        subjectId: examData.subject.id,
      };

      let btn = e.target.querySelector("button[type='submit']");
      btn.setAttribute('disabled', true);
      return mutate({
        variables: {filter: examInputData},
      })
        .then((data: any) => {
          const sdt = data;
          examData.mutateResult = [];
          examData.mutateResult.push(sdt);
          examData.filtered.push(sdt);
          this.setState({
            examData: examData,
          });
          console.log('Query Result ::::: ', examData.mutateResult);

          btn.removeAttribute('disabled');
        })
        .catch((error: any) => {
          btn.removeAttribute('disabled');

          console.log(
            'there was an error sending the query result - exam for admin role: ',
            error
          );
          return Promise.reject(`Could not retrieve exam data for admin: ${error}`);
        });
    }
  };

  onChange = (e: any) => {
    const {name, value} = e.nativeEvent.target;
    const {examData} = this.state;
    if (name === 'department') {
      this.setState({
        examData: {
          ...examData,
          department: {
            id: value,
          },
          batch: {
            id: '',
          },
          section: {
            id: '',
          },
          academicExamSetting: {
            id: '',
          },
          subject: {
            id: '',
          },
        },
      });
    } else if (name === 'batch') {
      this.setState({
        examData: {
          ...examData,
          batch: {
            id: value,
          },
          section: {
            id: '',
          },
          academicExamSetting: {
            id: '',
          },
          subject: {
            id: '',
          },
        },
      });
    } else if (name === 'section') {
      this.setState({
        examData: {
          ...examData,
          section: {
            id: value,
          },
          academicExamSetting: {
            id: '',
          },
          subject: {
            id: '',
          },
        },
      });
    } else if (name === 'academicExamSetting') {
      this.setState({
        examData: {
          ...examData,
          academicExamSetting: {
            id: value,
          },
          subject: {
            id: '',
          },
        },
      });
    } else if (name === 'subject') {
      this.setState({
        examData: {
          ...examData,
          subject: {
            id: value,
          },
        },
      });
    }
  };

  reset() {
    const {examData} = this.state;
    let txtCn: any = document.querySelector('#marksObtain');
    // let txtDs: any = document.querySelector("#description")
    // let dtPkSt: any = document.querySelector("#dtPickerSt");
    // let dtPkNd: any = document.querySelector("#dtPickerNd");
    // dtPkSt.value = "";
    // dtPkNd.value = "";
    txtCn.value = '';
    // txtDs.value = "";
    examData.markObtain = '';
    this.setState({
      examData: examData,
    });
  }

  checkAllRows(e: any) {
    const {examData} = this.state;
    const mutateResLength = examData.mutateResult.length;
    let chkAll = e.nativeEvent.target.checked;
    let els = document.querySelectorAll('input[type=checkbox]');

    var empty = [].filter.call(els, function(el: any) {
      if (chkAll) {
        el.checked = true;
      } else {
        el.checked = false;
      }
    });
  }

  onClickCheckbox(index: any, e: any) {
    const {id} = e.nativeEvent.target;
    let chkBox: any = document.querySelector('#' + id);
    chkBox.checked = e.nativeEvent.target.checked;
  }

  // handleMarksObtainedChange= (e: any) => {
  //   const { id, value } = e.nativeEvent.target;
  //   const { examData } = this.state;
  //   examData.exmMarks[id] = value;
  //   this.setState({examData:examData})
  // }

  handletotalChange = (e: any) => {
    const {mutateUpd} = this.props;
    console.log('handletotalchnage working');
    const {id, value} = e.nativeEvent.target;
    const {examData} = this.state;
    const key = id;
    const val = value;
    e.preventDefault();
    let len = this.createGrid(this.state.examData.mutateResult).length;
    for (let i = 0; i < len; i++) {
      console.log('checkLen:', len);
      let gd: any = document.querySelector('#grade' + i);
      console.log('grade', gd.value);
      let tt: any = document.querySelector('#total' + i);
      console.log('obtmarks:', tt.value);
      let o = parseInt(val);
      let t = parseInt(tt.value);
      // let c = 100;
      let wt = o / t;
      let w = wt * 100;
      let f = w.toFixed(2);

      if (gd.value === 'GRADE') {
        examData.textValueMap[key] = val;
      } else examData.textValueMap[key] = f;
      this.setState({
        examData: examData,
      });
    }
  };

  handleChange = (e: any) => {
    const {id, value} = e.nativeEvent.target;
    const {examData} = this.state;
    const key = id;
    const val = value;
    e.preventDefault();
    examData.textValueMap[key] = val;
    this.setState({
      examData: examData,
    });
  };

  onClick = (e: any) => {
    const {mutateUpd} = this.props;
    const {examData, departmentId} = this.state;

    e.preventDefault();
    let len = this.createGrid(this.state.examData.mutateResult).length;
    for (let i = 0; i < len; i++) {
      console.log('checkLen:', len);
      let dt: any = document.querySelector('#marksObtain' + i);
      console.log('dt:', dt.value);
      if (examData.exmMarks[dt.id] === null || examData.exmMarks[dt.id] === '') {
        alert('Please Enter marks');
        return;
      }
    }
    let sadt = new SaData(
      23,
      2351,
      examData.typeOfGarding.id,
      examData.academicExamSetting.id,
      departmentId,
      examData.section.id,
      examData.batch.id,
      examData.subject.id,
      34,
      'GOOOOD'
    );
    examData.payLoad.push(sadt);
    console.log('total IDS : ', examData.selectedIds);

    let btn: any = document.querySelector('#btnSave');
    btn.setAttribute('disabled', true);
    return mutateUpd({
      variables: {input: examData.payLoad},
    })
      .then((data: any) => {
        btn.removeAttribute('disabled');
        console.log('Update Result: ', data.data.addAcademicExamSettingData.statusDesc);
        alert(data.data.addAcademicExamSettingData.statusDesc);
      })
      .catch((error: any) => {
        btn.removeAttribute('disabled');
        console.log('there is some error while updating exam report data', error);
        return Promise.reject(
          `there is some error while updating sexam report data: ${error}`
        );
      });
  };

  createGrid(ary: any) {
    const {examData} = this.state;
    const retVal = [];
    const len = ary.length;
    for (let pd = 0; pd < len; pd++) {
      let v = ary[pd];
      for (let x = 0; x < v.data.getSubjectandStudents.length; x++) {
        let k = v.data.getSubjectandStudents[x];

        retVal.push(
          <tbody>
            <tr key={examData.id} id="custom-width-input">
              <td>
                <input
                  onClick={(e: any) => this.onClickCheckbox(x, e)}
                  checked={examData.isChecked}
                  type="checkbox"
                  name=""
                  id={'chk' + examData.id}
                />
              </td>
              <td>{k.id}</td>
              <td>{k.student.studentName}</td>
              <td>{k.student.rollNo}</td>
              <td>{k.student.id}</td>

              <td>
                <input id={'total' + x} defaultValue={k.academicExamSetting.total} />
              </td>
              <td>
                <input id={'grade' + x} defaultValue={k.academicExamSetting.gradeType} />
              </td>
              <td>
                <input
                  type="number"
                  id={'marksObtain' + x}
                  name="marksObtain"
                  onChange={this.handletotalChange}
                />
              </td>
              <td>
                {examData.textValueMap['marksObtain' + x]}
                {/* <input   defaultValue={k.academicExamSetting.gradeType}
              ></input> */}
              </td>
              <td>
                <input
                  type="text"
                  id={'t' + k.studentId}
                  defaultValue={k.comments}
                  maxLength={255}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        );
      }
    }
    return retVal;
  }

  render() {
    // const {data: {createExamFilterDataCache, refetch}, mutate} = this.props;
    const { examData, examFilterCacheList, departmentId } = this.state;

    return (
      <section className="plugin-bg-white">
        {/* <h3 className="bg-heading p-1">
          <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '}
          Admin - Academic Exam Setting
        </h3> */}

        <div className="p-1">
          <form className="gf-form-group" onSubmit={this.onFormSubmit}>
            <table id="t-attendance" className="markAttendance">
              <thead>
                <tr>
                  {/* <th>Department</th> */}
                  <th>Year</th>
                  <th>Section</th>
                  <th>Exams</th>
                  <th>Subjects</th>
                  <th>Exam Report</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* <td>
                    <select
                      required
                      name="department"
                      id="department"
                      onChange={this.onChange}
                      value={departmentId}
                      className="gf-form-input max-width-22"
                    >
                      {this.createDepartments(
                        this.props.data.createExamFilterDataCache.departments,
                        examData.branch.id
                      )}
                    </select>
                  </td> */}
                  <td>
                 
              <label htmlFor=""> Year <span style={{color: 'red'}}> * </span> </label>
               <select name="batch" id="batch" className="gf-form-input width-11 m-b-1"  onChange={this.onChange} value={examData.batch.id} style={{width: '10.8rem', marginBottom: '10px', borderRadius: '0px'}} >
                  {examFilterCacheList !== null &&
                  examFilterCacheList !== undefined &&
                  examFilterCacheList.batches !== null &&
                  examFilterCacheList.batches !== undefined
                    ? this.createBatches(
                      examFilterCacheList.batches,
                        departmentId
                      )
                    : null}
                    {/* {this.createBatches(createStudentFilterDataCache.batches, departmentId)} */}
                </select>
                  </td>
                  <td>
                    <select required name="section" id="section" onChange={this.onChange} value={examData.section.id} className="gf-form-input max-width-22" >
                      {this.createSections( examFilterCacheList.sections, examData.batch.id )}
                    </select>
                  </td>
                  <td>
                    <select name="academicExamSetting" id="academicExamSetting" onChange={this.onChange} className="gf-form-input max-width-22" >
                      {this.createacademicExamSettings( examFilterCacheList.academicExamSettings,  departmentId, examData.batch.id )}
                    </select>
                  </td>
                  <td>
                    <select name="subject" id="subject" onChange={this.onChange} value={examData.subject.subjectDesc} className="gf-form-input max-width-22" >
                      {this.createSubjects( examFilterCacheList.subjects, departmentId, examData.batch.id )}
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-primary" type="submit" id="btnTakeAtnd" name="btnTakeAtnd" style={{width: '150px'}} >
                      Create Exam Report
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="container-fluid p-1 " />

            <div className="hide" id="detailGridTable">
              <table className="fwidth">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" onClick={(e: any) => this.checkAllRows(e)} value="checkedall" name="" id="" />
                    </th>
                    <th>Id</th>
                    <th>Student Name</th>
                    <th>Roll No</th>
                    <th>Student Id</th>
                    <th>Total Marks</th>
                    <th>Grade Type</th>
                    <th>Marks Obtained</th>
                    <th>Grade/Percentage</th>
                    <th>Comments</th>
                  </tr>
                </thead>

                {this.createGrid(this.state.examData.mutateResult)}
              </table>

              <div className="d-flex fwidth justify-content-between pt-2">
                <p />
                <div>
                  <button className="btn btn-primary mr-1" id="btnSave" name="btnSave" onClick={this.onClick} >
                    Save
                  </button>
                  <button className="btn btn-primary mr-1" id="btnReset" name="btnReset" onClick={this.reset} >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

//export default withExamSubjDataLoader(

//  compose(
//    graphql<ExamListQueryTypeForAdmin, ExamRootProps>(ExamListQueryTypeForAdminGql, {
//     name: "mutate"
//   }),
//    graphql<AddReportMutation, ExamRootProps>(AddReportMutationGql, {
//      name: "mutateUpd",
//    }),

//  )

//    (ExamReportSrc) as any
//);

//-----
// export default graphql(CREATE_FILTER_DATA_CACHE, {
//   options: ({}) => ({
//     variables: {
//       collegeId: 1851,
//       academicYearId: 1701,
//     },
//   }),
// })(
//   withLoadingHandler(compose(
//     graphql(ADD_EXAM_REPORT, {name: 'addAcademicExamSettingData'}),
//     graphql(GET_EXAM_DATA, {name: 'getSubjectandStudents'})
//   )(ExamReportSrc) as any)
// );

export default withApollo(ExamReportSrc)

