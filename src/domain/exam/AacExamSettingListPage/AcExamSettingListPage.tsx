import * as React from 'react';

import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { graphql, QueryProps } from 'react-apollo';
import {AcExamSettingListQuery, AcExamSettingSummaryFragment} from  '../../types';

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
  search: any
};
class AcExamSettingsTable extends React.Component<ExamTableProps, ExamTableStates> {

  constructor(props: any) {
    super(props);
    this.state = {
      acExamSettings: props.acExamSettings,
      search: "",
      // enquiryData: {}

    };
    this.checkAllExams = this.checkAllExams.bind(this);
    this.onClickCheckbox = this.onClickCheckbox.bind(this);
    this.createExamRows=this.createExamRows.bind(this);
    // this.createDetailsDiv = this.createDetailsDiv.bind(this);

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
  onClickCheckbox(index: any, e: any) {
  
    const { id } = e.nativeEvent.target;
    let chkBox: any = document.querySelector("#" + id);
    chkBox.checked = e.nativeEvent.target.checked;
  }


  createExamRows(acExamSettings: any) {
    const length = acExamSettings.length;
    const retVal = [];
    for (let i = 0; i < length; i++) {
      const acExamSetting = acExamSettings[i];
     
      
      retVal.push(
        <tr key={acExamSetting.id}>
          <td>
            <input onClick={(e: any) => this.onClickCheckbox(i, e)} checked={acExamSetting.isChecked} type="checkbox" name="" id="" />
          </td>
          <td>
            <Link
              className="table-link link-color"
              to={`/plugins/ems-exam/page/addacExamSetting?id=${acExamSetting.id}`}
            >
             {acExamSetting.examType}
            </Link>
          </td>
         
          <td>{acExamSetting.bctch}</td>
          <td>{acExamSetting.departmnt}</td>
          <td>{acExamSetting.sectn}</td>
          <td>{acExamSetting.subject}</td>
          <td>{acExamSetting.st}</td>
          <td>{acExamSetting.ed}</td>
          {/* <td> <button className="btn btn-primary" onClick={e => this.showDetail(acExamSetting)}>Details</button></td> */}
        </tr>
      );
    }
    return retVal;
  }
 
//   showDetail(obj: any){
//     const { acExamSettings } = this.state;
//     acExamSettings.enquiryData = obj;
//     this.setState({
//       acExamSettings: acExamSettings
//     });

//     let detailDiv : any = document.querySelector("#admissionDetailShow");
//     let gridDiv : any = document.querySelector("#admissionGridShow");
//     let backDiv : any = document.querySelector("#backDiv");
//     detailDiv.setAttribute("class", "col-md-12 ");
//     gridDiv.setAttribute("class", "hide");
//     backDiv.setAttribute("class", "d-flex fwidth justify-content-between pt-2");
//     this.createDetailsDiv(obj);
// }

// back(){
//     let detailDiv : any = document.querySelector("#admissionDetailShow");
//     let gridDiv : any = document.querySelector("#admissionGridShow");
//     detailDiv.setAttribute("class", "hide");
//     gridDiv.setAttribute("class", "col-md-12");
//     let backDiv : any = document.querySelector("#backDiv");
//     backDiv.setAttribute("class", "hide");
// }

// createDetailsDiv(obj: any){
  
  
//   return (
    
//     <div className="hide" id="admissionDetailShow">
//       <h5 className="bg-heading p-1 m-0">Details</h5>
//       <div className="row">
//           <div className="col-md-4">
//             <div>
//               <label htmlFor="">Enquiry ID</label>
//               <input name="id" className="fwidth" value={obj.id}/>
//             </div>
//           </div>
//       </div>
//       <div className="row">
//         <div className="col-md-4">
//           <div>
//             <label htmlFor="">Student Name</label>
//             <input name="examType"  className="fwidth" value={obj.examType}/>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div>
//             <label htmlFor="">Mobile Number</label>
//             <input name="examType" className="fwidth" value={obj.examType}/>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div>
//             <label htmlFor="">Alternate Mobile Number</label>
//             <input name="examType"  className="fwidth" value={obj.examType}/>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div>
//             <label htmlFor="">Email</label>
//             <input name="examType" className="fwidth" value={obj.examType}/>
//           </div>
//         </div>
//         <div className="col-md-4">
//             <label htmlFor="">Class Applying For</label>
//             <input name="courseApplyingFor"  className="fwidth" value={obj.courseApplyingFor}/>
//         </div>
//         <div className="col-md-4">
//           <div>
//             <label htmlFor="">Status</label>
//             <input name="status"  className="fwidth" value={obj.status}/>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div>
//             <label htmlFor="">Campus</label>
//             { obj.branch !== undefined && (
//               <input name="branchName"  className="fwidth" value={obj.branch.branchName}/>
//             )
//             }
            
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div>
//             <label htmlFor="">State</label>
//             { obj.branch !== undefined && (
//               <input name="stateName"  className="fwidth" value={obj.branch.state.stateName}/>
//             )
//             }
            
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div>
//             <label htmlFor="">City</label>
//             { obj.branch !== undefined && (
//               <input name="cityName"  className="fwidth" value={obj.branch.city.cityName}/>
//             )
//             }
            
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div>
//             <label htmlFor="">Country</label>
//             { obj.branch !== undefined && (
//               <input name="countryName"  className="fwidth" value={obj.branch.state.country.countryName}/>
//             )
//             }
            
//           </div>
//         </div>
//     </div>
//   </div>

// );
// }




  render() {
    const { acExamSettings } = this.state;
    return (
      <div>
       

        <table id="studentlistpage" className="striped-table fwidth bg-white">
          <thead>
            <tr>
              <th>
                <input type="checkbox" onClick={(e: any) => this.checkAllExams(e)} value="checkedall" name="" id="" />
              </th>
              <th>EXAM TYPE</th>
           <th>YEAR</th>          
           <th>DEPARTMENT</th>           
            <th>SECTION</th>
           <th>SUBJECT</th>
           <th>START DATE</th>
           <th>END DATE</th>
          
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
          {/* <Link
            to={`/plugins/ems-exam/page/addacExamSetting`}
            className="btn btn-primary m-r-1" style={w180}>Add Exam
        </Link> */}
         
        </div>
      </div>
      <AcExamSettingsTable acExamSettings={acExamSettings} />
    </div>
  </section>
);
      
  export default graphql<AcExamSettingListQuery, AcExamSettingListPageOwnProps, AcExamSettingListPageProps>(
    AcExamSettingListQueryGql
  )(withLoadingHandler(AcExamSettingListPage));