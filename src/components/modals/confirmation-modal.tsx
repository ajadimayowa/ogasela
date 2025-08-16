import { off } from "process"
import { Button, Image, Modal, Spinner } from "react-bootstrap";
import foodTray from '../../assets/icons/food-bowl.png'

interface IModalProps {
    off:()=>void,
    on:boolean,
    loading:boolean,
    action?:any
}
const ConfirmationModal : React.FC<IModalProps> = ({off,on,loading,action})=>{
    

    return (
        <Modal centered animation backdrop onBackdropClick={off} show={on}>
            <Modal.Header>
                <div className="d-flex justify-content-between  w-100">
                    {/* <p className="fw-bold p-0 m-0">Access Code</p>
                    <i onClick={off} className="bi bi-x-circle-fill text-primary" role="button"></i> */}
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="w-100 text-center">
                    <div className="d-flex justify-content-center">
                        <div className="w-75">
                            {/* <Image src={foodTray}/> */}
                            <i className="bi bi-exclamation-triangle text-primary fs-1"></i>
                        <p className="text-primary fw-bold m-0">Are you sure?</p>
                         <small className="m-4">You are about to Consent to this request.</small> 
                        </div>
                    </div>
                   <div className="d-flex gap-3 w-100 justify-content-center">
                    <Button disabled={loading} onClick={()=>action()} variant="primary mt-4" style={{minWidth:'8em', height:'50px'}}>{loading?<Spinner size="sm"/>:'Yes, Submit'}</Button>
                    <Button onClick={off} variant="secondary border mt-4" style={{minWidth:'8em', height:'50px'}}>Cancel</Button>
                   </div>
                </div>
            </Modal.Body>
        </Modal>
    )
} 
export default ConfirmationModal