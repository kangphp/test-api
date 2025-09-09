import styled from 'styled-components';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const SearchBarContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  align-items: center;
`;

const InputWrapper = styled.div`
  flex: 1;
`;

const SearchBar = ({ 
  value, 
  onChange, 
  onSearch, 
  placeholder = "Enter Instagram username...", 
  loading = false,
  buttonText = "Get Info"
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading && value.trim()) {
      onSearch();
    }
  };

  return (
    <SearchBarContainer>
      <InputWrapper>
        <Input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
      </InputWrapper>
      <Button
        onClick={onSearch}
        disabled={!value.trim() || loading}
        loading={loading}
      >
        {buttonText}
      </Button>
    </SearchBarContainer>
  );
};

export default SearchBar;