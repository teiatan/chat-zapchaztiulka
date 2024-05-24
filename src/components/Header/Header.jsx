import { Outlet } from 'react-router-dom';
import './styles.css';
import { socket } from '@/socket';

import logo from '@/images/svg/logo/White/44px.svg';
import { ArrowDownIcon } from '@/images/svg';

export const Header = () => {
  const userId = localStorage.getItem('userId');

  // handle changing of active chat when user minimizes it
  const toggleChat = () =>
    socket.emit('toggleChat', { userId, isChatRoomOpen: false });

  return (
    <>
      <header className="header-wrapper">
        <div className="logo-wrapper">
          <img src={logo} alt="logo" />
        </div>
        <div className="flex w-full justify-between items-center">
          <div className="title">Онлайн підтримка</div>
          <button className="button-wrapper" onClick={toggleChat}>
            <ArrowDownIcon />
            <div className="description hidden absolute top-[65%] left-[65%] text-textContrast bg-bgGreyDark p-xs2 rounded-medium whitespace-nowrap z-10">
              Згорнути чат
            </div>
          </button>
        </div>
      </header>
      <Outlet />
    </>
  );
};
