export interface IManagerHistory {
  manager: string;
  from: Date;
  to?: Date;
}

export interface IBranchBankDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
  addedAt: Date;
  addedBy: string;
  isActive: boolean;
}

export interface IBranch{
  _id: string;
  id: string;
  name: string;
  manager: string;
  managerHistory: IManagerHistory[];
  address: string;
  state: string;
  lga: string;
  organization: string;
  createdBy: string;
  isApproved?: boolean;
  approvedBy?: string;
  isDisabled: boolean;
  disabledBy?: string;
  isDeleted: boolean;
  staffs: string[];

  // Bank details
  bankDetails: IBranchBankDetails|null;

  // Current branch balance
  currentBalance: number;
}