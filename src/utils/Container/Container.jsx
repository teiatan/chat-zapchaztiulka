import PropTypes from 'prop-types';
import './styles.css';

export const Container = ({ children }) => {
  return <main className="wrapper">{children}</main>;
};

Container.propTypes = {
  children: PropTypes.node,
};
