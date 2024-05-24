import PropTypes from 'prop-types';
import theme from '../../../presets';

const CloseIcon = ({
  width = '16',
  height = '16',
  stroke = theme.colors.iconPrimary,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M6 6L18 18M6 18L18 6"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CloseIcon;

CloseIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
};
