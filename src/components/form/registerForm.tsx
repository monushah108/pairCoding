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
import { Toaster } from "sonner";
import { Link, useNavigate } from "@tanstack/react-router";

import CreateTags from "../ui/CreateTags.js";
import { InputGroup, InputGroupTextarea } from "../ui/input-group.js";
import Imgpreview from "../module/Imgpreview.js";
import { useRegisterMutation } from "@/store/services/auth/authApi.js";
import { Spinner } from "../ui/spinner.js";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();

  /* 
  fix this it's has a lot's of error and unorgnized 
   */

  const [email, setEmail] = useState("monu@gmail.com");
  const [password, setPassword] = useState("1234");
  const [name, setName] = useState("monu");
  const [picture, setPicture] = useState(null);
  const [rawFile, setRawFile] = useState(null);
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState([]);

  const [validSteps, setValidSteps] = useState(1);

  const [register, { isLoading, isError, data }] = useRegisterMutation();

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("bio", bio);
    formData.append("skills", JSON.stringify(skills));

    if (rawFile) {
      formData.append("image", rawFile);
    }

    try {
      const response = await register(formData).unwrap();
      console.log(response);
    } catch (err) {
      console.error(err);
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
              <Imgpreview
                setPicture={setPicture}
                rawFile={rawFile}
                setRawFile={setRawFile}
              />

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
            <Button type="submit">
              {validSteps === 3 ? "Save" : "Next"}
              {validSteps == 3 && isLoading ? <Spinner /> : null}
            </Button>
          </Field>
        </FieldGroup>
      </form>

      <FieldDescription className="px-6 text-center">
        <Link to="/Auth/login">I already have an account?</Link>
      </FieldDescription>
    </div>
  );
}
