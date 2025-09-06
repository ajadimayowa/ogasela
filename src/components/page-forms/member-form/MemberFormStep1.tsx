
import React, { useEffect } from "react";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Image } from 'react-bootstrap';
import '../../../styles/sliding-forms.scss';
// import compnayLogo from '../assets/images/fsh-logo.png'; // Adjust the path as necessary
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import api from "../../../app/api";
import { toast } from 'react-toastify';
import ReusableInputs from "../../custom-input/ReusableInputs";
import CustomButtonOwner from "../../custom-button/custom-button-owner";
import ReusableDropDownStates from "../../custom-input/ReusableDropDownStates";
import { ILga, IState } from "../../../interfaces/interface";
import ReusableDropDownSelect from "../../custom-input/ReusableDropDownSelect";
import { RootState } from "../../../store/store";
import CustomButton from "../../custom-button/custom-button";
import MultiPartFormReusableDropDownSelect from "../../custom-input/MultiPartFormReusableDropDownSelect";
import { cutString } from "../../../utils/helpers";
export interface ILogin {
    fullName: string;
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

interface Props {
    setFieldValue: (field: string, value: any) => void;
}



const MemberFormStep1 = ({ setFieldValue, values }: any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [states, setStates] = useState<IState[]>([]);
    const [lgas, setLgas] = useState<ILga[]>([]);
    const [depts, setDepts] = useState<any[]>([]);
    const [deptRoles, setDeptRoles] = useState<any[]>([]);
    const [selectedDept, setSelectedDept] = useState<any>();
    const [selectedOrg, setSelectedOrg] = useState<any>();
    const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
    const orgData = useSelector((state: RootState) => state.auth.organisationData);
    const deptData = useSelector((state: RootState) => state.auth.departmentData);
    const roleData = useSelector((state: RootState) => state.auth.roleData);

    const idOptions = [
        { value: 'bvn', label: 'Bvn' },
        { value: 'int_passport', label: 'Int Passport' },
        { value: 'driver_license', label: 'Driver License' }
    ];

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
            const res = await api.get(`/departments?organizationId=${orgData?.id}`);
            if (res.status == 200) {
                console.log({ hereIsDepts: res?.data?.payload })
                let options = res?.data?.payload.map((item: any) => ({
                    value: item?.id,
                    label: item?.name,
                }))
                setDepts(options);
                // const { payload } = res.data;
                // console.log({ seePayloadFromOtp: payload })
                // const staffProfile = payload?.staffData;
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
            const res = await api.get(`/roles?departmentId=${selectedDept?.value}`);
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
    }, [navigate])

    useEffect(() => {
        if (orgData?.id) {
            getDepartments();
        }
    }, [navigate])

    useEffect(() => {

        if (selectedDept?.value) {
            getDepartmentRoles()
        }
    }, [selectedDept])

    const titles = [
        { value: 'mr', label: 'Mr' },
        { value: 'mrs', label: 'Mrs' },
        { value: 'miss', label: 'Miss' },

    ]

    const maritalStatus = [
        { value: 'married', label: 'Married' },
        { value: 'single', label: 'Single' },
        { value: 'divorced', label: 'Divorced' },
        { value: 'widowed', label: 'Widowed' },
        { value: 'widower', label: 'Widower' },

    ]

    const handleFileChange = (
            event: React.ChangeEvent<HTMLInputElement>,
            fieldName: string,
            setFieldValue: (field: string, value: any) => void
        ) => {
            if (event.currentTarget.files && event.currentTarget.files[0]) {
                setFieldValue(fieldName, event.currentTarget.files[0]); // store in Formik
            }
        };

    console.log({ seeOrgInfo: orgData })
    return (
        <>
        <p className="fw-bold p-0 m-0">Member Information</p>
        <div className="sliding-form bg-light py-2 p-4 mt-2 w-100  align-items-center justify-content-center">


            <>
            
            <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td className=''>
                                <div className='w-100'>
                            <MultiPartFormReusableDropDownSelect
                                name='title'
                                label='Title'
                                options={titles}
                            />
                        </div>
                            </td>

                            <td className=''>
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

                            </td>

                            <td className=''>
                                <div className='w-100'>
                            <ReusableInputs
                                inputType='number-input'
                                // type="email"
                                placeholder="Phone"
                                id="phoneNumber"
                                // icon='bi bi-envelope-fill'
                                // value={values.email}
                                name="phoneNumber"
                                label="Phone"
                                className="mb-3 w-100"
                                required
                            />
                            <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
                        </div>

                            </td>

                            <td className=''>
                               <div className='w-100'>
                            <ReusableInputs
                                inputType='text-input'
                                // type="email"
                                placeholder="Loan Amount"
                                id="requestedLoanAmount"
                                // icon='bi bi-envelope-fill'
                                // value={values.email}
                                name="requestedLoanAmount"
                                label="Loan Amount"
                                className="mb-3 w-100"
                                required
                            />
                            <ErrorMessage name="requestedLoanAmount" component="div" className="text-danger" />
                        </div>

                            </td>
                        </tr>

                        {/* line 2 */}

                        <tr>
                            <td className=''>
                                <div className='w-100'>
                            <ReusableDropDownSelect
                                inputType='text-i'
                                name='stateOfOrigin'
                                id='stateOfOrigin'
                                label='State'
                                options={states}
                                passSelectedValue={(v) => {
                                    let lgaOptions = v.lgas.map((item: any, index: number) => ({ value: item, label: item }))
                                    setLgas(lgaOptions);
                                    // setFieldValue('lga', '');
                                }}
                            />
                            <ErrorMessage name='stateOfOrigin' component="div" className="text-danger" />
                        </div>
                            </td>

                            <td className=''>
                                <div className='w-100'>
                            <ReusableDropDownStates
                                options={lgas}
                                inputType="tt"
                                placeholder="Select..."
                                id="lgaOfOrigin"
                                // icon='bi bi-lock-fill'
                                // icon2='bi bi-eye'
                                name="lgaOfOrigin"
                                label="LGA"
                                className="mb-3 w-100"
                            // value={values.password}
                            // onChange={handleChange}
                            />
                            <ErrorMessage name="lgaOfOrigin" component="div" className="text-danger" />
                        </div>
                            </td>

                            <td className=''>
                                 <div className='w-100'>
                            <div style={{ minWidth: '100px', maxWidth: '150px' }}>
                                <div>
                                    <p className="m-0 p-0">Passport</p>
                                    <label htmlFor="passportPhoto" className={`p-2 py-3 w-100 text-center text-primary border-1 m-0 fileUploadLabel`}>
                                        {<i className="bi bi-image-fill"></i>}
                                        {/* {fileName == '' ? ' Click to upload file' : ' Click to Replace File'} */}
                                        {values.passportPhoto && (
                                            <div className="mt-2 text-success">
                                              {cutString(values.passportPhoto.name, 10)}
                                            </div>
                                        )}

                                    </label>

                                    <input
                                        id="passportPhoto"
                                        name="passportPhoto"
                                        type="file"
                                        className={`p-2 fileInput`}
                                        onChange={(e) => handleFileChange(e, "passportPhoto", setFieldValue)}

                                    // {handleFileChange(event: any) => {
                                    //     setFieldValue("policyDocument", event.currentTarget.files[0]);
                                    // }}
                                    />
                                </div>
                            </div>
                            {/* {fileName == '' ?
                                <div className="px-3 d-flex mt-2">
                                    {fileName && <i className="bi bi-file-earmark-pdf text-danger"></i>}
                                    <a href={fileUrl} target="_blank" className="px-1 text-primary">{fileName}</a>
                                </div> :
                                <div className="mt-2 d-flex">
                                    {fileName &&
                                        <div className="px-3 d-flex">
                                            <i className="bi bi-file-earmark-pdf text-danger"></i>
                                            <a href={fileUrl} target="_blank" className="px-1 text-primary">{fileName}</a>
                                        </div>}
                                </div>
                            } */}
                            <ErrorMessage name="passportPhoto" component="div" className="text-danger" />
                        </div>
                            </td>

                            

                            <td className=''>
                                <div className='w-100'>
                            <ReusableInputs
                                inputType='text-input'
                                // type="email"
                                placeholder="Date of Birth"
                                id="dob"
                                // icon='bi bi-envelope-fill'
                                // value={values.email}
                                name="dob"
                                label="DOB"
                                className="mb-3 w-100"
                                required
                            />
                            <ErrorMessage name="dob" component="div" className="text-danger" />
                        </div>
                            </td>
                        </tr>

                        {/* line 3 */}

                        <tr>
                            <td className=''>
                                <div className='w-100'>
                            <MultiPartFormReusableDropDownSelect
                                name='maritalStatus'
                                label='Status'
                                options={maritalStatus}
                            />
                        </div>
                            </td>

                            <td className=''>
                                <div className='w-100'>
                            <MultiPartFormReusableDropDownSelect
                                name='modeOfIdentification'
                                label='Mode of ID'
                                options={idOptions}
                            />
                        </div>

                            </td>

                            <td className=''>
                               <div className='w-100'>
                            <ReusableInputs
                                inputType='text-input'
                                name='identificationNumber'
                                id='identificationNumber'
                                label='ID Number'
                                placeholder='ID Number'
                                className='w-100'
                            />
                            <ErrorMessage name="identificationNumber" component="div" className="text-danger" />
                        </div>

                            </td>

                            <td className=''>
                              
<div className='w-100'>
                                    <div style={{ minWidth: '100px', maxWidth: '150px' }}>
                                        <div>
                                            <p className="m-0 p-0">Document</p>
                                            <label htmlFor="memberIdDocumentFile" className={`p-2 py-3 w-100 text-center text-primary border-1 m-0 fileUploadLabel`}>
                                                {<i className="bi bi-image-fill"></i>}
                                                {/* {fileName == '' ? ' Click to upload file' : ' Click to Replace File'} */}
                                                {values.idDocumentFile && (
                                                    <div className="mt-2 text-success">
                                                     {cutString(values.idDocumentFile.name, 10)}
                                                    </div>
                                                )}

                                            </label>

                                            <input
                                                id="memberIdDocumentFile"
                                                name="memberIdDocumentFile"
                                                type="file"
                                                className={`p-2 fileInput`}
                                                onChange={(e) => handleFileChange(e, "memberIdDocumentFile", setFieldValue)}

                                            // {handleFileChange(event: any) => {
                                            //     setFieldValue("policyDocument", event.currentTarget.files[0]);
                                            // }}
                                            />
                                        </div>
                                    </div>
                                    {/* {fileName == '' ?
                                                                <div className="px-3 d-flex mt-2">
                                                                    {fileName && <i className="bi bi-file-earmark-pdf text-danger"></i>}
                                                                    <a href={fileUrl} target="_blank" className="px-1 text-primary">{fileName}</a>
                                                                </div> :
                                                                <div className="mt-2 d-flex">
                                                                    {fileName &&
                                                                        <div className="px-3 d-flex">
                                                                            <i className="bi bi-file-earmark-pdf text-danger"></i>
                                                                            <a href={fileUrl} target="_blank" className="px-1 text-primary">{fileName}</a>
                                                                        </div>}
                                                                </div>
                                                            } */}
                                    <ErrorMessage name="memberIdDocumentFile" component="div" className="text-danger" />
                                </div>
                            </td>
                        </tr>

                        {/* line 4 */}

                        <tr>
                            <td className=''>
                                <div className='w-100'>
                            <ReusableInputs
                                inputType='text-input'
                                // type="email"
                                placeholder="Language Spoken"
                                id="languageSpoken"
                                // icon='bi bi-envelope-fill'
                                // value={values.email}
                                name="languageSpoken"
                                label="Language"
                                className="mb-3 w-100"
                                required
                            />
                            <ErrorMessage name="languageSpoken" component="div" className="text-danger" />
                        </div>
                            </td>

                            
                            <td className="">
                                <div className='w-100'>
                            <ReusableInputs
                                inputType='text-area'
                                placeholder="Residential Address"
                                id="residentialAddress"
                                // icon='bi bi-lock-fill'
                                // icon2='bi bi-eye'
                                name="residentialAddress"
                                label="Residential Address"
                                className="mb-3 w-100"
                            // value={values.password}
                            // onChange={handleChange}
                            // required
                            />
                            <ErrorMessage name="residentialAddress" component="div" className="text-danger" />
                        </div>
                            </td>


                            <td className=''>
                                 <div className='w-100'>
                            <ReusableInputs
                                inputType='text-input'
                                // type="email"
                                placeholder="How long?"
                                id="residentLengthOfStay"
                                // icon='bi bi-envelope-fill'
                                // value={values.email}
                                name="residentLengthOfStay"
                                label="Duration"
                                className="mb-3 w-100"
                                required
                            />
                            <ErrorMessage name="residentLengthOfStay" component="div" className="text-danger" />
                        </div>
                            </td>
                            
                            <td className=''>
                                <div className='w-100'>
                            <ReusableInputs
                                inputType='text-input'
                                // type="email"
                                placeholder="Nearest B/Stop"
                                id="nearestBusStop"
                                // icon='bi bi-envelope-fill'
                                // value={values.email}
                                name="nearestBusStop"
                                label="Nearest B/Stop"
                                className="mb-3 w-100"
                                required
                            />
                            <ErrorMessage name="nearestBusStop" component="div" className="text-danger" />
                        </div>
                            </td>
                            
                        </tr>




                        <tr>

                            <td className=''>
                                <div className='w-100'>
                            <MultiPartFormReusableDropDownSelect
                                name='loanTenure'
                                label='Loan Duration'
                                options={titles}
                            />
                        </div>
                            </td>
                            <td className=''>
                               <div className=''>
                            <ReusableInputs
                                inputType='text-input'
                                // type="email"
                                placeholder="Occupation/Business"
                                id="occupation"
                                // icon='bi bi-envelope-fill'
                                // value={values.email}
                                name="occupation"
                                label="Ocupation/Business"
                                className=""
                                required
                            />
                            <ErrorMessage name="occupation" component="div" className="text-danger" />
                        </div> 
                            </td>
                           <td >
                                <div className='w-100'>
                            <ReusableInputs
                                inputType='text-area'
                                placeholder="Business Address"
                                id="officeAddress"
                                // icon='bi bi-lock-fill'
                                // icon2='bi bi-eye'
                                name="officeAddress"
                                label="Business Address"
                                className="mb-3 w-100"
                            // value={values.password}
                            // onChange={handleChange}
                            // required
                            />
                            <ErrorMessage name="officeAddress" component="div" className="text-danger" />
                        </div>
                            </td>

                            <td className=''>
                               <div className=''>
                            <ReusableInputs
                                inputType='number-input'
                                // type="email"
                                placeholder="No Children"
                                id="noOfChildren"
                                // icon='bi bi-envelope-fill'
                                // value={values.email}
                                name="occupation"
                                label="No Children"
                                className=""
                                required
                            />
                            <ErrorMessage name="noOfChildren" component="div" className="text-danger" />
                        </div> 
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>

            <div className="text-center mt-2">
                {/* <p>
                        Powered By<a href='/request-password-reset-otp' className='fw-medium' style={{ color: color ?? '#1A5745' }}> Floath Solutions</a>
                    </p> */}
            </div>
        </div>
        </>
    );
}
export default MemberFormStep1;