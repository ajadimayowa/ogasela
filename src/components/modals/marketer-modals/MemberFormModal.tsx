import { Form, Formik } from "formik"
import { Modal } from "react-bootstrap"
import ReusableInputs from "../../custom-input/ReusableInputs"
import CustomButton from "../../custom-button/custom-button"
import ReusableDropDownSelect from "../../custom-input/ReusableDropDownSelect"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import api from "../../../app/api"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import * as Yup from "yup";
import MemberFormStep1 from "../../page-forms/member-form/MemberFormStep1"
import MemberFormStep2 from "../../page-forms/member-form/MemberFormStep2"
import MemberFormStep3 from "../../page-forms/member-form/MemberFormStep3"
import React from "react"
import MemberFormStep4 from "../../page-forms/member-form/MemberFormStep4"
import MemberFormStep5 from "../../page-forms/member-form/MemberFormStep5"

interface IModalProps {
    memberInfo: any
    on: boolean,
    off: () => void
}
const MemberFormModal: React.FC<IModalProps> = ({ on, off, memberInfo }) => {
    const [step, setStep] = useState(0);


    const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
    const orgProfile = useSelector((state: RootState) => state.auth.organisationData);

    const [depts, setDepts] = useState<any[]>([]);
    const [authorizers, setAuthorizers] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log({memberInfoFromModal: memberInfo})


    const initialValues = {
        title:null,
        fullName: memberInfo?.fullName,
        
        loanTenure: null,
        loanPurpose: '',
        requestedLoanAmount: memberInfo?.loanRecord?.requestedLoanAmount,
        interestRate: null,
        dailyLatePercentage: null,
        penaltyFee: null,

        stateOfOrigin: null,
        lgaOfOrigin: null,
        passportPhoto: null,
        dob: '',

        maritalStatus: null,
        modeOfIdentification: null,
        identificationNumber: '',
        memberIdDocumentFile: null,
        
        

       
        languageSpoken: '',
        residentialAddress: '',
        residentLengthOfStay: '',
        nearestBusStop: '',

       

        
        occupation: '',
        officeAddress: '',
        noOfChildren: '',
        


//NOK Step

        nokTitle:null,
        nokFullName: '',
        nokPhoneNumber: '',
        stateOfNok: null,

        relationshipWithNok: '',
        nokPassport: null,
        nokID: null,
        nokAttestationDocument: null,
//G1 Step
        g1Title:null,
        g1FullName: '',
        g1PhoneNumber: '',
        stateOfg1: null,
        g1Passport: null,
        g1ID: null,
        g1AttestationDocument: null,
//G2 Step
        g2Title:null,
        g2FullName: '',
        g2PhoneNumber: '',
        stateOfg2: null,
        g2Passport: null,
        g2ID: null,
        g2AttestationDocument: null,

//Ref Step
        refTitle:null,
        refFullName: '',
        refPhoneNumber: '',
        stateOfref: null,
        refPassport: null,
        refID: null,
        refAttestationDocument: null,

    }

    const stepSchemas = [
        Yup.object({
            title: Yup.object()
                .shape({
                    value: Yup.string().required(),
                    label: Yup.string().required(),
                })
                .nullable()
                .required("Title is required"),
            loanTenure:  Yup.number().required("Required"),
            loanPurpose:  Yup.string().required("Required"),

            stateOfOrigin: Yup.object()
                .shape({
                    value: Yup.string().required(),
                    label: Yup.string().required(),
                })
                .nullable()
                .required("Required"),
                
                lgaOfOrigin: Yup.object()
                .shape({
                    value: Yup.string().required(),
                    label: Yup.string().required(),
                })
                .nullable()
                .required("Required"),

                 passportPhoto: Yup.mixed()
                .required('A file is required'),

                dob: Yup.string().required("Required"),


            maritalStatus:Yup.object()
                .shape({
                    value: Yup.string().required(),
                    label: Yup.string().required(),
                })
                .nullable()
                .required("Marital is required"),

           modeOfIdentification: Yup.object()
                .shape({
                    value: Yup.string().required(),
                    label: Yup.string().required(),
                })
                .nullable()
                .required("Required"),
            identificationNumber: Yup.string().required("Required"),
            memberIdDocumentFile: Yup.mixed()
                .required('Doc is required')
            .test('fileType', 'Only PDF files are accepted', (value: any) => {
                return value && value.type === 'application/pdf';
            }),

             languageSpoken: Yup.string().required("Required"),
              residentialAddress: Yup.string().required("Required"),
              residentLengthOfStay: Yup.string().required("Required"),
               nearestBusStop: Yup.string().required("Required"),

            // requestedLoanAmount: memberInfo?.requestedLoanAmount,
            occupation: Yup.string().required("Required"),
            officeAddress: Yup.string().required("Required"),
            noOfChildren: Yup.number().required("Required"),
           
        }),

        Yup.object({
            nokTitle: Yup.object()
                .shape({
                    value: Yup.string().required(),
                    label: Yup.string().required(),
                })
                .nullable()
                .required("Required"),
            nokFullName: Yup.string().required("Required"),
            nokPhoneNumber: Yup.string()
  .matches(/^\d{10}$/, "11 digits")
  .required("Required"),
            stateOfNok:Yup.object()
                .shape({
                    value: Yup.string().required(),
                    label: Yup.string().required(),
                })
                .nullable()
                .required("Required"),
        relationshipWithNok: Yup.string().required("Required"),
         nokPassport: Yup.mixed()
                .required('A file is required'),
           
            nokID: Yup.mixed()
                .required('A file is required'),
            nokAttestationDocument: Yup.mixed()
                .required('Doc is required')
            .test('fileType', 'Only PDF files are accepted', (value: any) => {
                return value && value.type === 'application/pdf';
            }),
        }),
        Yup.object({
            g1Title: Yup.object()
                .shape({
                    value: Yup.string().required(),
                    label: Yup.string().required(),
                })
                .nullable()
                .required("Required"),
            g1FullName: Yup.string().required("Required"),
            g1PhoneNumber: Yup.string()
  .matches(/^\d{10}$/, "10 digits")
  .required("Required"),
            stateOfg1:Yup.object()
                .shape({
                    value: Yup.string().required(),
                    label: Yup.string().required(),
                })
                .nullable()
                .required("Required"),
         g1Passport: Yup.mixed()
                .required('Required'),
           
            g1ID: Yup.mixed()
                .required('Required'),
            g1AttestationDocument: Yup.mixed()
                .required('Doc is required')
            .test('fileType', 'Only PDF files are accepted', (value: any) => {
                return value && value.type === 'application/pdf';
            }),
        }),
        Yup.object({
            g2Title: Yup.object()
                .shape({
                    value: Yup.string().required(),
                    label: Yup.string().required(),
                })
                .nullable()
                .required("Required"),
            g2FullName: Yup.string().required("Required"),
            g2PhoneNumber:  Yup.string()
  .matches(/^\d{10}$/, "10 digits")
  .required("Required"),
            stateOfg2:Yup.object()
                .shape({
                    value: Yup.string().required(),
                    label: Yup.string().required(),
                })
                .nullable()
                .required("Required"),
         g2Passport: Yup.mixed()
                .required('Required'),
           
            g2ID: Yup.mixed()
                .required('Required'),
            g2AttestationDocument: Yup.mixed()
                .required('Doc is required')
            .test('fileType', 'Only PDF files are accepted', (value: any) => {
                return value && value.type === 'application/pdf';
            }),
        }),
        Yup.object({
            refTitle: Yup.object()
                .shape({
                    value: Yup.string().required(),
                    label: Yup.string().required(),
                })
                .nullable()
                .required("Required"),
            refFullName: Yup.string().required("Required"),
            refPhoneNumber: Yup.string()
  .matches(/^\d{10}$/, "10 digits")
  .required("Required"),
            stateOfref:Yup.object()
                .shape({
                    value: Yup.string().required(),
                    label: Yup.string().required(),
                })
                .nullable()
                .required("Required"),
         refPassport: Yup.mixed()
                .required('A file is required'),
           
            refID: Yup.mixed()
                .required('A file is required'),
            refAttestationDocument: Yup.mixed()
                .required('Doc is required')
            .test('fileType', 'Only PDF files are accepted', (value: any) => {
                return value && value.type === 'application/pdf';
            }),
        })
    ];

    const isLastStep = step === stepSchemas.length - 1;

    console.log({thisIsStep: step, isLastStep})





    

    const getAuthorizers = async () => {
        try {
            const res = await api.get(`/staff/staffs?organisationId=${orgProfile?.id}&mode=dropdown&staffLevel=super-admin&userClass=authorizer`);
            if (res.status == 200) {
                let auths = res?.data?.payload.map((auth: any) => ({
                    value: auth?.id,
                    label: auth?.fullName
                }))
                // console.log({ dataSent: res?.data?.payload })
                setAuthorizers(auths)
                const { payload } = res.data;
                console.log({ seePayloadFromOtp: payload })
                const staffProfile = payload?.staffData;
                // dispatch(setToken(payload?.token));
                // dispatch(setStaffProfile(staffProfile));
            }

        } catch (err: any) {
            // toast.error(err?.response?.data?.message || 'Invalid or expired OTP');
        } finally {
            setLoading(false);
        }
    }

    // const getDepartments = async () => {
    //     try {
    //         const res = await api.get(`/department/by-organization/${orgProfile?.id}`);
    //         if (res.status == 200) {
    //             // console.log({ dataSent: res?.data?.payload })
    //             setDepts(res?.data?.payload)
    //             const { payload } = res.data;
    //             console.log({ seePayloadFromOtp: payload })
    //             const staffProfile = payload?.staffData;
    //             // dispatch(setToken(payload?.token));
    //             // dispatch(setStaffProfile(staffProfile));
    //         }

    //     } catch (err: any) {
    //         // toast.error(err?.response?.data?.message || 'Invalid or expired OTP');
    //     } finally {
    //         setLoading(false);
    //     }
    // }


    const steps = [<MemberFormStep1/>, <MemberFormStep2 />, <MemberFormStep3 />,<MemberFormStep4 />,<MemberFormStep5/>];

    const handleSubmit = async (values: any, actions: any) => {
            console.log({ submittedValues: values });
        if (!isLastStep) {
            setStep((s) => s + 1);
            actions.setTouched({});
            actions.setSubmitting(false);
        } else {
            setLoading(true);
            const formData = new FormData();
            formData.append('title', values?.title?.value);
            formData.append('dailyLatePercentage', values?.dailyLatePercentage);
            formData.append('dob', values?.dob);
            formData.append('g1AttestationDocument', values?.g1AttestationDocument);
            formData.append('g1FullName', values?.g1FullName);
            formData.append('g1ID', values?.g1ID);
            formData.append('g1Passport', values?.g1Passport);
            formData.append('g1PhoneNumber', values?.g1PhoneNumber);
            formData.append('g1Title', values?.g1Title);
            formData.append('g1Title', values?.g1Title?.value);
            formData.append('g2AttestationDocument', values?.g2AttestationDocument);

            formData.append('g2FullName', values?.g2FullName);
            formData.append('g2ID', values?.g2ID);
            formData.append('g2Passport', values?.g2Passport);
            formData.append('g2PhoneNumber', values?.g2PhoneNumber);
            formData.append('g2Title', values?.g2Title?.value);
            formData.append('interestRate', values?.interestRate);
            formData.append('lgaOfOrigin', values?.lgaOfOrigin?.value);
            formData.append('loanPurpose', values?.loanPurpose);
            formData.append('loanTenure', values?.loanTenure);
            formData.append('maritalStatus', values?.maritalStatus?.value);
            formData.append('memberIdDocumentFile', values?.memberIdDocumentFile);
            formData.append('modeOfIdentification', values?.modeOfIdentification?.value);
            formData.append('nearestBusStop', values?.nearestBusStop);
            formData.append('noOfChildren', values?.noOfChildren);
            formData.append('nokAttestationDocument', values?.nokAttestationDocument);
            formData.append('nokFullName', values?.nokFullName);
            formData.append('nokID', values?.nokID);
            formData.append('nokPassport', values?.nokPassport);
            formData.append('nokPhoneNumber', values?.nokPhoneNumber);
            formData.append('nokTitle', values?.nokTitle?.value);
            formData.append('occupation', values?.occupation);
            formData.append('officeAddress', values?.officeAddress);
            formData.append('passportPhoto', values?.passportPhoto);
            formData.append('penaltyFee', values?.penaltyFee);
            formData.append('refAttestationDocument', values?.refAttestationDocument);
            formData.append('refFullName', values?.refFullName);
            formData.append('refID', values?.refID);
            formData.append('refPassport', values?.refPassport);
            formData.append('refPhoneNumber', values?.refPhoneNumber);
            formData.append('refTitle', values?.refTitle?.value);
            formData.append('relationshipWithNok', values?.relationshipWithNok);
            formData.append('requestedLoanAmount', values?.requestedLoanAmount);
            formData.append('residentLengthOfStay', values?.residentLengthOfStay);
            formData.append('residentialAddress', values?.residentialAddress);
            formData.append('stateOfNok', values?.stateOfNok?.value);
            formData.append('stateOfOrigin', values?.stateOfOrigin?.value);

            formData.append('stateOfg1', values?.stateOfg1?.value);
            formData.append('stateOfg2', values?.stateOfg2?.value);
            formData.append('stateOfref', values?.stateOfref?.value);
            console.log("Final Submission:", values);

            try {
                const res = await api.put(`/member/apply/${memberInfo?._id}`, formData, {   headers: { 'Content-Type': 'multipart/form-data' } });
                if (res.status == 200) {
                    toast.success('Documents uploaded for verification!');
                    actions.resetForm();
                    setStep(0);
                    off();
                    window.location.reload();
                }
            } catch (error) {
                console.error("Submission error:", error);
                toast.error('Failed to create member. Please try again.');
                
            }
            actions.setSubmitting(false);
        }
    };

    useEffect(() => {
        getAuthorizers();
        // getDepartments();
    }, [])
    return (
        <Modal size="lg" show={on}>
            <Modal.Header>
                <div className="d-flex justify-content-between w-100">
                    <div>
                        <p className="m-0 p-0 fw-bold">Complete Registraion Form</p> |  Page {step + 1} of {steps.length}
                    </div>
                    <i onClick={off} role="button" className="bi bi-x-circle"></i>

                </div>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                    validationSchema={stepSchemas[step]}
                    // validateOnBlur={true}
                >{
                        ({ handleSubmit, values ,setFieldValue}) => (
                            <Form onSubmit={handleSubmit}>
                                {React.cloneElement(steps[step], { setFieldValue, values })}

                                <div className="w-100 justify-content-end d-flex gap-3" style={{ marginTop: "20px" }}>
                                    {step > 0 && (
                                        <CustomButton
                                            type="button"
                                            onClick={() =>{ setStep((s) => s - 1);setLoading(false)}}
                                            title="Back"
                                        />
                                    )}
                                    <CustomButton
                                    loading={loading}
                                    type="submit"
                                        title={isLastStep ? "Submit" : "Next"}
                                    />
                                </div>

                                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                            </Form>
                        )
                    }

                </Formik>

            </Modal.Body>
        </Modal>
    )

}
export default MemberFormModal;