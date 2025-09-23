import React, { useEffect, useState } from "react";
import api from "../../app/api";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { IGroup } from "../../interfaces/group";
import { getAccessibleModules } from "../../utils/navUtils";
import moment from "moment";
import { Badge, Spinner } from "react-bootstrap";


const LateLoansTab = ()=>{
    const navigate = useNavigate();
  const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
  const orgProfile = useSelector((state: RootState) => state.auth.organisationData);
  const [loans, setLoans] = useState<IGroup[]>([]);
  const modules = getAccessibleModules(
    // staff?.staffLevel || '',
    'marketer',
    // staff?.organization?.subscriptionType || 
    'pro'
  );

  const [departmentModal, setDepartmentModal] = useState(false);
  const [loading, setLoading] = useState(false)
  const [roleModal, setRoleModal] = useState(false);

  const getLoans = async () => {
    setLoading(true)
    try {
      const res = await api.get(`groups?branchId=${staffProfile?.branch._id}`);
      setLoans(res?.data?.payload);
      setLoading(false)
      if (res.status == 200) {

        console.log({ hereIsDepts: res?.data?.payload })
        let options = res?.data?.payload.map((item: any) => ({
          value: item?.id,
          label: item?.fullName,
        }))

        // const { payload } = res.data;
        // console.log({ seePayloadFromOtp: payload })
        // const staffProfile = payload?.staffData;
        // dispatch(setToken(payload?.token));
        // dispatch(setStaffProfile(staffProfile));
      }

    } catch (err: any) {
      // toast.error(err?.response?.data?.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getLoans()
  }, [navigate])
    return (
        <div className="w-100">
            <div>
        <table className="table table-striped mt-3">
          <thead>
            <tr >
              <th scope="col" className='bg-primary text-light'>S/N</th>
              <th scope="col" className='bg-primary text-light'>Group Name</th>
              <th scope="col" className='bg-primary text-light'>Requested Amount</th>
              <th scope="col" className='bg-primary text-light'>Date Created</th>
              <th scope="col" className='bg-primary text-light'>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              !loading &&
              loans.map((staff: IGroup, index) => (
                <tr className='p-2' role='button' onClick={() => navigate(`/super-admin/view-group/${staff?._id}`)}>
                  <th scope="row">{index + 1}</th>
                  <td>{staff?.groupName}</td>
                  <td>{staff?.totalAmountBorrowed}</td>
                  <td>{moment(staff?.createdAt).format('DD-MM-YYYY')}</td>
                  {/* <td><Badge className='bg-warning'>{staff?.isApproved?'Approved':'Pending'}</Badge></td> */}
                  <td><Badge className='bg-warning'>{'Pending'}</Badge></td>
                </tr>))
            }
            <tr className='text-center'>
              {
                <td colSpan={8}>{loading && <Spinner size='sm' />}</td>
              }
            </tr>

            <tr className='text-center'>
              {
                <td className='fw-bold' colSpan={8}>{!loading && loans.length < 1 && 'No Data Available'}</td>
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
        </div>
    )
} 
export default LateLoansTab;