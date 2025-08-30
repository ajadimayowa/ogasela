export interface IMember {
    "kyc": {
        "isVerified": false
    },
    "nok": {
        "isVerified": false
    },
    "_id": "68b0eda402bd807a52b05dd3",
    "fullName": "Kemi Tutu",
    "bvn": 32432234221,
    "phoneNumber": "32432234221",
    "email": "ajadimayowa879@gmail.com",
    "description": "",
    "isDisable": false,
    "organization": "689df448532c39a86930419e",
    "branch": "68a07b48832dce3492103e08",
    "group": "68b0eda302bd807a52b05dd1",
    "totalAmountBorrowed": 0,
    "totalAmountPaidBack": 0,
    "amountToSettle": 0,
    "repaymentHistory": [],
    "__v": 0,
    "createdAt": "2025-08-29T00:00:36.023Z",
    "updatedAt": "2025-08-29T00:00:36.023Z"
}
export interface IGroup {
    "_id": "68b0eda302bd807a52b05dd1",
    "groupName": "Golden Group2",
    "isDisable": false,
    "organization": "689df448532c39a86930419e",
    "branch": "68a07b48832dce3492103e08",
    "groupMembers": IMember[],
    "totalAmountBorrowed": 0,
    "totalAmountRefunded": 0,
    "createdAt": "2025-08-29T00:00:35.778Z",
    

}