
import React, { useEffect } from "react";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Image } from 'react-bootstrap';
import '../../styles/sliding-forms.scss';
// import compnayLogo from '../assets/images/fsh-logo.png'; // Adjust the path as necessary
import { ErrorMessage, FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import api from "../../app/api";
import { toast } from 'react-toastify';
import ReusableInputs from "../custom-input/ReusableInputs";
import CustomButtonOwner from "../custom-button/custom-button-owner";
import ReusableDropDownStates from "../custom-input/ReusableDropDownStates";
import { ILga, IState } from "../../interfaces/interface";
import ReusableDropDownSelect from "../custom-input/ReusableDropDownSelect";
import { RootState } from "../../store/store";
import CustomButton from "../custom-button/custom-button";
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



const CreateLoanForm = () => {
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

    const staffLevelOptions = [
        { value: 'super-admin', label: 'Super Admin' },
        { value: 'branch-manager', label: 'Manager' },
        { value: 'approver', label: 'Approver' },
        { value: 'marketer', label: 'Marketer' }
    ]

    const initialValues = {
        fullName: '',
        department: null,
        role: null,
        email: '',
        password: '',
        confirmPassword: '',
        homeAddress: '',
        lga: null,
        state: null,
        phoneNumber: '',
        createdBy: staffProfile?.id || '',
        createdByModel: 'Staffs',
        userClass: null,
        staffLevel: null,
        description: '',
        verificationType: null,
        verificationIdNumber: '',
    };
    const validationSchema = Yup.object().shape({
        groupName: Yup.string().required("Group name is required"),
        groupMembers: Yup.array()
            .of(
                Yup.object().shape({
                    fullName: Yup.string().required("Full name is required"),
                    bvn: Yup.string()
                        .length(11, "BVN must be 11 digits")
                        .required("BVN is required"),
                    phoneNumber: Yup.string()
                        .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
                        .required("Phone number is required"),
                    email: Yup.string().email("Invalid email").required("Email is required"),
                    loanAmount:Yup.number().required("Amount is required"),
                })
            )
            .min(3, "At least 3 members are required"),
    });


    const handleSubmit = async (payload: any) => {
        setLoading(true);
        let payloadData = {
            ...payload,
            organizationId:orgData?.id,
            branchId: staffProfile?.branch?._id || '',
        }
        console.log({ sending: payloadData });
        try {
            const res = await api.post('/group/create', payloadData);
            // navigate('/root-login');
            toast.success('New record created successfully!');
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


    console.log({ seeOrgInfo: orgData })
    return (
        <Card className="sliding-form py-2 p-4 mt-2 shadow d-flex w-100  align-items-center justify-content-center">
            <div className='d-flex justify-content-center mb-3 flex-column align-items-center'>
                {/* <Image
                        height={38}
                        src={compnayLogo} alt="Logo" /> */}
            </div>

            {/* <h2 className="text-center mb-4">Admin Login</h2> */}
            {/* {error && <div className="alert alert-danger">{error}</div>} */}

            <Formik
                initialValues={{
                    groupName: "",
                    groupMembers: [
                        { fullName: "", bvn: "", phoneNumber: "", loanAmount:"", email: "" },
                        { fullName: "", bvn: "", phoneNumber: "",loanAmount:"", email: "" },
                        { fullName: "", bvn: "", phoneNumber: "",loanAmount:"", email: "" },
                    ],
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    handleSubmit(values)
                    // console.log("Form data:", values);
                    // post to DB with axios/fetch
                }}
            >
                {({ values, handleSubmit }) => (
                    <Form onSubmit={handleSubmit} className="p-4 w-100">
                        <div>
                            <ReusableInputs
                                inputType='text-input'
                                placeholder="Group Name"
                                id='groupName'
                                // icon='bi bi-envelope-fill'
                                // value={values.email}
                                name='groupName'
                                label="Name Of Group"
                                className="mb-3 w-100"
                                required
                            />
                            <ErrorMessage name="groupName" component="div" className="text-danger text-sm" />
                        </div>

                        <FieldArray name="groupMembers">
                            {({ push, remove }) => (
                                <div className="">
                                    <p className="mt-4 mb-2 fw-bold">Group Members</p>
                                    {values.groupMembers.map((member, index) => (
                                        <div key={index} className="d-flex flex-wrap w-100 gap-2 border p-3 mb-2 rounded">
                                            <div className="w-100 d-flex flex-wrap justify-content-between">
                                                <p className="m-0 p-0">{index + 1}</p>
                                                {index >= 3 && (
                                                    <i onClick={() => remove(index)} role="button" className="text-danger bi bi-trash"></i>
                                                )}
                                            </div>

                                            <div className="w-100 d-flex flex-wrap gap-3">
                                                <div>
                                                    <ReusableInputs
                                                        inputType='text-input'
                                                        placeholder="Full Name"
                                                        id={`groupMembers[${index}].fullName`}
                                                        // icon='bi bi-envelope-fill'
                                                        // value={values.email}
                                                        name={`groupMembers[${index}].fullName`}
                                                        label="Full Name"
                                                        className="mb-3 w-100"
                                                        required
                                                    />
                                                    <ErrorMessage name={`groupMembers[${index}].fullName`} component="div" className="text-danger text-sm" />
                                                </div>

                                                <div>
                                                    <ReusableInputs
                                                        inputType='number-input'
                                                        placeholder="BVN"
                                                        id={`groupMembers[${index}].bvn`}
                                                        // icon='bi bi-envelope-fill'
                                                        // value={values.email}
                                                        name={`groupMembers[${index}].bvn`}
                                                        label="BVN"
                                                        className="mb-3 w-100"
                                                        required
                                                    />

                                                    <ErrorMessage name={`groupMembers[${index}].bvn`} component="div" className="text-danger text-sm" />
                                                </div>

                                                <div>
                                                    <ReusableInputs
                                                        inputType='text-input'
                                                        placeholder="Phone Number"
                                                        id={`groupMembers[${index}].phoneNumber`}
                                                        // icon='bi bi-envelope-fill'
                                                        // value={values.email}
                                                        name={`groupMembers[${index}].phoneNumber`}
                                                        label="Phone number"
                                                        className="mb-3 w-100"
                                                        required
                                                    />
                                                    <ErrorMessage name={`groupMembers[${index}].phoneNumber`} component="div" className="text-danger text-sm" />
                                                </div>

                                                <div>
                                                    <ReusableInputs
                                                        inputType='text-input'
                                                        placeholder="Email"
                                                        name={`groupMembers[${index}].email`}
                                                        // icon='bi bi-envelope-fill'
                                                        // value={values.email}
                                                        id={`groupMembers[${index}].email`}
                                                        label="Email"
                                                        className="mb-3 w-100"
                                                        required
                                                    />
                                                    <ErrorMessage name={`groupMembers[${index}].email`} component="div" className="text-danger text-sm" />
                                                </div>

                                                <div>
                                                    <ReusableInputs
                                                        inputType='number-input'
                                                        placeholder="Amount"
                                                        name={`groupMembers[${index}].loanAmount`}
                                                        // icon='bi bi-envelope-fill'
                                                        // value={values.email}
                                                        id={`groupMembers[${index}].loanAmount`}
                                                        label="Loan Amount"
                                                        className="mb-3 w-100"
                                                        required
                                                    />
                                                    <ErrorMessage name={`groupMembers[${index}].loanAmount`} component="div" className="text-danger text-sm" />
                                                </div>

                                            </div>
                                        </div>
                                    ))}

                                    <div className="w-100 mb-3 text-end">
                                        <button
                                            type="button"
                                            onClick={() => push({ fullName: "", bvn: "", phoneNumber: "", email: "" })}
                                            className="bg-success text-white px-3 py-1 rounded border-0"
                                        >
                                            + Add Member
                                        </button>
                                    </div>
                                </div>
                            )}
                        </FieldArray>

                        <CustomButton
                            loading={loading}
                            type="submit"
                            className={`w-100 rounded-1 w-100 p-2`}
                            variant="primary"
                            title="Upload Request"
                        />
                    </Form>
                )}
            </Formik>

            <div className="text-center mt-2">
                {/* <p>
                        Powered By<a href='/request-password-reset-otp' className='fw-medium' style={{ color: color ?? '#1A5745' }}> Floath Solutions</a>
                    </p> */}
            </div>
        </Card>
    );
}
export default CreateLoanForm;