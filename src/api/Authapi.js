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
