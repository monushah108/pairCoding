import { AnimatePresence, motion } from "motion/react";
import { Input } from "../ui/input";
import CreateTags from "../ui/CreateTags";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";
export default function UserInfoCard({ OnEdit }) {
  return (
    <>
      <AnimatePresence>
        {OnEdit ? (
          <motion.div
            key="edit"
            className="border border-border rounded-lg p-6 bg-card/60 backdrop-blur-sm hover:shadow-lg transition-shadow"
            exit={{ opacity: 0 }}
          >
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Display Name</p>
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
                {/* <CreateTags /> */}
              </div>

              {/* <div>
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
              </div> */}
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
                <p className="text-sm text-muted-foreground">Display Name</p>
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
                    ),
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
