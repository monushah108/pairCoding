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
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { Link, useNavigate } from "@tanstack/react-router";
import { RegisterApi } from "../../api/Authapi.js";

import CreateTags from "../ui/CreateTags.js";
import { InputGroup, InputGroupTextarea } from "../ui/input-group.js";
import Imgpreview from "../module/Imgpreview.js";

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
