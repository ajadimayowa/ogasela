import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik"
import { Button, Card, Modal } from "react-bootstrap"
import ReusableInputs from "../../custom-input/ReusableInputs"
import CustomButton from "../../custom-button/custom-button"
import ReusableDropDownSelect from "../../custom-input/ReusableDropDownSelect"
import { useEffect, useState } from "react"
import api from "../../../app/api"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { duration } from "moment"
import * as Yup from 'yup';

interface IModalProps {
    on: boolean,
    off: () => void
}
const CreateRuleModal: React.FC<IModalProps> = ({ on, off }) => {
    const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
    const orgProfile = useSelector((state: RootState) => state.auth.organisationData);

    const [authorizers, setAuthorizers] = useState([]);
    const [loading, setLoading] = useState(false);



    const initialValues = {
        companyId: orgProfile?.id,
        interestRates: [{
            duration: null,
            rate: null
        }],
        loanDurations: 0, penaltyFee: 10, dailyLatePercentage: null, createdBy: staffProfile?.id,
    }

    const validationSchema = Yup.object().shape({
        dailyLatePercentage: Yup.number().typeError('Cannot be null').required('Late Repayment % Is Required'),
        interestRates: Yup.array()
            .of(
                Yup.object().shape({
                    duration: Yup.number().typeError('Cannot be null').required('Duration is required'),
                    rate: Yup.number().typeError('Cannot be null').required('Intrest is required'),
                })
            )
            .min(1)
            .max(5),
    });

    const handleRuleCreation = async (v: any) => {
        console.log({ seeDeptDet: v })
        setLoading(true);
        try {
            let payload = {
                ...v
            }
            const res = await api.post('/rule/create', payload
            );
            if (res.status == 201) {
                // dispatch(setToken(payload?.token));
                // dispatch(setStaffProfile(staffProfile));
                toast.success('New Rule Uploaded!');
                off();
            }

        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Error creating rule.');
        } finally {
            setLoading(false);
        }

    }

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
            toast.error(err?.response?.data?.message || 'Invalid or expired OTP');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // getAuthorizers()
    }, [])



    return (
        <Modal size="lg" show={on}>
            <Modal.Header>
                <div className="d-flex justify-content-between w-100">
                    <p className="m-0 p-0 fw-bold">Create Loan Rules</p>
                    <i onClick={off} role="button" className="bi bi-x-circle"></i>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    onSubmit={(v) => handleRuleCreation(v)}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >{
                        ({ handleSubmit, values }) => (
                            <Form onSubmit={handleSubmit}>

                                <div className="text-danger">
                                    <ReusableInputs
                                    inputType='number-input'
                                    name='dailyLatePercentage'
                                    id='dailyLatePercentage'
                                    label='Late Payment Fee (%)'
                                    placeholder=''
                                    className=''
                                />
                                <ErrorMessage name='dailyLatePercentage' component="div" />
                                </div>
                                <div className="d-flex flex-column gap-3">

                                    <FieldArray name="interestRates">
                                        {({ push, remove }) => (
                                            <div>
                                                <hr />

                                                {values.interestRates.length < 12 && (
                                                    <div className="d-flex justify-content-between">
                                                        <label>Loan Types</label>
                                                        <a onClick={() =>
                                                            push({
                                                                duration: null,
                                                                rate: null,
                                                            })
                                                        } href="#">+ Add New</a>
                                                    </div>
                                                )}
                                                <div className="w-100 mt-3">
                                                    {values.interestRates.map((day, dayIndex) => (
                                                        <Card className="rounded border-1 rounded-3 p-2 shadow shadow-sm" key={dayIndex} style={{ marginBottom: 20 }}>
                                                            <div className="d-flex justify-content-between w-100">
                                                                <div className="d-flex gap-2">
                                                                    <div className="text-danger">
                                                                        <ReusableInputs maxInput={12} label="Duration (Month)" name={`interestRates[${dayIndex}].duration`} inputType="number-input" />
                                                                        <ErrorMessage name={`interestRates[${dayIndex}].duration`} component="div" />
                                                                    </div>
                                                                    <div className="text-danger">
                                                                        <ReusableInputs label="Intrest (%)" name={`interestRates[${dayIndex}].rate`} inputType="number-input" />
                                                                        <ErrorMessage name={`interestRates[${dayIndex}].rate`} component="div" />
                                                                    </div>
                                                                </div>

                                                                {
                                                                    values.interestRates.length > 1 &&
                                                                    <i role="button" onClick={() => remove(dayIndex)} className="bi bi-trash text-danger"></i>}
                                                            </div>

                                                        </Card>
                                                    ))}
                                                </div>

                                            </div>
                                        )}
                                    </FieldArray>
                                    <CustomButton loading={loading} className="w-75 mt-4 p-2" title="Submit For Approval" />
                                </div>
                            </Form>
                        )
                    }

                </Formik>

            </Modal.Body>
        </Modal>
    )

}
export default CreateRuleModal;