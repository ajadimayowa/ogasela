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
const MemberProfileModal: React.FC<IModalProps> = ({ on, off, memberInfo }) => {
    const [step, setStep] = useState(0);


    const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
    const orgProfile = useSelector((state: RootState) => state.auth.organisationData);

    const [depts, setDepts] = useState<any[]>([]);
    const [authorizers, setAuthorizers] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log({ memberInfoFromModal: memberInfo })


    const initialValues = {
        title: null,
        fullName: memberInfo?.fullName,
        alias: '',
        maritalStatus: null,

        dob: '',
        stateOfOrigin: null,
        lgaOfOrigin: null,
        occupation: '',

        utilityBillPhoto: null,
        idCardPhoto: null,
        passportPhoto: null,
        attestationDocumentFile: null,

        modeOfIdentification: null,
        identificationNumber: '',

        language: '',
        homeAddress: '',
        nearestBusStop: '',
        durationOfStay: '',

        officeAddress: '',
        noOfKids: '',
        selectedModeOfIdentification: '',
        idIdentificationNumber: ''
    }

    const validationSchema = Yup.object({
        title: Yup.object()
            .shape({
                value: Yup.string().required(),
                label: Yup.string().required(),
            })
            .nullable()
            .required("Title is required"),
        alias: Yup.string().required("Required"),
        maritalStatus: Yup.object()
            .shape({
                value: Yup.string().required(),
                label: Yup.string().required(),
            })
            .nullable()
            .required("Required"),
        dob: Yup.string().required("Required"),

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

        occupation: Yup.string().required("Required"),

        utilityBillPhoto: Yup.mixed()
            .required('A picture is required'),
        idCardPhoto: Yup.mixed()
            .required('A picture is required'),
        passportPhoto: Yup.mixed()
            .required('A picture is required'),
        attestationDocumentFile: Yup.mixed()
            .required('A Pdf is required').test('fileType', 'Only PDF files are accepted', (value: any) => {
                    return value && value.type === 'application/pdf';
            }),
        
        language: Yup.string().required("Required"),
        homeAddress: Yup.string().required("Required"),
        nearestBusStop: Yup.string().required("Required"),
        durationOfStay: Yup.string().required("Required"),
        selectedModeOfIdentification: Yup.object()
            .shape({
                value: Yup.string().required('Required').label('Mode of ID'),
                label: Yup.string().required('Required').label('Mode of ID'),
            })
            .nullable()
            .required("Required").label('Mode of ID'),
        idIdentificationNumber: Yup.string().required("Required"),
        officeAddress: Yup.string().required("Required"),
        noOfKids: Yup.number().required("Required"),

    })

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


    // const steps = [, <MemberFormStep2 />, <MemberFormStep3 />,<MemberFormStep4 />,<MemberFormStep5/>];

    const handleSubmit = async (values: any, actions: any) => {
        setLoading(true);
        console.log({ submittedValues: values });

        const formData = new FormData();
        formData.append('title', values?.title?.value);
        formData.append('fullName', values?.fullName);
        formData.append('alias', values?.alias);
        formData.append('dob', values?.dob);
        formData.append('stateOfOrigin', values?.stateOfOrigin?.value);
        formData.append('lgaOfOrigin', values?.lgaOfOrigin?.value);
        formData.append('occupation', values?.occupation);

        formData.append('passportPhoto', values?.passportPhoto);
        formData.append('utilityBillPhoto', values?.utilityBillPhoto);
        formData.append('idCardPhoto', values?.idCardPhoto);
        formData.append('attestationDocumentFile', values?.attestationDocumentFile);

        formData.append('homeAddress', values?.homeAddress);
        formData.append('nearestBusStop', values?.nearestBusStop);
        formData.append('language', values?.language);
        formData.append('officeAddress', values?.officeAddress);

        
        formData.append('selectedModeOfIdentification', values?.selectedModeOfIdentification?.value);
        formData.append('idIdentificationNumber', values?.idIdentificationNumber);

        formData.append('maritalStatus', values?.maritalStatus?.value);
        formData.append('noOfKids', values?.noOfKids);

        console.log("Final Submission:", values);

        try {
            const res = await api.put(`/member/update/${memberInfo?._id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            if (res.status == 200) {
                toast.success('Customer profile succesfully updated!');
                actions.resetForm();
                setStep(0);
                off();
                // window.location.reload();
                setLoading(false);
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error('Failed to create member. Please try again.');
            setLoading(false);
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
                        <p className="m-0 p-0 fw-bold">Update Customer Profile</p>
                    </div>
                    <i onClick={off} role="button" className="bi bi-x-circle"></i>

                </div>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                // validateOnBlur={true}
                >{
                        ({ handleSubmit, values, setFieldValue }) => (
                            <Form onSubmit={handleSubmit}>

                                {React.cloneElement(<MemberFormStep1 />, { setFieldValue, values })}

                                <div className="w-100 justify-content-end d-flex gap-3" style={{ marginTop: "20px" }}>
                                    {step > 0 && (
                                        <CustomButton
                                            type="button"
                                            onClick={() => { setStep((s) => s - 1); setLoading(false) }}
                                            title="Back"
                                        />
                                    )}
                                    <CustomButton
                                        loading={loading}
                                        type="submit"
                                        title={"Save"}
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
export default MemberProfileModal;