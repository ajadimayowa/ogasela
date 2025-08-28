export interface IStaff {
    id:string;
    "fullName":string;
    branch:{
        _id:string;
        name:string
    }
    "firstName":string;
    "email":string;
    "department": {
                "name":string;
                "id":string;
    },
    "userClass":string;
    "staffLevel": string;
    phoneNumber:string,
    createdAt:string,
    isApproved:boolean
}

export interface IStaffProfile {
    "_id": "689fc5276246f4250d7c1122",
        "fullName": "Boluwatife Olive",
        "firstName": "Boluwatife",
        "email": "boluwatifeolive@gmail.com",
        "password": "$2b$10$sj.qugRPR8Q8kCzKSZWhgurROjEoqsnGplhkRCaEXA8kwA2skNScC",
        "organization": {
            "_id": "689df448532c39a86930419e",
            "name": "Floath Solution Hub"
        },
        "branch": null,
        "department": {
            "_id": "689f92c92d4ae8db5d6bbd19"
        },
        "roles": [
            {
                "_id": "689f97892d4ae8db5d6bbd46"
            }
        ],
        "homeAddress": "22 Engr.Akim Alao Rd, Idimu.",
        "lga": "Alimosho",
        "state": "Lagos State",
        "phoneNumber": 8105674734,
        "emailIsVerified": false,
        "isApproved": false,
        "isDisabled": false,
        "isPasswordUpdated": true,
        "isSuperAdmin": true,
        "createdBy": {
            "_id": "689e67eb76be01a28068589b",
            "fullName": "Mayowa Ajadi",
            "email": "ajadimayowa879@gmail.com"
        },
        "createdByModel": "Staffs",
        "userClass": "initiator",
        "staffLevel": "marketer",
        "branchTransferHistory": [],
        "createdAt": "2025-08-15T23:39:19.563Z",
        "updatedAt": "2025-08-27T20:45:30.681Z",
        "__v": 0,
        "resetPasswordOtpExpires": "2025-08-23T14:53:52.074Z"
    }