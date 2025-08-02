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
import { ILga, IState } from '../../../interfaces/interface';
import { toast } from 'react-toastify';
import api from '../../../app/api';

const sampleData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 180 },
  { month: 'Apr', value: 250 },
];

const SuperAdminCreateBranch = () => {
  const navigate = useNavigate();
  const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
  const orgProfile = useSelector((state: RootState) => state.auth.organisationData);

  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState<IState[]>([]);
  const [depts, setDepts] = useState<any[]>([]);
  const [managers, setManagers] = useState([]);
  const [deptRoles, setDeptRoles] = useState<any[]>([]);
  const [selectedDept, setSelectedDept] = useState<any>();
  const [lgas, setLgas] = useState<ILga[]>([]);
  const modules = getAccessibleModules(
    // staff?.staffLevel || '',
    'marketer',
    // staff?.organization?.subscriptionType || 
    'pro'
  );

  const initialValues = {
    nameOfBranch: '',
    branchManager: '',
    branchAddress: '',
    state: '',
    lga: '',
    createdByName: staffProfile?.fullName,
    createdById: staffProfile?.id,
    selectedApprover: '',
    organization: orgProfile?.id,
    nameOfOrg:orgProfile?.nameOfOrg,
    orgEmail:orgProfile?.orgEmail
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

  const getAuthorizers = async () => {
    try {
      const res = await api.get(`/staff/staffs?organisationId=${orgProfile?.id}&mode=dropdown&staffLevel=branch-manager&userClass=authorizer`);
      if (res.status == 200) {
        let auths = res?.data?.payload.map((auth: any) => ({
          value: auth?.id,
          label: auth?.fullName
        }))
        // console.log({ dataSent: res?.data?.payload })
        setManagers(auths)
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

  const handleBranchCreation = async (v: any) => {
    console.log({ seeDeptDet: v })
    setLoading(true);
    try {
      let payload = {
        ...v,
        state: v?.state?.value,
        branchManager:{id:v?.branchManager?.value,fullName:v?.branchManager?.label},
        lga: v?.lga?.value,
        selectedApprover:v?.selectedApprover?.value
      }
      const res = await api.post('/branch/create', payload
      );
      if (res.status == 201) {
        // dispatch(setToken(payload?.token));
        // dispatch(setStaffProfile(staffProfile));
        toast.success('New Branch Created!');
        navigate(-1);
      }

    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to create Branch');
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    getAllStates();
    getAuthorizers()
  }, [navigate])

  return (
    <div className="dashboard-container">
      <DecoratedCard>
        <div className='d-flex flex-wrap justify-content-between w-100'>
          <div>
            <h4 className="">Create New Branch</h4>
            <p>Create a new organisation branch from here.</p>
          </div>
        </div>
      </DecoratedCard>

      <Card className='p-3 border-0 m-2'>
        <Formik
          onSubmit={(v) => handleBranchCreation(v)}
          initialValues={initialValues}
        >
          {
            ({ handleSubmit, setFieldValue }) => (
              <form onSubmit={handleSubmit} className='d-flex gap-5 w-100 flex-wrap'>
                <div className='d-flex flex-column gap-4'>
                  <ReusableInputs
                    inputType='text-input'
                    name='nameOfBranch'
                    id='nameOfBranch'
                    label='Name of branch'
                    placeholder='Branch Name'
                    className='w-100'
                  />

                  <ReusableDropDownSelect
                    inputType='text-i'
                    name='branchManager'
                    id='branchManager'
                    label='Select Manager'
                    options={managers}
                  />

                  <ReusableInputs
                    inputType='text-area'
                    name='branchAddress'
                    id='branchAddress'
                    label='Branch Address'
                    placeholder='Branch Address'
                  />
                </div>

                <div className='d-flex flex-column gap-4'>


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

                  <ReusableInputs
                    inputType='text-area'
                    name='description'
                    id='description'
                    label='Description'
                    placeholder='Brief description'
                  />


                  <div>
                    <CustomButton
                    loading={loading}
                      type='submit'
                      title='Submit for approval'
                    />
                  </div>
                </div>
                <div>

                </div>

              </form>
            )
          }


        </Formik>

      </Card>




    </div>
  );
};

export default SuperAdminCreateBranch