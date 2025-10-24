export interface IAd {
    category : string;
    condition : string;
    createdAt: string;
    description: string;
    id : string;
    images: string[];
    isActive: boolean;
    isSold: boolean;
    likes: number;
    location : {
        state:string;
        city:string;
        address:string
    };
    price:number;
    promotionType:{
        plan:string;
        price:number;
        durationInDays: number,
        paymentCompleted: boolean,
        startDate: string
    };
    reviewCount :number;
    seller :{
        contact:{
            phoneNumber:string
        }
    }
    sellerName : string;
    title : string;
    updatedAt :string;
    views : number
}