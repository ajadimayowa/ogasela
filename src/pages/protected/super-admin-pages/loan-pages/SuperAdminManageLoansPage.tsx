// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { getAccessibleModules } from '../../../../utils/navUtils';
import { useNavigate } from 'react-router-dom';
import './superAdminCreateBranch.scss';
import DecoratedCard from '../../../../components/cards/decoratedCard';
import { Badge, Card, Spinner, Tab, Tabs } from 'react-bootstrap';
import api from '../../../../app/api';
import { toast } from 'react-toastify';
import moment from 'moment';
import { IGroup } from '../../../../interfaces/group';
import ActiveLoansTab from '../../../../components/tabs/active-loans';
import PendingLoansTab from '../../../../components/tabs/pending-loans';
import LateLoansTab from '../../../../components/tabs/late-loans';

const sampleData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 180 },
  { month: 'Apr', value: 250 },
];

const SuperAdminManageLoansPage = () => {
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
      setLoans(res?.data?.data);
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
    <div className="dashboard-container">
      <DecoratedCard>
        <div className='d-flex flex-wrap justify-content-between w-100'>
          <div>
            <h4 className="">Manage Loans.</h4>
            <p>Manage All Loans.</p>
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
                       <ActiveLoansTab/>
                    </Tab>

                    <Tab eventKey="pending" title="Pending">
                        <PendingLoansTab/>
                    </Tab>

                    <Tab eventKey="not-attested" title="Late">
                        <LateLoansTab/>
                    </Tab>
                    

                </Tabs>

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

export default SuperAdminManageLoansPage;