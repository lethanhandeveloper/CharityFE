import { TextField } from '@mui/material';
import { styled } from '@mui/styles';

const SearchField = styled(TextField)({
  '& .MuiInputBase-root': {
    borderRadius: 30
  }
});
export default SearchField;
