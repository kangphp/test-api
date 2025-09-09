/**
 * Komponen InputTeks - dibuat oleh [Nama Anda]
 * Input field dengan efek focus dan styling modern
 */

import styled from 'styled-components';

// Styled component untuk input dengan efek focus yang menarik
const InputStyled = styled.input`
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  outline: none;
  width: 100%;
  box-sizing: border-box;

  // Efek focus dengan warna biru Instagram
  &:focus {
    border-color: #405de6;
    box-shadow: 0 0 0 3px rgba(64, 93, 230, 0.1);
  }

  // Styling untuk placeholder text
  &::placeholder {
    color: #8e8e8e;
  }
`;

// Komponen InputTeks utama
const InputTeks = ({ placeholder, value, onChange, type = 'text', ...props }) => {
  return (
    <InputStyled
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default InputTeks;