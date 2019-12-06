import * as moment from 'moment';
import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { graphql, QueryProps, MutationFunc, compose } from "react-apollo";
// import * as AddExamMutationGql from './AddExamMutation.graphql';
// import { LoadExamSubjQueryCacheForAdmin, AddExamMutation } from '../../types';
// import withExamSubjDataLoader from './withExamSubjDataLoader';
import { ADD_EXAM_SETTING,  CREATE_FILTER_DATA_CACHE} from '../_queries';
import withLoadingHandler from '../withLoadingHandler';
import "react-datepicker/dist/react-datepicker.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Grading from '../Grade/Grading'

const w180 = {
  width: '180px'
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

//   mutate: MutationFunc<AddExamMutation>;
// };

type ExamState = {
  examData: any,
  branches: any,
  academicYears: any,
  departments: any,
  batches: any,
  subjects: any,
  semesters: any,
  sections: any,
  submitted: any,
  noOfExams: number,
  dateofExam: any,
  dayValue: any,
  isSubjectSame: any,
  startDate: any,
  gradeType: any,
  selectedGrade: any,
  groupValue: any,
  gradingId: any,
  isModalOpen: any

};

class SaData {
  examName: any;
  examDate: any;
  startTime: any;
  endTime: any;
  gradeType: any;
  total: any;
  passing: any;
  actions: any;
  academicyearId: any;
  subjectId: any;
  departmentId: any;
  batchId: any;
  semester: any;
  sectionId: any;
  branchId: any;
  typeOfGradingId: any;
  countvalue: any;
  groupvalue: any;
  constructor(examName: any, examDate: any, startTime: any, endTime: any, gradeType: any, total: any, passing: any, actions: any, academicyearId: any, subjectId: any, departmentId: any, batchId: any, semester: any, sectionId: any, branchId: any, typeOfGradingId: any, countvalue: any, groupvalue: any) {
    this.examName = examName;
    this.semester = semester;
    this.examDate = examDate
    this.startTime = startTime;
    this.endTime = endTime;
    this.gradeType = gradeType;
    this.total = total;
    this.passing = passing;;
    this.actions = actions;
    this.departmentId = departmentId;
    this.academicyearId = academicyearId;
    this.subjectId = subjectId;
    this.sectionId = sectionId;
    this.batchId = batchId;
    this.branchId = branchId;
    this.typeOfGradingId = typeOfGradingId;
    this.countvalue = countvalue;
    this.groupvalue = groupvalue;
  }
}

export class MarkExam extends React.Component<any, ExamState>{
  constructor(props: any) {
    super(props);
    this.state = {
      isModalOpen: false,
      gradeType: '',
      noOfExams: 0,
      selectedGrade: '',
      groupValue: '',
      gradingId: '',
      dayValue: [],
      dateofExam: "",
      isSubjectSame: false,
      examData: {
        branch: {
          id: 1901
          //1851 1001
        },
        academicYear: {
          id: 1701
          //1701 1051
        },
        department: {
          id: ""
        },
        batch: {
          id: ""
        },
        semester: {
          id: ""
        },
        subject: {
          id: ""
        },
        section: {
          id: ""
        },
        mutateResult: [],
        filtered: [],
        selectedIds: "",
        payLoad: [],
        textValueMap: {},
        exmDate: {},
        exmDay: {},
        exmStTime: {},
        exmNdTime: {},
        exmPassMarks: {},
        exmTotalMarks: {},
        txtCmtVal: {},
        exmcountvalues: {},
      },
      branches: [],
      academicYears: [],
      departments: [],
      batches: [],
      semesters: [],
      sections: [],
      subjects: [],
      submitted: false,
      startDate: "",


    };

    this.createDepartments = this.createDepartments.bind(this);
    this.createBatches = this.createBatches.bind(this);
    this.createSemesters = this.createSemesters.bind(this);
    this.createSubjects = this.createSubjects.bind(this);
    this.createSections = this.createSections.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeGrade = this.handleChangeGrade.bind(this);
    this.createGrid = this.createGrid.bind(this);
    this.validateDuplicateSubject = this.validateDuplicateSubject.bind(this);
    this.handleStTimeChange = this.handleStTimeChange.bind(this);
    this.handleNdTimeChange = this.handleNdTimeChange.bind(this);
    this.handlePassMarksChange = this.handlePassMarksChange.bind(this);
    this.handleTotalMarksChange = this.handleTotalMarksChange.bind(this);
    this.handleExamDateChange = this.handleExamDateChange.bind(this);
    this.isDatesOverlap = this.isDatesOverlap.bind(this);
    this.checkForSelectedGrades = this.checkForSelectedGrades.bind(this);
  }

  componentDidMount() {
    this.checkForSelectedGrades();
  }

  checkForSelectedGrades() {
    var selectedGrades = localStorage.getItem("selectedGrades");
    if (selectedGrades) {
      let selectedGra = JSON.parse(selectedGrades);
      this.setState({ selectedGrade: selectedGra });


      this.setState({ groupValue: selectedGra[0].groupvalue });
      this.setState({ gradingId: selectedGra[0].id });

      console.log("holdvalue:", selectedGrades);
      localStorage.removeItem("selectedGrades");
      this.setState({
        gradeType: "GRADE"
      });
    }
    else {
      this.setState({ gradingId: "2501" });
      this.setState({ groupValue: "1" });
    }
  }

  createDepartments(departments: any, selectedBranchId: any) {
    let departmentsOptions = [<option key={0} value="">Select Department</option>];
    for (let i = 0; i < departments.length; i++) {
      if (selectedBranchId == departments[i].branch.id) {
        departmentsOptions.push(
          <option key={departments[i].id} value={departments[i].id}>{departments[i].name}</option>
        );
      }
    }
    return departmentsOptions;
  }

  createBranches(branches: any) {
    let branchesOptions = [<option key={0} value="">Select Branch</option>];
    for (let i = 0; i < branches.length; i++) {
      branchesOptions.push(
        <option key={branches[i].id} value={branches[i].id}>{branches[i].branchName}</option>
      );
    }
    return branchesOptions;
  }

  createBatches(batches: any, selectedDepartmentId: any) {
    let batchesOptions = [<option key={0} value="">Select Year</option>];
    for (let i = 0; i < batches.length; i++) {
      let id = batches[i].id;
      let dptId = "" + batches[i].department.id;
      if (dptId == selectedDepartmentId) {
        batchesOptions.push(
          <option key={id} value={id}>{batches[i].batch}</option>
        );
      }
    }
    return batchesOptions;
  }

  createSubjects(subjects: any, selectedDepartmentId: any, selectedBatchId: any) {
    let subjectsOptions = [<option key={0} value="">Select Subject</option>];
    for (let i = 0; i < subjects.length; i++) {
      let id = subjects[i].id;
      if (subjects[i].department.id == selectedDepartmentId && subjects[i].batch.id == selectedBatchId) {
        subjectsOptions.push(
          <option key={id} value={id}>{subjects[i].subjectDesc}</option>
        );
      }
    }
    return subjectsOptions;
  }

  createSemesters(semesters: any) {
    let semestersOptions = [<option key={0} value="">Select Semester</option>];
    for (let i = 0; i < semesters.length; i++) {
      let id = semesters[i].id;
      semestersOptions.push(
        <option key={id} value={id}>{semesters[i].description}</option>
      );
    }
    return semestersOptions;
  }

  createSections(sections: any, selectedBatchId: any) {
    let sectionsOptions = [<option key={0} value="">Select Section</option>];
    for (let i = 0; i < sections.length; i++) {
      let id = sections[i].id;
      let sbthId = "" + sections[i].batch.id;
      if (sbthId == selectedBatchId) {
        sectionsOptions.push(
          <option key={id} value={id}>{sections[i].section}</option>
        );
      }
    }
    return sectionsOptions;
  }

  increaseExamValue() {
    if (this.state.noOfExams < 5) {
      this.setState({ noOfExams: this.state.noOfExams + 1 })
    }
  }

  decreaseExamValue() {
    if (this.state.noOfExams !== 0) {
      this.setState({ noOfExams: this.state.noOfExams - 1 })
    }
  }

  onFormSubmit = (e: any) => {
    this.setState({
      submitted: true
    });

    const { examData } = this.state;
    e.preventDefault();

    if (this.state.gradeType === "") {
      alert("Please select Grade Type");
      return;
    }

    if (this.state.noOfExams === 0) {
      alert("Please select no of exams");
      return;
    }

    if (examData.department.id && examData.batch.id && examData.section.id) {
      e.target.querySelector("#detailGridTable").removeAttribute("class");
      let btn = e.target.querySelector("button[type='submit']");
      btn.setAttribute("disabled", true);
    }
  }

  onChange = (e: any) => {
    const { id, name, value } = e.nativeEvent.target;
    const { examData } = this.state;
    if (name === "department") {
      this.setState({
        examData: {
          ...examData,
          department: {
            id: value
          },
          batch: {
            id: ""
          },
          section: {
            id: ""
          },
          semester: {
            id: ""
          }
        }
      });
    } else if (name === "batch") {
      this.setState({
        examData: {
          ...examData,
          batch: {
            id: value
          },
          subject: {
            id: ""
          },
          section: {
            id: ""
          },
          semester: {
            id: ""
          }
        }
      });
    } else if (name === "semester") {
      this.setState({
        examData: {
          ...examData,
          semester: {
            id: value
          }
        }
      });
    }
    else if (name === "subject") {
      this.setState({
        examData: {
          ...examData,
          subject: {
            ...this.createSubjects,
          }
        }
      });
      this.validateDuplicateSubject(id);
    }
    else if (name === "section") {
      this.setState({
        examData: {
          ...examData,
          section: {
            id: value
          }
        }
      });
    } else {
      this.setState({
        examData: {
          ...examData,
          [name]: value
        }
      });
    }

  }

  validateDuplicateSubject(objId: any) {

    let currentSub: any = document.querySelector("#" + objId);
    var isSubjectSame = false;
    for (let i = 0; i < this.state.noOfExams; i++) {
      let subOptions: any = document.querySelector("#subject" + i);
      if (subOptions.id !== currentSub.id && subOptions.options[subOptions.selectedIndex].value !== "" &&
        subOptions.options[subOptions.selectedIndex].value === currentSub.options[currentSub.selectedIndex].value) {
        isSubjectSame = true;
        alert("Subject cannot be same for two exams");
        break;
      }
    }

    this.setState({
      isSubjectSame: isSubjectSame
    })
    return isSubjectSame;
  }

  handleChangeGrade(e: any) {
    this.setState({
      gradeType: e.target.value
    });
  }

  handleChange = (e: any) => {
    const { id, value } = e.nativeEvent.target;
    const { examData } = this.state;
    const key = id;
    const val = value;
    e.preventDefault();
    let stDate = moment(val, "YYYY-MM-DD");
    console.log(stDate);
    let dow = stDate.day();
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayname = days[dow];
    examData.textValueMap[id] = dayname;
    examData.exmDate[id] = stDate;
    this.setState({ examData: examData })

  }

  handleStTimeChange = (e: any) => {
    const { id, value } = e.nativeEvent.target;
    const { examData } = this.state;
    examData.exmStTime[id] = value;
    this.setState({ examData: examData })
  }

  handleExamDateChange = (e: any) => {
    const { id, value } = e.nativeEvent.target;
    const { examData } = this.state;
    examData.exmDate[id] = value;
    this.setState({ examData: examData })
  }
  isDatesOverlap(startTime: any, endTime: any) {
    if (endTime.isBefore(startTime)) {
      alert("End time should not be prior to start time.");
      return true;
    }
    return false;
  }
  handleNdTimeChange = (e: any) => {
    const { id, value } = e.nativeEvent.target;
    const { examData } = this.state;
    examData.exmNdTime[id] = value;
    this.setState({ examData: examData })
  }

  handlePassMarksChange = (e: any) => {
    const { id, value } = e.nativeEvent.target;
    const { examData } = this.state;
    examData.exmPassMarks[id] = value;
    console.log(value + "new");
    this.setState({ examData: examData })
  }

  handleTotalMarksChange = (e: any) => {
    const { id, value } = e.nativeEvent.target;
    const { examData } = this.state;
    examData.exmTotalMarks[id] = value;
    this.setState({ examData: examData })
  }


  onClick = (e: any) => {

    const { mutate } = this.props;
    const { examData } = this.state;
    e.preventDefault();

    e.preventDefault();

    let txtEsNm: any = document.querySelector("#examName");
    if (txtEsNm.value.trim() === "") {
      alert("Please provide some value in Exam name");
      return;
    }

    let allSubOpts: any = document.querySelectorAll("#subject");
    let isSubNotSelected = false;

    for (let i = 0; i < this.state.noOfExams; i++) {
      let subOptions: any = document.querySelector("#subject" + i);
      if (subOptions.options[subOptions.selectedIndex].value === "") {
        alert("Please select a subject for a listed exam");
        return;
      }
    }
    if (this.state.isSubjectSame) {
      return;
    }

    for (let i = 0; i < this.state.noOfExams; i++) {
      let exdt: any = document.querySelector("#examDate" + i);
      if (examData.exmDate[exdt.id] === undefined || examData.exmDate[exdt.id] === null || examData.exmDate[exdt.id] === "") {
        alert("Please select an exam date");

        return;
      }
    }
    for (let i = 0; i < this.state.noOfExams; i++) {

      let dt: any = document.querySelector("#startTime" + i);
      if (examData.exmStTime[dt.id] === undefined || examData.exmStTime[dt.id] === null || examData.exmStTime[dt.id] === "") {
        alert("Please select start time");
        return;
      }
    }
    for (let i = 0; i < this.state.noOfExams; i++) {
      let en: any = document.querySelector("#endTime" + i);
      let dt: any = document.querySelector("#startTime" + i);
      if (examData.exmNdTime[en.id] === undefined || examData.exmNdTime[en.id] === null || examData.exmNdTime[en.id] === "") {
        alert("Please select end time");
        return;
      }
      if (examData.exmStTime[dt.id] >= examData.exmNdTime[en.id]) {
        alert("Please enter valid end time");
        return;
      }
    }

    for (let i = 0; i < this.state.noOfExams; i++) {
      let pm: any = document.querySelector("#passingMarks" + i);
      if (examData.exmPassMarks[pm.id] === undefined || examData.exmPassMarks[pm.id] === null || examData.exmPassMarks[pm.id] === "") {
        alert("Please select passing marks for an listed exam");
        return;
      }
    }

    for (let i = 0; i < this.state.noOfExams; i++) {
      let tm: any = document.querySelector("#totalMarks" + i);
      let pm: any = document.querySelector("#passingMarks" + i);
      if (examData.exmTotalMarks[tm.id] === undefined || examData.exmTotalMarks[tm.id] === null || examData.exmTotalMarks[tm.id] === "") {
        alert("Please select total marks for an listed exam");
        return;
      }
      if (examData.exmTotalMarks[tm.id] < examData.exmPassMarks[pm.id]) {
        alert("Total marks should Greater than passing Marks");
        return;
      }
    }
    this.setState({ examData: examData })
    for (let x = 0; x < this.state.noOfExams; x++) {
      let subOptions: any = document.querySelector("#subject" + x);
      for (let i = 0; i < this.state.noOfExams; i++) {
        let sd = new SaData(
          txtEsNm.value.trim(),
          examData.exmDate["examDate" + i],
          examData.exmStTime["startTime" + i],
          examData.exmNdTime["endTime" + i],
          this.state.gradeType,
          examData.exmTotalMarks["totalMarks" + i],
          examData.exmPassMarks["passingMarks" + i],
          "ACTIVE",
          examData.academicYear.id,
          subOptions.options[subOptions.selectedIndex].value,
          examData.department.id,
          examData.batch.id,
          "SEMESTER1",
          examData.section.id,
          examData.branch.id,
          this.state.gradingId,
          examData.exmcountvalues["countvalue" + i],
          this.state.groupValue
        );
        examData.payLoad.push(sd);
      }
    }
    this.setState({ examData: examData })

    console.log('total IDS : ', examData.selectedIds);
    let btn: any = document.querySelector("#btnSave");
    btn.setAttribute("disabled", true);
    return mutate({
      variables: { input: examData.payLoad },
    }).then((data: any) => {
      btn.removeAttribute("disabled");
      console.log('Saved Result: ', data.data.addAcademicExamSetting);
      alert("Added Succesfully");
    }).catch((error: any) => {
      btn.removeAttribute("disabled");
      console.log('there is some error ', error);
      return Promise.reject(`there is some error while updating : ${error}`);
    });
  }

  showModal(e: any, bShow: boolean) {
    e && e.preventDefault();
    this.setState(() => ({
        isModalOpen: bShow
    }));
  }


  createGrid(ary: any) {
    const { examData } = this.state;
    const retVal = [];
    for (let x = 0; x < this.state.noOfExams; x++) {
      let v = ary[x];
      retVal.push(
        <tbody>
          <tr id="custom-width-input">

            <td>
              <select name={"subject"} id={"subject" + x} onChange={this.onChange} value={examData.subject.id} className="gf-form-input max-width-22">
                {this.createSubjects(this.props.data.createExamFilterDataCache.subjects, examData.department.id, examData.batch.id)}
              </select>
            </td>
            <td>
              <input type="date" value={examData.dateofExam} id={"examDate" + x} name="examDate" maxLength={8} onChange={this.handleChange} ></input>
            </td>

            <td>{examData.textValueMap["examDate" + x]}</td>

            <td> <input id={"startTime" + x} type="time" name="startTime" step='2' value={examData.startTime} onChange={this.handleStTimeChange} ></input> </td>

            <td> <input id={"endTime" + x} type="time" name="endTime" step='2' value={examData.endTime} onChange={this.handleNdTimeChange} ></input> </td>

            <td> <input id={"passingMarks" + x} name="passingMarks" value={examData.passing} onChange={this.handlePassMarksChange} ></input> </td>

            <td> <input id={"totalMarks" + x} name="totalMarks" value={examData.total} onChange={this.handleTotalMarksChange} ></input> </td>

          </tr>
        </tbody>
      );


    }
    return retVal;
  }
  render() {
    const { data: { createExamFilterDataCache, refetch }, mutate } = this.props;
    const { examData, departments, batches, subjects, semesters, sections, submitted, isModalOpen } = this.state;

    return (
      <section className="plugin-bg-white">
        {/* <h3 className="bg-heading p-1">
          <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '}
          Admin - Academic Exam Setting
        </h3> */}
        <div className="bg-heading p-1 m-1">
          <div className="e-flex align-baseline">
            <h4 className="m-r-1">
              Select type of grading.
          </h4>
            <label className="m-r-1">
              <input
                className="m-1"
                type="radio"
                value="PERCENTAGE"
                checked={this.state.gradeType === "PERCENTAGE"}
                onChange={this.handleChangeGrade}
              />
              Percentage
          </label>
            <label className="m-r-1">
              <input
                className="m-1"
                type="radio"
                value="GRADE"
                checked={this.state.gradeType === "GRADE"}
                onChange={this.handleChangeGrade}
              />
              Grade
          </label>

            {
              this.state.gradeType === "GRADE" &&
              // <span>
              //   <Link
              //     to={`/plugins/ems-exam/page/grading`}
              //     className="btn btn-primary">Continue
              //   </Link>
              // </span>
              <button className="btn btn-primary" onClick={e => this.showModal(e, true)}>Continue</button>
            }
            <Modal isOpen={isModalOpen} className="react-strap-modal-container">
                <ModalHeader>Add New Grade</ModalHeader>
                <ModalBody className="modal-content">
                  <div className="m-t-1 text-center">
                      <Grading></Grading>
                      <button className="btn btn-danger border-bottom" onClick={(e) => this.showModal(e, false)}>Cancel</button>
                  </div>
                </ModalBody>
            </Modal>
          </div>
        </div>
        <div className="p-1">
          <form className="gf-form-group" onSubmit={this.onFormSubmit} >
            <table id="t-attendance" className="markAttendance">
              <thead>
                <tr>

                  <th>Department</th>
                  <th>Year</th>
                  <th>Semester</th>
                  <th>Section</th>
                  <th>No of Exams</th>
                  <th>Create Exam</th>
                </tr>
              </thead>
              <tbody>
                <tr>

                  <td>
                    <select required name="department" id="department" onChange={this.onChange} value={examData.department.id} className="gf-form-input max-width-22">
                      {this.createDepartments(this.props.data.createExamFilterDataCache.departments, examData.branch.id)}
                    </select>
                  </td>

                  <td>
                    <select required name="batch" id="batch" onChange={this.onChange} value={examData.batch.id} className="gf-form-input max-width-22">
                      {this.createBatches(this.props.data.createExamFilterDataCache.batches, examData.department.id)}
                    </select>
                  </td>

                  <td>
                    <select required name="semester" id="semester" onChange={this.onChange} value={examData.semester.id} className="gf-form-input max-width-22">
                      {this.createSemesters(this.props.data.createExamFilterDataCache.semesters)}
                    </select>
                  </td>

                  <td>
                    <select required name="section" id="section" onChange={this.onChange} value={examData.section.id} className="gf-form-input max-width-22">
                      {this.createSections(this.props.data.createExamFilterDataCache.sections, examData.batch.id)}
                    </select>
                  </td>

                  <td>
                    <a onClick={this.decreaseExamValue.bind(this)} className="btn btn-primary mr-1 btn-small"><i className="fa fa-minus" /></a>
                    {this.state.noOfExams}
                    <a onClick={this.increaseExamValue.bind(this)} className="btn btn-primary mr-1 btn-small m-l-1"><i className="fa fa-plus" /></a>
                  </td>

                  <td>
                    <button className="btn btn-primary" type="submit" id="btnTakeAtnd" name="btnTakeAtnd" style={{ width: '130px' }}>Create Exam</button>
                  </td>

                </tr>
              </tbody>
            </table>

            <div className="tflex bg-heading mt-1 e-flex" id="detailGrid">
              <h4 className="p-1 py-2 mb-0"> Exam</h4>
              <input type="text" id="examName" name="examName" value={examData.examName} className="h-input m-1" maxLength={255} ></input>
              <div className="hhflex">
              </div>
            </div>

            <div className="hide" id="detailGridTable">
              <table className="fwidth">
                <thead >
                  <tr>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Day</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Passing Marks</th>
                    <th>Total Marks</th>
                  </tr>
                </thead>
                {
                  this.createGrid(this.state.examData.mutateResult)
                }
              </table>

              <div className="d-flex fwidth justify-content-between pt-2">
                <p></p>
                <div>

                  <button className="btn btn-primary mr-1" id="btnSave" name="btnSave" onClick={this.onClick}>Save</button>

                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

// export default withExamSubjDataLoader(
//   compose(
//     graphql<AddExamMutation, ExamRootProps>(AddExamMutationGql, {
//       name: "mutate",
//     }),
//   )
//     (MarkExam) as any
// );

export default graphql(CREATE_FILTER_DATA_CACHE, {
  options: ({ }) => ({
    variables: {
      collegeId:1851,
      academicYearId: 1701
    }
  })
}) (withLoadingHandler(

  compose(
    graphql(ADD_EXAM_SETTING, { name: "addAcademicExamSetting" }),
  )

    (MarkExam) as any
));