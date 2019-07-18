import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { graphql, QueryProps, MutationFunc, compose } from "react-apollo";
import * as AddTypeOfGradingGql from './AddTypeOfGrading.graphql';
import { TypeOfGradings,  AddTypeOfGrading } from '../../types';
import withGradingDataLoader from './withGradingDataLoader';

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
  data: QueryProps & TypeOfGradings;
};

type ExamPageProps = ExamRootProps & {
   mutate: MutationFunc<AddTypeOfGrading>;
};

type ExamState = {
  gradeData: any,
  branches: any,
  academicYears: any,   
  dtPicker: any,
  submitted: any,
  noOfExams: number,
  add: any
};

class SaData {  
  
  minMarks: any;
  maxMarks: any;
  grades: any;
  groupvalue:any;
  // branchId: any;
  // academicyearId: any
  constructor( minMarks: any, maxMarks: any,grades: any, groupvalue:any) {
    //, branchId: any,
    // academicyearId: any 
    this.minMarks=minMarks
    this.maxMarks=maxMarks;    
    this.grades=grades;   
    this.groupvalue=groupvalue;
      // this.branchId=branchId;     
      // this.academicyearId=academicyearId;     
  }
}

class Grading extends React.Component<ExamPageProps, ExamState>{
  constructor(props: any) {
    super(props);
    this.state = {
      noOfExams: 0,
      gradeData: {
        
        branch: {
          id: 1001 //1001
        },
        academicYear: {
          id: 1701 //1051
        },
        grade: {
          id: ""
        },
        mutateResult: [],
        filtered: [],
        selectedIds: "",
        payLoad: [],
        textValueMap: {},
        exmMinMarks: {},
        exmMaxMarks: {},
        exmgradesMarks: {},
        exmgroupvalues: {},
        txtCmtVal : {},
      },
      branches: [],
      academicYears: [],
      dtPicker: [],
      submitted: false,
      add: false,
    };

   this.handleChange = this.handleChange.bind(this);
    this.createGrid = this.createGrid.bind(this);
    this.handleMinMarksChange = this.handleMinMarksChange.bind(this);
    this.handleMaxMarksChange = this.handleMaxMarksChange.bind(this);
    this.handleGradesChange = this.handleGradesChange.bind(this);
    
    this.createGradeGrid = this.createGradeGrid.bind(this);
    
  }


  increaseExamValue(){
    // if(this.state.noOfExams < 5){
    this.setState({noOfExams:this.state.noOfExams + 1})
    // this.createGrid();
  // }
  }

  decreaseExamValue(){
    if(this.state.noOfExams > 0){
      this.setState({noOfExams:this.state.noOfExams - 1})
    }
    // this.createGrid();
  }
 
 

  createGradeGrid = (e: any) => {
    this.createGrid();
  }

  onChange = (e: any) => {
    const { id, name, value } = e.nativeEvent.target;
    const { gradeData } = this.state;
    
    } 
      
  

  handleChange = (e: any) => {
    const { id, value } = e.nativeEvent.target;
    const { gradeData } = this.state;
    const key = id;
    const val = value;
    e.preventDefault();
  
   this.setState({gradeData:gradeData})}
 

  
  handleMinMarksChange = (e: any) => {
    const { id, value } = e.nativeEvent.target;
    const { gradeData } = this.state;
    gradeData.exmMinMarks[id] = value;
    this.setState({gradeData:gradeData}) 
    
  }
  handleMaxMarksChange = (e: any) => {
    const { id, value } = e.nativeEvent.target;
    const { gradeData } = this.state;
    gradeData.exmMaxMarks[id] = value;
    this.setState({gradeData:gradeData})
  }
  handleGradesChange = (e: any) => {
    const { id, value } = e.nativeEvent.target;
    const { gradeData } = this.state;
    e.nativeEvent.target.value=e.nativeEvent.target.value.toUpperCase();
    gradeData.exmgradesMarks[id] = value;
    this.setState({gradeData:gradeData})
  }

  onClick = (e: any) => {
    const { mutate } = this.props;
    const { gradeData } = this.state;
    e.preventDefault();

    for(let i=0; i<this.state.noOfExams; i++) {
      let minm : any = document.querySelector("#minMarks"+i);
      if(gradeData.exmMinMarks[minm.id] === undefined || gradeData.exmMinMarks[minm.id] === null || gradeData.exmMinMarks[minm.id] === ""){
        alert("Please enter Minimum marks for an listed exam");
        return;
      }
    }
    for(let i=0; i<this.state.noOfExams; i++) {
      let maxm : any = document.querySelector("#maxMarks"+i);
      let minm : any = document.querySelector("#minMarks"+i);
      if(gradeData.exmMaxMarks[maxm.id] === undefined || gradeData.exmMaxMarks[maxm.id] === null || gradeData.exmMaxMarks[maxm.id] === ""){
        alert("Please enter Maximum marks for an listed exam");
        return;      
      }
      if( gradeData.exmMaxMarks[maxm.id] < gradeData.exmMinMarks[minm.id]){
        alert("Minimum Marks should not be more than maximum marks");
        return;
      } 
      
      
    } 
    for(let i=0; i<this.state.noOfExams; i++) {
      let dt : any = document.querySelector("#grades"+i);
      if(gradeData.exmgradesMarks[dt.id] === undefined || gradeData.exmgradesMarks[dt.id] === null || gradeData.exmgradesMarks[dt.id] === ""){
        alert("Please enter grade for an listed exam");
        return;
      }
    } 
        
   this.setState({gradeData:gradeData})
  
   for(let i=0; i<this.state.noOfExams; i++) {    
    let sd  = new SaData(gradeData.exmMinMarks["minMarks"+i], gradeData.exmMaxMarks["maxMarks"+i],gradeData.exmgradesMarks["grades"+i], gradeData.exmgroupvalues["groupvalue"+i]);
    // ,gradeData.academicYear.id, gradeData.branch.id
    gradeData.payLoad.push(sd);
 }
 this.setState({gradeData:gradeData})

console.log('total IDS : ', gradeData.selectedIds);
let btn : any = document.querySelector("#btnSave");
btn.setAttribute("disabled", true);
return mutate({
  variables: { input: gradeData.payLoad },
}).then(data => {
  btn.removeAttribute("disabled");
  console.log('Saved Result: ', data.data.addTypeOfGrading);
  alert("Added Succesfully");
}).catch((error: any) => {
  btn.removeAttribute("disabled");
  console.log('there is some error ', error);
  return Promise.reject(`there is some error while updating : ${error}`);
});
} 
onClickCheckbox(index: any, e: any) {
  // const { target } = e;
  const { id } = e.nativeEvent.target;
  let chkBox: any = document.querySelector("#" + id);
  chkBox.checked = e.nativeEvent.target.checked;
}
createGradeRow(obj: any) {
 // const len = obj.length;
 const retVal = [];
 // for (let p = 0; p < len; p++) {
 //   let v = obj[p];
 for (let x = 0; x < obj.length; x++) {
   let k = obj[x];
   retVal.push(
      <tr>
        <td>
           <input onClick={(e: any) => this.onClickCheckbox(k, e)}  type="radio" name="" id={"chk" + k.id} />
            </td>
        <td>{k.minMarks}</td>
        <td>{k.maxMarks}</td>
        <td>{k.grades}</td>     
        <td>{k.groupvalue}</td>
      </tr>
    );
  }
  return retVal;
}


  createGrid(){
    const { gradeData } = this.state;
    const retVal = [];
 
    for (let i = 0; i <this.state.noOfExams; i++) {
      retVal.push(
        <tbody>
          <tr> 
            <td> 
              <input type="number"  id={"minMarks"+i} name="minMarks" value={gradeData.minMarks} onChange={this.handleMinMarksChange} ></input> 
            </td> 
            <td> 
              <input type="number" id={"maxMarks"+i} name="maxMarks" value={gradeData.maxMarks}   onChange={this.handleMaxMarksChange} ></input> 
            </td>
            <td> 
              <input type="text" id={"grades"+i} name="grades" value={gradeData.grades}   onChange={this.handleGradesChange} ></input> 
            </td>
          </tr>
        </tbody>
      );
    }
    return retVal;
  }

  render() {
    const { data: {refetch }, mutate } = this.props;
    const { gradeData, submitted } = this.state;

    return (
      <section className="plugin-bg-white">
        <h3 className="bg-heading p-1">
          <i className="fa fa-university stroke-transparent mr-1" aria-hidden="false" />{' '}
          Admin - Academic Grading Setting         
        </h3>
        <div className="p-1">
          <span>
            <a onClick={this.decreaseExamValue.bind(this)}>-</a>
            &nbsp;{this.state.noOfExams}&nbsp;
            <a onClick={this.increaseExamValue.bind(this)}>+</a>
          </span>
          <span>
             <button className="btn btn-primary mr-1" style={{ width: '130px' }} id="btnCreateGradeGrid" name="btnCreateGradeGrid" onClick={this.createGradeGrid}>Create Grade</button>
          </span>
          <span>
              <button className="btn btn-primary mr-1" id="btnSave" name="btnSave" onClick={this.onClick}>Save</button>
          </span>
          <span>
            <Link
                to={`/plugins/ems-exam/page/addexam`}
                className="btn btn-primary" style={w180}>Back
                </Link>
            </span>
            <div className="tflex bg-heading mt-1 dflex"  id="detailGrid">
              <h4 className="p-1 py-2 mb-0">Grading</h4>
            </div>

            <div  className="" id="detailGridTable">
              <table className="fwidth">
                <thead >
                  <tr>                  
                    <th>MIn Marks</th>
                    <th>Max Marks</th>
                    <th>Grades</th>        
                  </tr>
                </thead>
                  {this.createGrid()}
              </table>
            </div>
            <div className=""  id="detailGrid">
            <div  className="" id="detailGridTable">
              <table className="fwidth">
                <thead >
                  <tr> 
                  <th>
                    <input type="radio"  value="checkedall" name="" id="chkCheckedAll" />
                  </th>                 
                    <th>MIn Marks</th>
                    <th>Max Marks</th>
                    <th>Grades</th>
                    <th>Grade Id</th>        
                  </tr>
                </thead>
                {/* this.createFeeCategoryRowFromCache(this.props.data.createFeeSetupDataCache.feeCategory) */}
                  {this.createGradeRow(this.props.data.typeOfGradings)}
              </table>
            </div>
            </div>
                
          </div>         
       
      </section>
    );
  }
}

export default withGradingDataLoader(

  compose(   
     graphql<AddTypeOfGrading, ExamRootProps>(AddTypeOfGradingGql, {
      name: "mutate",
    }),
  )
    (Grading) as any
);