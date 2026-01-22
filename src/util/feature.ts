import openVoice from "@/assets/open-voice.wav";
import openAudio from "@/assets/open-audio.wav";
import openCall from "@/assets/open-call.wav";
import micOn from "@/assets/mic.wav";
import micOff from "@/assets/mic-of.wav";
import defOn from "@/assets/pop-of.wav";
import defOff from "@/assets/pop.wav";

export const FormatTime = (date = "") => {
  const time = new Date(date);

  return time.toLocaleTimeString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const sounds = {
  Audio: openVoice,
  Voice: openAudio,
  Call: openCall,
  Mic: { open: micOn, close: micOff },
  Defend: { open: defOn, close: defOff },
};

const VoiceManager = {
  play(type) {
    const audio = new Audio(sounds[type]);
    audio.volume = 0.4;
    audio.play();
  },

  toggle(type, state) {
    const src = state ? sounds[type].open : sounds[type].close;
    const audio = new Audio(src);
    audio.volume = 0.4;
    audio.play();
  },
};

export const SoundManager = VoiceManager;
