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

export const EditMsg = async ({ action, id, roomId }) => {
  const { data } = await ApiInstance.patch(
    `/chat/edit/${id}`,
    {},
    { params: { action, roomId } }
  );
  return data;
};
