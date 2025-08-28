import React from "react";

interface CardProps{
    label:string,
    value:string,
    icon1:string,
    icon2:string
}
const DashboardDataCard : React.FC<any> = ({data})=>{
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
              <div className="fs-4">{data?.value}</div>
              {/* <div>2</div> */}
            </div>
            {/* <div></div>
            <i className={`${module.icon} module-icon`}></i>
            <h6 className="mt-2">{module.name}</h6> */}
          </div>
    )
}
 export default DashboardDataCard;