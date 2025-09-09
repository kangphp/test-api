import styled from 'styled-components';

const StyledImage = styled.img`
  border-radius: ${props => props.rounded ? '50%' : '8px'};
  width: ${props => props.size || '100px'};
  height: ${props => props.size || '100px'};
  object-fit: cover;
  border: ${props => props.bordered ? '3px solid #fff' : 'none'};
  box-shadow: ${props => props.bordered ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'};
  transition: all 0.3s ease;

  &:hover {
    transform: ${props => props.hoverable ? 'scale(1.05)' : 'none'};
  }
`;

const Image = ({ 
  src, 
  alt, 
  size, 
  rounded = false, 
  bordered = false, 
  hoverable = false,
  ...props 
}) => {
  return (
    <StyledImage
      src={src}
      alt={alt}
      size={size}
      rounded={rounded}
      bordered={bordered}
      hoverable={hoverable}
      {...props}
    />
  );
};

export default Image;