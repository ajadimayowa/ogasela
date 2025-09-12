import React from "react";
import { convertToThousand } from "../../utils/helpers";

interface CardProps{
    label:string,
    value:string,
    icon1:string,
    icon2:string,
    currency:boolean
    extra?:boolean
}
const SuperAdminDashboardDataCard : React.FC<any> = ({currency,data,extra})=>{
    return (
        <div
            // key={module.name}
            className="module-card"
          // onClick={() => navigate(module.path)}
          >
            <div className='d-flex justify-content-between gap-2'>
              <div className={`text-${data?.color}`}>{data?.label}</div>
              <i className={data?.icon1}></i>
            </div>
            <div className='d-flex align-items-center justify-content-between gap-2' style={{height:'50px'}}>
              <div className="fs-4">{currency?convertToThousand(data?.value):data?.value}</div>
              {/* <div>2</div> */}
            </div>
            {
              extra&&
              <div className='d-flex align-items-center gap-2 mt-2'>
                <p className="p-0 m-0 text-primary">Total Funding :</p>
                <p className="p-0 m-0">{convertToThousand(1000000000000)}</p>
              </div>
            }

            {/* <div></div>
            <i className={`${module.icon} module-icon`}></i>
            <h6 className="mt-2">{module.name}</h6> */}
          </div>
    )
}
 export default SuperAdminDashboardDataCard;