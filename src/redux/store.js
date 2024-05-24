import { configureStore } from '@reduxjs/toolkit';

import { chatReducer } from './chat/slice';
import { faqReducer } from './faq/slice';
import { orderDetailsReducer } from './orderDetails/slice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    faq: faqReducer,
    orderDetails: orderDetailsReducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});
