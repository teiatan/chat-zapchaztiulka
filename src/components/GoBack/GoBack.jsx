import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import '@/index.css';
import { ArrowLeftIcon } from '@/images/svg';

export const GoBack = ({ to = '/' }) => {
  return (
    <NavLink className="nav-link flex gap-xs2 items-center" to={to}>
      <ArrowLeftIcon />
      <div className="text-caption font-500 text-textBrand">Назад</div>
    </NavLink>
  );
};

GoBack.propTypes = {
  to: PropTypes.string,
};
