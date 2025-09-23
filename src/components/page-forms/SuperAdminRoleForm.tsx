
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
    name: string,
    department: {
        value: string;
        label: string;
    } | null;
    organization: {
        value: string;
        label: string;
    } | null;
    description: string,
    createdBy: string,
    createdByModel:string

}

const SuperAdminRoleForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [orgs, setOrgs] = useState<any[]>([]);
    const [selectedOrg, setSelectedOrg] = useState<any>(null);
    const [depts, setDepts] = useState<any[]>([]);
    const [lgas, setLgas] = useState<ILga[]>([]);
    const rootAdminProfile = useSelector((state: RootState) => state.auth.rootAdminProfile);


    const initialValues = {
        name: '',
        department: null,
        organization: null,
        description: '',
        createdBy: '',
        createdByModel:'Creator'
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name Of Role is required'),
        department: Yup.object()
            .required('Department is required'),
        organization: Yup.object()
            .required('Organization is required'),
        description: Yup.string()
            .required('Description is required')

    });

    const handleSubmit = async (payload: ILogin) => {
        setLoading(true);
        let payloadData = {
            ...payload,
            department: payload?.department?.value,
            organization: payload?.organization?.value,
            createdBy: rootAdminProfile?.id || '',
            createdByModel:'Creator'
        }
        console.log({ sending: payloadData });
        try {
            const res = await api.post('role/create-superadmin', payloadData);
            // navigate('/root-login');
            toast.success('Super Admin Role Created Successfully!');
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

    const getOrgsanisations = async () => {
        try {
            const res = await api.get('/root/organizations');
            if (res.status == 200) {
                console.log({ dataSent: res?.data?.payload })
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

    const getSelectedOrgDepts = async () => {
        try {
            const res = await api.get(`/root/departments?organizationId=${selectedOrg?.value}`);
            if (res.status == 200) {
                console.log({ dataSent: res?.data?.payload })
                let options = res?.data?.payload.map((item: any) => ({
                    value: item?.id,
                    label: item?.name,
                }))
                setDepts(options)
                const { payload } = res.data;
                console.log({ seePayloadFromOtp: payload })
                const staffProfile = payload?.staffData;
            }

        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Invalid or expired OTP');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getOrgsanisations();
        // getDepartments();
    }, [navigate])

    useEffect(() => {
        if (selectedOrg?.value) {
            getSelectedOrgDepts();
        }
    }, [selectedOrg])

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
                            <p className='fw-bold w-100 text-start'>| Admin Role Creation</p>
                            <div className='w-100 d-flex gap-2'>
                                <div className='w-100 d-flex flex-column align-items-center gap-2'>
                                    <div className='w-100'>
                                        <ReusableInputs
                                            inputType='text-input'
                                            placeholder="Name of Role"
                                            id="name"
                                            // icon='bi bi-envelope-fill'
                                            // value={values.email}
                                            name="name"
                                            label="Name of Role"
                                            className="mb-3 w-100"
                                            required
                                        />
                                        <ErrorMessage name="name" component="div" className="text-danger" />
                                    </div>
                                    <div className='w-100'>
                                        <ReusableDropDownSelect
                                            inputType='text-i'
                                            name='organization'
                                            placeholder="Select..."
                                            id='organization'
                                            label='Select Organization'
                                            options={orgs||[]}
                                            passSelectedValue={(v) => {
                                                console.log({ selectedOrg: v })
                                                // let lgaOptions = v.lgas.map((item: any, index: number) => ({ value: item, label: item }))
                                                setSelectedOrg(v);
                                                // setFieldValue('departmentId', null);
                                            }}

                                        />
                                        <ErrorMessage name='organization' component="div" className="text-danger" />
                                    </div>

                                    <div className='w-100'>
                                        <ReusableDropDownSelect
                                            inputType='text-i'
                                            name='department'
                                            id='department'
                                            label='Select Department'
                                            options={depts}

                                        />
                                        <ErrorMessage name='department' component="div" className="text-danger" />
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

                                <div className='w-100 d-flex flex-column align-items-center gap-2'>



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
export default SuperAdminRoleForm;