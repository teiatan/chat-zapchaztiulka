import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from 'universal-components-frontend/src/components';

import { AlertIcon } from '@/images/svg';

const modalContainer = document.getElementById('modal-root');

export const ModalWarning = ({ onFinishChat, closeModal, isTablet }) => {
  useEffect(() => {
    const handleEscape = evt => {
      if (evt.code === `Escape`) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [closeModal]);

  const onBackdropOpen = evt => {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div
      onMouseDown={onBackdropOpen}
      className="fixed z-40 top-[0] left-[0] w-[100vw] h-[100vh] bg-aditional1"
    >
      <div
        className={`absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                   flex flex-col gap-m2 py-m h-auto items-center justify-center
                 bg-bgWhite rounded-medium ${
                   isTablet ? 'w-[400px] px-s' : 'w-[350px] px-xs'
                 }`}
      >
        <div className="flex flex-col gap-xs items-center justify-center">
          <AlertIcon />
          <div className="flex flex-col gap-xs2 items-center justify-center">
            <h4 className="font-500 text-heading4 text-textPrimary">
              Завершити чат з оператором?
            </h4>
            <p className="font-400 text-body text-textSecondary text-center">
              Ви впевнені, що хочете завершити діалог з оператором?
            </p>
          </div>
        </div>
        <div className="flex gap-xs justify-between">
          <Button
            buttonType="secondary-gray"
            // delete className after adjusting to get button from universal components
            className={`font-500 rounded-medium flex justify-center items-center gap-xs2 transition-colors duration-300 focus:outline-none min-w-[150px] bg-bgWhite text-textPrimary border-solid border-1 border-borderDefault py-xs leading-6 hover:bg-bgHoverGrey focus:shadow-btFocus  active:bg-bgPressedGrey active:border-borderDefault h-[48px] ${
              isTablet ? 'px-m' : 'px-s'
            }`}
            text="Скасувати"
            onClick={closeModal}
          />
          <Button
            buttonType="desctructive"
            // delete className after adjusting to get button from universal components
            className={`font-500 rounded-medium flex justify-center items-center gap-xs2 transition-colors duration-300 focus:outline-none min-w-[150px] text-textContrast bg-bgDefaultDestructive py-xs leading-6 hover:bg-bgHoverDestructive focus:bg-bgDefaultDestructive focus:shadow-btFocus disabled:border-solid  disabled:border-1 disabled:border-borderDisabled active:bg-bgPressedDestructive h-[48px] ${
              isTablet ? 'px-m' : 'px-s'
            }`}
            text="Так, завершити"
            onClick={() => onFinishChat()}
          />
        </div>
      </div>
    </div>,
    modalContainer
  );
};

ModalWarning.propTypes = {
  onFinishChat: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  isTablet: PropTypes.bool.isRequired,
};
