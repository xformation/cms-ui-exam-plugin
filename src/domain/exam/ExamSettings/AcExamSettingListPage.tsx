import * as React from 'react';
import * as _ from 'lodash';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as AcExamSettingListQueryGql from './AcExamSettingListQuery.graphql';
import { GET_EXAM_SETTING_LIST, CREATE_FILTER_DATA_CACHE } from '../_queries';
import { withApollo } from 'react-apollo';
import {MessageBox} from '../Message/MessageBox';
import { commonFunctions } from '../_utilites/common.functions';



// const w180 = {
//   width: '180px',
//   marginRight: '10px',
// };


// interface type {
//   checked: boolean;
// }

// type ExamRootProps = RouteComponentProps<{
//   academicYearId: string;
//   collegeId: string;
// }> & {
//   data: QueryProps & LoadExamSubjQueryCacheForAdmin;
// };



// type ExamPageProps = ExamRootProps & {
//   mutate: MutationFunc<AcExamSettingListQuery>;
// // };

// type ExamTableState = {
//   examData: any,
//   exams: any,
//   search: any,
//   selectedExams: any,
//   pageSize: any
// };

export interface ExamRootProps extends React.HTMLAttributes<HTMLElement> {
  
  // checked: boolean;
    // academicYearList?: any;
  // collegeList? : any;
  search?: any;
  [data: string]: any;
  totalRecords?: number | string;
  type?: string;
  source?: string;
  sourceOfApplication?: string;
  examData?: any;
  exams?: any;
  selectedExams?: any;
  pageSize?: any;
  departmentList?: any;
  batchList?: any;
  sectionList?: any;
  modelHeader: ""
  // acExamSettings?: any;

}

const ERROR_MESSAGE_MANDATORY_FIELD_MISSING = "Mandatory fields missing";
const ERROR_MESSAGE_SERVER_SIDE_ERROR = "Due to some error in exam service, Newly added Exam could not be saved. Please check exam service logs";
const SUCCESS_MESSAGE_NEW_EXAM_ADDED = "New Exam saved successfully";
const SUCCESS_MESSAGE_EXAM_UPDATED = "Exam updated successfully";


class AcExamListPage<T = {[data: string]: any}>  extends React.Component<any, ExamRootProps> {

  constructor(props: ExamRootProps) {
    super(props);
    this.state = {
      list: this.props.data,
      totalRecords: this.props.totalRecords,
      type: this.props.type,
      isModalOpen: false,
      // acExamSettings: props.acExamSettings,
      exams: {},
      examData: {
        departmentId: "",
        batchId: "",
        semester: "",
        sectionId: "",
        noOfexams: "",
      },
      departmentList: this.props.departmentList,
      batchList: this.props.batchList,
      sectionList: this.props.sectionList,
      // examData: {
      //   mutateResult: [],
      //   search: "",
      // },
      errorMessage: "",
      successMessage: "",
      modelHeader: "",
      source: this.props.source,
      sourceOfApplication: this.props.sourceOfApplication,
      selectedExams: [],
      pageSize: 5,
      search: ""
};
    this.checkAllExams = this.checkAllExams.bind(this);
    this.onClickCheckbox = this.onClickCheckbox.bind(this);
    this.createExamRows = this.createExamRows.bind(this);
    this.onClickContinueButton = this.onClickContinueButton.bind(this);

  }

    onClickContinueButton(e: any) {
    localStorage.setItem("selectedExams", JSON.stringify(this.state.selectedExams));
  }
  // onClickCheckbox(index: any, arr: any, e: any) {
   
  //   const { id } = e.nativeEvent.target;
  //   let chkBox: any = document.querySelector("#" + id);
  //   chkBox.checked = e.nativeEvent.target.checked;
  // }

  onClickCheckbox(index: any, arr: any, e: any) {
    this.setState({
      selectedExams: arr
    });
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
 
 createExamRows(objAry: any) {
        const { source } = this.state;
        console.log("createRows() - Exam list on AcExamSettingListPage page:  ", objAry);
        if(objAry === undefined || objAry === null) {
            return;
        }
        const mutateResLength = objAry.length;
        const retVal = [];
        for (let i = 0; i < mutateResLength; i++) {
            const examData = objAry[i];
            retVal.push(
              <tr>
                <td>{examData.examName}</td>
                <td>{examData.bctch}</td>
                <td>{examData.departmnt}</td>
                <td>{examData.sectn}</td>
                <td>{examData.brnch}</td>
                <td>{examData.action}</td>
                <td>{examData.sbjct}</td>
                <td>{examData.subExamDate}</td>
                <td>{examData.examDate}</td>
                <td>{examData.st}</td>
                <td>{examData.ed}</td>
                <td>{examData.countvalue}</td>
                <td>
                    {
                        <button className="btn btn-primary" onClick={e => this.onClickContinueButton("show Details")}>Details</button>
                    }
                </td>
              </tr>
            );
            }
            return retVal;
          }
          showModal(e: any, bshow: boolean, headerLabel: any) {
            e && e.preventDefault();
            this.setState(() => ({
              isModalOpen: bshow,
              examData: {},
              modelHeader: headerLabel,
              errorMessage: "",
              successMessage: "",
            }))
          }

        // let consolidatedObj: any = {};
        // const length = objAry.length;
        // for (let counter = 0; counter < length; counter++) {
        //   let examData = objAry[counter];
        //   let examDataArr = consolidatedObj[examData.countvalue] || [];
        //   examDataArr.push(examData);
        //   consolidatedObj[examData.countvalue] = examDataArr;
        // }
        // const retVal = [];
        // const keys = Object.keys(consolidatedObj);
        // const lengthKeys = keys.length;
        // for (let i = 0; i < lengthKeys; i++) {
        //   let examDataArr = consolidatedObj[keys[i]];
        //   for (let j = 0; j < examDataArr.length; j++) {
        //     let examData = examDataArr[j];
        //     retVal.push(
        //       <tr>
                // {/* {j === 0 &&
                //   <td rowSpan={acExamSettingArr.length}>
                //     <input onClick={(e: any) => this.onClickCheckbox(keys[i], acExamSettingArr, e)} type="radio" name="grades" id={"chk" + keys[i]} />
                //   </td>
                // } */}
                // {/* <td>{acExamSetting.countvalue}</td> */}
                // <td>
                //   {/* <Link
                //     className="table-link link-color"
                //     to={`/plugins/ems-exam/page/acExamSetting?countvalue=${acExamSetting.countvalue}`}
                //   >
                //     {acExamSetting.examName}
                //   </Link> */}
                // // </td>
                // <td>{acExamSetting.bctch}</td>
                // <td>{acExamSetting.departmnt}</td>
                // <td>{acExamSetting.sectn}</td>
                // <td>{acExamSetting.sbjct}</td>
                // <td>{acExamSetting.subExamDate}</td>
                // <td>{acExamSetting.st}</td>
                // <td>{acExamSetting.ed}</td>
                // {/* <td> <a >
    //             <i className="fa fa-pencil-square-o fa-1-5x" aria-hidden="true"></i>
    //           </a>
    //           <a >
    //             <i className="fa fa-trash-o fa-1-5x table-p" aria-hidden="true"></i>
    //           </a></td>
    //           <td>
    //           <Link
    //             to={`/plugins/ems-exam/page/addexam`}
    //             className="btn btn-primary m-r-1" style={w180} onClick={this.onClickContinueButton}>Details
    //           </Link>
    //           </td> */}
    
    //             {/* <td> <button className="btn btn-primary" onClick={e => this.showDetail(acExamSetting)}>Details</button></td> */}
    //           </tr>
    //         );
    //       }
    //     }
    //     return retVal;
      
    // }
//     let { search } = this.state.examData;
//     search = search.trim();
//     const mutateResLength = objAry.length;
//     const retVal = [];
//     for (let x = 0; x < mutateResLength; x++) {
//       const tempObj = objAry[x];
//       const exams = tempObj.data.acexamsettingList;
//       const length = exams.length;
//       for (let i = 0; i < length; i++) {
//         const exam = exams[i];
//         if(search){
//           if(exam.examName.indexOf(search) !== -1){
//             retVal.push(
//               <tr key={exam.id}>                
//               <td>{exam.examName}</td>
//               <td>{exam.action}</td>
//               <td>{exam.sbjct}</td>
//               <td>{exam.examDate}</td>
//               <td>{exam.departmnt}</td>
//               <td>{exam.bctch}</td>
//               <td>{exam.brnch}</td>
//               <td>{exam.sectn}</td>
//               <td>{exam.st}</td>
//               <td>{exam.ed}</td>
//               <td>{exam.subExamDate}</td>
//               <td>{exam.countvalue}</td>
//             </tr>
//             );
//             }}else{
//             retVal.push(
//               <tr key={exam.id}>                
//               <td>{exam.examName}</td>
//               <td>{exam.action}</td>
//               <td>{exam.sbjct}</td>
//               <td>{exam.examDate}</td>
//               <td>{exam.departmnt}</td>
//               <td>{exam.bctch}</td>
//               <td>{exam.brnch}</td>
//               <td>{exam.sectn}</td>
//               <td>{exam.st}</td>
//               <td>{exam.ed}</td>
//               <td>{exam.subExamDate}</td>
//               <td>{exam.countvalue}</td>
//               </tr>
//             );
//           }
//       }
//     }
//     return retVal;
  
// }

onChange = (e: any) => {
  e.preventDefault();
  // const { search } = e.nativeEvent.target;
  const { name, value } = e.nativeEvent.target;
  const { examData } = this.state;
  //  if (name === "batch") {
    // this.setState({
    //   examData: {
    //     ...examData,
  //       batch: {
  //         id: value
  //       },
        
  //       subject: {
  //         id: ""
  //       }
  //     }
  //   });
  // }else {
    this.setState({
      examData: {
        ...examData,
        [name]: value
      },
      errorMessage: "",
      successMessage: "",
    });
  }



// onClick = (e: any) => {
//   const { name, value } = e.nativeEvent.target;
//   const { mutate } = this.props;
//   const { examData } = this.state;
//   e.preventDefault();


//   let examFilterInputObject = {
    
//     // batchId: examData.batch.id,
    
//     // subjectId: examData.subject.id
//   };

  getacExamSettingsInput(examData: any, modelHeader: any){
    let examListId = null;
    if(modelHeader === "Details"){
      examListId = examData.id;
    }
    let examInput = {
        departmentId: examData.departmentId,
        batchId: examData.batchId,
        semester: examData.semester,
        sectionId: examData.sectionId,
        noOfexams: examData.noOfexams
    };
    return examInput;
}

  async acexamsettingList (e: any){
    console.log("Refreshing exam list");
    const { data } =  await this.props.client.query({
        query: GET_EXAM_SETTING_LIST,
        fetchPolicy: 'no-cache'
    })
    const temp = data.acexamsettingList;
    this.setState({
        list: temp
    });
}

//   return mutate({
//     variables: { filter: examFilterInputObject },
//   }).then((data: any) => {
//     const sdt = data;
//     examData.mutateResult = [];
//     examData.mutateResult.push(sdt);
//     this.setState({
//       examData: examData
//     });
//     console.log('Exam filter mutation result ::::: ', examData.mutateResult);
//   }).catch((error: any) => {
//     console.log('there was an error sending the query result', error);
//     return Promise.reject(`Could not retrieve exam data: ${error}`);
//   });

// }

render() {
	const{list,selectedExams, acExamSettings, departmentList, batchList, sectionList, isModalOpen, examData, modelHeader, errorMessage, successMessage} = this.state;
  console.log(selectedExams);
  return (
    <main>
        <Modal isOpen={isModalOpen} className="react-strap-modal-container">
            <ModalHeader>{modelHeader}</ModalHeader>
            <ModalBody className="modal-content">
                <form className="gf-form-group section m-0 dflex">
                    <div className="modal-fwidth">
                    {
                        errorMessage !== ""  ? 
                        <MessageBox id="mbox" message={errorMessage} activeTab={2}/>        
                         : null
                    }
                    {
                                successMessage !== ""  ? 
                                    <MessageBox id="mbox" message={successMessage} activeTab={1}/>        
                                    : null
                            }
							                <div className="mdflex modal-fwidth">
                                    <div className="fwidth-modal-text m-r-1">
                                        <label className="gf-form-label b-0 bg-transparent">State <span style={{ color: 'red' }}> * </span></label>
                                        <select className="gf-form-input" name="departmentId" id="departmentId"  onChange={this.onChange} value={examData.departmentId}>
                                            <option value="">Select Department</option>
                                                {
                                                    commonFunctions.createSelectbox(departmentList, "id", "id", "name")
                                                }
                                        </select> */}
                                    </div>
                                    <div className="fwidth-modal-text">
                                        <label className="gf-form-label b-0 bg-transparent">City <span style={{ color: 'red' }}> * </span></label>
                                        <select className="gf-form-input" name="batchId" id="batchId" onChange={this.onChange} value={examData.batchId}>
                                            <option value="">Select Year</option>
                                                {
                                                    commonFunctions.createSelectbox(batchList, "id", "id", "batch")
                                                }
                                        </select>
                                    </div>
                                        <div className="fwidth-modal-text">
                                        <label className="gf-form-label b-0 bg-transparent">City <span style={{ color: 'red' }}> * </span></label>
                                        <select className="gf-form-input" name="sectionId" id="sectionId" onChange={this.onChange} value={examData.sectionId}>
                                            <option value="">Select Section</option>
                                                {
                                                    commonFunctions.createSelectbox(sectionList, "id", "id", "section")
                                                }
                                        </select>
                                    </div>
                                            
                                    
                                    <div className="fwidth-modal-text">
                                        <label className="gf-form-label b-0 bg-transparent">Semester<span style={{ color: 'red' }}> * </span></label>
                                        <select name="semester" id="semester" onChange={this.onChange} value={examData.semester} className="gf-form-input">
                                            <option key={""} value={""}>Select Semester</option>
                                            <option key={"FIRST"} value={"FIRST"}>FIRST</option>
                                            <option key={"SECOND"} value={"SECOND"}>SECOND</option>
                                            <option key={"THIRD"} value={"THIRD"}>THIRD</option>
                                            <option key={"FOURTH"} value={"FOURTH"}>FOURTH</option>
                                            <option key={"FIFTH"} value={"FIFTH"}>FIFTH</option>
                                        </select>
                                    </div> 
                                </div>
                                {/* <div className="m-t-1 text-center">
                                    {
                                        modelHeader === "Add Exam" ?
                                        <button type="button" id="btnAdd" className="btn btn-primary border-bottom" onClick={this.saveBranch} >Save</button>
                                        :
                                        <button type="button" id="btnUpdate" className="btn btn-primary border-bottom" onClick={this.saveBranch}>Update</button>
                                    }
                                    &nbsp;<button className="btn btn-danger border-bottom" onClick={(e) => this.showModal(e, false, modelHeader)}>Cancel</button>
                                    
                                </div> */}
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
                <button className="btn btn-primary" style={{width:'150px'}} onClick={e => this.showModal(e, true, "Add Exam")}>
                    <i className="fa fa-plus-circle"></i> Add Exam
                </button>
                {
                    list !== null && list !== undefined && list.length > 0 ?
                        <div style={{width:'100%', height:'250px', overflow:'auto'}}>
                            <table id="examlistpage" className="striped-table fwidth bg-white">
                            <thead>
                            <tr>                
                                      <th className="width-8">EXAM TYPE</th>
                                      <th className="width-8">YEAR</th>
                                      <th className="width-12">DEPARTMENT</th>
                                      <th>SECTION</th>
                                      <th>SUBJECT</th>
                                      <th className="width-10">Sub-ExamDate</th>
                                      <th className="width-8">START DATE</th>
                                      <th className="width-8">END DATE</th>
                                      {/* <th>Details</th> */}
                            </tr>      
                            </thead>
                            <tbody>
                              {
                                  // this.createExamRows(this.state.examData.mutateResult)
                                  this.createExamRows(list)}
                               </tbody>
                             </table>
                        </div>
                    : null
                }  
        </main>

      );
   }
}

export default withApollo(AcExamListPage);

