import { useNavigate } from 'react-router-dom';
import { Button } from 'universal-components-frontend/src/components';

import './styles.css';
import errorPage from '@/images/404-page.gif';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <img className="image" src={errorPage} alt="" />
      <div className="title">Oops! Page not found</div>
      <Button
        // delete className after adjusting to get button from universal components
        className="font-500 rounded-medium flex justify-center items-center gap-xs2 transition-colors duration-300 focus:outline-none min-w-[150px] bg-bgBrandDark text-textContrast py-xs px-m leading-6 hover:bg-bgHoverBlue focus:shadow-btFocus  active:bg-bgPressedBlue h-[48px]"
        text="Go back to chat"
        onClick={() => navigate('/')}
      />
    </div>
  );
};
