import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { CameraIcon, EditIcon, SaveIcon, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { Input } from "../ui/input";
import CreateTags from "../ui/CreateTags";

const Tags = [
  { id: "react", label: "React" },
  { id: "typescript", label: "TypeScript" },
  { id: "javascript", label: "JavaScript" },
  { id: "nextjs", label: "Next.js" },
  { id: "vuejs", label: "Vue.js" },
  { id: "angular", label: "Angular" },
  { id: "svelte", label: "Svelte" },
  { id: "nodejs", label: "Node.js" },
  { id: "python", label: "Python" },
  { id: "ruby", label: "Ruby" },
  { id: "java", label: "Java" },
  { id: "csharp", label: "C#" },
  { id: "php", label: "PHP" },
  { id: "go", label: "Go" },
];

export default function Profile() {
  const [Banner, setBanner] = useState("");
  const [ProfileImg, setProfileImg] = useState("");
  const [EditProfile, setEditProfile] = useState(false);

  const [userData, setUserData] = useState({
    displayName: "  Monu Shah",
    userName: "@YourUsername",
    aboutMe: "Hey there! I’m using Pro Player 🎮",
    status: "",
    skill: ["React", "Redux", "Tailwind", "TypeScript"],
  });

  const bages = ["online", "do not disturbe", "ofline", "asthetic"];

  return (
    <section className="bg-background text-foreground   transition-colors  ">
      <div className="container max-w-5xl m-auto relative space-y-5">
        <div className="bg-[url('https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171')] h-[250px] bg-cover bg-center relative group/img-1">
          <button className="p-2 z-10 text-white hidden group-hover/img-1:block">
            <label htmlFor="bgImg">
              <CameraIcon className="size-5" />
            </label>
            <input type="file" name="" id="bgImg" className="hidden" />
          </button>

          <div className="absolute top-50 left-8 border-8 border-white dark:border-black rounded-full overflow-hidden">
            <label htmlFor="profileImg">
              <Avatar className="group/img-2">
                <AvatarImage
                  className="size-20 object-cover"
                  src={`https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170`}
                />
                <AvatarFallback>M</AvatarFallback>
                <div className="absolute top-[60%] left-0 right-0 bottom-0 group-hover/img-2:flex items-center justify-center bg-accent/50 hidden transition-all duration-100 ease-in-out cursor-pointer">
                  <CameraIcon className="size-5 text-gray-700 " />
                </div>
              </Avatar>
            </label>
            <input type="file" name="" id="profileImg" className="hidden" />
          </div>
        </div>

        <div className="text-right px-2">
          {EditProfile ? (
            <div className="flex items-center gap-2 justify-end  ">
              <Button onClick={() => setEditProfile(false)}>Cancel</Button>
              <Button>
                <SaveIcon /> Save Edit
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={() => setEditProfile(true)}>
              <EditIcon />
              Edit Profile
            </Button>
          )}
        </div>
        <motion.div
          className="flex flex-col p-2 gap-5 h-full "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* User Info Card */}

          <AnimatePresence>
            {EditProfile ? (
              <motion.div
                key="edit"
                className="border border-border rounded-lg p-6 bg-card/60 backdrop-blur-sm hover:shadow-lg transition-shadow"
                exit={{ opacity: 0 }}
              >
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Display Name
                    </p>
                    <Input defaultValue="Monu Shah" />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Username</p>
                    <Input defaultValue="@YourUsername" />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">About Me</p>
                    <textarea
                      className="w-full h-20 resize-none rounded-md border border-border bg-background text-sm p-2 focus:ring-1 focus:ring-primary/50"
                      defaultValue="Hey there! I’m using Pro Player 🎮"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Add Skills</p>
                    <CreateTags />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <div className="flex flex-wrap gap-2">
                      {bages.map((item) => (
                        <Badge
                          key={item}
                          variant="secondary"
                          className="flex items-center gap-1 capitalize"
                        >
                          {item} <X className="w-3 h-3 cursor-pointer" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="border border-border rounded p-5 bg-background/50 backdrop-blur-sm hover:shadow-md transition-shadow"
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="flex flex-col gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Display Name
                    </p>
                    <h1 className="text-lg font-semibold text-foreground">
                      Monu Shah
                    </h1>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Username</p>
                    <p className="text-foreground text-sm">@YourUsername</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">About Me</p>
                    <p className="text-foreground leading-relaxed text-xs">
                      Hey there! I’m using Pro Player 🎮
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <motion.p
                      className="inline-flex items-center gap-2 text-green-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="w-2 h-2  bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs">Online</span>
                    </motion.p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Skills</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {["React", "Redux", "Tailwind", "TypeScript"].map(
                        (skill, i) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                          >
                            <Badge variant="destructive">{skill}</Badge>
                          </motion.span>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Membership Info */}
          {!EditProfile && (
            <motion.div
              className="border border-border rounded p-5 bg-background/50 backdrop-blur-sm hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.01 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-base font-semibold text-foreground">
                Pro Player Member Since
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                November 1, 2024
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
