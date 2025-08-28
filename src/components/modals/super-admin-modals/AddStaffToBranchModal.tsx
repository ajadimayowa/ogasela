import { Formik } from "formik"
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

interface IModalProps {
    on: boolean,
    off: () => void
}
const AddStaffToBranchModal: React.FC<IModalProps> = ({ on, off }) => {
    const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
    const orgProfile = useSelector((state: RootState) => state.auth.organisationData);
    const {id} = useParams()

    const [authorizers, setAuthorizers] = useState([]);
    const [loading, setLoading] = useState(false);

    

    const initialValues = {
        branchId:null,
        staffId:id,
        addedBy :staffProfile?.id
    }

    const handleAddStaffToBranch = async (v: any) => {
        console.log({seeDeptDet:v})
        setLoading(true);
        try {
            let payload = {
                branchId:v?.branchId?.value,
                staffId:id,
                addedBy :staffProfile?.id
            }
            const res = await api.post('/branch/add-staff', payload
            );
            if (res.status == 200) {
                // dispatch(setToken(payload?.token));
                // dispatch(setStaffProfile(staffProfile));
                toast.success('Staff added to branch');
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
            const res = await api.get(`/branches?organisationId=${orgProfile?.id}&mode=dropdown&staffLevel=super-admin&userClass=authorizer`);
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
        getBranches()
    }, [])



    return (
        <Modal show={on}>
            <Modal.Header>
                <div className="d-flex justify-content-between w-100">
                    <p className="m-0 p-0 fw-bold">Add staff to branch</p>
                    <i onClick={off} role="button" className="bi bi-x-circle"></i>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    onSubmit={(v) => handleAddStaffToBranch(v)}
                    initialValues={initialValues}
                >{
                        ({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="d-flex flex-column gap-3 w-75">

                                    <ReusableDropDownSelect
                                        inputType='text-i'
                                        name='branchId'
                                        id='branchId'
                                        label='Select Branch'
                                        options={authorizers}
                                    />
                                    <CustomButton loading={loading} className="w-75 mt-4 p-2" title="Add to branch" />
                                </div>
                            </form>
                        )
                    }

                </Formik>

            </Modal.Body>
        </Modal>
    )

}
export default AddStaffToBranchModal;