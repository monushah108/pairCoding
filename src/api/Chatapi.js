import ApiInstance from "./ApiInstance";

export const OpenMsg = async ({ ChatId, action }) => {
  const { data } = await ApiInstance.patch(
    `/chat/open/${ChatId}`,
    {},
    { params: { action } }
  );
  return data;
};

export const GetMsgs = async ({ ChatId }) => {
  const { data } = await ApiInstance.get(`/chat/${ChatId}`);
  return data;
};

export const EditMsg = async ({ action, id, ChatId }) => {
  const { data } = await ApiInstance.patch(
    `/chat/edit/${id}`,
    {},
    { params: { action, ChatId } }
  );
  return data;
};
