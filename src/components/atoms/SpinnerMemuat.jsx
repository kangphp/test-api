/**
 * Komponen SpinnerMemuat - dibuat oleh [Nama Anda]
 * Loading spinner dengan animasi berputar
 */

import styled, { keyframes } from 'styled-components';

// Animasi berputar untuk spinner
const animasiBerputar = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled component untuk spinner dengan animasi berputar
const SpinnerStyled = styled.div`
  // Ukuran spinner
  width: ${props => props.$ukuran || '24px'};
  height: ${props => props.$ukuran || '24px'};
  // Border dengan warna gradasi
  border: 3px solid #f3f3f3;
  border-top: 3px solid #405de6;
  // Bentuk bulat
  border-radius: 50%;
  // Animasi berputar terus menerus
  animation: ${animasiBerputar} 1s linear infinite;
  // Margin untuk posisi tengah jika diperlukan
  margin: ${props => props.$tengah ? '0 auto' : '0'};
`;

// Komponen SpinnerMemuat utama
const SpinnerMemuat = ({ ukuran, tengah = false }) => {
  return <SpinnerStyled $ukuran={ukuran} $tengah={tengah} />;
};

export default SpinnerMemuat;