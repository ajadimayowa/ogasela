// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { getAccessibleModules } from '../../../../utils/navUtils';
import { data, useNavigate, useParams } from 'react-router-dom';
import './superAdminCreateBranch.scss';
import DecoratedCard from '../../../../components/cards/decoratedCard';
import CustomButton from '../../../../components/custom-button/custom-button';
import api from '../../../../app/api';
import { toast } from 'react-toastify';
import moment from 'moment';
// import { IStaff, IStaffProfile } from '../../../../interfaces/staff';
import { IStaffProfile } from '../../../../interfaces/staff';
// import { IGroup, IMember } from '../../../../interfaces/group';
import {  IGroup,IMember } from '../../../../interfaces/group';
import { Badge, Button, Card, Spinner, Tab, Tabs } from 'react-bootstrap';
import DashboardDataCard from '../../../../components/cards/DashboardDataCard';
import AddMemberToGroupModal from '../../../../components/modals/member-modals/AddMemberToGroupModal';
import SuperAdminDashboardDataCard from '../../../../components/cards/SuperAdminDashboardDataCard';
import UpdateBranchModal from '../../../../components/modals/branch-modals/UpdateBranchModal';
import { IBranch } from '../../../../interfaces/branch';
import UpdateBranchAccountModal from '../../../../components/modals/branch-modals/UpdateBranchAccountModal';
import FundBranchModal from '../../../../components/modals/branch-modals/FundBranchModal';

const sampleData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 180 },
  { month: 'Apr', value: 250 },
];



const SuperAdminViewBranchPage = () => {
  const navigate = useNavigate();
  const userProfile = useSelector((state: RootState) => state.auth.staffProfile);
  const [staffProfile,setStaffProfile] = useState<IStaffProfile>()
  const orgProfile = useSelector((state: RootState) => state.auth.organisationData);
  const [branch, setBranch] = useState<IBranch>();
  const [fundingHistory, setFundingHistory] = useState<any[]>([]);
  const [totalFunded,setTotalFunded] = useState()
  const [members, setMembers] = useState<IMember[]>([]);
  const [addStaffToBranchModal,setAddStaffToBranchModal] = useState(false)
  const [updateBranchModal,setUpdateBranchModal] = useState(false);
  const [updateBranchAccountModal,setUpdateBranchAccountModal] = useState(false);
   const [fundBranchModal,setFundBranchModal] = useState(false);
  const {id}=useParams()
  const modules = getAccessibleModules(
    // staff?.staffLevel || '',
    'marketer',
    // staff?.organization?.subscriptionType || 
    'pro'
  );

  const [departmentModal, setDepartmentModal] = useState(false);
  const [loading, setLoading] = useState(false)
  const [roleModal, setRoleModal] = useState(false);

  const generalData = [
    {
      label:'Current Balance',
      value:branch?.currentBalance,
      icon1:'bi bi-credit-card',
      icon2:'',
      totalFunded:totalFunded,
      color:'primary',
      isCurrency:true,
      extraData:true
    },
    {
      label:'Generated Revenue',
      value:'25,600',
      icon1:'bi bi-credit-card',
      icon2:'',
      color:'primary',
      isCurrency:true,
      extraData:false
    },
    {
      label:'Negative Debt',
      value:'340000',
      icon1:'bi bi-people',
      icon2:'',
      color:'danger',
      isCurrency:true,
      extraData:false
    },
  ]

    const getBranchInfo = async () => {
    setLoading(true)
        try {
            const res = await api.get(`/branch/${id}`);
            // console.log({see:res?.data?.groupMembers})
           
                setBranch(res?.data?.payload?.branch);
                setFundingHistory(res?.data?.payload?.fundHistory);
                setTotalFunded(res?.data?.payload?.totalFunding )
                let totalFunding = res?.data?.payload?.fundHistory.map((fund:any)=>fund.amount)
                setLoading(false)
                // const { payload } = res.data;
                // console.log({ seePayloadFromOtp: payload })
                // const staffProfile = payload?.staffData;
                // dispatch(setToken(payload?.token));
                // dispatch(setStaffProfile(staffProfile));
           

        } catch (err: any) {
            // toast.error(err?.response?.data?.message || 'Invalid or expired OTP');
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getBranchInfo()
    }, [navigate])

  return (
    <div className="dashboard-container">
      <DecoratedCard>
        <div className='d-flex flex-wrap justify-content-between w-100'>
          <div>
            <h4 className="">{branch?.name} Branch</h4>
            <p>See branch information and all of its loan groups and members.</p>
          </div>
        </div>
      </DecoratedCard>
      <div>
        <div className='w-100 d-flex  justify-content-end mt-2'>
          <div className='d-flex gap-2'>
            <CustomButton onClick={()=>setUpdateBranchModal(true)} className='border bg-light text-dark p-3' title='Update Branch'/>
            <CustomButton onClick={()=>setFundBranchModal(true)} className='border' title='Fund Wallet'/>
            
          </div>
        </div>
        {/* <table className="table table-striped mt-3">
          <tbody>
            <tr>
              <td className=''>{staffProfile?.fullName}</td>
            </tr>
          </tbody>
        </table> */}

<div className="module-grid mt-3">
        {generalData.map(module => (
          <SuperAdminDashboardDataCard extra={module?.extraData} currency={module.isCurrency}  data={module}/>
        ))}
      </div>


<div className='mt-3 d-flex flex-wrap align-items-center gap-3'>
  <Card className='border-0 shadow-sm'>
    <Card.Header className='d-flex justify-content-between align-items-center fw-bold gap-3'>
      <div>Bank Details</div>
      <Button onClick={()=>setUpdateBranchAccountModal(true)}>{branch?.bankDetails?`Update`:`Add New`}</Button>
    </Card.Header>
    <Card.Body>
{
  branch?.bankDetails?
  <div className='fw-bold w-100'>
  <p> {`Account Name : ${branch.bankDetails.accountName}`}</p>
  <p> {`Account Number  : ${branch.bankDetails.accountNumber}`}</p>
  <p> {`Name of Bank : ${branch.bankDetails.bankName}`}</p>
 
</div>:
<div className='d-flex text-center justify-content-center'>
No Bank Information
</div>

}
    </Card.Body>
  </Card>

  {/* <Card>
    <Card.Header className='d-flex justify-content-between align-items-center fw-bold'>
      <div></div>
    </Card.Header>
    <Card.Body>
<div className='fw-bold'>
  <p> {`Account Name : Zone 1 Account`}</p>
 
</div>
    </Card.Body>
  </Card> */}
</div>

<div className="mt-5">
  <h5>Loan Applications</h5>
          <Tabs
            defaultActiveKey="all-policies"
            id="uncontrolled-tab-example"
            variant="underline"
            className="mb-3 gap-5"
          >
            <Tab eventKey="all-policies" title="Active"
              tabClassName=""
            >
              <Card className='mt-2'>
                <table className="table table-striped mt-3">
                  <thead>
                    <tr >
                      <th scope="col" className='bg-primary text-light'>S/N</th>
                      <th scope="col" className='bg-primary text-light'>Branch Name</th>
                      <th scope="col" className='bg-primary text-light'>Manager</th>
                      <th scope="col" className='bg-primary text-light'>Date Created</th>
                      <th scope="col" className='bg-primary text-light'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!loading &&
                      [].map((branch: any, index) => (
                        <tr role='button' onClick={() => navigate(`/super-admin/branch-management/${branch?._id}`)}>
                          <th scope="row">{index + 1}</th>
                          <td>{branch?.name}</td>
                          <td>{branch?.manager?.fullName}</td>
                          <td>{moment(branch?.createdAt).format('DD-MM-YYYY')}</td>
                          <td><Badge className='bg-warning'>{branch?.isApproved ? 'Approved' : 'Pending'}</Badge></td>
                        </tr>))
                    }
                    <tr className='text-center'>
                      {
                        <td colSpan={5}>{loading && <Spinner size='sm' />}</td>
                      }
                    </tr>

                    <tr className='text-center'>
                      {
                        <td className='fw-bold' colSpan={5}>{!loading && [].length < 1 && 'No Data Available'}</td>
                      }
                    </tr>

                  </tbody>
                </table>
                <div>
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>
                      <li className="page-item"><a className="page-link" href="#">1</a></li>
                      <li className="page-item"><a className="page-link" href="#">2</a></li>
                      <li className="page-item"><a className="page-link" href="#">3</a></li>
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Card>
            </Tab>

            <Tab eventKey="pending" title="Pending">
              <Card className='mt-2'>
                <table className="table table-striped mt-3">
                  <thead>
                    <tr >
                      <th scope="col" className='bg-primary text-light'>S/N</th>
                      <th scope="col" className='bg-primary text-light'>Branch Name</th>
                      <th scope="col" className='bg-primary text-light'>Manager</th>
                      <th scope="col" className='bg-primary text-light'>Date Created</th>
                      <th scope="col" className='bg-primary text-light'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!loading &&
                      [].map((branch: any, index:number) => (
                        <tr role='button' onClick={() => navigate(`/super-admin/branch-management/${branch?._id}`)}>
                          <th scope="row">{index + 1}</th>
                          <td>{branch?.name}</td>
                          <td>{branch?.manager?.fullName}</td>
                          <td>{moment(branch?.createdAt).format('DD-MM-YYYY')}</td>
                          <td><Badge className='bg-warning'>{branch?.isApproved ? 'Approved' : 'Pending'}</Badge></td>
                        </tr>))
                    }
                    <tr className='text-center'>
                      {
                        <td colSpan={5}>{loading && <Spinner size='sm' />}</td>
                      }
                    </tr>

                    <tr className='text-center'>
                      {
                        <td className='fw-bold' colSpan={5}>{!loading && [].length < 1 && 'No Data Available'}</td>
                      }
                    </tr>

                  </tbody>
                </table>
                <div>
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>
                      <li className="page-item"><a className="page-link" href="#">1</a></li>
                      <li className="page-item"><a className="page-link" href="#">2</a></li>
                      <li className="page-item"><a className="page-link" href="#">3</a></li>
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Card>
            </Tab>

            <Tab eventKey="not-attested" title="Late">
              <Card className='mt-2'>
                <table className="table table-striped mt-3">
                  <thead>
                    <tr >
                      <th scope="col" className='bg-primary text-light'>S/N</th>
                      <th scope="col" className='bg-primary text-light'>Branch Name</th>
                      <th scope="col" className='bg-primary text-light'>Manager</th>
                      <th scope="col" className='bg-primary text-light'>Date Created</th>
                      <th scope="col" className='bg-primary text-light'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!loading &&
                     [].map((branch: any, index) => (
                        <tr role='button' onClick={() => navigate(`/super-admin/branch-management/${branch?._id}`)}>
                          <th scope="row">{index + 1}</th>
                          <td>{branch?.name}</td>
                          <td>{branch?.manager?.fullName}</td>
                          <td>{moment(branch?.createdAt).format('DD-MM-YYYY')}</td>
                          <td><Badge className='bg-warning'>{branch?.isApproved ? 'Approved' : 'Pending'}</Badge></td>
                        </tr>))
                    }
                    <tr className='text-center'>
                      {
                        <td colSpan={5}>{loading && <Spinner size='sm' />}</td>
                      }
                    </tr>

                    <tr className='text-center'>
                      {
                        <td className='fw-bold' colSpan={5}>{!loading && [].length < 1 && 'No Data Available'}</td>
                      }
                    </tr>

                  </tbody>
                </table>
                <div>
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>
                      <li className="page-item"><a className="page-link" href="#">1</a></li>
                      <li className="page-item"><a className="page-link" href="#">2</a></li>
                      <li className="page-item"><a className="page-link" href="#">3</a></li>
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Card>
            </Tab>


          </Tabs>

        </div>


        
      </div>






      {/* <CreateDeptModal
        on={departmentModal}
        off={() => setDepartmentModal(false)}
      />

      <CreateRoleModal
        on={roleModal}
        off={() => setRoleModal(false)}
      /> */}
      <UpdateBranchModal
      on={updateBranchModal}
      off={()=>setUpdateBranchModal(false)}
      branchInfo={branch}

      />

<FundBranchModal
      on={fundBranchModal}
      off={()=>setFundBranchModal(false)}
      branchInfo={branch}

      />

      <UpdateBranchAccountModal
      on={updateBranchAccountModal}
      off={()=>setUpdateBranchAccountModal(false)}
      branchInfo={branch}

      />

      <AddMemberToGroupModal 
      on={addStaffToBranchModal}
      off={()=>setAddStaffToBranchModal(false)}
      />
    </div>
  );
};

export default SuperAdminViewBranchPage;