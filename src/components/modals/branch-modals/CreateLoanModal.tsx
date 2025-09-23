import { ErrorMessage, Formik } from "formik"
import { Modal } from "react-bootstrap"
import ReusableInputs from "../../custom-input/ReusableInputs"
import CustomButton from "../../custom-button/custom-button"
import ReusableDropDownSelect from "../../custom-input/ReusableDropDownSelect"
import { useEffect, useState } from "react"
import api from "../../../app/api"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { useNavigate, useParams } from "react-router-dom"
import { IBranch } from "../../../interfaces/branch"
import * as Yup from "yup";
import MultiPartFormReusableDropDownSelect from "../../custom-input/MultiPartFormReusableDropDownSelect"
import { IMember } from "../../../interfaces/member"

interface IModalProps {
    on: boolean,
    off: () => void,
    memberInfo: IMember | undefined
}

interface ILoanProduct {
    duration: number;
    rate: number;
    _id: string
}

const CreateLoanModal: React.FC<IModalProps> = ({ on, off, memberInfo }) => {
    const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
    const orgProfile = useSelector((state: RootState) => state.auth.organisationData);
    const [bRules, setBRules] = useState<any>();
    const [loanProducts, setLoanProducts] = useState<ILoanProduct[]>();
    const navigate = useNavigate();

    const { id } = useParams()

    const [authorizers, setAuthorizers] = useState([]);
    const [loading, setLoading] = useState(false);


    const initialValues = {
        organization: orgProfile?.id,
        branch: memberInfo?.branch,
        principal: null,
        tenure: null,
        penalty: bRules?.dailyLatePercentage,
        member: memberInfo?._id,
        marketerId: staffProfile?.id,
        lateFeeRate:null,
        calculationMethod:'percentage'

    }
    const validationSchema = Yup.object({
        principal: Yup.string()
            .matches(/^[0-9]+$/, "Must be digits only")
            .min(3, "Must be at least 3 digits")
            .required("Required"),
        tenure: Yup.object().required('Required')
    });

    const handleApplyForLoan = async (v: any) => {
        console.log({ seeDeptDet: v })
        setLoading(true);
        try {
            
        const res = await api.post(`/loan`, { ...v,principal:+v.principal, interestRate: v.tenure?.value?.rate,tenureMonths: v.tenure?.value?.duration,lateFeeRate:bRules?.dailyLatePercentage});
            if (res.status == 201) {
                // dispatch(setToken(payload?.token));
                // dispatch(setStaffProfile(staffProfile));
                toast.success('Application sent for review!');
                off();
            }

        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Loan application unsuccesful, Kindly retry.');
        } finally {
            setLoading(false);
        }

    }


    const getBusinessRule = async () => {
        try {
            // const res = await api.get(`/rule/products/${orgData?.id}`);
            const res = await api.get(`/rule/${orgProfile?.id}`);
            setBRules(res?.data?.payload);
            //  let options = res?.data?.payload?.interestRates.map((item: any) => ({
            //         value: item?.id,
            //         label: item?.name,
            //     }))
            let loanProduct = res?.data?.payload?.interestRates.map((rates: any) => ({
  label: `${rates?.duration} Weeks : ${rates?.rate}%`,
  value: { duration: rates?.duration, rate: rates?.rate }
}));
            setLoanProducts(loanProduct)
            // if (res.status == 200) {
            //     console.log({ hereIsDepts: res?.data?.payload })

            //     // setBRules(options);
            //     // const { payload } = res.data;
            //     // console.log({ seePayloadFromOtp: payload })
            //     // const staffProfile = payload?.staffData;
            //     // dispatch(setToken(payload?.token));
            //     // dispatch(setStaffProfile(staffProfile));
            // }

        } catch (err: any) {
            // toast.error(err?.response?.data?.message || 'Invalid or expired OTP');
        } finally {
            setLoading(false);
        }
    }

    const getBranches = async () => {
        try {
            const res = await api.get(`/branches?organizationId=${orgProfile?.id}&mode=dropdown&staffLevel=super-admin&userClass=authorizer`);
            let auths = res?.data?.payload.map((auth: any) => ({
                value: auth?._id,
                label: auth?.name
            }))
            // console.log({ dataSent: res?.data?.payload })
            setAuthorizers(auths)
            if (res.status == 200) {

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
            // getAllStates();
            getBusinessRule();
        }, [navigate])



    return (
        <Modal size="lg" show={on}>
            <Modal.Header>
                <div className="d-flex justify-content-between w-100">
                    <p className="m-0 p-0 fw-bold">Create New Loan</p>
                    <i onClick={off} role="button" className="bi bi-x-circle"></i>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    onSubmit={(v) => handleApplyForLoan(v)}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >{
                        ({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <div className='w-100'>
                                    <ReusableInputs
                                        inputType='text-input'
                                        placeholder="Amount"
                                        id='principal'
                                        // icon='bi bi-envelope-fill'
                                        // value={values.email}
                                        name='principal'
                                        label="Requested Amount"
                                        className="mb-3 w-100"
                                        required
                                    />
                                    <ErrorMessage name='principal' component="div" className="text-danger" />
                                </div>

                                <div className='w-100 mt-2'>
                                    <MultiPartFormReusableDropDownSelect
                                    label="Loan Tenure"
                                    name="tenure"
                                    options={loanProducts?loanProducts:[]}
                                    />
                                    {/* <ErrorMessage name='reference' component="div" className="text-danger" /> */}
                                </div>

                                <div className='w-100 mt-2'>
                                    <ReusableInputs
                                        inputType='text-input'
                                        placeholder="Purpose"
                                        id='purpose'
                                        // icon='bi bi-envelope-fill'
                                        // value={values.email}
                                        name='purpose'
                                        label="Loan Purpose"
                                        className="mb-3 w-100"
                                        required
                                    />
                                    <ErrorMessage name='purpose' component="div" className="text-danger" />
                                </div>

<div className="mt-4">
                    <p className="text-danger">Kindly note that late repayment is set at {bRules?.dailyLatePercentage} %</p>
                </div>
                                <div className="d-flex flex-column gap-3 w-75">

                                    {/* <p>{branchInfo.}</p> */}
                                    <CustomButton loading={loading} className="w-75 mt-4 p-2" title="Continue" />
                                </div>
                            </form>
                        )
                    }

                </Formik>
            </Modal.Body>
        </Modal>
    )

}
export default CreateLoanModal;