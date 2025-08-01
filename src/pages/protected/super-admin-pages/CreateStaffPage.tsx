// src/pages/Dashboard.tsx
import React from 'react';
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

const sampleData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 180 },
  { month: 'Apr', value: 250 },
];

const CreateStaffPage = () => {
  const navigate = useNavigate();
  const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
  const modules = getAccessibleModules(
    // staff?.staffLevel || '',
    'marketer',
    // staff?.organization?.subscriptionType || 
    'pro'
  );

  const initialValues = {
    nameOfBranch: '',
    branchManager: '',
    branchAddress: ''
  }

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  return (
    <div className="dashboard-container">
      <DecoratedCard>
        <div className='d-flex flex-wrap justify-content-between w-100'>
          <div>
            <h4 className="">Profile Staff</h4>
            <p>Onboard a new staff from here.</p>
          </div>
        </div>
      </DecoratedCard>

      <Card className='p-3 border-0 m-2'>
        <Formik
          onSubmit={(v) => console.log(v)}
          initialValues={initialValues}
        >
          {
            ({handleSubmit})=>(
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
                options={options}
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
                name='branchManager'
                id='branchManager'
                label='Select State'
                options={options}
              />

              <ReusableDropDownSelect
                inputType='text-i'
                name='branchManager'
                id='branchManager'
                label='Select LGA'
                options={options}
              />


              <div>
                <CustomButton
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

export default CreateStaffPage