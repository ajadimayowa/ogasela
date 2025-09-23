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

interface IModalProps {
    on: boolean,
    off: () => void
}
const CreateDeptModal: React.FC<IModalProps> = ({ on, off }) => {
    const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
    const orgProfile = useSelector((state: RootState) => state.auth.organisationData);

    const [authorizers, setAuthorizers] = useState([]);
    const [loading, setLoading] = useState(false);

    

    const initialValues = {
        nameOfOrg: orgProfile?.nameOfOrg,
        orgEmail: orgProfile?.orgEmail,
        nameOfDep: '',
        organization: orgProfile?.id,
        createdByName: staffProfile?.fullName,
        createdById: staffProfile?.id,
        description: '',
        authorizer: '',
    }

    const handleDeptCreation = async (v: any) => {
        console.log({seeDeptDet:v})
        setLoading(true);
        try {
            let payload = {
                ...v,
                approvedById:v?.approvedById?.value,
            }
            const res = await api.post('/department/create', payload
            );
            if (res.status == 201) {
                // dispatch(setToken(payload?.token));
                // dispatch(setStaffProfile(staffProfile));
                toast.success('Dept Created!');
                off();
            }

        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Failed to create staff');
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
        getAuthorizers()
    }, [])



    return (
        <Modal show={on}>
            <Modal.Header>
                <div className="d-flex justify-content-between w-100">
                    <p className="m-0 p-0 fw-bold">Create new department</p>
                    <i onClick={off} role="button" className="bi bi-x-circle"></i>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    onSubmit={(v) => handleDeptCreation(v)}
                    initialValues={initialValues}
                >{
                        ({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="d-flex flex-column gap-3 w-75">

                                    <ReusableInputs
                                        inputType='text-input'
                                        name='nameOfDep'
                                        id='nameOfDep'
                                        label='Name Of Department'
                                        placeholder='i.e Marketing'
                                        className=''
                                    />

                                    <ReusableInputs
                                        inputType='text-area'
                                        name='description'
                                        id='description'
                                        label='Description'
                                        placeholder='Brief Description'
                                    />
                                    <ReusableDropDownSelect
                                        inputType='text-i'
                                        name='approvedById'
                                        id='approvedById'
                                        label='Select Authorizer'
                                        options={authorizers}
                                    />
                                    <CustomButton loading={loading} className="w-75 mt-4 p-2" title="Submit For Approval" />
                                </div>
                            </form>
                        )
                    }

                </Formik>

            </Modal.Body>
        </Modal>
    )

}
export default CreateDeptModal;