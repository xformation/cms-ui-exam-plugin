import * as React from 'react';
import { graphql, QueryProps, MutationFunc, compose } from 'react-apollo';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import * as AddExamMutationGql from './AddExamMutation.graphql';
import ExamData from './ExamData';

import * as ExamUpdateMutationGql from './ExamUpdateMutation.graphql';

// import withLoadingHandler from '../../../components/withLoadingHandler';
import withExamFilterDataCacheLoader from "./withExamFilterDataCacheLoader";
import { LoadExamSubjQueryCacheForAdmin, AddExamMutation } from '../../types';
// import 'bootstrap/dist/css/bootstrap.min.css';

type AddExamPageOwnProps = RouteComponentProps<{
    collegeId: string;
    academicYearId:  string;
}> & {
    data: QueryProps & LoadExamSubjQueryCacheForAdmin; 
};
type AddExamPageProps = AddExamPageOwnProps & {
    mutate: MutationFunc<AddExamMutation>;
};

function onClickHeader(e: any) {
    const { currentTarget } = e;
    const plusSign = currentTarget.querySelector(".fa-plus");
    const minusSign = currentTarget.querySelector(".fa-minus");
    const collapseContainer = currentTarget.closest(".collapse-container");
    const formContainer = collapseContainer.querySelector(".gf-form-inline");
    const style = window.getComputedStyle(formContainer);
    if (style.display === "none") {
        formContainer.style.display = "grid";
        formContainer.style.gridGap = "10px";
        formContainer.style.gridTemplateColumns = "auto auto auto";
        minusSign.style.display = "block";
        plusSign.style.display = "none";
    } else {
        formContainer.style.display = "none";
        minusSign.style.display = "none";
        plusSign.style.display = "block";
    }
}

type EditExamProfileStates = {
    examData: any,
    departments: any,
    branches: any,
    batches: any,
    sections: any,
    submitted: any,
    semesters: any,
    uploadPhoto: any,
    fileName: any,
    mutateResult: any,
    academicYearId: any
};

class AddExamPage extends React.Component<AddExamPageProps, EditExamProfileStates>{
    constructor(props: any) {
        super(props);
        this.state = {
            examData: {
                // college: {
                //     id: 1801 
                // },
                // academicYear: {
                //     id: 1701  
                // },
                department: {
                    id: ""
                },
                batch: {
                    id: ""
                },
                branch: {
                    id: ""
                },
                section: {
                    id: ""
                },
                semesters: {
                    id: ""
                },
            },
            mutateResult: [],
            departments: [],
            batches: [],
            sections: [],
            branches: [],
            semesters: [],
            submitted: false,
            uploadPhoto: null,
            fileName: "",
            academicYearId: 1701
         
        };
        this.createDepartments = this.createDepartments.bind(this);
        this.createBatches = this.createBatches.bind(this);
        this.createBranches = this.createBranches.bind(this);
        this.createSections = this.createSections.bind(this);
        this.onClickCheckbox = this.onClickCheckbox.bind(this);
        this.createSemestersOptions = this.createSemestersOptions.bind(this);
    }

    onClickCheckbox(index: any, e: any) {
        // const { target } = e;
        const { id } = e.nativeEvent.target;
        let chkBox: any = document.querySelector("#" + id);
        chkBox.checked = e.nativeEvent.target.checked;
      }

    createDepartments(departments: any, selectedBranchId: any) {
        let departmentsOptions = [<option key={0} value="">Select department</option>];
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
            let dptId = ""+batches[i].department.id;
            if (dptId == selectedDepartmentId) {
                batchesOptions.push(
                <option key={id} value={id}>{batches[i].batch}</option>
                );
            }
        }
        return batchesOptions;
    }
    createSections(sections: any, selectedBatchId: any) {
        let sectionsOptions = [<option key={0} value="">Select Section</option>];
        for (let i = 0; i < sections.length; i++) {
            let id = sections[i].id;
            let sbthId = ""+sections[i].batch.id;
            if (sbthId == selectedBatchId) {
                sectionsOptions.push(
                <option key={id} value={id}>{sections[i].section}</option>
                );
            }
        }
        return sectionsOptions;
    }

    createSemestersOptions(semesters: any) {
        let semestersOptions = [<option key={0} value="">Select Semester</option>];
        for (let i = 0; i < semesters.length; i++) {
          let id = semesters[i].id;
          semestersOptions.push(
            <option key={id} value={id}>{semesters[i].description}</option>
          );
        }
        return semestersOptions;
      }

    onFormSubmit = (e: any) => {
        this.setState({
            submitted: true
        });
        const { mutate } = this.props;
        const { examData } = this.state;
        e.preventDefault();
        if (examData.department.id && examData.branch.id && examData.batch.id && examData.semesters && examData.section.id) {
            
            let dplExamData = {
                ...examData,
                batchId: examData.batch.id,
                sectionId: examData.section.id,
                departmentId: examData.department.id,
                uploadPhoto: examData.uploadPhoto,
                semesters: examData.semesters.id,
                fileName: examData.fileName
            };
            delete dplExamData.batch;
            delete dplExamData.section;
            delete dplExamData.department;
            delete dplExamData.__typename;
            let btn = e.target.querySelector("button[type='submit']");
            btn.setAttribute("disabled", true);
            let dataSavedMessage: any = document.querySelector(".data-saved-message");
            dataSavedMessage.style.display = "none";
            return mutate({
                variables: { input: dplExamData },
            }).then((data: any) => {
                btn.removeAttribute("disabled");
                dataSavedMessage.style.display = "inline-block";
                // location.href = `${location.origin}/plugins/ems-exam/page/exams`;
            }).catch((error: any) => {
                btn.removeAttribute("disabled");
                dataSavedMessage.style.display = "inline-block";
                console.log('there was an error sending the update mutation', error);
                return Promise.reject(`Could not save exam: ${error}`);
            });
        }
    }
    
    getStudentImage = (e: any) => {
        const { examData } = this.state;
        examData.uploadPhoto = URL.createObjectURL(e.target.files[0]);
        var r = new FileReader();
		r.onload = function (e: any){
			examData.fileName = e.target.result;
            console.log('Image converted to base64 on upload :\n\n' + examData.fileName);
		};
		r.readAsDataURL(e.target.files[0]);    

        this.setState({
            examData: examData
        })     
    }

    createGrid(ary: any){
        const { examData } = this.state;
        const retVal = [];
        const len = ary.length;
        
        for(let pd = 0; pd < len; pd++){
          let v = ary[pd]; 
          for(let x= 0; x< v.data.getSubjectList.length; x++){
            let k = v.data.getSubjectList[x];
            
            retVal.push(
              <tbody>
                <tr>
                  <td>{k.examType}</td>
                    <td>{k.day}</td>
                   
                    
                </tr>
                </tbody>
            );
            
            
          }
        }
        return retVal;
      }




    onChange = (e: any) => {
        const { name, value } = e.nativeEvent.target;
        const { examData } = this.state;
        if (name === "branch") {
            this.setState({
                examData: {
                    ...examData,
                    branch: {
                        id: value
                    },
                    department: {
                      id: ""
                    },
                    batch: {
                      id: ""
                    },
                    section: {
                        id: ""
                    },
                    studentType: {
                        id: ""
                    }
                }
            });
        }
      else if (name === "department") {
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
                    semesters: {
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
                    section: {
                        id: ""
                    },
                    semesters: {
                        id: ""
                    }
                }
            });
        } else if (name === "section") {
            this.setState({
                examData: {
                    ...examData,
                    section: {
                        id: value
                    },
                    semesters: {
                        id: ""
                    }
                }
            });
        } else if (name === "semesters") {
            this.setState({
                examData: {
                    ...examData,
                    semesters: {
                        id: value
                    }
                }
            });
        }  else {
            this.setState({
                examData: {
                    ...examData,
                    [name]: value
                }
            });
        }
    }
    render() {
        const { data: { createExamFilterDataCache, refetch }, history, match, mutate } = this.props;
        const { examData, departments, batches, sections, submitted } = this.state;
        return (
            <section className="customCss">
                <h3 className="bg-heading p-1 m-b-0">
                    <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '}
                    Admin - Exam Setting Page
                </h3>
                <div className="student-profile-container">
                    <form className="gf-form-group" onSubmit={this.onFormSubmit}>
                        <div className="row m-0">
                            <div className="col-sm-12 col-xs-12 profile-header m-b-2">
                                <div className="pull-left">Exam  Profile</div>
                                <div className="pull-right">
                                    <span className="m-r-2 data-saved-message" style={{ fontSize: "13px", color: "#AA0000", display: "none" }}>Data Saved</span>
                                    <button className="btn bs" type="submit">Save</button>
                                </div>
                            </div>
                        </div>
                        <div className="row form-main-container m-0">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 student-photo-container">
                                <div className="row p-1">
                                    
                                    
       <div className="exam-flex">
   <div>
    <label htmlFor="">Branch</label>
        <select name="branch" onChange={this.onChange} value={examData.branch.id} className="gf-form-input max-width-22">
      {this.createBranches(this.props.data.createExamFilterDataCache.branches)}
       </select>
       {
          submitted && !examData.branch.id &&
                 <div>
            exam branch needed.
                     </div>
           }
         </div>
                                        
                                        <div >
                                        <label htmlFor="">Department</label>
                                            <select name="department" onChange={this.onChange} value={examData.department.id} className="gf-form-input max-width-22">
                                                {this.createDepartments(this.props.data.createExamFilterDataCache.departments, examData.branch.id)}
                                            </select>
                                            {
                                            submitted && !examData.department.id &&
                                            <div>
                                                exam department needed.
                                            </div>
                                            }
                                        </div>
                                        
                                        <div >
                                        <label htmlFor="">Year</label>
                                            <select name="batch" onChange={this.onChange} value={examData.batch.id} className="gf-form-input max-width-22">
                                                {this.createBatches(this.props.data.createExamFilterDataCache.batches, examData.department.id)}
                                            </select>
                                            {
                                            submitted && !examData.batch.id &&
                                            <div>
                                                Exam batch needed.
                                            </div>
                                            }
                                        </div>
                                        
                                        
                                        <div >
                                        <label htmlFor="">Section</label>
                                            <select name="section" onChange={this.onChange} value={examData.section.id} className="gf-form-input max-width-22">
                                                {this.createSections(this.props.data.createExamFilterDataCache.sections, examData.batch.id)}
                                            </select>
                                            {
                                            submitted && !examData.section.id &&
                                            <div>
                                                exam section needed.
                                            </div>
                                            }
                                        </div>
                                        
                                        <div >
                                        <label htmlFor="">Semester</label>
                                            <select name="semesters" onChange={this.onChange} value={examData.semesters.id} className="gf-form-input max-width-22">
                                                {this.createSemestersOptions(this.props.data.createExamFilterDataCache.semesters)}
                                            </select>
                                            {
                                            submitted && !this.props.data.createExamFilterDataCache.semesters &&
                                            <div>
                                                Semester needed.
                                            </div>
                                            }
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 student-profile-form">

                                <div className="collapse-container">
                                    <div className="collapse-header">
                                       
                                        <div className="collapse-icon" onClick={onClickHeader}>
                                          
                                        </div>
                                        <div className="clear-both"></div>
                                    </div>
                                    <table id="studentlistpage" className="striped-table fwidth bg-white">
              <thead>
                <tr>
                 
                  <th>Subject</th>
                  <th>Date</th>
                  {/* <th>Day</th>
                  <th>Duration</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Total</th>
                  <th>Passing</th> */}
                </tr>
              </thead>
              <tbody>
                  {                    this.createGrid(this.state.examData.mutateResult)
}
              </tbody>
            </table>
                                    </div>
                                    
                                </div>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

// export default withRouter(
//     graphql<AddStudentMutation, AddStudentPageOwnProps>(AddStudentMutationGql)(
//         AddStudentPage
//     )
// );

export default withExamFilterDataCacheLoader( 
  
    compose(
      graphql<AddExamMutation, AddExamPageOwnProps>(ExamUpdateMutationGql, {
        name: "mutate"
      })
      
    )
    (AddExamPage) as any
  );
