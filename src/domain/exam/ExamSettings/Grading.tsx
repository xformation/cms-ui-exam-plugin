import * as React from 'react';
import {RouteComponentProps, Link} from 'react-router-dom';
import {graphql, QueryProps, MutationFunc, compose, withApollo} from 'react-apollo';
import * as AddTypeOfGradingGql from './AddTypeOfGrading.graphql';
import {TypeOfGradings, AddTypeOfGrading} from '../../types';
// import withGradingDataLoader from './withGradingDataLoader';
import {
  ADD_TYPE_OF_GRADING,
  TYPE_OF_GRADINGS,
  CREATE_FILTER_DATA_CACHE,
} from '../_queries';
import withLoadingHandler from '../withLoadingHandler';
// import { ADD_TYPE_OF_GRADING, TYPE_OF_GRADINGS } from '../_queries';

const w50 = {
  width: '50px',
};

const ht = {
  height: '100px',
  overflow: 'scroll',
};

interface type {
  checked: boolean;
}

// type ExamRootProps = RouteComponentProps<{
//   academicYearId: string;
//   collegeId: string;
// }> & {
//   data: QueryProps & TypeOfGradings;
// };

// type ExamPageProps = ExamRootProps & {
//   mutate: MutationFunc<AddTypeOfGrading>;
// };

type ExamGradeState = {
  gradeData: any;
  branches: any;
  academicYears: any;
  dtPicker: any;
  submitted: any;
  noOfExams: number;
  add: any;
  selectedGrades: any;
  user: any;
  examFilterCacheList: any;
  typesOfGradingList: any;
};

class GradePage {
  minMarks: any;
  maxMarks: any;
  grades: any;
  groupvalue: any;
  // branchId: any;
  // academicyearId: any
  constructor(minMarks: any, maxMarks: any, grades: any, groupvalue: any) {
    //, branchId: any,
    // academicyearId: any
    this.minMarks = minMarks;
    this.maxMarks = maxMarks;
    this.grades = grades;
    this.groupvalue = groupvalue;
    // this.branchId=branchId;
    // this.academicyearId=academicyearId;
  }
}

export interface GradingProps extends React.HTMLAttributes<HTMLElement> {
  [data: string]: any;
  user?: any;
  examFilterCacheList?: any;
  typesOfGradingList?: any;
  onCloseModel?: any;
  onSelectGrade?: any;
}
class Grading extends React.Component<GradingProps, ExamGradeState> {
  constructor(props: GradingProps) {
    super(props);
    this.state = {
      noOfExams: 0,
      user: this.props.user,
      examFilterCacheList: this.props.examFilterCacheList,
      typesOfGradingList: this.props.typesOfGradingList,
      gradeData: {
        branch: {
          id: 1951, //1801 //1001
        },
        academicYear: {
          id: 1701, //1701 //1051
        },
        grade: {
          id: '',
        },
        mutateResult: [],
        filtered: [],
        selectedIds: '',
        payLoad: [],
        textValueMap: {},
        exmMinMarks: {},
        exmMaxMarks: {},
        exmgradesMarks: {},
        exmgroupvalues: {},
        txtCmtVal: {},
      },
      branches: [],
      academicYears: [],
      dtPicker: [],
      submitted: false,
      add: false,
      selectedGrades: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.createGrid = this.createGrid.bind(this);
    this.handleMinMarksChange = this.handleMinMarksChange.bind(this);
    this.handleMaxMarksChange = this.handleMaxMarksChange.bind(this);
    this.handleGradesChange = this.handleGradesChange.bind(this);
    this.onClickContinueButton = this.onClickContinueButton.bind(this);
    this.createGradeGrid = this.createGradeGrid.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.doSave = this.doSave.bind(this);
  }

  increaseExamValue() {
    // if(this.state.noOfExams < 5){
    this.setState({noOfExams: this.state.noOfExams + 1});
    // this.createGrid();
    // }
  }

  decreaseExamValue() {
    if (this.state.noOfExams > 0) {
      this.setState({noOfExams: this.state.noOfExams - 1});
    }
    // this.createGrid();
  }

  onClickContinueButton = (e: any) => {
    this.props.onSelectGrade(this.state.selectedGrades);
    // localStorage.setItem("selectedGrades", JSON.stringify(this.state.selectedGrades));
  }

  createGradeGrid = (e: any) => {
    this.createGrid();
  };

  onChange = (e: any) => {
    const {id, name, value} = e.nativeEvent.target;
    const {gradeData} = this.state;
  };

  handleChange = (e: any) => {
    const {id, value} = e.nativeEvent.target;
    const {gradeData} = this.state;
    const key = id;
    const val = value;
    e.preventDefault();

    this.setState({gradeData: gradeData});
  };

  handleMinMarksChange = (e: any) => {
    const {id, value} = e.nativeEvent.target;
    const {gradeData} = this.state;
    gradeData.exmMinMarks[id] = value;
    this.setState({gradeData: gradeData});
  };
  handleMaxMarksChange = (e: any) => {
    const {id, value} = e.nativeEvent.target;
    const {gradeData} = this.state;
    gradeData.exmMaxMarks[id] = value;
    this.setState({gradeData: gradeData});
  };
  handleGradesChange = (e: any) => {
    const {id, value} = e.nativeEvent.target;
    const {gradeData} = this.state;
    e.nativeEvent.target.value = e.nativeEvent.target.value.toUpperCase();
    gradeData.exmgradesMarks[id] = value;
    this.setState({gradeData: gradeData});
  };

  onClick = (e: any) => {
    const {mutate} = this.props;
    const {gradeData} = this.state;
    e.preventDefault();

    for (let i = 0; i < this.state.noOfExams; i++) {
      let minm: any = document.querySelector('#minMarks' + i);
      if (
        gradeData.exmMinMarks[minm.id] === undefined ||
        gradeData.exmMinMarks[minm.id] === null ||
        gradeData.exmMinMarks[minm.id] === ''
      ) {
        alert('Please enter Minimum marks for an listed exam');
        return;
      }
    }
    for (let i = 0; i < this.state.noOfExams; i++) {
      let maxm: any = document.querySelector('#maxMarks' + i);
      let minm: any = document.querySelector('#minMarks' + i);
      if (
        gradeData.exmMaxMarks[maxm.id] === undefined ||
        gradeData.exmMaxMarks[maxm.id] === null ||
        gradeData.exmMaxMarks[maxm.id] === ''
      ) {
        alert('Please enter Maximum marks for an listed exam');
        return;
      }
      // if (gradeData.exmMaxMarks[maxm.id] < gradeData.exmMinMarks[minm.id]) {
      //   alert('Minimum Marks should not be more than maximum marks');
      //   return;
      // }
    }
    for (let i = 0; i < this.state.noOfExams; i++) {
      let dt: any = document.querySelector('#grades' + i);
      if (
        gradeData.exmgradesMarks[dt.id] === undefined ||
        gradeData.exmgradesMarks[dt.id] === null ||
        gradeData.exmgradesMarks[dt.id] === ''
      ) {
        alert('Please enter grade for an listed exam');
        return;
      }
    }

    this.setState({gradeData: gradeData});

    for (let i = 0; i < this.state.noOfExams; i++) {
      let sd = new GradePage(
        gradeData.exmMinMarks['minMarks' + i],
        gradeData.exmMaxMarks['maxMarks' + i],
        gradeData.exmgradesMarks['grades' + i],
        gradeData.exmgroupvalues['groupvalue' + i]
      );
      // ,gradeData.academicYear.id, gradeData.branch.id
      gradeData.payLoad.push(sd);
    }
    this.setState({gradeData: gradeData});

    console.log('total IDS : ', gradeData.selectedIds);
    let btn: any = document.querySelector('#btnSave');
    btn.setAttribute('disabled', true);
    this.doSave();
    btn.removeAttribute('disabled');
    // return mutate({
    //   variables: {input: gradeData.payLoad},
    // })
    //   .then((data: {data: {addTypeOfGrading: any}}) => {
    //     btn.removeAttribute('disabled');
    //     console.log('Saved Result: ', data.data.addTypeOfGrading);
    //     alert('Added Succesfully');
    //   })
    //   .catch((error: any) => {
    //     btn.removeAttribute('disabled');
    //     console.log('there is some error ', error);
    //     return Promise.reject(`there is some error while updating : ${error}`);
    //   });
  }

  async doSave(){
    const {gradeData, typesOfGradingList} = this.state;

    await this.props.client.mutate({
      mutation: ADD_TYPE_OF_GRADING,
      variables: { 
          input: gradeData.payLoad
      },
    }).then((data: {data: {addTypeOfGrading: any}}) => {
        console.log('Saved Result: ', data.data.addTypeOfGrading);
        const temp = [];
        for(let i=0; i<typesOfGradingList.length; i++){
          temp.push(typesOfGradingList[i]);
        }
        temp.push(data.data.addTypeOfGrading.typeOfGrading);
        console.log("Temp grading : ",temp);
        this.setState({
          typesOfGradingList: temp
        });
        alert('Added Succesfully');
      })
      .catch((error: any) => {
       console.log('there is some error ', error);
        return Promise.reject(`there is some error while updating : ${error}`);
      });
  }

  onClickCheckbox(index: any, arr: any, e: any) {
    this.setState({
      selectedGrades: arr
    });
    const {id} = e.nativeEvent.target;
    let chkBox: any = document.querySelector('#' + id);
    chkBox.checked = e.nativeEvent.target.checked;
  }

  createGradeRow(obj: any) {
    console.log("types of grading ::::: ", obj);
    let consolidatedObj: any = {};
    if (obj === undefined || obj === null) {
      return;
    }
    const length = obj.length;
    for (let counter = 0; counter < length; counter++) {
      let grade = obj[counter];
      let gradesArr = consolidatedObj[grade.groupvalue] || [];
      gradesArr.push(grade);
      consolidatedObj[grade.groupvalue] = gradesArr;
    }
    const retVal = [];
    const keys = Object.keys(consolidatedObj);
    const lengthKeys = keys.length;
    for (let i = 0; i < lengthKeys; i++) {
      let gradesArr = consolidatedObj[keys[i]];
      for (let j = 0; j < gradesArr.length; j++) {
        let grade = gradesArr[j];
        retVal.push(
          <tr>
            {j === 0 && (
              <td rowSpan={gradesArr.length}>
                <input onClick={(e: any) => this.onClickCheckbox(keys[i], gradesArr, e)} type="radio" name="grades" id={'chk' + keys[i]} />
              </td>
            )}
            <td>{grade.minMarks}</td>
            <td>{grade.maxMarks}</td>
            <td>{grade.grades}</td>
            <td>{grade.groupvalue}</td>
          </tr>
        );
      }
    }
    return retVal;
  }

  createGrid() {
    const {gradeData} = this.state;
    const retVal = [];

    for (let i = 0; i < this.state.noOfExams; i++) {
      retVal.push(
        <tbody>
          <tr>
            <td>
              <input style={w50} type="number" id={'minMarks' + i} name="minMarks" value={gradeData.minMarks} onChange={this.handleMinMarksChange} />
            </td>
            <td>
              <input style={w50} type="number" id={'maxMarks' + i} name="maxMarks" value={gradeData.maxMarks} onChange={this.handleMaxMarksChange} />
            </td>
            <td>
              <input style={w50} type="text" id={'grades' + i} name="grades" value={gradeData.grades} onChange={this.handleGradesChange} />
            </td>
          </tr>
        </tbody>
      );
    }
    return retVal;
  }

  closeModal(bShow: boolean) {
    this.props.onCloseModel(bShow);
  }

  render() {
    // const { data: { refetch }, mutate } = this.props;
    const {gradeData, submitted, selectedGrades, typesOfGradingList} = this.state;

    return (
      <section className="plugin-bg-white">
        <div className="">
          <div className="bg-heading p-1">
            <div className="eflex">
              <div className="e-flex m-t-0">
                <h4 className="m-r-1">Create Grade:</h4>
                <span>
                  <a
                    onClick={this.decreaseExamValue.bind(this)} className="btn btn-primary mr-1 btn-small"
                  >
                    <i className="fa fa-minus" />
                  </a>
                  {this.state.noOfExams}
                  <a
                    onClick={this.increaseExamValue.bind(this)}
                    className="btn btn-primary mr-1 btn-small m-l-1"
                  >
                    <i className="fa fa-plus" />
                  </a>
                </span>
              {/* </div> */}
              {/* <span>
                <button className="btn btn-primary mr-1" style={{ width: '130px' }} id="btnCreateGradeGrid" name="btnCreateGradeGrid" onClick={this.createGradeGrid}>Create Grade</button>
              </span> */}
              {/* <div> */}
                <span>
                  <button className="btn btn-primary mr-1" id="btnSave" name="btnSave" onClick={this.onClick} >
                    Save
                  </button>
                </span>
                <span>
                  {/* <Link
                    to={`/plugins/ems-exam/page/addexam`}
                    className="btn btn-primary" >Back
                </Link> */}
                </span>
                {selectedGrades.length > 0 && (
                  <span>
                    {/* <Link to={`/plugins/ems-exam/page/addexam`} className="btn btn-primary m-l-1" onClick={this.onClickContinueButton}>
                      Continue
              </Link> */}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="" id="detailGridTable">
            <table className="fwidth">
              <thead>
                <tr>
                  <th>Min Marks</th>
                  <th>Max Marks</th>
                  <th>Grades</th>
                </tr>
              </thead>
              {this.createGrid()}
            </table>
          </div>
          <div className="tflex bg-heading mt-1 dflex" id="detailGrid">
            <h4 className="p-1 py-2 mb-0">Grading</h4>
          </div>
          <div className="" id="detailGrid">
            <div className="" id="detailGridTable" style={{height:"150px", overflow:"auto"}}>
              <table className="fwidth">
                <thead>
                  <tr>
                    <th>
                      {/* <input type="radio" value="checkedall" name="" id="chkCheckedAll" /> */}
                    </th>
                    <th>Min Marks</th>
                    <th>Max Marks</th>
                    <th>Grades</th>
                    <th>Grade Id</th>
                  </tr>
                </thead>
                {this.createGradeRow(typesOfGradingList)}
              </table>
            </div>
          </div>
        </div>
        <button className="btn btn-primary border-bottom" onClick={(e) => this.onClickContinueButton(e)}>Ok</button>
        &nbsp;&nbsp;&nbsp;
        <button className="btn btn-danger border-bottom" onClick={(e) => this.closeModal(false)}>Cancel</button>
        
      </section>
    );
  }
}


export default withApollo(Grading)