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
import { Badge, Card, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import CustomInput from '../../../components/custom-input/CustormInput';
import ReusableInputs from '../../../components/custom-input/ReusableInputs';
import ReusableDropDownSelect from '../../../components/custom-input/ReusableDropDownSelect';
import CreateDeptModal from '../../../components/modals/super-admin-modals/CreateDeptModal';
import CreateRoleModal from '../../../components/modals/super-admin-modals/CreateRoleModal';
import api from '../../../app/api';
import { toast } from 'react-toastify';
import moment from 'moment';
import { IStaff } from '../../../interfaces/staff';

const sampleData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 180 },
  { month: 'Apr', value: 250 },
];

const SuperAdminManageStaffsPage = () => {
  const navigate = useNavigate();
  const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
  const orgProfile = useSelector((state: RootState) => state.auth.organisationData);
  const [staffs, setStaffs] = useState<IStaff[]>([]);
  const modules = getAccessibleModules(
    // staff?.staffLevel || '',
    'marketer',
    // staff?.organization?.subscriptionType || 
    'pro'
  );

  const [departmentModal, setDepartmentModal] = useState(false);
  const [loading, setLoading] = useState(false)
  const [roleModal, setRoleModal] = useState(false);

  const getOrganizationStaffs = async () => {
    setLoading(true)
        try {
            const res = await api.get(`staff/staffs?organisationId=${orgProfile?.id}`);
            if (res.status == 200) {
              
                console.log({ hereIsDepts: res?.data?.payload })
                let options = res?.data?.payload.map((item: any) => ({
                    value: item?.id,
                    label: item?.fullName,
                }))
                setStaffs(res?.data?.payload);
                setLoading(false)
                // const { payload } = res.data;
                // console.log({ seePayloadFromOtp: payload })
                // const staffProfile = payload?.staffData;
                // dispatch(setToken(payload?.token));
                // dispatch(setStaffProfile(staffProfile));
            }

        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Invalid or expired OTP');
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getOrganizationStaffs()
    }, [navigate])

  return (
    <div className="dashboard-container">
      <DecoratedCard>
        <div className='d-flex flex-wrap justify-content-between w-100'>
          <div>
            <h4 className="">Staff Directory and Management.</h4>
            <p>Manage your Organisation staffs from here.</p>
          </div>
        </div>
      </DecoratedCard>
      <div>
        <table className="table table-striped mt-3">
          <thead>
            <tr >
              <th scope="col" className='bg-primary text-light'>S/N</th>
              <th scope="col" className='bg-primary text-light'>Staff Name</th>
              <th scope="col" className='bg-primary text-light'>Department</th>
              <th scope="col" className='bg-primary text-light'>Type</th>
              <th scope="col" className='bg-primary text-light'>Level</th>
              <th scope="col" className='bg-primary text-light'>Phone Number</th>
              <th scope="col" className='bg-primary text-light'>Date Created</th>
              <th scope="col" className='bg-primary text-light'>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              !loading &&
              staffs.map((staff:IStaff,index)=>(<tr>
              <th scope="row">{index + 1}</th>
              <td>{staff?.fullName}</td>
              <td>{staff?.department?.name}</td>
              <td className='text-capitalize'>{staff?.userClass}</td>
              <td className='text-capitalize'>{staff?.staffLevel}</td>
              <td>{staff?.phoneNumber}</td>
              <td>{moment(staff?.createdAt).format('DD-MM-YYYY')}</td>
              <td><Badge className='bg-warning'>{staff?.isApproved?'Approved':'Pending'}</Badge></td>
            </tr>))
            }
            <tr className='text-center'>
              {
                <td colSpan={8}>{loading && <Spinner size='sm' />}</td>
              }
            </tr>

            <tr className='text-center'>
              {
                <td className='fw-bold' colSpan={8}>{!loading && staffs.length < 1 && 'No Data Available'}</td>
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

export default SuperAdminManageStaffsPage;