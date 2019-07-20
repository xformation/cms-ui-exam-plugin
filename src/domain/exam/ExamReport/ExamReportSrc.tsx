import * as moment from 'moment';
import * as React from 'react';
import { RouteComponentProps, withRouter,  Link  } from 'react-router-dom';
import { graphql, QueryProps, MutationFunc, compose } from "react-apollo";
import * as ExamListQueryTypeForAdminGql from './ExamListQueryTypeForAdmin.graphql';
import * as AddReportMutationGql from './AddReportMutation.graphql';
import { LoadExamSubjQueryCacheForAdmin, ExamListQueryTypeForAdmin,  AddReportMutation } from '../../types';
import withExamSubjDataLoader from './withExamSubjDataLoader';
import { findFieldsThatChangedType } from 'graphql/utilities/findBreakingChanges';

const w180 = {
  width: '180px'
};

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
   mutateUpd: MutationFunc<AddReportMutation>;
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
  dateofExam:any,
  dayValue:any,
  duratn:number,

};


class SaData {
  id: any;
  
  marksObtain: any;
  
  constructor(id:any, marksObtain: any) {
      this.id = id;
      this.marksObtain=marksObtain;
     
  }
}
class ExamReportSrc extends React.Component<ExamPageProps, ExamState>{
  constructor(props: any) {
    super(props);
    this.state = {
      dayValue:[],
      duratn: 0,
      dateofExam:"",
      
      examData: {
        branch: {
          id: 1001 //1001
        },
        academicYear: {
          id: 1051 //1701 
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
        exmMarks: {},
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
    this.handleMarksObtainedChange = this.handleMarksObtainedChange.bind(this);

    // this.download = this.download.bind(this);
    // this.exportStudents = this.exportStudents.bind(this);


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
    const { name, value } = e.nativeEvent.target;
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
    } 
      
  }

  checkAllRows(e: any) {
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

  onClickCheckbox(index: any, e: any) {
    // const { target } = e;
    const { id } = e.nativeEvent.target;
    let chkBox: any = document.querySelector("#" + id);
    chkBox.checked = e.nativeEvent.target.checked;
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
   this.setState({examData:examData})
   
  
  
  //  let stTime: any = document.querySelector('input[type="time"]');
  //  console.log("time:", stTime.value);
 
  // console.log("final", edTime.value);
  
  


  }
  handleMarksObtainedChange= (e: any) => {
    const { id, value } = e.nativeEvent.target;
    const { examData } = this.state;
    examData.exmMarks[id] = value;
    this.setState({examData:examData})
  }

  onClick = (e: any) => {

    const { mutateUpd } = this.props;
    const { examData } = this.state;
    e.preventDefault();

    for(let i=0; i<examData.mutateResult.length; i++) {
      let dt : any = document.querySelector("#marksObtain"+i);
      console.log(dt.value);
      if(examData.exmMarks[dt.id] === undefined || examData.exmMarks[dt.id] === null || examData.exmMarks[dt.id] === ""){
        alert("Please Enter Marks");
        return;
      }
    }
  }

  createGrid(ary: any){
    const { examData } = this.state;
    const retVal = [];
    for (let pd = 0; pd < ary.length; pd++) {
      let v = ary[pd];
      for(let x= 0; x< v.data.searchStudentExamReport.length; x++){
        let k = v.data.searchStudentExamReport[x];
   
        retVal.push(
          <tbody>
            <tr key={examData.id} id="custom-width-input">
            <td>
              <input onClick={(e: any) => this.onClickCheckbox(x, e)} checked={examData.isChecked} type="checkbox" name="" id={"chk" + examData.id} />
            </td>
          <td>{k.id}</td>      
            <td>{k.student.studentName}</td>
            <td>{k.student.rollNo}</td>
            <td>{k.student.id}</td>
            
            <td>  {k.academicExamSetting.total}</td>
            <td> <input  id={"marksObtain"+x}  name="marksObtain"  onChange={this.handleMarksObtainedChange} ></input> </td>

            <td>{k.academicExamSetting.gradeType}</td>
            <td> <input type="text"  defaultValue={k.comments} maxLength={255} onChange={this.handleChange} ></input>
             </td>  
               
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
                  <th>Exam Report</th>
                 
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
                  {/* <td> <select {examData.academicExamSetting.examType} /></td> */}
                  <td>
                    <button className="btn btn-primary" type="submit" id="btnTakeAtnd" name="btnTakeAtnd" style={{ width: '130px' }}>Create Exam</button>

                  </td>

                </tr>
              </tbody>
            </table>
            <div className="container-fluid p-1 ">

            {/* <div className="tflex bg-heading mt-1 e-flex"  id="detailGrid">
              <h4 className="p-1 py-2 mb-0"> Exam</h4>
               <input type="text" className="h-input m-1"   maxLength={255} ></input>
              <div className="hhflex">
              <Link
                to={`/plugins/ems-student/page/addstudent`}
                className="btn btn-primary" style={w180}>Create New Student
                </Link>
              <a className="btn btn-primary m-l-1" onClick={(e: any) => this.exportStudents(this.state.examData.mutateResult)}>Export</a>
              <select name="fileType" id="fileType" className="max-width-10 m-l-1">
                <option value="">Select File Type</option>
                <option value="CSV">CSV</option>
              </select>
          </div> 
              </div>
            */}
            </div>

            <div className="hide" id="detailGridTable">
              <table className="fwidth">
                <thead >
                  <tr>
                    <th>
                  <input type="checkbox" onClick={(e: any) => this.checkAllRows(e)} value="checkedall" name="" id="" />
              </th>
              <th>Id</th>
                    <th>Name</th>
                    <th>Roll No</th>
                    <th>Student Id</th>
                    <th>Total Marks</th>
                    <th>Marks Obtained</th>
                    <th>Grade/Percentage</th>
                    <th>Comments</th>
                 
                  </tr>
                </thead>
                
                  {
                    this.createGrid(this.state.examData.mutateResult)
                    
                  }
               
              </table>

              <div className="d-flex fwidth justify-content-between pt-2">
                <p></p>
                <div>

                  <button className="btn btn-primary mr-1" id="btnSave" name="btnSave" onClick={this.onClick} >Save</button>
                 

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
     graphql<AddReportMutation, ExamRootProps>(AddReportMutationGql, {
      name: "mutateUpd",
    }),


  )

    (ExamReportSrc) as any
);