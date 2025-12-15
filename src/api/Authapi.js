import Authinstance from "./Authinstance";

export const LoginApi = async (Userdata) => {
  const { data } = await Authinstance.post("/login", Userdata);
  return data;
};

export const ProfileApi = async () => {
  const { data } = await Authinstance.get("/profile");
  return data;
};

export const RegisterApi = async (Userdata) => {
  const { data } = await Authinstance.post("/register", Userdata);
  return data;
};

export const CheckDisplayName = async (Userdata) => {
  const { data } = await Authinstance.post("/checkDisplayName", Userdata);
  return data;
};

export const SearchUser = async (Userdata) => {
  const { data } = await Authinstance.post("/SearchUser", Userdata);
  return data;
};

export const SendNotifications = async (Userdata) => {
  console.log("api", Userdata);
  const { data } = await Authinstance.post("/SendNotifications", Userdata);
  return data;
};

export const getNotifications = async () => {
  const { data } = await Authinstance.get("/getNotification");
  return data;
};

export const RespondToFriendRequest = async ({ receiver, status }) => {
  const { data } = await Authinstance.post(
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
  const { data } = await Authinstance.get("/getAllFriends");
  return data;
};
