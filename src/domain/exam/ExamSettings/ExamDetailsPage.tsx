import * as React from 'react';
import {withApollo} from 'react-apollo';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';

type ExamTableStates = {
    user: any;
    activeTab: any;
    examObj: any;
    examData:any;
  };

export interface ExamDetailsProps extends React.HTMLAttributes<HTMLElement> {
    [data: string]: any;
    user?: any;
  }
  class ExamDetailsPage<T = {[data: string]: any}> extends React.Component<ExamDetailsProps,ExamTableStates> {
  constructor(props: any) {
    super(props);
    this.state = {
     activeTab: 0,
     examObj: this.props.data,
     user: this.props.user,
     examData: {
 
     },
    };
    this.toggleTab = this.toggleTab.bind(this);
  }
  
  async componentDidMount() {
    this.setState({
      examObj: this.props.data,
    });
  }

  componentWillReceiveProps() {
    this.setState({
      examObj: this.props.data,
    });
  }
  ;
  toggleTab(tabNo: any) {
    this.setState({
      activeTab: tabNo,
    });
  }

 render() {
    const {activeTab,examData, examObj} = this.state;
    console.log('Check the new obj in another page:', examObj);
    return (
      
                
            
              <TabContent activeTab={activeTab} className="ltab-contianer p-1">
                     
                    
                     
                     <div className="row">
                     
                     <div className="col-sm-2 col-xs-4 m-b-1 adminDetails">
                        <span className="profile-label w-8">
                          Year:
                        </span>
                        <span className="">{examObj.bctch}</span>
                      </div>
                      <div className="col-sm-3 col-xs-6 m-b-4 adminDetails">
                        <span className="profile-label w-15">
                          Semester:
                        </span>
                        <span className="">{examObj.semester}</span>
                      </div>
                      <div className="col-sm-7 col-xs-5 m-b-1 adminDetails">
                        <span className="profile-label w-20">
                          Section: </span>
                        <span className="">{examObj.sectn}</span>

                      </div>
                      </div>
                      {/* <TabPane tabId={1}>
            <div className="container-fluid" style={{padding: '0px'}}>
              <div className="m-b-1 bg-heading-bgStudent studentListFlex p-point5">
              <div className="row">
                
                <div className="">
                  <a
                    className="btn btn-primary m-l-1"
                    onClick={() => {
                      this.toggleTab(0);
                    }}
                  >
                    Back
                  </a>
                  <a
                    className="btn btn-primary m-l-1"
                    onClick={(e: any) => {
                      print();
                    }}
                  >
                    Print
                  </a>
                </div>
                </div>
              </div>
              {this.state.examObj !== null && this.state.examObj !== undefined && (
                <ExamDetailsPage
                 data={this.state.examObj} />
              )}
            </div>
          </TabPane> */}
               
                
                              

                       <h4> ExamName :{examObj.examName}</h4>
                     
                    
                      <table id="branchTable" className="striped-table fwidth bg-white p-3 m-t-1">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Date</th>
                  {/* <th>Day</th> */}
                  <th>Start time</th>
                  <th>End Time</th>
                  <th>Passing Marks</th>
                  <th>Total Marks</th>

                </tr>
              </thead>
              <td>{examObj.sbjct}</td>
              <td>{examObj.st}</td>
              {/* <td>{examObj.day}</td> */}
              <td>{examObj.startTime}</td>
              <td>{examObj.endTime}</td>
            
              <td>{examObj.passing}</td>
              <td>{examObj.total}</td>


            </table>
       </TabContent> 
    );
    }
  }
  export default withApollo(ExamDetailsPage);