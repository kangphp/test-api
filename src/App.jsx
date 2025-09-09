/**
 * Instagram Profile Inspector - dibuat oleh [Nama Anda]
 * Aplikasi React.js untuk melihat profil Instagram
 */

import styled from 'styled-components';
import InspektorProfil from './components/organisms/InspektorProfil';

// Container utama aplikasi dengan background putih bersih
const ContainerAplikasi = styled.div`
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
`;

// Komponen App utama
function App() {
  return (
    <ContainerAplikasi>
      <InspektorProfil />
    </ContainerAplikasi>
  );
}

export default App;
