
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
    nameOfDept: string;
    organizationId: {
        value: string;
        label: string;
    }|null;
    description: string;
    createdBy: string;
    createdByModel: string;

}

const AdminDepartmentForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [orgs, setOrgs] = useState<any[]>([]);
    const [lgas, setLgas] = useState<ILga[]>([]);
    const rootAdminProfile = useSelector((state: RootState) => state.auth.rootAdminProfile);


    const initialValues = {
        nameOfDept: '',
        organizationId: null,
        description: '',
        createdBy: '',
        createdByModel:''
    };
    const validationSchema = Yup.object().shape({
        nameOfDept: Yup.string()
            .required('Name Of Department is required'),
        organizationId: Yup.object()
            .required('Organization is required'),
        description: Yup.string()
            .required('Description is required')

    });

    const handleSubmit = async (payload: ILogin) => {
        setLoading(true);
        let payloadData = {
            ...payload,
            organizationId: payload?.organizationId?.value,
            createdBy: rootAdminProfile?.id || '',
            createdByModel: "Creator"
        }
        console.log({ sending: payloadData });
        try {
            const res = await api.post('department/create-admin', payloadData);
            // navigate('/root-login');
            toast.success('Department created successfully!');
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

    useEffect(() => {
        getOrgsanisations();
        // getDepartments();
    }, [navigate])

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
                            <p className='fw-bold w-100 text-start'>| Admin Department Creation</p>
                            <div className='w-100 d-flex gap-2'>
                                <div className='w-100 d-flex flex-column align-items-center gap-2'>
                                    <div className='w-100'>
                                        <ReusableInputs
                                            inputType='text-input'
                                            placeholder="Name of Department"
                                            id="nameOfDept"
                                            // icon='bi bi-envelope-fill'
                                            // value={values.email}
                                            name="nameOfDept"
                                            label="Name of Department"
                                            className="mb-3 w-100"
                                            required
                                        />
                                        <ErrorMessage name="nameOfDept" component="div" className="text-danger" />
                                    </div>

                                    <div className='w-100'>
                                        <ReusableDropDownSelect
                                            inputType='text-i'
                                            name='organizationId'
                                            id='organizationId'
                                            label='Select Organization'
                                            options={orgs}
                                           
                                        />
                                        <ErrorMessage name='organizationId' component="div" className="text-danger" />
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
export default AdminDepartmentForm;