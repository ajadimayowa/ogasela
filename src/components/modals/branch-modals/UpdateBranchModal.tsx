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
const UpdateBranchModal: React.FC<IModalProps> = ({ on, off, branchInfo }) => {
    const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
    const orgProfile = useSelector((state: RootState) => state.auth.organisationData);
    const { id } = useParams()

    const [authorizers, setAuthorizers] = useState([]);
    const [loading, setLoading] = useState(false);



    const initialValues = {
        ...branchInfo,
        
    }

    const validationSchema = Yup.object({
        // title: Yup.object()
        //     .shape({
        //         value: Yup.string().required(),
        //         label: Yup.string().required(),
        //     })
        //     .nullable()
        //     .required("Title is required"),
        // alias: Yup.string().required("Required"),
        // maritalStatus: Yup.object()
        //     .shape({
        //         value: Yup.string().required(),
        //         label: Yup.string().required(),
        //     })
        //     .nullable()
        //     .required("Required"),
        // dob: Yup.string().required("Required"),

        // stateOfOrigin: Yup.object()
        //     .shape({
        //         value: Yup.string().required(),
        //         label: Yup.string().required(),
        //     })
        //     .nullable()
        //     .required("Required"),

        // lgaOfOrigin: Yup.object()
        //     .shape({
        //         value: Yup.string().required(),
        //         label: Yup.string().required(),
        //     })
        //     .nullable()
        //     .required("Required"),

        // occupation: Yup.string().required("Required"),

        // utilityBillPhoto: Yup.mixed()
        //     .required('A picture is required'),
        // idCardPhoto: Yup.mixed()
        //     .required('A picture is required'),
        // passportPhoto: Yup.mixed()
        //     .required('A picture is required'),
        // attestationDocumentFile: Yup.mixed()
        //     .required('A Pdf is required').test('fileType', 'Only PDF files are accepted', (value: any) => {
        //             return value && value.type === 'application/pdf';
        //     }),

        // language: Yup.string().required("Required"),
        // homeAddress: Yup.string().required("Required"),
        // nearestBusStop: Yup.string().required("Required"),
        // durationOfStay: Yup.string().required("Required"),
        // selectedModeOfIdentification: Yup.object()
        //     .shape({
        //         value: Yup.string().required('Required').label('Mode of ID'),
        //         label: Yup.string().required('Required').label('Mode of ID'),
        //     })
        //     .nullable()
        //     .required("Required").label('Mode of ID'),
        // idIdentificationNumber: Yup.string().required("Required"),
        // officeAddress: Yup.string().required("Required"),
        // noOfKids: Yup.number().required("Required"),

    })

    const handleAddStaffToBranch = async (v: any) => {
        console.log({ seeDeptDet: v })
        setLoading(true);
        try {
            let payload = {
                branchId: v?.branchId?.value,
                staffId: id,
                addedBy: staffProfile?.id
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
                    <p className="m-0 p-0 fw-bold">Update Branch</p>
                    <i onClick={off} role="button" className="bi bi-x-circle"></i>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    onSubmit={(v) => handleAddStaffToBranch(v)}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >{
                        ({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <table className="table table-striped">
                                    <tbody>
                                        <tr>
                                            <td className=''>
                                                <div className='w-100'>
                                                    <ReusableInputs
                                                        inputType='text-input'
                                                        placeholder="Branch Name"
                                                        id='name'
                                                        // icon='bi bi-envelope-fill'
                                                        // value={values.email}
                                                        name='name'
                                                        label="Name"
                                                        className="mb-3 w-100"
                                                        required
                                                    />
                                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                                </div>

                                            </td>

                                            <td className=''>
                                                <div className='w-100'>
                                                    <ReusableInputs
                                                    disabled={true}
                                                        inputType='text-input'
                                                        placeholder="Manager"
                                                        id='branch-manager'
                                                        // icon='bi bi-envelope-fill'
                                                        // value={values.email}
                                                        name='manager.fullName'
                                                        label="Manager"
                                                        className="mb-3 w-100"
                                                        required
                                                    />
                                                    <ErrorMessage name='branch-manager' component="div" className="text-danger" />
                                                </div>

                                            </td>

                                            <td className=''>
                                                <div className='w-100'>
                                                    <ReusableInputs
                                                    disabled={true}
                                                        inputType='text-input'
                                                        placeholder="LGA"
                                                        id='lga'
                                                        // icon='bi bi-envelope-fill'
                                                        // value={values.email}
                                                        name='lga'
                                                        label="LGA"
                                                        className="mb-3 w-100"
                                                        required
                                                    />
                                                    <ErrorMessage name='lga' component="div" className="text-danger" />
                                                </div>

                                            </td>
                                            {/* <td className=''>
                                                <div className='w-100'>
                                                    <MultiPartFormReusableDropDownSelect
                                                        name='title'
                                                        label='Title'
                                                        options={[]}
                                                    />
                                                </div>
                                            </td> */}

                                            <div className='w-100'>
                                                    <ReusableInputs
                                                        inputType='text-area'
                                                        placeholder="Home Address"
                                                        id="address"
                                                        // icon='bi bi-lock-fill'
                                                        // icon2='bi bi-eye'
                                                        name="address"
                                                        label="Address"
                                                        className="mb-3 w-100"
                                                    // value={values.password}
                                                    // onChange={handleChange}
                                                    // required
                                                    />
                                                    <ErrorMessage name="address" component="div" className="text-danger" />
                                                </div>

                                            
                                        </tr>
                                        <tr>
                                            <td colSpan={5}></td>
                                        </tr>
                                        {/* line 2 */}
                                    </tbody>
                                </table>
                                <div className="d-flex flex-column gap-3 w-75">

                                    {/* <ReusableDropDownSelect
                                        inputType='text-i'
                                        name='branchId'
                                        id='branchId'
                                        label='Select Group'
                                        options={authorizers}
                                    /> */}
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
export default UpdateBranchModal;