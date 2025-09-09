/**
 * Komponen Tombol - dibuat oleh [Nama Anda]
 * Tombol dengan gradient Instagram dan animasi hover
 */

import styled, { keyframes } from 'styled-components';

// Animasi hover untuk efek scale
const animasiHover = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.02);
  }
`;

// Styled component untuk tombol dengan gradient Instagram
const TombolStyled = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #405de6, #5851db, #833ab4, #c13584);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  // Efek hover dengan animasi scale
  &:hover {
    animation: ${animasiHover} 0.3s ease forwards;
    box-shadow: 0 8px 25px rgba(64, 93, 230, 0.3);
  }

  // Efek saat tombol diklik
  &:active {
    transform: scale(0.98);
  }

  // Style untuk tombol yang tidak aktif
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  // Matikan animasi saat tombol disabled
  &:disabled:hover {
    animation: none;
    box-shadow: none;
  }
`;

// Komponen Tombol utama
const Tombol = ({ children, onClick, disabled, loading, ...props }) => {
  return (
    <TombolStyled onClick={onClick} disabled={disabled || loading} {...props}>
      {loading ? 'Memuat...' : children}
    </TombolStyled>
  );
};

export default Tombol;