/**
 * Komponen Teks - dibuat oleh [Nama Anda]
 * Komponen teks dengan varian title, subtitle, body, label
 */

import styled from 'styled-components';

// Styled component dengan sistem varian yang fleksibel
const TeksStyled = styled.span`
  // Warna teks berdasarkan varian
  color: ${props => {
    switch (props.$varian) {
      case 'title':
        return '#262626';
      case 'subtitle':
        return '#8e8e8e';
      case 'body':
        return '#262626';
      case 'label':
        return '#8e8e8e';
      default:
        return '#262626';
    }
  }};
  
  // Ukuran font berdasarkan varian
  font-size: ${props => {
    switch (props.$varian) {
      case 'title':
        return '24px';
      case 'subtitle':
        return '16px';
      case 'body':
        return '14px';
      case 'label':
        return '12px';
      default:
        return '14px';
    }
  }};
  
  // Ketebalan font berdasarkan varian
  font-weight: ${props => {
    switch (props.$varian) {
      case 'title':
        return '700';
      case 'subtitle':
        return '600';
      case 'body':
        return '400';
      case 'label':
        return '500';
      default:
        return '400';
    }
  }};
  
  // Tinggi baris untuk keterbacaan yang baik
  line-height: 1.4;
  // Display berdasarkan prop blok
  display: ${props => props.$blok ? 'block' : 'inline'};
  // Margin kustomisasi
  margin: ${props => props.$margin || '0'};
`;

// Komponen Teks utama
const Teks = ({ children, varian = 'body', blok = false, margin, ...props }) => {
  return (
    <TeksStyled $varian={varian} $blok={blok} $margin={margin} {...props}>
      {children}
    </TeksStyled>
  );
};

export default Teks;