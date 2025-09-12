export interface IMember {
    _id: string;
    fullName: string;
    bvn: number;
    dob: Date;
    phoneNumber: string;
    officeAddress: string;
    durationOfStay: string;
    nearestBusStop: string;
    email: string;
    occupation: string;
    description: string;
    organization: string;
    totalAmountBorrowed: number;
    homeAddress: string;
    totalAmountPaidBack: number;
    amountToSettle: number;
    repaymentHistory: any[];
    __v: number;
    createdAt: string;
    updatedAt: string;
    branch: string;
    group: string;
    isDisable: boolean;
    isApproved: boolean;
    createdBy: {
        fullName: ''
    }
    loanRecord: {
        requestedLoanAmount: number | null;
        totalAmountLeft: number | null;
        loanDisbursedDate: Date | null;
        loanApprovedDate: Date | null;
        interestRate: number | null;
        loanVerificationId: string | null;
        calculatedAmountToBePaid: number | null;
        dailyLatePercentage: number | null;
        lateRepaymentIncurred: number | null;
        loanPurpose: string | null;
        loanStartDate: Date | null;
        loanStatus: string | null;
        loanTenure: number | null;
        loanTenureInDays: number | null;
        penaltyFee: number | null;
        penaltyPaymentIncurred: number | null;
        repaymentHistory: []
        totalAmountPaid: number | null;
    },
    nok: {
        isVerified: boolean
        title?: string;
        fullName: string;
        phoneNumber: string;
        relationshipWithNok: string;

        address: string;
        state: string;

        attestationDocument: string;
        idCard: string;
        passport: string;
    },
    kyc: {
        isVerified: boolean
        passportPhoto: string;
        attestationDocumentFile: string;
        idCardPhoto: string;
        selectedModeOfIdentification: string;
        utilityBillPhoto: string;
    },


}