import { Formik } from "formik"
import { Modal } from "react-bootstrap"
import ReusableInputs from "../../custom-input/ReusableInputs"
import CustomButton from "../../custom-button/custom-button"
import ReusableDropDownSelect from "../../custom-input/ReusableDropDownSelect"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import api from "../../../app/api"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"

interface IModalProps {
    on: boolean,
    off: () => void
}
const CreateRoleModal: React.FC<IModalProps> = ({ on, off }) => {
    const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
    const orgProfile = useSelector((state: RootState) => state.auth.organisationData);

    const [depts, setDepts] = useState<any[]>([]);
    const [authorizers, setAuthorizers] = useState([]);
    const [loading, setLoading] = useState(false);



    const initialValues = {
        nameOfOrg: orgProfile?.nameOfOrg,
        orgEmail: orgProfile?.orgEmail,
        rolePermission: 'test',
        roleCreatedByName: staffProfile?.fullName,
        roleCreatedById: staffProfile?.id,
        roleDescription: '',
        authorizer: '',
        organization: orgProfile?.id,
    }

    const handleRoleCreation = async (v: any) => {
        console.log({ seeDeptDet: v })
        setLoading(true);
        try {
            let payload = {
                ...v,
                approvedById: v?.authorizer?.value,
                roleDepartment: v?.roleDepartment?.value
            }
            const res = await api.post('/role/create', payload
            );
            if (res.status == 201) {
                // dispatch(setToken(payload?.token));
                // dispatch(setStaffProfile(staffProfile));
                toast.success('Role Created!');
                setLoading(false)
                off();
            }

        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Failed to create staff');
            setLoading(false)
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

    const getDepartments = async () => {
        try {
            const res = await api.get(`/department/by-organization/${orgProfile?.id}`);
            if (res.status == 200) {
                // console.log({ dataSent: res?.data?.payload })
                setDepts(res?.data?.payload)
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
        getAuthorizers();
        getDepartments();
    }, [])
    return (
        <Modal show={on}>
            <Modal.Header>
                <div className="d-flex justify-content-between w-100">
                    <p className="m-0 p-0 fw-bold">Create new role.</p>
                    <i onClick={off} role="button" className="bi bi-x-circle"></i>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    onSubmit={(v) => handleRoleCreation(v)}
                    initialValues={initialValues}
                >{
                        ({handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <div className="d-flex flex-column gap-3 w-75">

                                    <ReusableInputs
                                        inputType='text-input'
                                        name='roleName'
                                        id='roleName'
                                        label='Role Title'
                                        placeholder='i.e Head of HR'
                                        className=''
                                    />

                                    <ReusableDropDownSelect
                                        inputType='text-i'
                                        name='roleDepartment'
                                        id='roleDepartment'
                                        label='Role Department'
                                        options={depts}
                                    />

                                    <ReusableDropDownSelect
                                        inputType='text-i'
                                        name='authorizer'
                                        id='authorizer'
                                        label='Select Authorizer'
                                        options={authorizers}
                                    />

                                    <ReusableInputs
                                        inputType='text-area'
                                        name='roleDescription'
                                        id='roleDescription'
                                        label='Description'
                                        placeholder='Brief Description'
                                    />
                                    <CustomButton className="w-75 mt-4 p-2" title="Submit For Approval" />
                                </div>
                            </form>
                        )
                    }

                </Formik>

            </Modal.Body>
        </Modal>
    )

}
export default CreateRoleModal;