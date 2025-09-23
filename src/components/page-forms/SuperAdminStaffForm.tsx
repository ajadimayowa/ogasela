
import React, { useEffect } from "react";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Image } from 'react-bootstrap';
import '../../styles/sliding-forms.scss';
// import compnayLogo from '../assets/images/fsh-logo.png'; // Adjust the path as necessary
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import api from "../../app/api";
import { toast } from 'react-toastify';
import ReusableInputs from "../custom-input/ReusableInputs";
import CustomButtonOwner from "../custom-button/custom-button-owner";
import ReusableDropDownStates from "../custom-input/ReusableDropDownStates";
import { ILga, IState } from "../../interfaces/interface";
import ReusableDropDownSelect from "../custom-input/ReusableDropDownSelect";
import { RootState } from "../../store/store";
export interface ILogin {
    fullName: string;
    organization: {
        value: string;
        label: string;
    } | null;
    department: {
        value: string;
        label: string;
    } | null;
    role: {
        value: string;
        label: string;
    } | null;
    email: string;
    phoneNumber: string;
    password: string,
    confirmPassword: string;
    homeAddress: string,
    lga: {
        value: string;
        label: string;
    } | null;
    state: {
        value: string;
        label: string;
    } | null;
    createdBy: string
    createdByModel: string;
    userClass: {
        value: string;
        label: string;
    } | null;
    staffLevel: {
        value: string;
        label: string;
    } | null;
    description: string;
    verificationType: {
        value: string;
        label: string;
    } | null;
    verificationIdNumber: string;

}



const SuperAdminStaffForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [orgs, setOrgs] = useState<any[]>([]);
    const [states, setStates] = useState<IState[]>([]);
    const [lgas, setLgas] = useState<ILga[]>([]);
    const [depts, setDepts] = useState<any[]>([]);
    const [deptRoles, setDeptRoles] = useState<any[]>([]);
    const [selectedDept, setSelectedDept] = useState<any>();
    const [selectedOrg, setSelectedOrg] = useState<any>();
    const rootAdminProfile = useSelector((state: RootState) => state.auth.rootAdminProfile);

    const idOptions = [
        { value: 'bvn', label: 'Bvn' },
        { value: 'int_passport', label: 'Int Passport' },
        { value: 'driver_license', label: 'Driver License' }
    ];

    const staffLevelOptions = [
        { value: 'super-admin', label: 'Super Admin' },
        { value: 'branch-manager', label: 'Manager' },
        { value: 'approver', label: 'Approver' },
        { value: 'marketer', label: 'Marketer' }
    ]

    const initialValues = {
        fullName: '',
        organization: null,
        department: null,
        role: null,
        email: '',
        password: '',
        confirmPassword: '',
        homeAddress: '',
        lga: null,
        state: null,
        phoneNumber: '',
        createdBy: rootAdminProfile?.id || '',
        createdByModel: 'Creator',
        userClass: null,
        staffLevel: null,
        description: '',
        verificationType: null,
        verificationIdNumber: '',
    };
    const validationSchema = Yup.object().shape({
        fullName: Yup.string()
            .required('Full name is required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        phoneNumber: Yup.string()
            .required('Phone number is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm password is required'),
        verificationType: Yup.object()
            .required('ID Type is required'),
        verificationIdNumber: Yup.string()
            .required('Id Number is required'),
        state: Yup.object()
            .required('State is required'),
        organization: Yup.object()
            .required('Organization is required'),
        lga: Yup.object().required('LGA is required'),
        userClass: Yup.object().required('Staff Type is required'),
        staffLevel: Yup.object().required('Staff Level is required'),
        department: Yup.object().required('Department is required'),
        role: Yup.object().required('Role is required'),
        homeAddress: Yup.string()
            .required('Address is required'),
        description: Yup.string()
            .required('Description is required')

    });

    const handleSubmit = async (payload: ILogin) => {
        setLoading(true);
        let payloadData = {
            ...payload,
            state: payload.state?.value,
            organization: payload.organization?.value,
            userClass: payload.userClass?.value,
            staffLevel: payload.staffLevel?.value,
            verificationType: payload.verificationType?.value,
            department: payload.department?.value,
            role: payload.role?.value,
            lga: payload.lga?.value,
            createdBy: rootAdminProfile?.id || '',
            createdByModel: 'Creator'
        }
        console.log({ sending: payloadData });
        try {
            const res = await api.post('/staff/create-superadmin', payloadData);
            // navigate('/root-login');
            toast.success('Super Admin created successfully!');
            setLoading(false);
        } catch (error: any) {
            console.log({ errorHere: error })
            setLoading(false);
            if (error?.data?.message) {
                toast.error(error?.data?.message)
            } else {
                console.log({ seeError: error })
                toast.error(error?.message)
            }
        }
    };

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

    const getOrgsanisations = async () => {
        try {
            const res = await api.get('/root/organizations');
            if (res.status == 200) {
                console.log({ hereIsOrgs: res?.data?.payload })
                let options = res?.data?.payload.map((item: any) => ({
                    value: item?.id,
                    label: item?.name,
                }))
                setOrgs(options)
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
            const res = await api.get(`/root/departments?organizationId=${selectedOrg?.value}`);
            if (res.status == 200) {
                console.log({ hereIsDepts: res?.data?.payload })
                let options = res?.data?.payload.map((item: any) => ({
                    value: item?.id,
                    label: item?.name,
                }))
                setDepts(options);
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
            const res = await api.get(`/root/roles?departmentId=${selectedDept?.value}`);
            if (res.status == 200) {
                console.log({ hereIsRoles: res?.data?.payload })
                let options = res?.data?.payload?.data.map((item: any) => ({
                    value: item?.id,
                    label: item?.name,
                }))
                setDeptRoles(options)
                // const { payload } = res.data;
                // console.log({ seePayloadFromOtp: payload })
                // const staffProfile = payload?.staffData;
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
        getOrgsanisations();
    }, [navigate])

    useEffect(() => {
        if(selectedOrg?.value){
            getDepartments();
        }
    }, [selectedOrg])

    useEffect(() => {
        if(selectedDept?.value){
            getDepartmentRoles()
        }
    }, [selectedDept])

    return (
        <Card className="sliding-form py-2 p-4 shadow d-flex w-100  align-items-center justify-content-center">
            <div className='d-flex justify-content-center mb-3 flex-column align-items-center'>
                {/* <Image
                        height={38}
                        src={compnayLogo} alt="Logo" /> */}
            </div>

            {/* <h2 className="text-center mb-4">Admin Login</h2> */}
            {/* {error && <div className="alert alert-danger">{error}</div>} */}

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnBlur={true}
                validateOnChange
                onSubmit={(values) => { handleSubmit(values) }}
            >
                {
                    ({ handleSubmit, handleChange, values, setFieldValue }) => (<Form className='d-flex align-items-center flex-column gap-3 w-100 p-3' onSubmit={handleSubmit}>
                        <>
                            <p className='fw-bold w-100 text-start'>| Super Admin Staff Creation</p>
                            <div className='w-100 d-flex gap-2'>
                                <div className='w-100 d-flex flex-column align-items-center gap-2'>
                                    <div className='w-100'>
                                        <ReusableInputs
                                            inputType='text-input'
                                            placeholder="Full Name"
                                            id='fullName'
                                            // icon='bi bi-envelope-fill'
                                            // value={values.email}
                                            name='fullName'
                                            label="Full Name"
                                            className="mb-3 w-100"
                                            required
                                        />
                                        <ErrorMessage name="fullName" component="div" className="text-danger" />
                                    </div>


                                    <div className='w-100'>
                                        <ReusableInputs
                                            inputType='text'
                                            type="email"
                                            placeholder="Staff email"
                                            id="email"
                                            // icon='bi bi-envelope-fill'
                                            // value={values.email}
                                            name="email"
                                            label="Email"
                                            className="mb-3 w-100"
                                            required
                                        />
                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                    </div>



                                    <div className='w-100'>
                                        <ReusableInputs
                                            inputType='number-input'
                                            // type="email"
                                            placeholder="Staff Phone Number"
                                            id="phoneNumber"
                                            // icon='bi bi-envelope-fill'
                                            // value={values.email}
                                            name="phoneNumber"
                                            label="Phone Number"
                                            className="mb-3 w-100"
                                            required
                                        />
                                        <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
                                    </div>
                                    <div className='w-100'>
                                        <ReusableInputs
                                            inputType='password'
                                            placeholder="Enter your password"
                                            id="password"
                                            // icon='bi bi-lock-fill'
                                            icon2='bi bi-eye'
                                            name="password"
                                            label="Password"
                                            className="mb-3 w-100"
                                            // value={values.password}
                                            // onChange={handleChange}
                                            required
                                        />
                                        <ErrorMessage name="password" component="div" className="text-danger" />
                                    </div>

                                    <div className='w-100'>
                                        <ReusableInputs
                                            inputType='password'
                                            placeholder="Confirma Password"
                                            id="confirmPassword"
                                            // icon='bi bi-lock-fill'
                                            icon2='bi bi-eye'
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            className="mb-3 w-100"
                                            // value={values.password}
                                            // onChange={handleChange}
                                            required
                                        />
                                        <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                                    </div>
                                    <div className='w-100'>
                                        <ReusableDropDownSelect
                                            inputType='text-i'
                                            name='organization'
                                            id='organization'
                                            label='Select Organization'
                                            options={orgs}
                                            passSelectedValue={(v) => {
                                                setSelectedOrg(v);
                                                setFieldValue('department', null)
                                            }}

                                        />
                                        <ErrorMessage name='organization' component="div" className="text-danger" />
                                    </div>
                                </div>

                                <div className='w-100 d-flex flex-column align-items-center gap-2'>

                                    <div className='w-100'>
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
                                        <ErrorMessage name='department' component="div" className="text-danger" />
                                    </div>
                                    <div className='w-100'>
                                        <ReusableDropDownSelect
                                            inputType='text-i'
                                            name='role'
                                            id='role'
                                            label='Role'
                                            options={deptRoles}
                                        />
                                        <ErrorMessage name='role' component="div" className="text-danger" />
                                    </div>

                                    <div className='w-100'>
                                        <ReusableDropDownSelect
                                            inputType='text-i'
                                            name='userClass'
                                            id='userClass'
                                            label='Staff Type'
                                            options={[{ value: 'initiator', label: 'Initiator' }, { value: 'authorizer', label: 'Authorizer' }]}
                                        />
                                        <ErrorMessage name="userClass" component="div" className="text-danger" />
                                    </div>

                                    <div className='w-100'>
                                        <ReusableDropDownSelect
                                            inputType='text-i'
                                            name='staffLevel'
                                            id='staffLevel'
                                            label='Staff Level'
                                            options={staffLevelOptions}
                                        />
                                        <ErrorMessage name="staffLevel" component="div" className="text-danger" />
                                    </div>

                                    <div className='w-100'>
                                        <ReusableDropDownSelect
                                            inputType='text-i'
                                            name='verificationType'
                                            id='verificationType'
                                            label='Mode of ID'
                                            options={idOptions}
                                        />
                                        <ErrorMessage name="verificationType" component="div" className="text-danger" />
                                    </div>

                                    <div className='w-100'>
                                        <ReusableInputs
                                            inputType='text-input'
                                            name='verificationIdNumber'
                                            id='verificationIdNumber'
                                            label='ID Number'
                                            placeholder='ID Number'
                                            className='w-100'
                                        />
                                        <ErrorMessage name="verificationIdNumber" component="div" className="text-danger" />
                                    </div>
                                </div>

                                <div className='w-100 d-flex flex-column align-items-center gap-2'>

                                    <div className='w-100'>
                                        <ReusableInputs
                                            inputType='text-area'
                                            placeholder="Home Address"
                                            id="homeAddress"
                                            // icon='bi bi-lock-fill'
                                            // icon2='bi bi-eye'
                                            name="homeAddress"
                                            label="Address"
                                            className="mb-3 w-100"
                                        // value={values.password}
                                        // onChange={handleChange}
                                        // required
                                        />
                                        <ErrorMessage name="homeAddress" component="div" className="text-danger" />
                                    </div>

                                    <div className='w-100'>
                                        <ReusableDropDownSelect
                                            inputType='text-i'
                                            name='state'
                                            id='state'
                                            label='State'
                                            options={states}
                                            passSelectedValue={(v) => {
                                                let lgaOptions = v.lgas.map((item: any, index: number) => ({ value: item, label: item }))
                                                setLgas(lgaOptions);
                                                setFieldValue('lga', '');
                                            }}
                                        />
                                        <ErrorMessage name="state" component="div" className="text-danger" />
                                    </div>

                                    <div className='w-100'>
                                        <ReusableDropDownStates
                                            options={lgas}
                                            inputType="tt"
                                            placeholder="Select..."
                                            id="lga"
                                            // icon='bi bi-lock-fill'
                                            // icon2='bi bi-eye'
                                            name="lga"
                                            label="LGA"
                                            className="mb-3 w-100"
                                        // value={values.password}
                                        // onChange={handleChange}
                                        />
                                        <ErrorMessage name="lga" component="div" className="text-danger" />
                                    </div>

                                    <div className='w-100'>
                                        <ReusableInputs
                                            inputType='text-area'
                                            placeholder="Description"
                                            id="description"
                                            // icon='bi bi-lock-fill'
                                            // icon2='bi bi-eye'
                                            name="description"
                                            label="Description"
                                            className="mb-3 w-100"
                                        // value={values.password}
                                        // onChange={handleChange}
                                        // required
                                        />
                                        <ErrorMessage name="description" component="div" className="text-danger" />
                                    </div>


                                </div>

                            </div>
                            <CustomButtonOwner
                                loading={loading}
                                type="submit"
                                className={`w-100 rounded-1 w-100 p-2`}
                                variant="primary"
                                title="Register"
                            />
                        </>



                    </Form>)
                }
            </Formik>

            <div className="text-center mt-2">
                {/* <p>
                        Powered By<a href='/request-password-reset-otp' className='fw-medium' style={{ color: color ?? '#1A5745' }}> Floath Solutions</a>
                    </p> */}
            </div>
        </Card>
    );
}
export default SuperAdminStaffForm;