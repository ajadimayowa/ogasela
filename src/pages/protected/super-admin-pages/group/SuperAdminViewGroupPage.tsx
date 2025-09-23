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
import { IGroup, IMember } from '../../../../interfaces/group';
import { Badge, Card, Spinner, Tab, Tabs } from 'react-bootstrap';
import DashboardDataCard from '../../../../components/cards/DashboardDataCard';
import AddMemberToGroupModal from '../../../../components/modals/member-modals/AddMemberToGroupModal';

const sampleData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 180 },
  { month: 'Apr', value: 250 },
];



const SuperAdminViewGroupPage = () => {
  const navigate = useNavigate();
  const userProfile = useSelector((state: RootState) => state.auth.staffProfile);
  const [staffProfile, setStaffProfile] = useState<IStaffProfile>()
  const orgProfile = useSelector((state: RootState) => state.auth.organisationData);
  const [group, setGroup] = useState<IGroup>();
  const [members, setMembers] = useState<IMember[]>([]);
  const [addStaffToBranchModal, setAddStaffToBranchModal] = useState(false)
  const { id } = useParams()
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
      label: 'Collective Loan',
      value: 500000,
      icon1: 'bi bi-credit-card',
      icon2: '',
      color: 'primary',
      isCurrency: true
    },
    {
      label: 'Estimated Repayment',
      value: '25,600',
      icon1: 'bi bi-credit-card',
      icon2: '',
      color: 'primary',
      isCurrency: true
    },
    {
      label: 'Amount Repaid',
      value: '340000',
      icon1: 'bi bi-people',
      icon2: '',
      color: 'primary',
      isCurrency: true
    },
  ]

  const getGroupInfo = async () => {
    setLoading(true)
    try {
      const res = await api.get(`/group/${id}`);
      // console.log({see:res?.data?.groupMembers})

      setGroup(res?.data?.payload);
      setMembers(res?.data?.payload?.groupMembers);
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
    getGroupInfo()
  }, [navigate])

  return (
    <div className="dashboard-container">
      <DecoratedCard>
        <div className='d-flex flex-wrap justify-content-between w-100'>
          <div>
            <h4 className="">{group?.groupName}</h4>
            <p>See loan group information and all its members.</p>
          </div>
        </div>
      </DecoratedCard>
      <div>
        <div className='w-100 d-flex  justify-content-end mt-2'>
          <div className='d-flex gap-2'>
            <CustomButton className='border bg-light text-dark p-3' title='Update Group' />
            <CustomButton onClick={() => setAddStaffToBranchModal(true)} className='border' title='Add Member' />

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
            <DashboardDataCard currency={module.isCurrency} data={module} />
          ))}
        </div>

        <div className="mt-5">
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
                      members.map((branch: any, index) => (
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
                        <td className='fw-bold' colSpan={5}>{!loading && members.length < 1 && 'No Data Available'}</td>
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
                      members.map((branch: any, index:number) => (
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
                        <td className='fw-bold' colSpan={5}>{!loading && members.length < 1 && 'No Data Available'}</td>
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
                      members.map((branch: any, index) => (
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
                        <td className='fw-bold' colSpan={5}>{!loading && members.length < 1 && 'No Data Available'}</td>
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

      <AddMemberToGroupModal
        on={addStaffToBranchModal}
        off={() => setAddStaffToBranchModal(false)}
      />
    </div>
  );
};

export default SuperAdminViewGroupPage;