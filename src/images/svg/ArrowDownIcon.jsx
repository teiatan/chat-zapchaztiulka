import PropTypes from 'prop-types';
import theme from '../../../presets';

const ArrowDownIcon = ({ colorFill = theme.colors.iconWhite }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
  >
    <path
      d="M14 18L22 26L30 18"
      stroke={colorFill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowDownIcon;

ArrowDownIcon.propTypes = {
  colorFill: PropTypes.string,
};
