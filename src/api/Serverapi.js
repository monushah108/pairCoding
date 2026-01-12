import ApiInstance from "./ApiInstance";

export const Newserver = async ({ picture, name }) => {
  const { data } = await ApiInstance.post("/server", { picture, name });
  return data;
};
