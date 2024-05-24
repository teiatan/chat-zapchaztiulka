import PropTypes from 'prop-types';

import theme from '../../../presets';

const SendIcon = ({ colorFill = theme.colors.iconPrimary }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M3.69276 1.49522L3.69277 1.49522L22.1552 11.6496L22.1552 11.6496C22.3488 11.756 22.4195 11.9993 22.313 12.1928L22.313 12.1928C22.2764 12.2593 22.2217 12.314 22.1552 12.3506L22.2034 12.4382L22.1552 12.3506L3.69277 22.5049L3.74096 22.5925L3.69276 22.5049C3.49918 22.6114 3.25597 22.5408 3.14951 22.3472L3.14951 22.3472C3.11704 22.2882 3.1 22.2219 3.1 22.1544V1.8457C3.1 1.62479 3.27909 1.4457 3.5 1.4457C3.5674 1.4457 3.63371 1.46274 3.69276 1.49522ZM5.04819 4.29499L4.9 4.21349V4.38261V11.0001V11.1001H5H9.9V12.9001H5H4.9V13.0001V19.6175V19.7866L5.04819 19.7051L18.8981 12.0877L19.0574 12.0001L18.8981 11.9125L5.04819 4.29499Z"
      fill={colorFill}
      stroke="white"
      strokeWidth="0.2"
    />
  </svg>
);

export default SendIcon;

SendIcon.propTypes = {
  colorFill: PropTypes.string,
};
