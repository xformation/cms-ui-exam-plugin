import * as moment from 'moment';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { graphql, QueryProps, MutationFunc, compose } from "react-apollo";
import * as ExamListQueryTypeForAdminGql from './ExamListQueryTypeForAdmin.graphql';
import * as AddExamMutationGql from './AddExamMutation.graphql';
import { LoadExamSubjQueryCacheForAdmin, ExamListQueryTypeForAdmin, AddExamMutation } from '../../types';
import withExamSubjDataLoader from './withExamSubjDataLoader';
import { findFieldsThatChangedType } from 'graphql/utilities/findBreakingChanges';
import { any } from 'prop-types';



interface type {
  checked: boolean;
}


type ExamRootProps = RouteComponentProps<{
  academicYearId: string;
  collegeId: string;
}> & {
  data: QueryProps & LoadExamSubjQueryCacheForAdmin;
};

type ExamPageProps = ExamRootProps & {
   mutate: MutationFunc<ExamListQueryTypeForAdmin>;
   mutateUpd: MutationFunc<AddExamMutation>;
};

type ExamState = {
  examData: any,
  branches: any,
  academicYears: any,
   departments: any,
  batches: any,
  subjects:any,
  semesters: any,
  sections: any,
  dtPicker: any,
  submitted: any,
  noOfExams: number,
  dateofExam:any,
  dayValue:any,
  duratn:number,
  isSubjectSame: any

};

class SaData {
  
  examName: any;
  examDate: any;
  day: any;
  duration: any;
  startTime: any;
  endTime: any;
  gradeType: any;
  total: any;
  passing: any;
  actions: any;
  startDate: any;
  endDate: any;
  academicyearId: any;
  subjectId: any;
  departmentId: any;
  batchId: any;
  semester: any;
  sectionId: any;
  branchId: any;
  constructor(examName: any,examDate: any,day: any,duration: any,startTime: any,endTime: any,gradeType: any,total: any,passing: any,actions: any,startDate: any,endDate: any,academicyearId: any, subjectId: any,departmentId: any,batchId: any, semester: any, sectionId: any, branchId: any) {
     
      this.examName=examName;
      this.semester=semester;
      this.examDate=examDate
      this.day=day;
      this.duration=duration;
      this.startTime=startTime;
      this.endTime=endTime;
      this.gradeType=gradeType;
      this.total=total;
      this.passing=passing;;
      this.actions=actions;
      this.startDate=startDate;
      this.endDate=endDate;
      this.departmentId=departmentId;
      this.academicyearId=academicyearId;
      this.subjectId=subjectId;
      this.sectionId=sectionId;
      this.batchId=batchId;
      this.branchId=branchId;
  }
}

class MarkExam extends React.Component<ExamPageProps, ExamState>{
  constructor(props: ExamPageProps) {
    super(props);
    this.state = {
      noOfExams: 0,
      dayValue:[],
      duratn: 0,
      dateofExam:"",
      isSubjectSame:false,
      examData: {
        
        branch: {
          id: 1001 //1001
        },
        academicYear: {
          id: 1701 //1051
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

        txtCmtVal : {},
      },
      branches: [],
      academicYears: [],
      departments: [],
      batches: [],
      semesters: [],
      sections: [],
      dtPicker: [],
      subjects: [],
      submitted: false,
      
    };

    this.createDepartments = this.createDepartments.bind(this);
    this.createBatches = this.createBatches.bind(this);
    this.createSemesters = this.createSemesters.bind(this);
    this.createSubjects = this.createSubjects.bind(this);
    this.createSections = this.createSections.bind(this);
   this.handleChange = this.handleChange.bind(this);
    this.createGrid = this.createGrid.bind(this);
    this.validateDuplicateSubject = this.validateDuplicateSubject.bind(this);
    this.handleStTimeChange = this.handleStTimeChange.bind(this);
    this.handleNdTimeChange = this.handleNdTimeChange.bind(this);
    this.handlePassMarksChange = this.handlePassMarksChange.bind(this);
    this.handleTotalMarksChange = this.handleTotalMarksChange.bind(this);
  }


  createDepartments(departments: any, selectedBranchId: any) {
    let departmentsOptions = [<option key={0} value="">Select Department</option>];
    for (let i = 0; i < departments.length; i++) {
    if (selectedBranchId == departments[i].branch.id ) {
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

  increaseExamValue(){
    if(this.state.noOfExams < 5){
    this.setState({noOfExams:this.state.noOfExams + 1})
  }
}
  decreaseExamValue(){
    if(this.state.noOfExams !==0){
    this.setState({noOfExams:this.state.noOfExams - 1})
    }
  }
 
 

  onFormSubmit = (e: any) => {
    this.setState({
      submitted: true
    });

    const { mutate } = this.props;
    const { examData } = this.state;
    e.preventDefault();

    if ( examData.department.id && examData.batch.id && examData.section.id) {
     
    
      e.target.querySelector("#detailGridTable").removeAttribute("class");


      let examInputData = {
      
        departmentId: examData.department.id,
        batchId: examData.batch.id,
        sectionId: examData.section.id,
    
      };

      let btn = e.target.querySelector("button[type='submit']");
      btn.setAttribute("disabled", true);
      return mutate({
        variables: { filter: examInputData },
      }).then(data => {
        const sdt = data;
        examData.mutateResult = [];
        examData.mutateResult.push(sdt);
        examData.filtered.push(sdt);
        this.setState({
          examData: examData
        });
        console.log('Query Result ::::: ', examData.mutateResult);

        btn.removeAttribute("disabled");


      }).catch((error: any) => {
        btn.removeAttribute("disabled");


        console.log('there was an error sending the query result - exam for admin role: ', error);
        return Promise.reject(`Could not retrieve exam data for admin: ${error}`);
      });
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
    }else{
      this.setState({
        examData: {
          ...examData,
          [name]: value
        }
      });
    } 
      
  }


  validateDuplicateSubject(objId: any){
    
    let currentSub : any = document.querySelector("#"+objId);
    var isSubjectSame = false;
    for(let i=0; i<this.state.noOfExams; i++) {
      let subOptions : any = document.querySelector("#subject"+i);
      if(subOptions.id !== currentSub.id && subOptions.options[subOptions.selectedIndex].value !== "" && 
        subOptions.options[subOptions.selectedIndex].value === currentSub.options[currentSub.selectedIndex].value){
        isSubjectSame = true;
        alert("Subject cannot be same for two exams");
        break;
      }
    }
    
    this.setState({
      isSubjectSame:isSubjectSame
    })
    return isSubjectSame;
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
   let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
   let dayname = days[dow];
   examData.textValueMap[id] = dayname;
   examData.exmDate[id] = stDate;
   this.setState({examData:examData})
   
   
  
  //  let stTime: any = document.querySelector('input[type="time"]');
  //  console.log("time:", stTime.value);
 
  // console.log("final", edTime.value);

  let durtn: any = document.querySelector("#duration");
   console.log("mytext:", durtn.value);

   let stTime = moment(val, "hh:mm");
   console.log(stTime);
   let edTime= stTime+durtn;
   console.log(edTime);

  }
 

  handleStTimeChange= (e: any) => {
    const { id, value } = e.nativeEvent.target;
    const { examData } = this.state;
    examData.exmStTime[id] = value;
    this.setState({examData:examData})
  }

  handleNdTimeChange= (e: any) => {
    const { id, value } = e.nativeEvent.target;
    const { examData } = this.state;
    examData.exmNdTime[id] = value;
    this.setState({examData:examData})
  }

  handlePassMarksChange = (e: any) => {
    const { id, value } = e.nativeEvent.target;
    const { examData } = this.state;
    examData.exmPassMarks[id] = value;
    this.setState({examData:examData})
  }

  handleTotalMarksChange = (e: any) => {
    const { id, value } = e.nativeEvent.target;
    const { examData } = this.state;
    examData.exmTotalMarks[id] = value;
    this.setState({examData:examData})
  }

  onClick = (e: any) => {

    const { mutateUpd } = this.props;
    const { examData } = this.state;
    e.preventDefault();


    let allSubOpts : any = document.querySelectorAll("#subject");
    let isSubNotSelected = false;



    for(let i=0; i<this.state.noOfExams; i++) {
      let subOptions : any = document.querySelector("#subject"+i);
      if(subOptions.options[subOptions.selectedIndex].value === ""){
        alert("Please select a subject for a listed exam");
        return;
      }
    }
    // if(isSubNotSelected){
    //   return;
    // }
    if(this.state.isSubjectSame){
      return;
    }

    for(let i=0; i<this.state.noOfExams; i++) {
      let dt : any = document.querySelector("#examDate"+i);
        if(examData.exmDate[dt.id] === undefined || examData.exmDate[dt.id] === null || examData.exmDate[dt.id] === "" ){
            alert("Please select an exam date");
        return;
      }
    }
  
    for(let i=0; i<this.state.noOfExams; i++) {
      let dt : any = document.querySelector("#startTime"+i);
      if(examData.exmStTime[dt.id] === undefined || examData.exmStTime[dt.id] === null || examData.exmStTime[dt.id] === ""){
        alert("Please select start time");
        return;
      }
    }

    for(let i=0; i<this.state.noOfExams; i++) {
      let dt : any = document.querySelector("#endTime"+i);
      if(examData.exmNdTime[dt.id] === undefined || examData.exmNdTime[dt.id] === null || examData.exmNdTime[dt.id] === ""){
        alert("Please select end time");
        return;
      }
    }

    for(let i=0; i<this.state.noOfExams; i++) {
      let dt : any = document.querySelector("#passingMarks"+i);
      if(examData.exmPassMarks[dt.id] === undefined || examData.exmPassMarks[dt.id] === null || examData.exmPassMarks[dt.id] === ""){
        alert("Please select passing marks for an listed exam");
        return;
      }
    }

    for(let i=0; i<this.state.noOfExams; i++) {
      let dt : any = document.querySelector("#totalMarks"+i);
      if(examData.exmTotalMarks[dt.id] === undefined || examData.exmTotalMarks[dt.id] === null || examData.exmTotalMarks[dt.id] === ""){
        alert("Please select total marks for an listed exam");
        return;
      }
    }
   let stndDt = moment.now();
   
   for(let x=0; x<this.state.noOfExams; x++) {

      let subOptions : any = document.querySelector("#subject"+x);
      let sd  = new SaData( examData.txtExamName, examData.textValueMap["examDate"+x], "3", "MONDAY", examData.exmStTime["startTime"+x],examData.exmNdTime["endTime"+x], "PERCENTAGE", examData.exmTotalMarks["totalMarks"+x], examData.exmPassMarks["passingMarks"+x], "ACTIVE",stndDt, stndDt, examData.academicYear.id, subOptions.options[subOptions.selectedIndex].value, examData.department.id, examData.batch.id, examData.semester.id, examData.section.id, examData.branch.id);
      examData.payLoad.push(sd);
   }
   this.setState({examData:examData})
  
  console.log('total IDS : ', examData.selectedIds);
  let btn : any = document.querySelector("#btnSave");
  btn.setAttribute("disabled", true);
  return mutateUpd({
    variables: { input: examData.payLoad },
  }).then(data => {
    btn.removeAttribute("disabled");
    console.log('Update Result: ', data.data.addAcademicExamSetting);
    alert("desc");
  }).catch((error: any) => {
    btn.removeAttribute("disabled");
    console.log('there is some error ', error);
    return Promise.reject(`there is some error while updating : ${error}`);
  });


}

 


  checkAllExams(e: any) {
    const { examData } = this.state;
    const mutateResLength = this.state.noOfExams;
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

   
  createGrid(ary: any){
    const { examData } = this.state;
    const retVal = [];
    for (let pd = 0; pd < ary.length; pd++) {
      let v = ary[pd];
      for(let x= 0; x< this.state.noOfExams; x++){
        let k = v.data.getSubjectList[x];
   console.log(k);
        retVal.push(
          <tbody>
            <tr id="custom-width-input">
            
            <td>
            <input onClick={(e: any) => this.onClickCheckbox(x, e)} checked={examData.isChecked} type="checkbox" name="" id="" defaultChecked />
          </td>
            <td>
                <select name={"subject"} id={"subject"+x} onChange={this.onChange} value={examData.subject.id} className="gf-form-input max-width-22">
                      {this.createSubjects(this.props.data.createExamFilterDataCache.subjects, examData.department.id, examData.batch.id)}
                    </select>
                  </td>
         
                <td> <input type="date"  value={examData.dateofExam}  id={"examDate"+x} name="examDate"  maxLength={8} onChange={this.handleChange} ></input> </td>

                <td>{examData.textValueMap["examDate"+x]}</td> 

              
                <td> <input id={"startTime"+x} type="time"  name="startTime"  step='3' min="00:00:00" max="20:00:00"
                value={examData.stTime} onChange={this.handleStTimeChange} ></input> </td>

          <td> <input id={"endTime"+x} type="time"  name="endTime"  step='3' min="00:00:00" max="20:00:00"
                onChange={this.handleNdTimeChange} ></input> </td>

                <td> <input  id={"passingMarks"+x}  name="passingMarks"  onChange={this.handlePassMarksChange} ></input> </td>

                <td> <input  id={"totalMarks"+x} name="totalMarks" onChange={this.handleTotalMarksChange} ></input> </td>
               
             </tr>
            </tbody>
        );
        
        
      }
    }
    return retVal;
  }
  render() {
    const { data: { createExamFilterDataCache, refetch }, mutate } = this.props;
    const { examData, departments, batches,subjects, semesters,  sections,  submitted } = this.state;
    // const selectedDay = moment(this.state.value, 'L', true).toDate();

    return (
      <section className="plugin-bg-white">
        <h3 className="bg-heading p-1">
          <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '}
          Admin - Academic Exam Setting
          {/* value={gradeType} */}
          <select  name="fileType" id="fileType" className="max-width-10 m-l-1">
                <option value="">Select Grade Type</option>
                <option value="Percentage">Percentage</option>
                <option value="gradeType">Grade</option>
              </select>
        </h3>
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
                   <a onClick={this.decreaseExamValue.bind(this)}>-</a>
                    &nbsp;{this.state.noOfExams}&nbsp;
                    <a onClick={this.increaseExamValue.bind(this)}>+</a>
                    </td>
                  <td>
                    <button className="btn btn-primary" type="submit" id="btnTakeAtnd" name="btnTakeAtnd" style={{ width: '130px' }}>Create Exam</button>

                  </td>
                </tr>
              </tbody>
            </table>

            <div className="tflex bg-heading mt-1 e-flex"  id="detailGrid">
              <h4 className="p-1 py-2 mb-0"> Exam</h4>
               <input type="text" id="txtExamName" name="txtExamName" className="h-input m-1"   maxLength={255} ></input>
              <div className="hhflex">

              </div>
            </div>

            <div className="hide" id="detailGridTable">
              <table className="fwidth">
                <thead >
                  <tr>
                  <th>
                <input type="checkbox" onClick={(e: any) => this.checkAllExams(e)} value="checkedall" name="" id="" />
              </th>
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

export default withExamSubjDataLoader(

  compose(
    graphql<ExamListQueryTypeForAdmin, ExamRootProps>(ExamListQueryTypeForAdminGql, {
      name: "mutate"
     }),
     graphql<AddExamMutation, ExamRootProps>(AddExamMutationGql, {
      name: "mutateUpd",
    }),

  )

    (MarkExam) as any
);