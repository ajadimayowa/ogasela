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
import { Card } from 'react-bootstrap';
import { Formik } from 'formik';
import CustomInput from '../../../components/custom-input/CustormInput';
import ReusableInputs from '../../../components/custom-input/ReusableInputs';
import ReusableDropDownSelect from '../../../components/custom-input/ReusableDropDownSelect';
import api from '../../../app/api';
import { toast } from 'react-toastify';
import { ILga, IState } from '../../../interfaces/interface';
import ReusableDropDownStates from '../../../components/custom-input/ReusableDropDownStates';
import { off } from 'process';

const sampleData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 180 },
  { month: 'Apr', value: 250 },
];

const CreateStaffPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState<IState[]>([]);
  const [depts, setDepts] = useState<any[]>([]);
  const [deptRoles, setDeptRoles] = useState<any[]>([]);
  const [selectedDept, setSelectedDept] = useState<any>();
  const [lgas, setLgas] = useState<ILga[]>([]);

  const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
  const orgProfile = useSelector((state: RootState) => state.auth.organisationData);
  const modules = getAccessibleModules(
    // staff?.staffLevel || '',
    'marketer',
    // staff?.organization?.subscriptionType || 
    'pro'
  );

  const initialValues = {
    fullName: '',
    email: '',
    phoneNumber: '',
    homeAddress: '',
    state: '',
    lga: '',
    description: '',
    tempPass: '',

    verificationIdType: '',
    verificationIdNumber: '',

    organization: orgProfile?.id,
    department: '',
    role: '',

    createdByName: staffProfile?.fullName,
    createdById: staffProfile?.id,

    userClass: '',
    staffLevel: '',

    nokFullName: '',
    nokHomeAddress: '',
    nokState: '',
    nokLga: '',
    nokPhoneNumber: '',
    nokVerificationIdType: '',
    nokVerificationIdNumber: ''
  }

  const idOptions = [
    { value: 'bvn', label: 'Bvn' },
    { value: 'int_passport', label: 'Int Passport' },
    { value: 'driver_license', label: 'Driver License' }
  ];

  const staffLevelOptions = [
    { value: 'branch-manager', label: 'Manager' },
    { value: 'approver', label: 'Approver' },
    { value: 'marketer', label: 'Marketer' }
  ]

  const handleStaffCreation = async (v: any) => {
   console.log({seeStaffTobeCreated:v}) 
    setLoading(true);
    try {
      let payload = {
        ...v,
        state: v?.state?.value,
        lga: v?.lga?.value,
        verificationIdType: v?.verificationIdType?.value,
        verificationIdNumber: v?.verificationIdNumber?.value,
        department: v?.department.value,
        role: v?.role.value,
        userClass: v?.userClass.value,
        staffLevel: v?.staffLevel.value,
        nokState: v?.nokState.value,
        nokLga: v?.nokLga.value,
        nokVerificationIdType: v?.nokVerificationIdType.value,
      }
      const res = await api.post('/staff/create', payload
      );
      if (res.status == 201) {
        console.log({ dataSent: res?.data?.payload })
        const { payload } = res.data;
        console.log({ seePayloadFromOtp: payload })
        const staffProfile = payload?.staffData;
        // dispatch(setToken(payload?.token));
        // dispatch(setStaffProfile(staffProfile));
        toast.success('Staff Created!');
        navigate('/super-admin')
      }

    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to create staff');
    } finally {
      setLoading(false);
    }

  }

  const getAllStates = async () => {
    try {
      const res = await api.get('/states/get-states');
      if (res.status == 200) {
        console.log({ dataSent: res?.data?.payload })
        let options = res?.data?.payload.map((item: any) => ({
          value: item.state,
          label: item.state,
          lgas: item.localGovernmentAreas,
        }))
        setStates(options)
        const { payload } = res.data;
        console.log({ seePayloadFromOtp: payload })
        const staffProfile = payload?.staffData;
        // dispatch(setToken(payload?.token));
        // dispatch(setStaffProfile(staffProfile));
      }

    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  }

  const getDepartments = async () => {
    try {
      const res = await api.get(`/department/by-organization/${orgProfile?.id}`);
      if (res.status == 200) {
        // console.log({ dataSent: res?.data?.payload })
        setDepts(res?.data?.payload)
        const { payload } = res.data;
        console.log({ seePayloadFromOtp: payload })
        const staffProfile = payload?.staffData;
        // dispatch(setToken(payload?.token));
        // dispatch(setStaffProfile(staffProfile));
      }

    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  }

  const getDepartmentRoles = async () => {
    try {
      const res = await api.get(`/role/by-department/${selectedDept?.value}`);
      if (res.status == 200) {
        // console.log({ dataSent: res?.data?.payload })
        setDeptRoles(res?.data?.payload)
        const { payload } = res.data;
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
    getAllStates();
    getDepartments();
  }, [navigate])

  useEffect(() => {
    getDepartmentRoles()
  }, [selectedDept])
  return (
    <div className="dashboard-container">
      <DecoratedCard>
        <div className='d-flex flex-wrap justify-content-between w-100'>
          <div>
            <h4 className="">New Staff.</h4>
            <p>Onboard a new staff from here.</p>
          </div>
        </div>
      </DecoratedCard>

      <Card className='p-3 border-0 m-2'>
        <Formik
          onSubmit={(v) =>handleStaffCreation(v)}
          initialValues={initialValues}
        >
          {
            ({ handleSubmit, setFieldValue }) => (
              <form onSubmit={handleSubmit} className='d-flex gap-3 flex-wrap w-100'>
                <div className='d-flex flex-wrap gap-3'>
                  <div className='d-flex flex-column gap-3'>
                    <p className='fw-bold m-0 p-0'>Personal Information</p>
                    <ReusableInputs
                      inputType='text-input'
                      name='fullName'
                      id='fullName'
                      label='Full Name'
                      placeholder='i.e John Doe Smith'
                      className='w-100'
                    />
                    <ReusableInputs
                      inputType='text-input'
                      name='email'
                      id='email'
                      type='email'
                      label='Email'
                      placeholder='i.e john@e.com'
                      className='w-100'
                    />

                    <ReusableInputs
                      inputType='password'
                      name='tempPass'
                      id='tempPass'
                      label='Temp Password'
                      placeholder='Temp Password'
                      className='w-100'
                      icon2="bi bi-eye-slash"
                    />

                    <ReusableInputs
                      inputType='text-number'
                      name='phoneNumber'
                      id='phoneNumber'
                      label='Phone Number'
                      placeholder='i.e 8166064166'
                      className='w-100'
                    />

                    <ReusableInputs
                      inputType='text-area'
                      name='homeAddress'
                      id='homeAddress'
                      label='Home Address'
                      placeholder='Home Address'
                    />

                    <ReusableDropDownSelect
                      inputType='text-i'
                      name='state'
                      id='state'
                      label='State'
                      options={states}
                      passSelectedValue={(v) => {
                        let lgaOptions = v.lgas.map((item: any, index: number) => ({ value: item, label: item }))
                        setLgas(lgaOptions);
                        setFieldValue('lga', '')
                      }}
                    />
                    <ReusableDropDownSelect
                      inputType='text-i'
                      name='lga'
                      id='lga'
                      label='LGA'
                      options={lgas}
                    />
                  </div>

                  <div className='d-flex flex-column gap-3'>
                    <p className='fw-bold m-0 p-0'>{` .`}</p>

                    <ReusableDropDownSelect
                      inputType='text-i'
                      name='department'
                      id='department'
                      label='Department'
                      options={depts}
                      passSelectedValue={(v) => {
                        setSelectedDept(v);
                        setFieldValue('role', '')
                      }}
                    />

                    <ReusableDropDownSelect
                      inputType='text-i'
                      name='role'
                      id='role'
                      label='Role'
                      options={deptRoles}
                    />

                    <ReusableDropDownSelect
                      inputType='text-i'
                      name='userClass'
                      id='userClass'
                      label='Staff Type'
                      options={[{ value: 'initiator', label: 'Initiator' }, { value: 'authorizer', label: 'Authorizer' }]}
                    />

                    <ReusableDropDownSelect
                      inputType='text-i'
                      name='staffLevel'
                      id='staffLevel'
                      label='Staff Level'
                      options={staffLevelOptions}
                    />

                    <ReusableDropDownSelect
                      inputType='text-i'
                      name='verificationIdType'
                      id='verificationIdType'
                      label='Mode of ID'
                      options={idOptions}
                    />
                    {/* {
    department: '',
    role: '',

    : '',
    : '',

    
  } */}
                    <ReusableInputs
                      inputType='text-input'
                      name='verificationIdNumber'
                      id='verificationIdNumber'
                      label='ID Number'
                      placeholder='ID Number'
                      className='w-100'
                    />



                    <ReusableInputs
                      inputType='text-area'
                      name='description'
                      id='description'
                      label='Description'
                      placeholder='Description'
                    />
                  </div>
                </div>


                <div className='d-flex flex-wrap gap-3'>
                  <div className='d-flex h-100 border-1 rounded' style={{ backgroundColor: '#D9D9D9' }}><p className='p-0 m-0' style={{ color: '#D9D9D9' }}>|</p></div>
                  <div className='d-flex flex-column gap-3'>
                    <p className='fw-bold m-0 p-0'>Next of kin information</p>
                    <ReusableInputs
                      inputType='text-input'
                      name='nokFullName'
                      id='nokData.fullName'
                      label='Full Name'
                      placeholder='i.e John Doe Smith'
                      className='w-100'
                    />
                    <ReusableInputs
                      inputType='text-input'
                      name='nokPhoneNumber'
                      id='nokPhoneNumber'
                      label='Phone Number'
                      placeholder='Phone Number'
                      className='w-100'
                    />
                    <ReusableInputs
                      inputType='text-area'
                      name='nokHomeAddress'
                      id='nokData.homeAddress'
                      label='Home Address'
                      placeholder='Home Address'
                    />

                    <ReusableDropDownSelect
                      inputType='text-i'
                      name='nokState'
                      id='nokState'
                      label='State'
                      options={states}
                      passSelectedValue={(v) => {
                        let lgaOptions = v.lgas.map((item: any, index: number) => ({ value: item, label: item }))
                        setLgas(lgaOptions);
                        setFieldValue('lga', '')
                      }}
                    />
                    <ReusableDropDownSelect
                      inputType='text-i'
                      name='nokLga'
                      id='nokLga'
                      label='LGA'
                      options={lgas}
                    />



                    <ReusableDropDownSelect
                      inputType='text-i'
                      name='nokVerificationIdType'
                      id='nokVerificationIdType'
                      label='Mode of ID'
                      options={idOptions}
                    />
                    <ReusableInputs
                      inputType='text-input'
                      name='nokVerificationIdNumber'
                      id='nokVerificationIdNumber'
                      label='ID Number'
                      placeholder='ID Number'
                      className='w-100'
                    />


                    <div className='d-flex gap-3'>

                      <CustomButton
                        type='submit'
                        loading={loading}
                        title='Submit for approval'
                      />
                      <CustomButton
                        title='Cancel'
                      />
                    </div>
                  </div>
                </div>



              </form>
            )
          }


        </Formik>

      </Card>




    </div>
  );
};

export default CreateStaffPage