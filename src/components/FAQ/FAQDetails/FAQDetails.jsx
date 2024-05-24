import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import theme from '../../../../presets';
import '@/index.css';
import { MessageCard } from '@/components/MessageCard';
import { Footer } from '@/components/Footer';
import { GoBack } from '@/components/GoBack';
import { ArrowDownIcon } from '@/images/svg';
import { Container } from '@/utils';

import { selectQuestionGroups } from '@/redux/faq/selectors';

export const FAQDetails = ({ isTablet }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const faqs = useSelector(selectQuestionGroups);
  const [openQuestionId, setOpenQuestionId] = useState(null);

  const selectedFAQ = faqs.find(faq => faq._id === id);
  const { questionGroup, questions } = selectedFAQ;

  return (
    <>
      <Container>
        <section
          className={`
          ${isTablet ? 'max-h-[70vh] py-sPlus' : 'max-h-[400px] py-s'}
           message-container`}
        >
          <MessageCard
            type="text"
            text={`Запитання-відповідь із категорії "${questionGroup}":`}
            time="hidden"
          />
          <div className="flex flex-col gap-xs text-textPrimary text-body py-s">
            {questions?.map(item => {
              const { _id, question, answer, isShowInChat } = item;

              if (isShowInChat) {
                const isOpen = _id === openQuestionId;

                return (
                  <div key={_id}>
                    <button
                      className="flex items-center justify-between w-full p-xs bg-bgBrandLight1"
                      onClick={() => setOpenQuestionId(isOpen ? null : _id)}
                    >
                      <p>{question}</p>
                      <div className={`${!isOpen ? 'rotate-180' : 'rotate-0'}`}>
                        <ArrowDownIcon colorFill={theme.colors.iconBrand} />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="fade-in flex flex-col items-start">
                        <p className="p-xs">{answer.text}</p>
                        <div className="flex gap-xs px-xs justify-center items-center fade-in">
                          <p className="text-caption text-textBrand">
                            {'Не знайшли відповідь на запитання?'}
                          </p>
                          <button
                            className="p-xs2 text-caption font-500 text-textBrand border-solid border-1 border-borderDefaultBlue bg-bgWhite hover:bg-bgHoverGrey focus:shadow-btFocus rounded-medium transition-colors duration-300 focus:outline-none "
                            onClick={() => navigate('/chat')}
                          >
                            {"З'єднати з менеджером"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
          <GoBack to="/faq" />
        </section>
      </Container>
      <Footer isActiveMenu={true} isTablet={isTablet} />
    </>
  );
};

FAQDetails.propTypes = {
  isTablet: PropTypes.bool.isRequired,
};
