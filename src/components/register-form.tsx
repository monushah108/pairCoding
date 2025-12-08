import { Binary } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { RegisterApi, CheckDisplayName } from "../api/Authapi.js";
import { CircleAlert, CircleCheck, User } from "lucide-react";

import CreateTags from "./ui/CreateTags.js";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "./ui/input-group.js";
import Imgpreview from "./module/Imgpreview.js";
import { debounce } from "lodash";

// export function RegisterForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   const [email, setEmail] = useState("monu@gmail.com");
//   const [password, setPassword] = useState("1234");
//   const [name, setName] = useState("monu");
//   const [validDispalyName, setValidDisplayName] = useState(false);
//   const [validSetps, setValidSetps] = useState(1);
//   const [picture, setPicture] = useState(null);
//   const [displayName, setDisplayName] = useState("");
//   const [bio, setBio] = useState("");
//   const [skills, setSkills] = useState([]);

//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     console.log({
//       email,
//       password,
//       name,
//       bio,
//       picture,
//       displayName,
//       skills,
//     });

//     try {
//       const response = await RegisterApi({
//         email,
//         password,
//         name,
//         bio,
//         picture,
//         displayName,
//         skills,
//       });
//       toast.success(response.message);
//       navigate("/dashboard/@me");
//     } catch (err: any) {
//       const errorMessage =
//         err?.response?.data?.message ||
//         err?.response?.data?.error?.message ||
//         "something Went Wrong!!";

//       toast.error(errorMessage);
//     }
//   };

//   const handleSteps = (e) => {
//     e.preventDefault();
//     setValidSetps((prev) => (prev === 3 ? 3 : prev + 1));
//     console.log(validSetps, "setps");
//   };

//   const checkDisplayName = async (displayName: string) => {
//     if (!name) return;

//     try {
//       const res = await CheckDisplayName({ displayName });
//       console.log(res.data.available, res);
//       setValidDisplayName(res.data.available);
//     } catch (err: any) {
//       console.log(err, err.data.available);
//       setValidDisplayName(err.response.data.available);
//     }
//   };

//   const handleChange = (e) => {
//     const name = e.target.value;
//     setDisplayName(name);
//     checkDisplayName(name);
//   };

//   const boundanceCheck = debounce(checkDisplayName, 4000);

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Toaster position="top-center" />

//       <form onSubmit={validSetps == 3 ? handleRegister : handleSteps}>
//         <FieldGroup>
//           <div className="flex flex-col items-center gap-2 text-center">
//             <a
//               href="#"
//               className="flex flex-col items-center gap-2 font-medium"
//             >
//               <div className="flex size-8 items-center justify-center rounded-md">
//                 <Binary className="size-6" />
//               </div>
//               <span className="sr-only">Pro Player</span>
//             </a>
//             <h1 className="text-xl font-bold">Welcome to Pro Player</h1>
//             <FieldDescription>
//               setup your profile here to start your awesome coding journy
//             </FieldDescription>
//           </div>

//           {validSetps == 1 && (
//             <>
//               <Imgpreview picture={picture} setPicture={setPicture} />
//               <Field>
//                 <FieldLabel>Display name</FieldLabel>
//                 <InputGroup>
//                   <InputGroupAddon>
//                     <User />
//                   </InputGroupAddon>
//                   <InputGroupInput
//                     name="display name"
//                     value={displayName}
//                     onChange={handleChange}
//                     placeholder="display name "
//                   />

//                   <InputGroupAddon align="inline-end">
//                     {validDispalyName ? <CircleCheck /> : <CircleAlert />}
//                   </InputGroupAddon>
//                 </InputGroup>
//               </Field>
//               <Field>
//                 <FieldLabel htmlFor="email">Email</FieldLabel>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="m@example.com"
//                   name="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </Field>
//             </>
//           )}

//           {validSetps == 2 && (
//             <>
//               {" "}
//               <Field>
//                 <FieldLabel htmlFor="userName">User Name</FieldLabel>
//                 <Input
//                   id="userName"
//                   type="text"
//                   placeholder="enter your name."
//                   name="userName"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </Field>
//               <Field>
//                 <FieldLabel>Bio</FieldLabel>
//                 <InputGroup>
//                   <InputGroupTextarea
//                     value={bio}
//                     onChange={(e) => setBio(e.target.value)}
//                     placeholder="tell about yourself"
//                     name="bio"
//                   />
//                 </InputGroup>
//               </Field>
//             </>
//           )}

//           {validSetps == 3 && (
//             <>
//               <Field>
//                 <FieldLabel>Add your Skill</FieldLabel>
//                 <CreateTags setSkills={setSkills} />
//               </Field>
//               <Field>
//                 <FieldLabel htmlFor="password">Password</FieldLabel>
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="********"
//                   name="password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </Field>
//             </>
//           )}

//           <Field>
//             <Button type="submit">{validSetps == 3 ? "save" : "next"}</Button>
//           </Field>
//         </FieldGroup>
//       </form>
//       <FieldDescription className="px-6 text-center">
//         <Link to="/Auth/login">I alredy have an Account ?</Link>
//       </FieldDescription>
//     </div>
//   );
// }

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("monu@gmail.com");
  const [password, setPassword] = useState("1234");
  const [name, setName] = useState("monu");
  const [picture, setPicture] = useState(null);
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState([]);

  const [validSteps, setValidSteps] = useState(1);

  // ------------------- HANDLE REGISTER -------------------
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await RegisterApi({
        email,
        password,
        name,
        bio,
        picture,
        skills,
      });

      console.log(response);

      toast.success(response.message);
      navigate("/dashboard/@me");
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error?.message ||
        "Something went wrong!!";

      toast.error(errorMessage);
    }
  };

  const handleSteps = (e) => {
    e.preventDefault();
    setValidSteps((prev) => (prev >= 3 ? 3 : prev + 1));
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Toaster position="top-center" />

      <form onSubmit={validSteps === 3 ? handleRegister : handleSteps}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-8 items-center justify-center rounded-md">
                <Binary className="size-6" />
              </div>
            </div>
            <h1 className="text-xl font-bold">Welcome to Pro Player</h1>
            <FieldDescription>
              Setup your profile to start your coding journey.
            </FieldDescription>
          </div>

          {/* ------------------- Step 1 ------------------- */}
          {validSteps === 1 && (
            <>
              <Imgpreview picture={picture} setPicture={setPicture} />

              <Field>
                <FieldLabel>User Name</FieldLabel>
                <Input
                  id="userName"
                  type="text"
                  placeholder="Enter your name."
                  name="userName"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Field>
            </>
          )}

          {/* ------------------- Step 2 ------------------- */}
          {validSteps === 2 && (
            <>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel>Bio</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell about yourself"
                    name="bio"
                  />
                </InputGroup>
              </Field>
            </>
          )}

          {/* ------------------- Step 3 ------------------- */}
          {validSteps === 3 && (
            <>
              <Field>
                <FieldLabel>Add your Skills</FieldLabel>
                <CreateTags setSkills={setSkills} />
              </Field>

              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  type="password"
                  placeholder="********"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
            </>
          )}

          <Field>
            <Button type="submit">{validSteps === 3 ? "Save" : "Next"}</Button>
          </Field>
        </FieldGroup>
      </form>

      <FieldDescription className="px-6 text-center">
        <Link to="/Auth/login">I already have an account?</Link>
      </FieldDescription>
    </div>
  );
}
