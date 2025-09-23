// GroupLoanForm.tsx
import React, { useState } from 'react';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import api from '../../app/api';
import { toast } from 'react-toastify';

interface Member {
  fullName: string;
  bvnNumber: string;
  phoneNumber: string;
  homeAddress: string;
  requestedAmount: number;
}

interface FormValues {
  groupName: string;
  groupHeadBVN: string;
  members: Member[];
  totalGroupAmount: number; // for internal TS tracking, not submitted
}

const initialValues: FormValues = {
  groupName: '',
  groupHeadBVN: '',
  members: [
    { fullName: '', bvnNumber: '', phoneNumber: '', homeAddress: '', requestedAmount: 0 },
  ],
  totalGroupAmount: 0, // calculated internally only
};

const validationSchema = Yup.object({
  groupName: Yup.string().required('Required'),
  groupHeadBVN: Yup.string().required('Required'),
  members: Yup.array().of(
    Yup.object({
      fullName: Yup.string().required('Required'),
      bvnNumber: Yup.string().required('Required'),
      phoneNumber: Yup.string().required('Required'),
      homeAddress: Yup.string().required('Required'),
      requestedAmount: Yup.number().min(1, 'Amount must be > 0').required('Required'),
    })
  )
});

const GroupLoanForm: React.FC = () => {
  const [existingBvns, setExistingBvns] = useState<string[]>([]);

  const checkBVNs = async (members: Member[]) => {
    const bvns = members.map(m => m.bvnNumber);
    const res = await api.post('/users/check-bvns', { bvns });
    setExistingBvns(res.data.existingBvns);
    return res.data.existingBvns;
  };

  const handleSubmit = async (values: FormValues) => {
  // remove totalGroupAmount before submission if present
  const { totalGroupAmount, ...submitData } = values;

  try {
    const res = await api.post("/group/create", submitData);

    if (res.data.success) {
      toast.success("Group loan submitted successfully!");
    } else {
      toast.error(res.data.error || "Submission failed.");
    }
  } catch (err: any) {
    console.error(err);

    const data = err.response?.data;

    if (data?.existingBVNs?.length > 0) {
      toast.error(
        `The following BVNs already exist on record:\n${data.existingBVNs.join(
          ", "
        )}`
      );
    } else {
      toast.error(data?.error || "Submission failed. Please try again.");
    }
  }
};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur
      onSubmit={handleSubmit}
    >
      {({ values }) => {
        const totalGroupAmount = values.members.reduce((sum, m) => sum + Number(m.requestedAmount || 0), 0);

        return (
          <Form className="p-4 max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Group Loan Application</h2>
            <label>Group Name:</label>
            <Field name="groupName" className="border p-1 mb-2 w-full" />
            <div className='text-danger'>
              <ErrorMessage name="groupName" component="div" className="text-red-500" />
            </div>


            <label>Group Head BVN:</label>
            <Field name="groupHeadBVN" className="border p-1 mb-2 w-full" />
            <div className='text-danger'>
              <ErrorMessage name="groupHeadBVN" component="div" className="text-red-500" />
            </div>


            <FieldArray name="members">
              {({ push, remove }) => (
                <div>
                  <h3 className="text-lg font-semibold">Members</h3>
                  {values.members.map((member, index) => (
                    <div key={index} className="border p-3 mb-4">
                      <label>Full Name:</label>
                      <Field name={`members[${index}].fullName`} className="border p-1 w-full" />
                      <div className='text-danger'>
                        <ErrorMessage name={`members[${index}].fullName`} component="div" className="text-red-500" />
                      </div>


                      <label>BVN Number:</label>
                      <Field name={`members[${index}].bvnNumber`} className="border p-1 w-full" />
                      {existingBvns.includes(member.bvnNumber) && (
                        <div className="text-red-500">BVN already exists</div>
                      )}
                      <ErrorMessage name={`members[${index}].bvnNumber`} component="div" className="text-red-500" />

                      <label>Phone Number:</label>
                      <Field name={`members[${index}].phoneNumber`} className="border p-1 w-full" />
                      <ErrorMessage name={`members[${index}].phoneNumber`} component="div" className="text-red-500" />

                      <label>Home Address:</label>
                      <Field name={`members[${index}].homeAddress`} className="border p-1 w-full" />
                      <ErrorMessage name={`members[${index}].homeAddress`} component="div" className="text-red-500" />

                      <button type="button" onClick={() => remove(index)} className="text-red-600 mt-2">Remove Member</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => push({ fullName: '', bvnNumber: '', phoneNumber: '', homeAddress: '', requestedAmount: 0 })} className="bg-blue-500 text-white px-4 py-2">
                    Add Member
                  </button>
                </div>
              )}
            </FieldArray>

            <div className="mt-4">
              <label>Total Group Amount (auto-calculated):</label>
              <input
                type="number"
                value={totalGroupAmount}
                className="border p-1 w-full bg-gray-100"
                disabled
              />
            </div>

            <button type="submit" className="mt-4 bg-green-600 text-white px-6 py-2">Submit Loan</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default GroupLoanForm;