export interface INok {
  fullName: string;
  relationship: string;
  phoneNumber: string;
  address?: string;
}

export interface IMember {
  _id: string;
  id: string;
  alias: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  bvn: number;
  dob: string | Date;
  title: string;
  gender: string;
  maritalStatus: string;
  noOfKids: number;
  occupation: string;
  durationOfStay: string;
  homeAddress: string;
  officeAddress: string;
  nearestBusStop: string;
  state: string;
  lga: string;
  language: string;

  organization: string;
  branch: string;
  group: {
    id: string;
    groupName: string;
    isApproved: boolean;
    isDisable: boolean;
    kyc: {
      isVerified: boolean;
    };
    groupMembers: string[];
    createdAt: string;
    updatedAt: string;
    createdBy: string;
  };

  nok?: INok; // 👈 Added Next of Kin

  createdAt: string;
  updatedAt: string;
  createdBy:
  {
        fullName: string;
        email: string;
        phoneNumber: string | number;
        staffLevel: string;
        description?: string;
      };

  kyc: {
    isVerified: boolean;
    attestationDocumentFile: string;
    idCardPhoto: string;
    idIdentificationNumber: string;
    passportPhoto: string;
    selectedModeOfIdentification: string;
    utilityBillPhoto: string;
  };

  isVerified: boolean;
  isApproved: boolean;
  isDisable: boolean;

  __v: number;
}
