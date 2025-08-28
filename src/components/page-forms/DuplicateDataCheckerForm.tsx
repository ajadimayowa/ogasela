
import React, { useEffect } from "react";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Image } from 'react-bootstrap';
import '../../styles/sliding-forms.scss';
// import compnayLogo from '../assets/images/fsh-logo.png'; // Adjust the path as necessary
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import api from "../../app/api";
import { toast } from 'react-toastify';
import { ILga, IState } from "../../interfaces/interface";
import ReusableDropDownSelect from "../custom-input/ReusableDropDownSelect";
import { RootState } from "../../store/store";
import CustomButton from "../custom-button/custom-button";
import Spreadsheet, { CellBase, Matrix } from "react-spreadsheet";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export interface ILogin {
    description: string;
    createdBy: string;
    createdByModel: string;
    organizationId: string;

}
type MyCell = CellBase & { isDuplicate?: boolean };

interface Cell {
    value: any;
    style?: React.CSSProperties;
}

type CustomCell = CellBase & { isDuplicate?: boolean };
const DuplicateDataCheckerForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [orgs, setOrgs] = useState<any[]>([]);
    const [lgas, setLgas] = useState<ILga[]>([]);
    const [headers, setHeaders] = useState<string[]>(["Column 1", "Column 2"]);
    const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);





    const initialValues = {
        nameOfDept: '',
        organizationId: staffProfile?.organization || '',
        description: '',
        createdBy: '',
        createdByModel: ''
    };
    const validationSchema = Yup.object().shape({
        nameOfDept: Yup.string()
            .required('Name Of Department is required'),
        description: Yup.string()
            .required('Description is required')

    });

    const handleSubmit = async (payload: ILogin) => {
        setLoading(true);
        let payloadData = {
            ...payload,
            organizationId: staffProfile?.organization || '',
            createdBy: staffProfile?.id || '',
            createdByModel: "Staffs"
        }
        console.log({ sending: payloadData });
        try {
            const res = await api.post('department/create', payloadData);
            // navigate('/root-login');
            toast.success('Department created successfully!');
            setLoading(false);
        } catch (error: any) {
            console.log({ errorHere: error })
            setLoading(false);
            if (error?.data?.message) {
                toast.error(error?.data?.message)
            } else {
                console.log({ seeError: error })
                toast.error(error?.message)
            }
        }
    };
const [data, setData] = useState<(CustomCell | undefined)[][]>([
  [{ value: "Column 1" }, { value: "Column 2" }], // header row
  [{ value: "" }, { value: "" }],                 // first data row
]);

  const [uniqueColumns, setUniqueColumns] = useState<number[]>([]);


  // ✅ Toggle unique column selection
  const toggleUniqueColumn = (colIndex: number) => {
    setUniqueColumns((prev) =>
      prev.includes(colIndex)
        ? prev.filter((c) => c !== colIndex)
        : [...prev, colIndex]
    );
  };

  // ✅ Add Row
  const addRow = () => {
    const newRow = Array(data[0].length).fill({ value: "" });
    setData([...data, newRow]);
  };

  const addColumn = () => {
  const newHeader = `Column ${headers.length + 1}`;
  setHeaders([...headers, newHeader]);

  const newData = data.map((row, rowIndex) => [
    ...row,
    { value: rowIndex === 0 ? newHeader : "" },
  ]);
  setData(newData);
};

  const checkDuplicates = () => {
  let flaggedData = [...data];

  uniqueColumns.forEach((colIndex) => {
    const seen = new Map<string, number[]>();

    flaggedData.forEach((row, rowIndex) => {
      if (rowIndex === 0) return; // skip header row
      const cellValue = row[colIndex]?.value?.toString().trim();
      if (!cellValue) return;
      if (seen.has(cellValue)) {
        seen.get(cellValue)?.forEach((rIdx) => {
          if (flaggedData[rIdx][colIndex]) {
            flaggedData[rIdx][colIndex]!.isDuplicate = true;
          }
        });
        if (row[colIndex]) {
          row[colIndex]!.isDuplicate = true;
        }
      } else {
        seen.set(cellValue, [rowIndex]);
      }
    });
  });

  setData(flaggedData);
  toast.success("Duplicates checked — flagged in red.");
};

  const handleChange = (newData: (CustomCell | undefined)[][]) => {
  // keep headers updated from first row
  const newHeaders = newData[0].map((cell) => cell?.value?.toString() || "");
  setHeaders(newHeaders);

  // reset duplicates
  let updated = newData.map((row, rowIndex) =>
    row.map((cell) => {
      if (!cell) return cell;
      if (rowIndex === 0) return { ...cell, isDuplicate: false }; // never mark header
      return { ...cell, isDuplicate: false }; // reset duplicates first
    })
  );

  // ✅ re-run duplicate check immediately
  uniqueColumns.forEach((colIndex) => {
    const seen = new Map<string, number[]>();

    updated.forEach((row, rowIndex) => {
      if (rowIndex === 0) return; // skip header
      const cellValue = row[colIndex]?.value?.toString().trim();
      if (!cellValue) return;

      if (seen.has(cellValue)) {
        seen.get(cellValue)?.forEach((rIdx) => {
          if (updated[rIdx][colIndex]) {
            updated[rIdx][colIndex]!.isDuplicate = true;
          }
        });
        if (row[colIndex]) {
          row[colIndex]!.isDuplicate = true;
        }
      } else {
        seen.set(cellValue, [rowIndex]);
      }
    });
  });

  setData(updated);
};

  // ✅ Delete a row
  const deleteRow = (rowIndex: number) => {
    if (rowIndex < 0 || rowIndex >= data.length) return;
    const updated = [...data];
    updated.splice(rowIndex, 1);
    setData(updated);
  };

 const deleteColumn = () => {
  if (data.length === 0 || data[0].length === 0) return;

  // remove the last header
  setHeaders(headers.slice(0, -1));

  // remove the last column from every row
  const updated = data.map((row) => row.slice(0, -1));
  setData(updated);
};

  const handleDownload = () => {
  if (!data || data.length === 0) {
    toast.error("No data to export!");
    return;
  }

  const plainData = data.map((row) =>
    row.map((cell) => (cell ? cell.value || "" : ""))
  );

  const ws = XLSX.utils.aoa_to_sheet(plainData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const file = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(file, "spreadsheet.xlsx");

  toast.success("Excel downloaded successfully!");
};


    return (
        <Card className="sliding-form py-2 p-4 mt-2 shadow d-flex w-100">
 <div style={{ padding: "20px" }}>
      {/* ✅ Unique Column Checkboxes */}
      <div className="d-flex justify-content-end ">
        {/* <strong>Select Unique Columns: </strong> */}
        <div className="d-flex gap-2">
        <CustomButton
        title="+ Row"
        onClick={addRow} 
        />
        <CustomButton
        onClick={addColumn}
        title="+ Column"
        />
      </div>
      </div>
      <div style={{ marginBottom: "10px" }}>
  <div className="gap-2" style={{ marginBottom: "10px" }}>
  {headers.map((header, colIndex) => (
    <label className="gap-2" key={colIndex} style={{ marginRight: "15px" }}>
      <div className="d-flex gap-2">
      <input
        type="checkbox"
        checked={uniqueColumns.includes(colIndex)}
        onChange={() => toggleUniqueColumn(colIndex)}
      />
      {header}
    </div>
      
    </label>
  ))}
</div>
</div>
      

      {/* ✅ Spreadsheet */}
      <Spreadsheet
  data={data}
  onChange={handleChange}
  DataViewer={({ cell }: { cell: CustomCell | undefined }) => (
    <div
      style={{
        backgroundColor: cell && (cell as CustomCell).isDuplicate ? "salmon" : "white",
        padding: "4px",
      }}
    >
      {cell?.value}
    </div>
  )}
/>

      {/* ✅ Controls */}
      <div className="d-flex justify-content-between mt-3">
        <div className="d-flex gap-2">
        <CustomButton
        title="Save"
        className="bg-success"
        onClick={checkDuplicates} 
        />

        <CustomButton
        title="Download"
        className="bg-secondary text-dark"
        onClick={handleDownload} 
        />

        </div>
        
        <div className="d-flex gap-2">
        <CustomButton
        title="- Row"
        className="bg-light text-danger border-danger"
        onClick={()=>deleteRow(1)} 
        />
        <CustomButton
        onClick={()=>deleteColumn()}
        className="bg-light text-danger border-danger" 
        title="- Column"
        />
      </div>
      </div>
    </div>
        </Card>
    );
}
export default DuplicateDataCheckerForm;