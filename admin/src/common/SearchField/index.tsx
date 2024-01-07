import { TextField } from '@mui/material';
import { styled } from '@mui/styles';

const SearchField = styled(TextField)({
  '& .MuiInputBase-root': {
    borderRadius: 5,
  },
});
export default SearchField;
