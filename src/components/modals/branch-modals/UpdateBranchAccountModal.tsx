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
const UpdateBranchAccountModal: React.FC<IModalProps> = ({ on, off, branchInfo }) => {
    const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
    const orgProfile = useSelector((state: RootState) => state.auth.organisationData);
    const { id } = useParams()

    const [authorizers, setAuthorizers] = useState([]);
    const [loading, setLoading] = useState(false);



    const initialValues = {
        bankName:branchInfo?.bankDetails?.bankName,
        accountNumber:branchInfo?.bankDetails?.accountNumber,
        accountName:branchInfo?.bankDetails?.accountName,
        updatedBy:staffProfile?.id
    }

     const validationSchema = Yup.object({
      accountNumber: Yup.string()
        .matches(/^[0-9]+$/, "Must be digits only")
        .min(10, "Must be at least 10 digits")
        .required("Required"),
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
            const res = await api.put(`/branch/update-account/${branchInfo?.id}`, v
            );
            if (res.status == 200) {
                // dispatch(setToken(payload?.token));
                // dispatch(setStaffProfile(staffProfile));
                toast.success('Account details updated!');
                off();
            }

        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Failed to create staff');
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
                    <p className="m-0 p-0 fw-bold">Update Bank Details</p>
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
                                                        placeholder="Account Name"
                                                        id='accountName'
                                                        // icon='bi bi-envelope-fill'
                                                        // value={values.email}
                                                        name='accountName'
                                                        label="Account Name"
                                                        className="mb-3 w-100"
                                                        required
                                                    />
                                                    <ErrorMessage name='accountName' component="div" className="text-danger" />
                                                </div>

                                                <div className='w-100'>
                                                    <ReusableInputs
                                                        inputType='text-input'
                                                        placeholder="Account Number"
                                                        id='accountNumber'
                                                        // icon='bi bi-envelope-fill'
                                                        // value={values.email}
                                                        name='accountNumber'
                                                        label="Account Number"
                                                        className="mb-3 w-100"
                                                        required
                                                    />
                                                    <ErrorMessage name='accountNumber' component="div" className="text-danger" />
                                                </div>

                                                <div className='w-100'>
                                                    <ReusableInputs
                                                        inputType='text-input'
                                                        placeholder="Branch Name"
                                                        id='bankName'
                                                        // icon='bi bi-envelope-fill'
                                                        // value={values.email}
                                                        name='bankName'
                                                        label="Bank Name"
                                                        className="mb-3 w-100"
                                                        required
                                                    />
                                                    <ErrorMessage name='bankName' component="div" className="text-danger" />
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
export default UpdateBranchAccountModal;