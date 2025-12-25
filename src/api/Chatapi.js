import ApiInstance from "./ApiInstance";

export const OpenMsg = async ({ roomId, action }) => {
  const { data } = await ApiInstance.patch(
    `/chat/open/${roomId}`,
    {},
    { params: { action } }
  );
  return data;
};

export const GetMsgs = async ({ roomId }) => {
  const { data } = await ApiInstance.get(`/chat/${roomId}`);
  return data;
};

export const sendMsg = async ({ roomId, message }) => {
  const { data } = await ApiInstance.post(`/chat/${roomId}`, { message });
  return data;
};
