import ApiInstance from "./ApiInstance";

export const OpenMsg = async ({ roomId, action }) => {
  const { data } = await ApiInstance.patch(
    `/chat/open/${roomId}`,
    {},
    { params: { action } }
  );
  return data;
};
