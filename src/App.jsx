import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { customAlphabet } from 'nanoid';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Loader } from './components/Loader';
import { Header } from './components/Header';
import { FAQDetails } from './components/FAQ/FAQDetails';

const MenuPage = lazy(() => import('./pages/MenuPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const OrderDetailsPage = lazy(() => import('./pages/OrderDetailsPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

import { authUser } from './redux/chat/operations';
import { selectChat } from './redux/chat/selectors';

export const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const existingChat = useSelector(selectChat);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    if (existingChat._id) return;

    const searchParams = new URLSearchParams(location.search);
    const windowWidth = searchParams.get('windowWidth');
    setIsTablet(Number(windowWidth) < 600);
    const userIdParam = searchParams.get('userId');
    const userId =
      userIdParam ||
      localStorage.getItem('userId') ||
      customAlphabet('0123456789', 24)();

    localStorage.setItem('userId', userId);
    dispatch(authUser(userId));
  }, [dispatch, existingChat._id, location.search]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<MenuPage />} />
            <Route path="/faq" element={<FAQPage isTablet={isTablet} />} />
            <Route
              path="/faq/:id"
              element={<FAQDetails isTablet={isTablet} />}
            />
            <Route
              path="/order-details"
              element={<OrderDetailsPage isTablet={isTablet} />}
            />
            <Route path="/chat" element={<ChatPage isTablet={isTablet} />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer autoClose={3000} />
      </Suspense>
    </>
  );
};
