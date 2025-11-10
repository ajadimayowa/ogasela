import React from 'react';
import Select from 'react-select';
import api from '../../app/api';
import { IAd } from '../../interfaces/ad';

const handleFetchProductsBySearch = async (query: string) => {
  try {
    const res = await api.get(`ad?search=${query}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};


interface ISearch {
  onUserSearch: (value: string) => void;
  onUserSelect:(value: any|null) => void;
  options:IAd[]
}

const ReusableTypeToSearch: React.FC<ISearch> = ({ onUserSearch,onUserSelect,options }) => {
  return (
    <Select
    autoFocus
      onInputChange={(inputValue) => {
        onUserSearch(inputValue);
      }}
      onChange={(e)=>onUserSelect(e)}
      className="w-75 p-0 m-0"
      options={options}
      placeholder="Type to search..."
      isClearable
    />
  );
};

export default ReusableTypeToSearch;