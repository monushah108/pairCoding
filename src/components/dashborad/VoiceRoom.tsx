import { GradientBackground } from "../gradient-background";
import { Button } from "../ui/button";

export default function VoiceRoom() {
  return (
    <div className="h-[901px] overflow-hidden">
      <GradientBackground
        gradients={[
          "linear-gradient(135deg, #2d1b69 0%, #11998e 100%)",
          "linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)",
        ]}
        animationDuration={10}
        animationDelay={0.5}
        overlay={true}
        overlayOpacity={0.5}
      >
        <div className="relative z-10 text-white text-center p-10 space-y-3">
          <h1 className="text-4xl font-bold">Meeting Room</h1>
          <p className="text-sm font-medium">no one currently in voice</p>
          <Button variant="secondary" className="cursor-pointer">
            Join
          </Button>
        </div>
      </GradientBackground>
    </div>
  );
}
