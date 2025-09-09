import styled, { keyframes } from 'styled-components';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import { MdVerified } from 'react-icons/md';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ProfileCardContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: ${fadeInUp} 0.6s ease-out;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
`;

const VerifiedIcon = styled(MdVerified)`
  color: #1da1f2;
  font-size: 18px;
`;

const ProfileStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
`;

const Bio = styled.div`
  margin-top: 16px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  line-height: 1.5;
`;

const ProfileCard = ({ profileData }) => {
  const {
    profile_pic_url,
    full_name,
    username,
    biography,
    follower_count,
    following_count,
    is_verified
  } = profileData;

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <ProfileCardContainer>
      <ProfileHeader>
        <Image
          src={profile_pic_url}
          alt={`${username}'s profile`}
          size="80px"
          rounded
          bordered
          hoverable
        />
        <ProfileInfo>
          <NameContainer>
            <Text variant="subtitle" block>
              {full_name}
            </Text>
            {is_verified && <VerifiedIcon />}
          </NameContainer>
          <Text variant="label">@{username}</Text>
        </ProfileInfo>
      </ProfileHeader>

      {biography && (
        <Bio>
          <Text variant="body">{biography}</Text>
        </Bio>
      )}

      <ProfileStats>
        <StatItem>
          <Text variant="label">Followers</Text>
          <Text variant="body">{formatNumber(follower_count)}</Text>
        </StatItem>
        <StatItem>
          <Text variant="label">Following</Text>
          <Text variant="body">{formatNumber(following_count)}</Text>
        </StatItem>
      </ProfileStats>
    </ProfileCardContainer>
  );
};

export default ProfileCard;