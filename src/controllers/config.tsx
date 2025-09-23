import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
export const baseQuery = fetchBaseQuery({
    baseUrl :process.env.REACT_APP_BASEURL,
    prepareHeaders : (header)=>{
        let token = localStorage.getItem('userToken');
        if(token){
            header.set('authorisation',`Bearer : ${token}` );
        }
        return header;
        
    }
});