/**
 * Komponen BarPencarian - dibuat oleh [Nama Anda]
 * Bar pencarian dengan input dan tombol cari
 */

import styled from 'styled-components';
import InputTeks from '../atoms/InputTeks';
import Tombol from '../atoms/Tombol';

// Container untuk bar pencarian dengan layout flexbox
const ContainerBarPencarian = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  align-items: center;
`;

// Wrapper untuk input agar mengambil ruang yang tersedia
const WrapperInput = styled.div`
  flex: 1;
`;

// Komponen BarPencarian utama
const BarPencarian = ({ 
  nilai, 
  onChange, 
  onCari, 
  placeholder = "Masukkan username Instagram (contoh: dapurbuzzer)...", 
  sedangMemuat = false,
  teksTombol = "Cari Profil"
}) => {
  // Handler untuk tombol Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !sedangMemuat && nilai.trim()) {
      onCari();
    }
  };

  return (
    <ContainerBarPencarian>
      <WrapperInput>
        <InputTeks
          placeholder={placeholder}
          value={nilai}
          onChange={onChange}
          onKeyPress={handleKeyPress}
          disabled={sedangMemuat}
        />
      </WrapperInput>
      <Tombol
        onClick={onCari}
        disabled={!nilai.trim() || sedangMemuat}
        loading={sedangMemuat}
      >
        {teksTombol}
      </Tombol>
    </ContainerBarPencarian>
  );
};

export default BarPencarian;