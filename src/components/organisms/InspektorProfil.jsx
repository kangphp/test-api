/**
 * Komponen InspektorProfil - dibuat oleh [Nama Anda]
 * Komponen utama aplikasi Instagram Profile Inspector
 */

import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import BarPencarian from '../molecules/BarPencarian';
import KartuProfil from '../molecules/KartuProfil';
import Teks from '../atoms/Teks';
import SpinnerMemuat from '../atoms/SpinnerMemuat';
import { AiOutlineInstagram } from 'react-icons/ai';

// Container utama untuk inspektor profil
const ContainerInspektor = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 32px;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
`;

// Header dengan logo Instagram dan judul
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 32px;
`;

// Icon Instagram dengan gradient warna
const IconInstagram = styled(AiOutlineInstagram)`
  font-size: 32px;
  background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

// Container untuk loading state
const ContainerMemuat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px 20px;
`;

// Container untuk error state
const ContainerError = styled.div`
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  text-align: center;
`;

// Fungsi web scraping untuk mengekstrak data Instagram dari HTML response
const scrapInstagramData = (doc, username) => {
  try {
    const bodyText = doc.body.textContent || '';
    
    // Ekstrak data berdasarkan format response yang diharapkan
    const extractFieldValue = (text, fieldName) => {
      const regex = new RegExp(`${fieldName}:\\s*(.+?)(?:\\n|$)`, 'i');
      const match = text.match(regex);
      return match ? match[1].trim() : '';
    };
    
    // Ekstrak angka dari teks
    const extractNumber = (text) => {
      const match = text.match(/[\d,]+/);
      return match ? parseInt(match[0].replace(/,/g, ''), 10) : 0;
    };
    
    // Ekstrak semua field yang dibutuhkan
    const usernameFromResponse = extractFieldValue(bodyText, 'Username') || username;
    const fullName = extractFieldValue(bodyText, 'Nama Lengkap') || 'Nama tidak tersedia';
    const followersText = extractFieldValue(bodyText, 'Jumlah Followers');
    const followingText = extractFieldValue(bodyText, 'Jumlah Following');
    const privateStatus = extractFieldValue(bodyText, 'private');
    const spamSettings = extractFieldValue(bodyText, 'Spam Settings');
    
    // Parse angka followers dan following
    const followerCount = extractNumber(followersText);
    const followingCount = extractNumber(followingText);
    
    // Tentukan status private (ON/OFF)
    const isPrivate = privateStatus.toLowerCase().includes('on');
    
    // Parse spam filter status
    const spamFilterOn = spamSettings.toLowerCase().includes('on');
    
    // Cari profile picture URL jika ada (biasanya tersembunyi di HTML)
    const profilePicElement = doc.querySelector('img[src*="profile"], img[src*="instagram"], img[alt*="profile"]');
    const profilePicUrl = profilePicElement ? profilePicElement.src : 'https://via.placeholder.com/150?text=Profile';
    
    return {
      profile_pic_url: profilePicUrl,
      full_name: fullName,
      username: usernameFromResponse,
      biography: `Status: ${privateStatus} | Spam Filter: ${spamFilterOn ? 'Aktif' : 'Nonaktif'}`,
      follower_count: followerCount,
      following_count: followingCount,
      is_verified: false, // Biasanya tidak ada info verifikasi dari tools ini
      is_private: isPrivate,
      spam_filter: spamFilterOn,
      raw_data: {
        private_status: privateStatus,
        spam_settings: spamSettings
      }
    };
    
  } catch (error) {
    console.error('Error scraping Instagram data:', error);
    return null;
  }
};

// Komponen InspektorProfil utama
const InspektorProfil = () => {
  // State management untuk aplikasi
  const [username, setUsername] = useState('');
  const [dataProfil, setDataProfil] = useState(null);
  const [sedangMemuat, setSedangMemuat] = useState(false);
  const [error, setError] = useState(null);

  // Handler untuk pencarian profil dengan web scraping
  const handleCari = async () => {
    if (!username.trim()) return;

    setSedangMemuat(true);
    setError(null);
    setDataProfil(null);

    try {
      // CATATAN: Request ini mungkin gagal di production karena CORS policy.
      // Solusi terbaik adalah menggunakan server-side proxy.
      
      // Panggil API baru yang mengembalikan HTML
      const response = await axios.get('/api/instagram_tools', {
        params: {
          username: username.trim()
        },
        responseType: 'text' // Penting: set response type ke text untuk HTML
      });

      // Parse HTML response menggunakan DOMParser
      const parser = new DOMParser();
      const doc = parser.parseFromString(response.data, 'text/html');
      
      // Web scraping: ekstrak data dari HTML
      const scrapedData = scrapInstagramData(doc, username.trim());
      
      if (scrapedData) {
        setDataProfil(scrapedData);
      } else {
        throw new Error('Gagal mengekstrak data profil dari HTML');
      }
    } catch (err) {
      // Handle berbagai jenis error
      setError(
        err.response?.data?.message || 
        err.message || 
        'Gagal mengambil data profil. Silakan coba lagi.'
      );
    } finally {
      setSedangMemuat(false);
    }
  };

  // Handler untuk perubahan input
  const handleInputChange = (e) => {
    setUsername(e.target.value);
    // Reset error saat user mulai mengetik
    if (error) setError(null);
  };

  return (
    <ContainerInspektor>
      {/* Header dengan logo dan judul */}
      <Header>
        <IconInstagram />
        <Teks varian="title">Instagram Profile Inspector</Teks>
      </Header>

      {/* Bar pencarian */}
      <BarPencarian
        nilai={username}
        onChange={handleInputChange}
        onCari={handleCari}
        sedangMemuat={sedangMemuat}
        placeholder="Masukkan username Instagram (contoh: dapurbuzzer)"
      />

      {/* Loading state */}
      {sedangMemuat && (
        <ContainerMemuat>
          <SpinnerMemuat ukuran="32px" />
          <Teks varian="body">Mengambil data profil...</Teks>
        </ContainerMemuat>
      )}

      {/* Error state */}
      {error && (
        <ContainerError>
          <Teks varian="body" style={{ color: '#d63031' }}>
            {error}
          </Teks>
        </ContainerError>
      )}

      {/* Success state - tampilkan data profil */}
      {dataProfil && !sedangMemuat && (
        <KartuProfil dataProfil={dataProfil} />
      )}
    </ContainerInspektor>
  );
};

export default InspektorProfil;