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

export const SendFriendRequest = async (Userdata) => {
  const { data } = await Authinstance.post("/SendFriendRequest", Userdata);
  return data;
};

export const GetFriendRequests = async () => {
  const { data } = await Authinstance.get("/GetFriendRequest");
  return data;
};

export const RespondToFriendRequest = async ({ sender, status }) => {
  console.log("sender being sent:", sender);
  console.log("status being sent:", status);
  const { data } = await Authinstance.post(
    "/requestResponse",
    {},
    {
      params: {
        sender,
        status,
      },
    }
  );

  return data;
};
