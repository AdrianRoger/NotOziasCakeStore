import React, { useEffect, useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ProductSearch: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  useEffect(() => {
    onSearch(query);
  }, [query, onSearch])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', width:'100%' }}>
      <TextField
        variant="outlined"
        placeholder="Search products"
        value={query}
        onChange={(e) => {setQuery(e.target.value); handleSearch()}}
        style={{ marginRight: '8px' }}
      />
      <IconButton onClick={handleSearch} color="primary" >
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default ProductSearch;