import { motion } from "motion/react";
import { Button } from "../ui/button";
export default function Membership({ OnEdit }) {
  return (
    <>
      {!OnEdit && (
        <>
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
          <motion.div
            className="border border-destructive/40 rounded-lg p-5 space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-sm font-semibold text-destructive tracking-wide">
              Danger Zone
            </h2>

            {/* Logout */}
            <div className="flex items-center justify-between border border-border rounded-md p-4">
              <div>
                <p className="text-sm font-medium">Logout</p>
                <p className="text-xs text-muted-foreground">
                  You will be logged out from this device
                </p>
              </div>

              <Button
                variant="outline"
                className="text-destructive border-destructive"
              >
                Logout
              </Button>
            </div>

            {/* Delete Account */}
            <div className="flex items-center justify-between border border-destructive/50 rounded-md p-4">
              <div>
                <p className="text-sm font-medium text-destructive">
                  Delete Account
                </p>
                <p className="text-xs text-muted-foreground">
                  This action is permanent and cannot be undone
                </p>
              </div>

              <Button
                variant="outline"
                className="text-destructive border-destructive"
              >
                Delete
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}
