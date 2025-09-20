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
import { useParams } from "react-router-dom"
import { IBranch } from "../../../interfaces/branch"
import * as Yup from "yup";
import MultiPartFormReusableDropDownSelect from "../../custom-input/MultiPartFormReusableDropDownSelect"

interface IModalProps {
    on: boolean,
    off: () => void,
    branchInfo: IBranch | undefined
}
const FundBranchModal: React.FC<IModalProps> = ({ on, off, branchInfo }) => {
    const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
    const orgProfile = useSelector((state: RootState) => state.auth.organisationData);
    const { id } = useParams()

    const [authorizers, setAuthorizers] = useState([]);
    const [loading, setLoading] = useState(false);


 const initialValues =    {
  "branchId": branchInfo?.id,
  "organizationId": staffProfile?.organization,
  "amount": null,
  "purpose": "",
  "reference": "",
  "createdBy": staffProfile?.id,
}
     const validationSchema = Yup.object({
      amount: Yup.string()
        .matches(/^[0-9]+$/, "Must be digits only")
        .min(3, "Must be at least 3 digits")
        .required("Required"),
        reference:Yup.string().min(12, "Must be at least 12 digits").required('Required')
    });

    const handleAddBankDetails = async (v: any) => {
        console.log({ seeDeptDet: v })
        setLoading(true);
        try {
            let payload = {
                branchId: v?.branchId?.value,
                staffId: id,
                addedBy: staffProfile?.id
            }
            const res = await api.post(`/branch/fund`, {...v,amount:+v?.amount}
            );
            if (res.status == 201) {
                // dispatch(setToken(payload?.token));
                // dispatch(setStaffProfile(staffProfile));
                toast.success('Account succesfully funded!');
                off();
            }

        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Bank information is not set!');
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
        // getBranches()
    }, [])



    return (
        <Modal size="lg" show={on}>
            <Modal.Header>
                <div className="d-flex justify-content-between w-100">
                    <p className="m-0 p-0 fw-bold">Fund Branch</p>
                    <i onClick={off} role="button" className="bi bi-x-circle"></i>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    onSubmit={(v) => handleAddBankDetails(v)}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >{
                        ({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <div className='w-100'>
                                                    <ReusableInputs
                                                        inputType='text-input'
                                                        placeholder="Amount"
                                                        id='amount'
                                                        // icon='bi bi-envelope-fill'
                                                        // value={values.email}
                                                        name='amount'
                                                        label="Deposited Amount"
                                                        className="mb-3 w-100"
                                                        required
                                                    />
                                                    <ErrorMessage name='amount' component="div" className="text-danger" />
                                                </div>

                                                <div className='w-100'>
                                                    <ReusableInputs
                                                        inputType='text-input'
                                                        placeholder="Transaction Reference"
                                                        id='reference'
                                                        // icon='bi bi-envelope-fill'
                                                        // value={values.email}
                                                        name='reference'
                                                        label="Transaction Reference"
                                                        className="mb-3 w-100"
                                                        required
                                                    />
                                                    <ErrorMessage name='reference' component="div" className="text-danger" />
                                                </div>

                                                <div className='w-100'>
                                                    <ReusableInputs
                                                        inputType='text-input'
                                                        placeholder="Remark"
                                                        id='purpose'
                                                        // icon='bi bi-envelope-fill'
                                                        // value={values.email}
                                                        name='purpose'
                                                        label="Remark"
                                                        className="mb-3 w-100"
                                                        required
                                                    />
                                                    <ErrorMessage name='purpose' component="div" className="text-danger" />
                                                </div>
                                
                                <div className="d-flex flex-column gap-3 w-75">

                                    {/* <p>{branchInfo.}</p> */}
                                    <CustomButton loading={loading} className="w-75 mt-4 p-2" title="Save" />
                                </div>
                            </form>
                        )
                    }

                </Formik>

            </Modal.Body>
        </Modal>
    )

}
export default FundBranchModal;