/**
 * Komponen KartuProfil - dibuat oleh [Nama Anda]
 * Kartu untuk menampilkan informasi profil Instagram
 */

import styled, { keyframes } from 'styled-components';
import Gambar from '../atoms/Gambar';
import Teks from '../atoms/Teks';
import { MdVerified } from 'react-icons/md';

// Animasi fade-in dari bawah
const animasiFadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Container utama untuk kartu profil
const ContainerKartuProfil = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: ${animasiFadeInUp} 0.6s ease-out;
`;

// Header dengan foto profil dan info dasar
const HeaderProfil = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

// Container untuk informasi profil
const InfoProfil = styled.div`
  flex: 1;
`;

// Container untuk nama dan badge verifikasi
const ContainerNama = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
`;

// Icon verifikasi dengan warna biru Twitter/Instagram
const IconVerifikasi = styled(MdVerified)`
  color: #1da1f2;
  font-size: 18px;
`;

// Grid untuk statistik follower/following
const StatistikProfil = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
`;

// Item statistik individual
const ItemStatistik = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
`;

// Container untuk bio dengan styling khusus
const Bio = styled.div`
  margin-top: 16px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  line-height: 1.5;
`;

// Komponen KartuProfil utama
const KartuProfil = ({ dataProfil }) => {
  // Destructuring data profil
  const {
    profile_pic_url,
    full_name,
    username,
    biography,
    follower_count,
    following_count,
    is_verified
  } = dataProfil;

  // Fungsi untuk format angka (K/M)
  const formatAngka = (angka) => {
    if (angka >= 1000000) {
      return (angka / 1000000).toFixed(1) + 'M';
    } else if (angka >= 1000) {
      return (angka / 1000).toFixed(1) + 'K';
    }
    return angka.toString();
  };

  return (
    <ContainerKartuProfil>
      {/* Header dengan foto profil dan info dasar */}
      <HeaderProfil>
        <Gambar
          src={profile_pic_url}
          alt={`Foto profil ${username}`}
          ukuran="80px"
          bulat
          bordered
          hoverable
        />
        <InfoProfil>
          <ContainerNama>
            <Teks varian="subtitle" blok>
              {full_name}
            </Teks>
            {is_verified && <IconVerifikasi />}
          </ContainerNama>
          <Teks varian="label">@{username}</Teks>
        </InfoProfil>
      </HeaderProfil>

      {/* Bio/Biography jika ada */}
      {biography && (
        <Bio>
          <Teks varian="body">{biography}</Teks>
        </Bio>
      )}

      {/* Statistik follower dan following */}
      <StatistikProfil>
        <ItemStatistik>
          <Teks varian="label">Pengikut</Teks>
          <Teks varian="body">{formatAngka(follower_count)}</Teks>
        </ItemStatistik>
        <ItemStatistik>
          <Teks varian="label">Mengikuti</Teks>
          <Teks varian="body">{formatAngka(following_count)}</Teks>
        </ItemStatistik>
      </StatistikProfil>
    </ContainerKartuProfil>
  );
};

export default KartuProfil;