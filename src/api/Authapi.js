import ApiInstance from "./ApiInstance";

export const LoginApi = async (Userdata) => {
  const { data } = await ApiInstance.post("/login", Userdata);
  return data;
};

export const ProfileApi = async () => {
  const { data } = await ApiInstance.get("/profile");
  return data;
};

export const RegisterApi = async (Userdata) => {
  const { data } = await ApiInstance.post("/register", Userdata);
  return data;
};

export const CheckDisplayName = async (Userdata) => {
  const { data } = await ApiInstance.post("/checkDisplayName", Userdata);
  return data;
};

export const SearchUser = async (Userdata) => {
  const { data } = await ApiInstance.post("/SearchUser", Userdata);
  return data;
};

export const SendNotifications = async (Userdata) => {
  console.log("api", Userdata);
  const { data } = await ApiInstance.post("/SendNotifications", Userdata);
  return data;
};

export const getNotifications = async () => {
  const { data } = await ApiInstance.get("/getNotification");
  return data;
};

export const RespondToFriendRequest = async ({ receiver, status }) => {
  const { data } = await ApiInstance.post(
    "/requestResponse",
    {},
    {
      params: {
        receiver,
        status,
      },
    }
  );

  return data;
};

export const GetAllFriends = async (Userdata) => {
  const { data } = await ApiInstance.get("/getAllFriends");
  return data;
};
