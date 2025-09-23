// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { getAccessibleModules } from '../../../../utils/navUtils';
import { useNavigate, useParams } from 'react-router-dom';
import './superAdminCreateBranch.scss';
import DecoratedCard from '../../../../components/cards/decoratedCard';
import CustomButton from '../../../../components/custom-button/custom-button';
import api from '../../../../app/api';
import { toast } from 'react-toastify';
import moment from 'moment';
import { IStaff, IStaffProfile } from '../../../../interfaces/staff';
import AddStaffToBranchModal from '../../../../components/modals/super-admin-modals/AddStaffToBranchModal';
import CustomIconButton from '../../../../components/custom-button/custom-icon-button';

const sampleData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 180 },
  { month: 'Apr', value: 250 },
];

const SuperAdminViewCustomerPage = () => {
  const navigate = useNavigate();
  const userProfile = useSelector((state: RootState) => state.auth.staffProfile);
  const [memberProfile, setMemberProfile] = useState<IStaffProfile>()
  const orgProfile = useSelector((state: RootState) => state.auth.organisationData);
  const [staffs, setStaffs] = useState<IStaff[]>([]);
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



  const getMemberInfo = async () => {
    setLoading(true)
    try {
      const res = await api.get(`/member/${id}`);
      console.log({ see: res })

      setMemberProfile(res?.data?.payload);
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
    getMemberInfo()
  }, [navigate])

  return (
    <div className="dashboard-container">
      <DecoratedCard>
        <div className='d-flex flex-wrap justify-content-between w-100'>
          <div>
            <h4 className="">{`${memberProfile?.fullName} Profile page`}</h4>
            <p>Track customer loan activities.</p>
          </div>
        </div>
      </DecoratedCard>
      <div>
        <div className='w-100 d-flex  justify-content-end mt-2'>
          <div className='d-flex gap-2'>
            <CustomIconButton onClick={() => setAddStaffToBranchModal(true)} className='border d-flex gap-2 align-items-center' title='Biometrics' />
            <CustomButton className='border bg-light text-dark p-3' title='Update Profile' />
          </div>
        </div>
        <table className="table table-striped mt-3">
          <tbody>
            <tr>
              <td className=''>{memberProfile?.fullName}</td>
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

      <AddStaffToBranchModal
        on={addStaffToBranchModal}
        off={() => setAddStaffToBranchModal(false)}
      />
    </div>
  );
};

export default SuperAdminViewCustomerPage;