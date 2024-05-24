import { createSelector } from '@reduxjs/toolkit';

export const selectIsLoading = state => state.chat.isLoading;

export const selectChat = state => state.chat;

export const selectChatRooms = state => state.chat.chatRooms;

export const selectToken = state => state.chat.token;

export const selectChatRoomInProgress = createSelector(
  state => state.chat.chatRooms,
  chatRooms => chatRooms.find(room => room.chatRoomStatus === 'in progress')
);
