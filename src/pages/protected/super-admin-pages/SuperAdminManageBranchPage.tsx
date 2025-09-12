// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { getAccessibleModules } from '../../../utils/navUtils';
import { useNavigate } from 'react-router-dom';
import './superAdminCreateBranch.scss';
import DecoratedCard from '../../../components/cards/decoratedCard';
import CustomButton from '../../../components/custom-button/custom-button';
import ChartCard from '../../../components/chart/ChartCard';
import { Badge, Card, Spinner, Tab, Tabs } from 'react-bootstrap';
import { Formik } from 'formik';
import CustomInput from '../../../components/custom-input/CustormInput';
import ReusableInputs from '../../../components/custom-input/ReusableInputs';
import ReusableDropDownSelect from '../../../components/custom-input/ReusableDropDownSelect';
import CreateDeptModal from '../../../components/modals/super-admin-modals/CreateDeptModal';
import CreateRoleModal from '../../../components/modals/super-admin-modals/CreateRoleModal';
import api from '../../../app/api';
import { toast } from 'react-toastify';
import moment from 'moment';

const sampleData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 180 },
  { month: 'Apr', value: 250 },
];

const SuperAdminManageBranchPage = () => {
  const navigate = useNavigate();
  const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
  const orgProfile = useSelector((state: RootState) => state.auth.organisationData);
  const modules = getAccessibleModules(
    // staff?.staffLevel || '',
    'marketer',
    // staff?.organization?.subscriptionType || 
    'pro'
  );

  const [departmentModal, setDepartmentModal] = useState(false);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false)
  const [roleModal, setRoleModal] = useState(false);

  const getBranches = async () => {
    setLoading(true)
    try {
      const res = await api.get(`/branches?organisationId=${orgProfile?.id}`);
      if (res.status == 200) {
        console.log({ seeRes: res })
        const { payload } = res.data;
        setBranches(payload)
        console.log({ seePayloadFromOtp: payload })
        const staffProfile = payload?.staffData;
        setLoading(false)
        // dispatch(setToken(payload?.token));
        // dispatch(setStaffProfile(staffProfile));
      }

    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBranches();
  }, [navigate])

  return (
    <div className="dashboard-container">
      <DecoratedCard>
        <div className='d-flex flex-wrap justify-content-between w-100'>
          <div>
            <h4 className="">Branch Management.</h4>
            <p>Manage and see all your Organisation branch from here.</p>
          </div>
        </div>
      </DecoratedCard>
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
                    branches.map((branch: any, index) => (
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
                      <td className='fw-bold' colSpan={5}>{!loading && branches.length < 1 && 'No Data Available'}</td>
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
                    branches.map((branch: any, index) => (
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
                      <td className='fw-bold' colSpan={5}>{!loading && branches.length < 1 && 'No Data Available'}</td>
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

          <Tab eventKey="not-attested" title="Disabled">
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
                    branches.map((branch: any, index) => (
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
                      <td className='fw-bold' colSpan={5}>{!loading && branches.length < 1 && 'No Data Available'}</td>
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

      {/* <CreateDeptModal
        on={departmentModal}
        off={() => setDepartmentModal(false)}
      /> */}

      {/* <CreateRoleModal
        on={roleModal}
        off={() => setRoleModal(false)}
      /> */}
    </div>
  );
};

export default SuperAdminManageBranchPage;