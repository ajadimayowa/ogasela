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
import { IGroup, IMember } from '../../../../interfaces/group';
import { Badge, Spinner } from 'react-bootstrap';

const sampleData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 180 },
  { month: 'Apr', value: 250 },
];

const MarketerViewGroupPage = () => {
  const navigate = useNavigate();
  const userProfile = useSelector((state: RootState) => state.auth.staffProfile);
  const [staffProfile,setStaffProfile] = useState<IStaffProfile>()
  const orgProfile = useSelector((state: RootState) => state.auth.organisationData);
  const [group, setGroup] = useState<IGroup>();
  const [members, setMembers] = useState<IMember[]>([]);
  const [addStaffToBranchModal,setAddStaffToBranchModal] = useState(false)
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

  

    const getGroupInfo = async () => {
    setLoading(true)
        try {
            const res = await api.get(`/group/${id}`);
            console.log({see:res?.data?.groupMembers})
           
                setGroup(res?.data);
                setMembers(res?.data?.groupMembers);
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
            <CustomButton className='border bg-light text-dark p-3' title='Update Group'/>
            <CustomButton onClick={()=>setAddStaffToBranchModal(true)} className='border' title='Add Member'/>
            
          </div>
        </div>
        <table className="table table-striped mt-3">
          <tbody>
            <tr>
              <td className=''>{staffProfile?.fullName}</td>
            </tr>
          </tbody>
        </table>

        <table className="table table-striped mt-3">
          <thead>
            <tr >
              <th scope="col" className='bg-primary text-light'>S/N</th>
              <th scope="col" className='bg-primary text-light'>BVN</th>
              <th scope="col" className='bg-primary text-light'>Full Name</th>
              <th scope="col" className='bg-primary text-light'>Amount Borrowed</th>
              <th scope="col" className='bg-primary text-light'>Amount Paid</th>
              <th scope="col" className='bg-primary text-light'>Application Date</th>
              <th scope="col" className='bg-primary text-light'>Date Approved</th>
              <th scope="col" className='bg-primary text-light'>Disbursement Date</th>
              <th scope="col" className='bg-primary text-light'>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              !loading &&
              members?.map((staff:IMember,index)=>(
              <tr className='p-2' role='button' 
              // onClick={()=>navigate(`/marketer/view-group/${staff?._id}`)}
              >
              <th scope="row">{index + 1}</th>
               <td>{staff?.bvn}</td>
              <td>{staff?.fullName}</td>
              <td>{staff?.totalAmountBorrowed}</td>
               <td>{staff?.totalAmountPaidBack}</td>
              <td>{moment(staff?.createdAt).format('DD-MM-YYYY')}</td>
               <td>{moment(staff?.createdAt).format('DD-MM-YYYY')}</td>
                <td>{moment(staff?.createdAt).format('DD-MM-YYYY')}</td>
              {/* <td><Badge className='bg-warning'>{staff?.isApproved?'Approved':'Pending'}</Badge></td> */}
              <td><Badge className='bg-warning'>{'Pending'}</Badge></td>
            </tr>))
            }
            <tr className='text-center'>
              {
                <td colSpan={9}>{loading && <Spinner size='sm' />}</td>
              }
            </tr>

            <tr className='text-center'>
              {
                <td className='fw-bold' colSpan={9}>{!loading && members.length < 1 && 'No Member Available'}</td>
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

      <AddStaffToBranchModal 
      on={addStaffToBranchModal}
      off={()=>setAddStaffToBranchModal(false)}
      />
    </div>
  );
};

export default MarketerViewGroupPage;