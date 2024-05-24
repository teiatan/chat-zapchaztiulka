import PropTypes from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';

export const BtnLoader = ({ height, width, radius, color = '#2E3238' }) => {
  return (
    <ThreeDots
      height={height}
      width={width}
      radius={radius}
      color={color}
      ariaLabel="three-dots-loading"
      wrapperStyle={{ justifyContent: 'center' }}
      wrapperClassName=""
      visible={true}
    />
  );
};

BtnLoader.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  color: PropTypes.string,
};
