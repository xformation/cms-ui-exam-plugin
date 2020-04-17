import * as React from 'react';
import {withApollo} from 'react-apollo';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';

type ExamTableStates = {
    user: any;
    activeTab: any;
    examObj: any;
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
  toggleTab(tabNo: any) {
    this.setState({
      activeTab: tabNo,
    });
  }

  render() {
    const {activeTab, examObj} = this.state;
    console.log('Check the new obj in another page:', examObj);
    return (
        <section className="student-profile-container">
          <div className="plugin-bg-white">
            <div>
              <div className="b-1 m-1">
                <div className="p-m-1">
                  <Nav tabs className="" id="rmfloat">
                    <NavItem className="cursor-pointer">
                      <NavLink
                        className={`${activeTab === 0 ? 'active' : ''}`}
                        onClick={() => {
                          this.toggleTab(0);
                        }}
                      >
                        exam Details
                      </NavLink>
                    </NavItem>
                    {/* <NavItem className="cursor-pointer">
                      <NavLink
                        className={`${activeTab === 1 ? 'active' : ''}`}
                        onClick={() => {
                          this.toggleTab(1);
                        }}
                      >
                        Contract
                      </NavLink>
                    </NavItem>
                    <NavItem className="cursor-pointer">
                      <NavLink
                        className={`${activeTab === 2? 'active' : ''}`}
                        onClick={() => {
                          this.toggleTab(2);
                        }}
                      >
                        Insurance
                      </NavLink>
                      </NavItem>*/}
                  </Nav>
                  <TabContent activeTab={activeTab} className="ltab-contianer p-0">
                    <TabPane tabId={0}>
                      <span>
                      <div className="p-2">
                  <div className="details-container">
                    <div className="row">
                      <div className="col-sm-4 col-xs-12 m-b-1 adminDetails">
                        <span className="profile-label w-8">
                          year:
                        </span>
                        <span className="">{examObj.bctch}</span>
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1 adminDetails">
                        <span className="profile-label w-12">
                          Semester:
                        </span>
                        <span className="">{examObj.semester}</span>
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1 adminDetails">
                        <span className="profile-label w-10">
                          Section: </span>
                        <span className="">{examObj.sectn}</span>

                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4 col-xs-12 m-b-1 adminDetails">
                        <span className="profile-label w-8">
                          Subject:</span>
                        <span className="">{examObj.sbjct}</span>
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1 adminDetails">
                        <span className="profile-label w-12">
                          Date:</span>
                        <span className="">{examObj.examDate}</span>
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1 adminDetails">
                        <span className="profile-label w-10">
                         Start Time:</span>
                        <span className="">{examObj.startTime}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4 col-xs-12 m-b-1 adminDetails">
                        <span className="profile-label w-8">
                          End Time: </span>
                        <span className="">{examObj.endTime}</span>
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1 adminDetails">
                        <span className="profile-label w-12">
                          Passing Marks: </span>
                        <span className="">{examObj.passing}</span>
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1 adminDetails">
                        <span className="profile-label w-10">
                          Total Marks: </span>
                        <span className="">{examObj.total}</span>
                      </div>
                    </div>
                  </div>
                  {/* <div className="details-container">
                    <div className="row">
                      <div className="col-sm-4 col-xs-12 m-b-1 adminDetails">
                        <span className="profile-label w-8">
                         Model: </span>
                        <span className="">{vObj.model}</span>
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1 adminDetails"> */}
                        {/* <span className="profile-label w-12">
                          Contact Number:
                      </span>
                        <span className="">{vObj.contactNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>
                </span> */}
                    {/* </TabPane>
                    <TabPane tabId={1}>
                      <span>
                      <div className="p-2">
                  <div className="details-container">
                    <div className="row">
                      <div className="col-sm-4 col-xs-12 m-b-1 adminDetails">
                        <span className="profile-label w-8">
                          Vendor Name:
                        </span>
                        {vObj.contract !== undefined && (

                          <span >{vObj.contract.vendorName}</span>
                        )}
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1 adminDetails">
                        <span className="profile-label w-10">
                          Year:
                        </span>
                        {vObj.contract !== undefined && (

                          <span >{vObj.contract.typeOfOwnerShip}</span>
                        )}
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1 adminDetails">
                        <span className="profile-label w-10">
                          Duration Of Contract:
                        </span>
                        {vObj.contract !== undefined && (

                          <span >{vObj.contract.durationOfContract}</span>
                        )}
                      </div>
             </div>
             <div className="row">
                      <div className="col-sm-4 col-xs-12 m-b-1 adminDetails">
                        <span className="profile-label w-8">
                          Date Of Contract:
                        </span>
                        {vObj.contract !== undefined && (

                          <span >{vObj.strStartDate}</span>
                        )}
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1 adminDetails">
                        <span className="profile-label w-10">
                          Contract Expiring Date:
                        </span>
                        {vObj.contract !== undefined && (

                          <span >{vObj.strEndDate}</span>
                        )}
                      </div>
             </div>
             </div>
               </div>
                      </span>
                    </TabPane>
                    <TabPane tabId={2}>
                      <span>
                      <div className="p-2">
                  <div className="details-container">
                    <div className="row">
                      <div className="col-sm-4 col-xs-12 m-b-1 adminDetails">
                        <span className="profile-label w-8">
                          Insurance Company:
                        </span>
                        {vObj.insurance !== undefined && (

                          <span >{vObj.insurance.insuranceCompany}</span>
                        )}
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1 adminDetails">
                        <span className="profile-label w-8">
                          Type Of Insurance:
                        </span>
                        {vObj.insurance !== undefined && (

                          <span >{vObj.insurance.typeOfInsurance}</span>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4 col-xs-12 m-b-1 adminDetails">
                        <span className="profile-label w-8">
                          Date Of Insurance:
                        </span>
                        {vObj.contract !== undefined && (

                          <span >{vObj.strDateOfInsurance}</span>
                        )}
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1 adminDetails">
                        <span className="profile-label w-10">
                          Valid Till:
                        </span>
                        {vObj.contract !== undefined && (

                          <span >{vObj.strValidTill}</span>
                        )}
                      </div>
             </div>
                  </div>
               </div>

                      </span> */}
                      </div>
                      
                      </span>
                    </TabPane>
                  </TabContent>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  }
  export default withApollo(ExamDetailsPage);
