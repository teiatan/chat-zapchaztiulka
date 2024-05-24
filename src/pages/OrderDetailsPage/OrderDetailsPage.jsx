import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import theme from '../../../presets';
import '@/index.css';
// import { Button } from 'universal-components-frontend/src/components';
import { MessageCard } from '@/components/MessageCard';
import { Footer } from '@/components/Footer';
import { BtnLoader } from '@/components/Loader';
import { Container } from '@/utils';
import { ArrowDownIcon } from '@/images/svg';

import { getOrderDetails } from '@/redux/orderDetails/operations';
import {
  selectIsLoading,
  selectOrderDetails,
} from '@/redux/orderDetails/selectors';

export const OrderDetailsPage = ({ isTablet }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userQuery, setUserQuery] = useState(null);
  const [openOrderId, setOpenOrderId] = useState(null);
  // const [isOpenModal, setIsOpenModal] = useState(false);
  const orders = useSelector(selectOrderDetails);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (userQuery) {
      dispatch(getOrderDetails(userQuery));
    }
  }, [dispatch, userQuery]);

  return (
    <>
      <Container>
        <section
          className={`flex flex-col gap-sPlus 
          ${isTablet ? 'max-h-[70vh] py-sPlus' : 'max-h-[400px] py-s'}
           message-container`}
        >
          <MessageCard
            type="text"
            text="Для отримання деталей Ваших замовлень надайте будь-ласка номер телефону, на який були здійснені замовлення (у форматі 067...)"
            time="hidden"
          />
          {userQuery && <MessageCard owner="Ви" type="text" text={userQuery} />}
          {isLoading && (
            <BtnLoader
              height={16}
              width={32}
              radius={8}
              color={theme.colors.bgGreyDark}
            />
          )}
          {orders && orders.length > 0 && !isLoading && (
            <>
              <MessageCard type="text" text="Ваші замовлення:" />
              <div className="flex flex-col gap-xs text-textPrimary text-body">
                {orders?.map(order => {
                  const { _id, status, products, totalPrice } = order;
                  const isOpen = _id === openOrderId;

                  return (
                    <div key={_id}>
                      <button
                        className="flex items-center justify-between w-full p-xs bg-bgBrandLight1 text-left"
                        onClick={() => setOpenOrderId(isOpen ? null : _id)}
                      >
                        <div className="flex flex-col gap-xs3">
                          <p>{`№ замовлення: ${_id.slice(18, 24)}.`}</p>
                          <p>{`Статус: "${status}"`}</p>
                        </div>
                        <div
                          className={`${!isOpen ? 'rotate-180' : 'rotate-0'}`}
                        >
                          <ArrowDownIcon colorFill={theme.colors.iconBrand} />
                        </div>
                      </button>
                      {isOpen && (
                        <div className="fade-in flex flex-col items-start py-xs gap-xs2">
                          <table className="w-full border-collapse font-500 text-caption">
                            <thead>
                              <tr className="bg-bgGreyLigth justify-center">
                                <th className="border-1 border-solid border-borderDefault p-xs2">
                                  Найменування
                                </th>
                                <th className="border-1 border-solid border-borderDefault p-xs2">
                                  Кількість
                                </th>
                                <th className="border-1 border-solid border-borderDefault p-xs2">
                                  Ціна
                                </th>
                              </tr>
                            </thead>
                            <tbody className=" font-400 text-[10px] text-textSecondary">
                              {products.map((product, index) => {
                                const { name, quantity, units, price } =
                                  product;

                                return (
                                  <tr key={index}>
                                    <td
                                      className="border-1 border-solid border-borderDefault p-xs3"
                                      style={{ wordBreak: 'break-word' }}
                                    >
                                      {name}
                                    </td>
                                    <td className="border-1 border-solid border-borderDefault p-xs3 text-center">{`${quantity} ${units}`}</td>
                                    <td className="border-1 border-solid border-borderDefault p-xs3 text-center">
                                      {price}
                                    </td>
                                  </tr>
                                );
                              })}
                              <tr className="text-[12px] font-500">
                                <td
                                  colSpan="2"
                                  className="border-1 border-solid border-borderDefault p-xs3 text-left"
                                >
                                  Загальна сума:
                                </td>
                                <td className="border-1 border-solid border-borderDefault p-xs3 text-center">
                                  {totalPrice}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="flex gap-xs px-xs justify-center items-center fade-in">
                            <p className="text-caption text-textBrand">
                              {"З'явилися запитання?"}
                            </p>
                            <button
                              className="p-xs2 text-caption font-500 text-textBrand border-solid border-1 border-borderDefaultBlue bg-bgWhite hover:bg-bgHoverGrey focus:shadow-btFocus rounded-medium transition-colors duration-300 focus:outline-none whitespace-nowrap"
                              onClick={() => navigate('/chat')}
                            >
                              {"З'єднати з менеджером"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {/* {orders && orders.length > 0 && (
            <Button
              buttonType="desctructive"
              // delete className after adjusting to get button from universal components
              className={`font-500 rounded-medium flex justify-center items-center gap-xs2 transition-colors duration-300 focus:outline-none min-w-[150px] text-textContrast bg-bgDefaultDestructive py-xs leading-6 hover:bg-bgHoverDestructive focus:bg-bgDefaultDestructive focus:shadow-btFocus disabled:border-solid  disabled:border-1 disabled:border-borderDisabled active:bg-bgPressedDestructive h-[48px] ${
                isTablet ? 'px-m' : 'px-s'
              }`}
              text="Надіслати на e-mail"
              onClick={() => setIsOpenModal(true)}
            />
          )} */}
          {orders && orders.length === 0 && userQuery && (
            <MessageCard
              type="text"
              text={`За телефоном ${userQuery} замовлень не знайдено. Спробуйте інший телефон`}
            />
          )}
        </section>
      </Container>
      <Footer
        isActiveMenu={true}
        isTablet={isTablet}
        handleUserQuery={message => setUserQuery(message)}
      />
    </>
  );
};

OrderDetailsPage.propTypes = {
  isTablet: PropTypes.bool.isRequired,
};
