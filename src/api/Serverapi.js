import ApiInstance from "./ApiInstance";

export const Newserver = async ({ picture, name }) => {
  const { data } = await ApiInstance.post("/server", { picture, name });
  return data;
};

export const GetAllserver = async () => {
  const { data } = await ApiInstance.get("/server");
  return data;
};

export const GetAllchannels = async ({ serverId }) => {
  console.log(serverId);
  const { data } = await ApiInstance.get(`/channel/${serverId}`);
  return data;
};
