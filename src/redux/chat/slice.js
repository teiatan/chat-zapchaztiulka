import { createSlice } from '@reduxjs/toolkit';

import { authUser, createChatRoom, closeChatRoom } from './operations';
import {
  updateUserStatus,
  addMessage,
  updateManager,
  closeChatByManager,
} from './actions';

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const initialState = {
  userId: null,
  username: null,
  userPhone: null,
  token: null,
  isOnline: false,
  chatRooms: [],
  createdAt: null,
  isLoading: false,
  error: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,

  extraReducers: builder => {
    builder
      // slices to connect to database
      .addCase(authUser.pending, handlePending)
      .addCase(authUser.fulfilled, (state, { payload }) => {
        Object.assign(state, payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(authUser.rejected, handleRejected)

      .addCase(createChatRoom.pending, handlePending)
      .addCase(createChatRoom.fulfilled, (state, { payload }) => {
        const existingRooms = [...state.chatRooms];
        const roomIndex = existingRooms.findIndex(
          room => room._id === payload._id
        );

        if (roomIndex === -1) {
          state.chatRooms.push(payload);
          state.isOnline = true;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(createChatRoom.rejected, handleRejected)

      .addCase(closeChatRoom.pending, handlePending)
      .addCase(closeChatRoom.fulfilled, (state, { payload }) => {
        const roomIndex = state.chatRooms.findIndex(
          room => room._id === payload.roomId
        );

        if (roomIndex !== -1) {
          state.chatRooms[roomIndex].chatRoomStatus = 'completed';
          state.chatRooms[roomIndex].isChatRoomOpen = false;
          state.chatRooms[roomIndex].isChatRoomProcessed = false;
        }

        state.isOnline = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(closeChatRoom.rejected, handleRejected)

      // slices to update only Redux state
      .addCase(closeChatByManager, (state, { payload }) => {
        const chatRoom = state.chatRooms.find(
          room => room._id === payload.room._id
        );
        if (chatRoom) {
          chatRoom.chatRoomStatus = 'completed';
          chatRoom.isChatRoomProcessed = false;
          chatRoom.isChatRoomOpen = false;
        }
        state.isOnline = false;
      })

      .addCase(addMessage, (state, { payload }) => {
        const { roomId, message } = payload;

        state.chatRooms = state.chatRooms.map(room => {
          if (room._id === roomId) {
            return {
              ...room,
              messages: [...room.messages, message],
            };
          }
          return room;
        });
      })

      .addCase(updateManager, (state, { payload }) => {
        const {
          _id: roomId,
          managerId,
          managerName,
          managerSurname,
          isChatRoomProcessed,
        } = payload;

        const roomIndex = state.chatRooms.findIndex(
          room => room._id === roomId
        );

        if (roomIndex !== -1) {
          state.chatRooms[roomIndex].managerId = managerId;
          state.chatRooms[roomIndex].managerName = managerName;
          state.chatRooms[roomIndex].managerSurname = managerSurname;
          state.chatRooms[roomIndex].isChatRoomProcessed = isChatRoomProcessed;
        }
      })

      .addCase(updateUserStatus, (state, { payload }) => {
        state.isOnline = payload.isOnline;
      });
  },
});

export const chatReducer = chatSlice.reducer;
