import PropTypes from 'prop-types';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { socket } from '@/socket';

import './styles.css';
import '@/index.css';
import { MenuIcon, AttachIcon, SendIcon, CloseIcon } from '@/images/svg';
import { Loader } from '@/components/Loader';
import { compressAndResizeImage, patterns } from '@/helpers';

import { sendFile } from '@/redux/chat/operations';
import { selectChatRoomInProgress } from '@/redux/chat/selectors';
import { addMessage } from '@/redux/chat/actions';

export const Footer = ({
  isActiveMenu,
  isOpenModal,
  isTablet,
  handleUserQuery,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isDisabled = pathname.includes('faq');
  const isChat = pathname.includes('chat');
  const isOrderDetails = pathname.includes('order-details');

  const chatRoomInProgress = useSelector(selectChatRoomInProgress);

  const [activeMenu, setActiveMenu] = useState(false);
  const [message, setMessage] = useState('');
  const [rows, setRows] = useState(1);
  const rowsRef = useRef(rows);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [temporaryImageURL, setTemporaryImageURL] = useState(null);
  const [isSendingFile, setIsSendingFile] = useState(false);
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [handleTypingExecuted, setHandleTypingExecuted] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const userId = localStorage.getItem('userId');

  let typingTimeout;

  // handle to send emit when user is typing
  const handleTyping = useCallback(
    isTyping => {
      socket.emit('userTyping', {
        isTyping,
        roomId: chatRoomInProgress?._id,
      });
      setHandleTypingExecuted(isTyping);
    },
    [chatRoomInProgress?._id]
  );

  // handle to input with auto extending of input field
  const handleMessageChange = evt => {
    const textarea = evt.target;
    const minRows = 1;
    const maxRows = 4;

    setMessage(textarea.value);

    const currentRows = Math.min(
      maxRows,
      Math.max(minRows, textarea.scrollHeight / 24)
    );

    setRows(currentRows);
    rowsRef.current = currentRows;

    if (!handleTypingExecuted) {
      handleTyping(true);
    }

    // If the user stops entering text, but cursor is in input field - we assume that he has stopped typing too
    clearTimeout(timeoutId);
    const delayedFunction = () => {
      handleTyping(false);
    };
    const id = setTimeout(delayedFunction, 3000);
    setTimeoutId(id);
  };

  // handle a text message
  const handleSubmitMessage = () => {
    const pureMessage = message.trim();
    if (pureMessage === '') return;

    // handle to user text message in a chat room
    if (!isOrderDetails) {
      const messageData = {
        userId,
        roomId: chatRoomInProgress?._id,
        message: {
          messageOwner: 'user',
          messageType: 'text',
          messageText: pureMessage,
        },
      };

      dispatch({
        type: addMessage,
        payload: messageData,
      });

      socket.emit('userMessage', messageData);
      handleTyping(false); // if user sent a message - user stopped typing
    }

    // handle to user message (phone) as user request to receive order details
    if (isOrderDetails) {
      if (!patterns.phonePattern.test(pureMessage)) {
        toast.error(patterns.phonePatternMessage);
        return;
      }

      handleUserQuery(pureMessage);
    }

    setMessage('');
    setRows(1);
  };

  // send file to some Uploader for uploading and handle received data for rendering
  const sendFileToServer = () => {
    if (selectedFile) {
      setIsLoading(true);
      setIsSendingFile(true);
      const formData = new FormData();
      formData.append('chatImageURL', selectedFile);
      sendFile(formData)
        .then(data => {
          const messageData = {
            userId,
            roomId: chatRoomInProgress._id,
            message: {
              messageOwner: 'user',
              messageType: 'image',
              messageText: data.imageURL,
            },
          };

          dispatch({
            type: addMessage,
            payload: messageData,
          });

          socket.emit('userMessage', messageData);
          handleTyping(false); // if user sent an image, we assume that he has stopped typing
        })
        .catch(() =>
          toast.error('Не вдалося завантажити фото. Спробуйте повторити')
        )
        .finally(() => {
          setSelectedFile(null);
          setFileSelected(false);
          setTemporaryImageURL(null);
          setIsLoading(false);
          setIsSendingFile(false);
        });
    }
  };

  // handle a previous view of image before uploading
  const handleFileChange = async event => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileSelected(true);

    // compress and resize the image with a certain maximum width and a quality
    try {
      const compressedImage = await compressAndResizeImage(file, 250, 0.8);

      setTemporaryImageURL(compressedImage);
    } catch (error) {
      toast.error('Помилка завантаження фото. Будь-ласка повторіть спробу');
    }
  };

  // handle to open window to choose image-file for uploading
  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // return the rows of textarea to previous value
  const handleFocus = () => {
    if (message.trim() !== '') {
      setRows(rowsRef.current);
    }
  };

  // handle to send a message after pushing of button "Enter"
  const handleKeyDown = event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (isSendingFile) {
        sendFileToServer();
      } else {
        handleSubmitMessage();
      }
    }
  };

  // handle changing of footer menu
  const toggleMenu = () => {
    setActiveMenu(!activeMenu);
  };

  // handle to lost focus on input
  const handleOnBlur = () => {
    setRows(1); // return count of rows to initial value
    handleTyping(false); // if the user lost focus on input, we assume that he has stopped typing
    clearTimeout(typingTimeout);
  };

  // handle changing of footer menu
  useEffect(() => {
    setActiveMenu(isActiveMenu);
  }, [isActiveMenu]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <footer className="absolute bottom-[0] w-full bg-bgWhite">
          <div className="relative items-center">
            <textarea
              className={`${
                !isDisabled ? 'input-style' : 'input-style-disabled border-y-1'
              }`}
              type="text"
              placeholder="Введіть ваше повідомлення"
              rows={rows}
              value={message}
              onChange={handleMessageChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleOnBlur}
              disabled={isDisabled}
            />
            {!message && !fileSelected && (
              <>
                <button
                  type="button"
                  className="icon-style button-wrapper"
                  style={{ right: '44px' }}
                  onClick={toggleMenu}
                  disabled={!isChat || !chatRoomInProgress}
                >
                  <MenuIcon
                    activeMenu={activeMenu}
                    isDisabled={!isChat}
                    chatRoomInProgress={chatRoomInProgress}
                  />
                  {isChat && chatRoomInProgress && (
                    <div className="description hidden absolute bottom-[100%] right-[0%] text-textContrast bg-bgGreyDark p-xs2 rounded-medium whitespace-nowrap z-10">
                      {activeMenu ? 'Сховати меню' : 'Показати меню'}
                    </div>
                  )}
                </button>
                <button
                  className="icon-style button-wrapper"
                  onClick={openFileInput}
                  disabled={!isChat || !chatRoomInProgress}
                >
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                  <AttachIcon
                    isDisabled={!isChat}
                    chatRoomInProgress={chatRoomInProgress}
                  />
                  {isChat && chatRoomInProgress && (
                    <div className="description hidden absolute bottom-[100%] right-[0%] text-textContrast bg-bgGreyDark p-xs2 rounded-medium whitespace-nowrap z-10">
                      Прикріпити фото .jpg, .jpeg, .png, .gif
                    </div>
                  )}
                </button>
              </>
            )}
            {(fileSelected || message) && (
              <button
                type="submit"
                className="icon-style button-wrapper z-10"
                onClick={
                  message && fileSelected
                    ? () => {
                        handleSubmitMessage();
                        sendFileToServer();
                      }
                    : message
                    ? handleSubmitMessage
                    : sendFileToServer
                }
              >
                <SendIcon />
                <div className="description hidden absolute bottom-[100%] right-[0%] text-textContrast bg-bgGreyDark p-xs2 rounded-medium whitespace-nowrap z-10">
                  Відправити повідомлення
                </div>
              </button>
            )}
            {temporaryImageURL && (
              <div className="ml-s py-sPlus">
                <div className="relative">
                  <img
                    className="border-1 border-solid border-borderDefault rounded-minimal"
                    src={temporaryImageURL}
                    alt="Uploaded Image"
                  />
                  <button
                    className="absolute top-[-8px] left-[242px] border-1 bg-bgWhite border-solid border-borderDefault rounded-[50%] cursor-pointer hover:bg-bgHoverGrey hover:border-borderHover transition-colors duration-300"
                    onClick={() => {
                      setTemporaryImageURL(null);
                      setFileSelected(false);
                    }}
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>
            )}
          </div>
          {activeMenu && (
            <div className="flex gap-xs py-xs justify-center fade-in">
              <button
                className={`font-500 rounded-medium flex justify-center items-center gap-xs2 transition-colors duration-300 focus:outline-none min-w-[150px] h-[48px] bg-bgWhite text-textBrand border-solid border-1 border-borderDefaultBlue py-xs leading-6 hover:bg-bgHoverGrey focus:shadow-btFocus
                 ${
                   chatRoomInProgress?.isChatRoomProcessed &&
                   'text-textDisabled border-borderDisabled bg-bgDisable cursor-not-allowed pointer-events-none'
                 } ${isTablet ? 'px-m' : 'px-s'}`}
                onClick={() => navigate('/')}
              >
                Головне меню
              </button>
              <button
                className={`font-500 rounded-medium flex justify-center items-center gap-xs2 transition-colors duration-300
                            focus:outline-none min-w-[150px] h-[48px]  py-xs leading-6 
                            ${isTablet ? 'px-m' : 'px-s'}
                            ${
                              isChat &&
                              chatRoomInProgress &&
                              'bg-bgDefaultDestructive text-textContrast hover:bg-bgHoverDestructive focus:bg-bgDefaultDestructive focus:shadow-btFocus'
                            }
                            ${
                              (!isChat || !chatRoomInProgress) &&
                              'bg-bgDisable text-textDisabled border-solid border-1 border-borderDisabled cursor-not-allowed pointer-events-none'
                            }`}
                disabled={!isChat || !chatRoomInProgress}
                onClick={() => isOpenModal()}
              >
                Завершити діалог
              </button>
            </div>
          )}
        </footer>
      )}
    </>
  );
};

Footer.propTypes = {
  isActiveMenu: PropTypes.bool.isRequired,
  isOpenModal: PropTypes.func,
  isTablet: PropTypes.bool.isRequired,
  handleUserQuery: PropTypes.func,
};
