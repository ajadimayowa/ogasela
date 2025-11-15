import React from "react";
import { PaystackButton } from "react-paystack";

interface PaystackProps {
  email: string;
  amount: number; // in Naira
  reference?: string;
  onSuccess: (ref: any) => void;
  onClose: () => void;
}

const PaystackPayment: React.FC<PaystackProps> = ({
  email,
  amount,
  reference,
  onSuccess,
  onClose,
}) => {
  const publicKey = process.env.REACT_APP_PAYSTACK!;
  console.log({seeKey:publicKey})

  const componentProps = {
    email,
    amount: amount * 100, // convert to kobo
    publicKey,
    text: "Pay Now",
    reference: reference || `ref-${Date.now()}`,
    onSuccess,
    onClose,
  };

  return (
    <PaystackButton
      className="btn btn-success"
      {...componentProps}
    />
  );
};

export default PaystackPayment;