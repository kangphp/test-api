/**
 * Komponen Gambar - dibuat oleh [Nama Anda]
 * Komponen gambar untuk foto profil dengan opsi bulat dan border
 */

import styled from 'styled-components';

// Styled component untuk gambar dengan berbagai opsi styling
const GambarStyled = styled.img`
  // Bentuk gambar (bulat atau persegi dengan radius)
  border-radius: ${props => props.$bulat ? '50%' : '8px'};
  // Ukuran gambar
  width: ${props => props.$ukuran || '100px'};
  height: ${props => props.$ukuran || '100px'};
  // Memastikan gambar tidak terdistorsi
  object-fit: cover;
  // Border putih opsional
  border: ${props => props.$bordered ? '3px solid #fff' : 'none'};
  // Shadow untuk efek depth
  box-shadow: ${props => props.$bordered ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'};
  // Transisi halus untuk semua properti
  transition: all 0.3s ease;

  // Efek hover dengan scale
  &:hover {
    transform: ${props => props.$hoverable ? 'scale(1.05)' : 'none'};
  }
`;

// Komponen Gambar utama
const Gambar = ({ 
  src, 
  alt, 
  ukuran, 
  bulat = false, 
  bordered = false, 
  hoverable = false,
  ...props 
}) => {
  return (
    <GambarStyled
      src={src}
      alt={alt}
      $ukuran={ukuran}
      $bulat={bulat}
      $bordered={bordered}
      $hoverable={hoverable}
      {...props}
    />
  );
};

export default Gambar;