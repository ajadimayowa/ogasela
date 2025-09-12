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
import RegistrationFormModal from '../../../../components/modals/marketer-modals/MemberFormModal';
import MemberFormModal from '../../../../components/modals/marketer-modals/MemberFormModal';
import { IMember } from '../../../../interfaces/member';
import { convertToThousand } from '../../../../utils/helpers';
import { Badge, Button, Card, Spinner } from 'react-bootstrap';
import MemberProfileModal from '../../../../components/modals/member-modals/MemberProfileModal';
import {Image} from 'react-bootstrap';
import NewLoanModal from '../../../../components/modals/member-modals/NewLoanModal';

const sampleData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 180 },
  { month: 'Apr', value: 250 },
];

const MarketerViewCustomerPage = () => {
  const navigate = useNavigate();
  const userProfile = useSelector((state: RootState) => state.auth.staffProfile);
  const [memberProfile, setMemberProfile] = useState<IMember>()
  const orgProfile = useSelector((state: RootState) => state.auth.organisationData);
  const [staffs, setStaffs] = useState<IStaff[]>([]);
  const [addStaffToBranchModal, setAddStaffToBranchModal] = useState(false)
  const [completeRegModal, setCompleteRegModal] = useState(false);
  const[newLoanModal,setNewLoanModal] = useState(false)
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
      {
        loading ? <div className='w-100 text-center'><Spinner /></div> :
          <>
            <DecoratedCard>
              <div className='d-flex flex-wrap justify-content-between w-100'>
                <div>
                  <h4 className="">{`${memberProfile?.fullName} Profile page`}</h4>
                  <p>Track customer loan activities.</p>
                </div>

               <div className='rounded bg-light'>
                 {
                  memberProfile?.kyc?.passportPhoto&&
                  <Image
                 className='rounded'
                height={100}
                src={memberProfile?.kyc?.passportPhoto}
                />}
               </div>
              </div>
            </DecoratedCard>
            <div>
              <div className='w-100 d-flex  justify-content-between mt-2'>
                <div className='d-flex gap-2'>
                  <CustomIconButton onClick={()=>setNewLoanModal(true)} variant='outline' icon='bi bi-credit-card' className='border border-primary text-primary d-flex gap-2 align-items-center p-3' title='New Loan' />

                </div>

                <div className='d-flex gap-2'>
                  <CustomIconButton variant='outline' icon='bi bi-bell' className='border d-flex gap-2 align-items-center' title='Notify Customer' />

                  {/* <CustomButton onClick={()=>setCompleteRegModal(true)}  title='Complete Application'/> */}
                  <CustomIconButton icon='bi bi-person-bounding-box' onClick={() => setAddStaffToBranchModal(true)} className='border d-flex gap-2 align-items-center' title='Biometrics' />

                </div>

              </div>

              <hr />
              <Card className='shadow border-0'>
                <Card.Header className='d-flex justify-content-between bg-primary text-light'>
                  <h5 className=''>Loan Record</h5>
                  {/* <div className='d-flex gap-1' role='button'>
              <i className="bi bi-person-gear"></i>
              <a className='text-light' href=''>Update Info</a>
            </div> */}
                </Card.Header>

                <Card.Body>
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td className=''><span className='fw-bold'></span> {moment().format('DD-MM-YY')}</td>
                        <td className=''><span className='fw-bold'></span> {convertToThousand(50000)}</td>
                        <td className=''><span className='fw-bold'></span> <Badge className='bg-danger'>{`Late`}</Badge> </td>
                      </tr>

                      <tr>
                        <td>2</td>
                        <td className=''><span className='fw-bold'></span> {moment().format('DD-MM-YY')}</td>
                        <td className=''><span className='fw-bold'></span> {convertToThousand(3000)}</td>
                        <td className=''><span className='fw-bold'></span> <Badge className='bg-warning'>{`Pending`}</Badge> </td>
                      </tr>

                      <tr>
                        <td>3</td>
                        <td className=''><span className='fw-bold'></span> {moment().format('DD-MM-YY')}</td>
                        <td className=''><span className='fw-bold'></span> {convertToThousand(10000)}</td>
                        <td className=''><span className='fw-bold'></span> <Badge className='bg-success'>{`Settled`}</Badge> </td>
                      </tr>

                    </tbody>
                  </table>

                </Card.Body>
                <Card.Footer className='d-flex justify-content-end'>
                  <Button variant='outline border border-2'>View More</Button>
                </Card.Footer>

              </Card>


              <hr />
              <Card className='shadow border-0'>
                <Card.Header className='d-flex justify-content-between bg-primary text-light'>
                  <h5 className=''>Customer Details</h5>
                  <CustomIconButton onClick={()=>setCompleteRegModal(true)} icon='bi bi-person-gear' className='border d-flex gap-2 align-items-center' title='Update profile' />

                </Card.Header>

                <Card.Body>
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <td className=''><span className='fw-bold'>Full Name: </span> {memberProfile?.fullName}</td>
                        <td className=''><span className='fw-bold'>BVN: </span> {memberProfile?.bvn}</td>
                        <td className=''><span className='fw-bold'>Phone Number : </span> {`0${memberProfile?.phoneNumber}`}</td>

                      </tr>
                      <tr>

                        <td className=''><span className='fw-bold'>Email : </span> {memberProfile?.email}</td>
                        <td className=''><span className='fw-bold'>Created At : </span> {moment(memberProfile?.createdAt).format('DD-MM-YY')}</td>
                        <td className=''><span className='fw-bold'>Approved At : </span> {memberProfile?.isApproved ? moment(memberProfile?.createdAt).format('DD-MM-YY') : '-'}</td>

                      </tr>
                      <tr><td className=''></td><td></td><td></td></tr>

                      <tr>
                        <td className=''><span className='fw-bold'>Created By : </span> {memberProfile?.createdBy?.fullName}</td>
                        <td className=''><span className='fw-bold'>Approved By : </span> {memberProfile?.isApproved ? moment(memberProfile?.createdAt).format('DD-MM-YY') : '-'}</td>
                        <td className=''><span className='fw-bold'>DOB : </span> {memberProfile?.dob ? moment(memberProfile?.dob).format('DD-MM-YY') : '-'}</td>
                      </tr>

                      <tr>
                        <td className=''><span className='fw-bold'>Home Address : </span> {memberProfile?.homeAddress??'-'}</td>
                        <td className=''><span className='fw-bold'>Duration of Stay : </span> {memberProfile?.durationOfStay??'-'}</td>
                        <td className=''><span className='fw-bold'>Nearest Bus Stop : </span> {memberProfile?.nearestBusStop}</td>

                      </tr>
                      <tr><td className=''></td><td></td><td></td></tr>

                      <tr>
                        <td className=''><span className='fw-bold'>Ocupation/Nature of Work : </span> {memberProfile?.occupation??'-'}</td>
                        <td className=''><span className='fw-bold'>Office Address : </span> {memberProfile?.officeAddress??'-'}</td>
                        <td className=''><span className='fw-bold'>Status : </span> <Badge className={`bg-${memberProfile?.isApproved?'success':'warning'}`}>{memberProfile?.isApproved?'Approve':'Pending'}</Badge> </td>

                      </tr>
                    </tbody>
                  </table>
                  <Card.Footer className='d-flex gap-2'>
                    <div className='text-center'>
                      <p className='p-0 m-0'>Utility Bill</p>
                      {
                        memberProfile?.kyc?.utilityBillPhoto &&
                        <Image height={50} src={memberProfile?.kyc?.utilityBillPhoto}/>}
                    </div>
                    <div className='text-center'>
                      <p className='p-0 m-0'>| ID Card</p>
                      {memberProfile?.kyc?.idCardPhoto &&
                        <Image height={50} src={memberProfile?.kyc?.idCardPhoto}/>}
                    </div>
                    <div className='text-center'>
                      <p className='p-0 m-0'>| Document</p>
                      {memberProfile?.kyc?.attestationDocumentFile &&
                        <a target='blank' href={memberProfile?.kyc?.attestationDocumentFile} className='text-danger'><i className="bi bi-file-pdf-fill fs-3"></i></a>}
                      
                    </div>
                  </Card.Footer>
                </Card.Body>


              </Card>

              <hr />
              <Card className='shadow border-0'>
                <Card.Header className='d-flex justify-content-between bg-primary text-light'>
                  <h5 className=''>Next Of Kin</h5>
                  <CustomIconButton icon='bi bi-person-gear' className='border d-flex gap-2 align-items-center' title='Update' />

                </Card.Header>

                <Card.Body>
                   <table className="table table-striped">
                    <tbody>
                      <tr>
                        <td className=''><span className='fw-bold'>Full Name: </span> {memberProfile?.nok?.fullName}</td>
                        <td className=''><span className='fw-bold'>BVN: </span> {'-'}</td>
                        <td className=''><span className='fw-bold'>Phone Number : </span> {`-`}</td>

                      </tr>
                      <tr>

                        <td className=''><span className='fw-bold'>Email : </span> {memberProfile?.email}</td>
                        <td className=''><span className='fw-bold'>Created At : </span> {moment(memberProfile?.createdAt).format('DD-MM-YY')}</td>
                        <td className=''><span className='fw-bold'>Approved At : </span> {memberProfile?.isApproved ? moment(memberProfile?.createdAt).format('DD-MM-YY') : '-'}</td>

                      </tr>
                      <tr><td className=''></td><td></td><td></td></tr>

                      <tr>
                        <td className=''><span className='fw-bold'>Created By : </span> {memberProfile?.createdBy?.fullName}</td>
                        <td className=''><span className='fw-bold'>Approved By : </span> {memberProfile?.isApproved ? moment(memberProfile?.createdAt).format('DD-MM-YY') : '-'}</td>
                        <td className=''><span className='fw-bold'>DOB : </span> {memberProfile?.dob ? moment(memberProfile?.dob).format('DD-MM-YY') : '-'}</td>
                      </tr>

                      <tr>
                        <td className=''><span className='fw-bold'>Home Address : </span> {memberProfile?.homeAddress??'-'}</td>
                        <td className=''><span className='fw-bold'>Duration of Stay : </span> {memberProfile?.durationOfStay??'-'}</td>
                        <td className=''><span className='fw-bold'>Nearest Bus Stop : </span> {memberProfile?.nearestBusStop}</td>

                      </tr>
                      <tr><td className=''></td><td></td><td></td></tr>

                      <tr>
                        <td className=''><span className='fw-bold'>Ocupation/Nature of Work : </span> {memberProfile?.occupation??'-'}</td>
                        <td className=''><span className='fw-bold'>Office Address : </span> {memberProfile?.officeAddress??'-'}</td>
                        <td className=''><span className='fw-bold'>Status : </span> <Badge className={`bg-${memberProfile?.isApproved?'success':'warning'}`}>{memberProfile?.isApproved?'Approve':'Pending'}</Badge> </td>

                      </tr>
                    </tbody>
                  </table>
                  <Card.Footer className='d-flex gap-2'>
                    <div className='text-center'>
                      <p className='p-0 m-0'>Passport</p>
                      {
                        memberProfile?.kyc?.utilityBillPhoto &&
                        <Image height={50} src={memberProfile?.kyc?.utilityBillPhoto}/>}
                    </div>
                    <div className='text-center'>
                      <p className='p-0 m-0'>| ID Card</p>
                      {memberProfile?.kyc?.idCardPhoto &&
                        <Image height={50} src={memberProfile?.kyc?.idCardPhoto}/>}
                    </div>
                    <div className='text-center'>
                      <p className='p-0 m-0'>| Document</p>
                      {memberProfile?.kyc?.attestationDocumentFile &&
                        <a target='blank' href={memberProfile?.kyc?.attestationDocumentFile} className='text-danger'><i className="bi bi-file-pdf-fill fs-3"></i></a>}
                      
                    </div>
                  </Card.Footer>
                </Card.Body>

              </Card>

              <hr />
              <Card className='shadow border-0'>
                <Card.Header className='d-flex justify-content-between bg-primary text-light'>
                  <h5 className=''>Guarantor 1</h5>
                  <CustomIconButton icon='bi bi-person-gear' className='border d-flex gap-2 align-items-center' title='Update' />

                </Card.Header>

                <Card.Body>
                   <table className="table table-striped">
                    <tbody>
                      <tr>
                        <td className=''><span className='fw-bold'>Full Name: </span> {memberProfile?.fullName}</td>
                        <td className=''><span className='fw-bold'>BVN: </span> {memberProfile?.bvn}</td>
                        <td className=''><span className='fw-bold'>Phone Number : </span> {`0${memberProfile?.phoneNumber}`}</td>

                      </tr>
                      <tr>

                        <td className=''><span className='fw-bold'>Email : </span> {memberProfile?.email}</td>
                        <td className=''><span className='fw-bold'>Created At : </span> {moment(memberProfile?.createdAt).format('DD-MM-YY')}</td>
                        <td className=''><span className='fw-bold'>Approved At : </span> {memberProfile?.isApproved ? moment(memberProfile?.createdAt).format('DD-MM-YY') : '-'}</td>

                      </tr>
                      <tr><td className=''></td><td></td><td></td></tr>

                      <tr>
                        <td className=''><span className='fw-bold'>Created By : </span> {memberProfile?.createdBy?.fullName}</td>
                        <td className=''><span className='fw-bold'>Approved By : </span> {memberProfile?.isApproved ? moment(memberProfile?.createdAt).format('DD-MM-YY') : '-'}</td>
                        <td className=''><span className='fw-bold'>DOB : </span> {memberProfile?.dob ? moment(memberProfile?.dob).format('DD-MM-YY') : '-'}</td>
                      </tr>

                      <tr>
                        <td className=''><span className='fw-bold'>Home Address : </span> {memberProfile?.homeAddress??'-'}</td>
                        <td className=''><span className='fw-bold'>Duration of Stay : </span> {memberProfile?.durationOfStay??'-'}</td>
                        <td className=''><span className='fw-bold'>Nearest Bus Stop : </span> {memberProfile?.nearestBusStop}</td>

                      </tr>
                      <tr><td className=''></td><td></td><td></td></tr>

                      <tr>
                        <td className=''><span className='fw-bold'>Ocupation/Nature of Work : </span> {memberProfile?.occupation??'-'}</td>
                        <td className=''><span className='fw-bold'>Office Address : </span> {memberProfile?.officeAddress??'-'}</td>
                        <td className=''><span className='fw-bold'>Status : </span> <Badge className={`bg-${memberProfile?.isApproved?'success':'warning'}`}>{memberProfile?.isApproved?'Approve':'Pending'}</Badge> </td>

                      </tr>
                    </tbody>
                  </table>
                  <Card.Footer className='d-flex gap-2'>
                    <div className='text-center'>
                      <p className='p-0 m-0'>Passport</p>
                      {
                        memberProfile?.kyc?.utilityBillPhoto &&
                        <Image height={50} src={memberProfile?.kyc?.utilityBillPhoto}/>}
                    </div>
                    <div className='text-center'>
                      <p className='p-0 m-0'>| ID Card</p>
                      {memberProfile?.kyc?.idCardPhoto &&
                        <Image height={50} src={memberProfile?.kyc?.idCardPhoto}/>}
                    </div>
                    <div className='text-center'>
                      <p className='p-0 m-0'>| Document</p>
                      {memberProfile?.kyc?.attestationDocumentFile &&
                        <a target='blank' href={memberProfile?.kyc?.attestationDocumentFile} className='text-danger'><i className="bi bi-file-pdf-fill fs-3"></i></a>}
                      
                    </div>
                  </Card.Footer>
                </Card.Body>

              </Card>

              <hr />
              <Card className='shadow border-0'>
                <Card.Header className='d-flex justify-content-between bg-primary text-light'>
                  <h5 className=''>Guarantor 2</h5>
                  <CustomIconButton icon='bi bi-person-gear' className='border d-flex gap-2 align-items-center' title='Update' />

                </Card.Header>
                <Card.Body>
                   <table className="table table-striped">
                    <tbody>
                      <tr>
                        <td className=''><span className='fw-bold'>Full Name: </span> {memberProfile?.fullName}</td>
                        <td className=''><span className='fw-bold'>BVN: </span> {memberProfile?.bvn}</td>
                        <td className=''><span className='fw-bold'>Phone Number : </span> {`0${memberProfile?.phoneNumber}`}</td>

                      </tr>
                      <tr>

                        <td className=''><span className='fw-bold'>Email : </span> {memberProfile?.email}</td>
                        <td className=''><span className='fw-bold'>Created At : </span> {moment(memberProfile?.createdAt).format('DD-MM-YY')}</td>
                        <td className=''><span className='fw-bold'>Approved At : </span> {memberProfile?.isApproved ? moment(memberProfile?.createdAt).format('DD-MM-YY') : '-'}</td>

                      </tr>
                      <tr><td className=''></td><td></td><td></td></tr>

                      <tr>
                        <td className=''><span className='fw-bold'>Created By : </span> {memberProfile?.createdBy?.fullName}</td>
                        <td className=''><span className='fw-bold'>Approved By : </span> {memberProfile?.isApproved ? moment(memberProfile?.createdAt).format('DD-MM-YY') : '-'}</td>
                        <td className=''><span className='fw-bold'>DOB : </span> {memberProfile?.dob ? moment(memberProfile?.dob).format('DD-MM-YY') : '-'}</td>
                      </tr>

                      <tr>
                        <td className=''><span className='fw-bold'>Home Address : </span> {memberProfile?.homeAddress??'-'}</td>
                        <td className=''><span className='fw-bold'>Duration of Stay : </span> {memberProfile?.durationOfStay??'-'}</td>
                        <td className=''><span className='fw-bold'>Nearest Bus Stop : </span> {memberProfile?.nearestBusStop}</td>

                      </tr>
                      <tr><td className=''></td><td></td><td></td></tr>

                      <tr>
                        <td className=''><span className='fw-bold'>Ocupation/Nature of Work : </span> {memberProfile?.occupation??'-'}</td>
                        <td className=''><span className='fw-bold'>Office Address : </span> {memberProfile?.officeAddress??'-'}</td>
                        <td className=''><span className='fw-bold'>Status : </span> <Badge className={`bg-${memberProfile?.isApproved?'success':'warning'}`}>{memberProfile?.isApproved?'Approve':'Pending'}</Badge> </td>

                      </tr>
                    </tbody>
                  </table>
                  <Card.Footer className='d-flex gap-2'>
                    <div className='text-center'>
                      <p className='p-0 m-0'>Passport</p>
                      {
                        memberProfile?.kyc?.utilityBillPhoto &&
                        <Image height={50} src={memberProfile?.kyc?.utilityBillPhoto}/>}
                    </div>
                    <div className='text-center'>
                      <p className='p-0 m-0'>| ID Card</p>
                      {memberProfile?.kyc?.idCardPhoto &&
                        <Image height={50} src={memberProfile?.kyc?.idCardPhoto}/>}
                    </div>
                    <div className='text-center'>
                      <p className='p-0 m-0'>| Document</p>
                      {memberProfile?.kyc?.attestationDocumentFile &&
                        <a target='blank' href={memberProfile?.kyc?.attestationDocumentFile} className='text-danger'><i className="bi bi-file-pdf-fill fs-3"></i></a>}
                      
                    </div>
                  </Card.Footer>
                </Card.Body>

              </Card>

              <hr />
              <Card className='shadow border-0'>
                <Card.Header className='d-flex justify-content-between bg-primary text-light'>
                  <h5 className=''>Referre Record</h5>
                  <CustomIconButton icon='bi bi-person-gear' className='border d-flex gap-2 align-items-center' title='Update' />

                </Card.Header>
                <Card.Body>
                   <table className="table table-striped">
                    <tbody>
                      <tr>
                        <td className=''><span className='fw-bold'>Full Name: </span> {memberProfile?.fullName}</td>
                        <td className=''><span className='fw-bold'>BVN: </span> {memberProfile?.bvn}</td>
                        <td className=''><span className='fw-bold'>Phone Number : </span> {`0${memberProfile?.phoneNumber}`}</td>

                      </tr>
                      <tr>

                        <td className=''><span className='fw-bold'>Email : </span> {memberProfile?.email}</td>
                        <td className=''><span className='fw-bold'>Created At : </span> {moment(memberProfile?.createdAt).format('DD-MM-YY')}</td>
                        <td className=''><span className='fw-bold'>Approved At : </span> {memberProfile?.isApproved ? moment(memberProfile?.createdAt).format('DD-MM-YY') : '-'}</td>

                      </tr>
                      <tr><td className=''></td><td></td><td></td></tr>

                      <tr>
                        <td className=''><span className='fw-bold'>Created By : </span> {memberProfile?.createdBy?.fullName}</td>
                        <td className=''><span className='fw-bold'>Approved By : </span> {memberProfile?.isApproved ? moment(memberProfile?.createdAt).format('DD-MM-YY') : '-'}</td>
                        <td className=''><span className='fw-bold'>DOB : </span> {memberProfile?.dob ? moment(memberProfile?.dob).format('DD-MM-YY') : '-'}</td>
                      </tr>

                      <tr>
                        <td className=''><span className='fw-bold'>Home Address : </span> {memberProfile?.homeAddress??'-'}</td>
                        <td className=''><span className='fw-bold'>Duration of Stay : </span> {memberProfile?.durationOfStay??'-'}</td>
                        <td className=''><span className='fw-bold'>Nearest Bus Stop : </span> {memberProfile?.nearestBusStop}</td>

                      </tr>
                      <tr><td className=''></td><td></td><td></td></tr>

                      <tr>
                        <td className=''><span className='fw-bold'>Ocupation/Nature of Work : </span> {memberProfile?.occupation??'-'}</td>
                        <td className=''><span className='fw-bold'>Office Address : </span> {memberProfile?.officeAddress??'-'}</td>
                        <td className=''><span className='fw-bold'>Status : </span> <Badge className={`bg-${memberProfile?.isApproved?'success':'warning'}`}>{memberProfile?.isApproved?'Approve':'Pending'}</Badge> </td>

                      </tr>
                    </tbody>
                  </table>
                  <Card.Footer className='d-flex gap-2'>
                    <div className='text-center'>
                      <p className='p-0 m-0'>Passport</p>
                      {
                        memberProfile?.kyc?.utilityBillPhoto &&
                        <Image height={50} src={memberProfile?.kyc?.utilityBillPhoto}/>}
                    </div>
                    <div className='text-center'>
                      <p className='p-0 m-0'>| ID Card</p>
                      {memberProfile?.kyc?.idCardPhoto &&
                        <Image height={50} src={memberProfile?.kyc?.idCardPhoto}/>}
                    </div>
                    <div className='text-center'>
                      <p className='p-0 m-0'>| Document</p>
                      {memberProfile?.kyc?.attestationDocumentFile &&
                        <a target='blank' href={memberProfile?.kyc?.attestationDocumentFile} className='text-danger'><i className="bi bi-file-pdf-fill fs-3"></i></a>}
                      
                    </div>
                  </Card.Footer>
                </Card.Body>

              </Card>



              <div>
                {/* <nav aria-label="Page navigation example">
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
</nav> */}
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

            {completeRegModal &&
              <MemberProfileModal
                memberInfo={memberProfile}
                on={completeRegModal}
                off={() => setCompleteRegModal(false)}
              />}

               {newLoanModal &&
              <NewLoanModal
                memberInfo={newLoanModal}
                on={newLoanModal}
                off={() => setNewLoanModal(false)}
              />}
          </>
      }
    </div>
  );
};

export default MarketerViewCustomerPage;