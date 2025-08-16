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
import { Badge, Card } from 'react-bootstrap';
import { Formik } from 'formik';
import CustomInput from '../../../components/custom-input/CustormInput';
import ReusableInputs from '../../../components/custom-input/ReusableInputs';
import ReusableDropDownSelect from '../../../components/custom-input/ReusableDropDownSelect';
import CreateDeptModal from '../../../components/modals/super-admin-modals/CreateDeptModal';
import CreateRoleModal from '../../../components/modals/super-admin-modals/CreateRoleModal';
import api from '../../../app/api';
import { toast } from 'react-toastify';
import moment from 'moment';
import DataCheckerForm from '../../../components/page-forms/DuplicateDataCheckerForm';
import DuplicateDataCheckerForm from '../../../components/page-forms/DuplicateDataCheckerForm';

const sampleData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 180 },
  { month: 'Apr', value: 250 },
];

const SuperAdminDuplicateCheckerPage = () => {
  const navigate = useNavigate();
  const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
  const orgProfile = useSelector((state: RootState) => state.auth.organisationData);
  const [startTable, setStartTable] = useState(false);
  const modules = getAccessibleModules(
    // staff?.staffLevel || '',
    'marketer',
    // staff?.organization?.subscriptionType || 
    'pro'
  );

  const [step, setStep] = useState(1);
  const [numColumns, setNumColumns] = useState(0);
  const [columnHeaders, setColumnHeaders] = useState<string[]>([]);
  const [tableData, setTableData] = useState<string[][]>([]);

  const [departmentModal, setDepartmentModal] = useState(false);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false)
  const [roleModal, setRoleModal] = useState(false);



  const getStaffs = async () => {
    try {
      const res = await api.get(`/staff/staffs?mode=dropdown`);
      if (res.status == 200) {
        console.log({ seeRes: res })
        const { payload } = res.data;
        setBranches(payload)
        console.log({ seePayloadFromOtp: payload })
        const staffProfile = payload?.staffData;
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
    // getStaffs();
  }, [navigate])

  return (
    <div className="dashboard-container">
      <DecoratedCard>
        <div className='d-flex flex-wrap justify-content-between w-100'>
          <div>
            <h4 className="">Duplicate Data Checker.</h4>
            <p>Perform basic table data generation and avoid duplicate.</p>
          </div>
        </div>
      </DecoratedCard>
      <div>
        {/* <div className='w-100 d-flex justify-content-end mt-3'>
          <div></div>
          {!startTable && <div><CustomButton onClick={() => setStartTable(true)} title='New Record' /></div>}

        </div> */}

        <DuplicateDataCheckerForm/>


        {/* <table className="table table-striped mt-3">
          <thead>
            <tr >
              <th scope="col" className='bg-primary text-light'>S/N</th>
              <th scope="col" className='bg-primary text-light'>Staff Name</th>
              <th scope="col" className='bg-primary text-light'>Date Created</th>
              <th scope="col" className='bg-primary text-light'>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              branches.map((branch: any, index) => (<tr>
                <th scope="row">{index + 1}</th>
                <td>{branch?.fullName}</td>
                <td>{moment(branch?.createdAt).format('DD-MM-YYYY')}</td>
                <td><Badge className='bg-warning'>{branch?.isApproved ? 'Approved' : 'Pending'}</Badge></td>
              </tr>))
            }

            {
              branches.length < 1 &&
              <tr className='text-center'><td className='fw-bold' colSpan={5}>No Data Available</td></tr>

            }

          </tbody>
        </table>
        <div>
          <nav aria-label="Page navigation example">
            {
              branches.length > 0 &&
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
              </ul>}
          </nav>
        </div> */}
      </div>






      {/* <CreateDeptModal
        on={departmentModal}
        off={() => setDepartmentModal(false)}
      />

      <CreateRoleModal
        on={roleModal}
        off={() => setRoleModal(false)}
      /> */}
    </div>
  );
};

export default SuperAdminDuplicateCheckerPage;