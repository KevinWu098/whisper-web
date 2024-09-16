"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { AudioManager } from "@/components/whisper/AudioManager";
import { useTranscriber } from "@/components/whisper/hooks/useTranscriber";
import Transcript from "@/components/whisper/Transcript";
import { cn } from "@/lib/utils";

import { MicIcon } from "lucide-react";

export default function Home() {
  const [showAudio, setShowAudio] = useState(false);
  const [_input, setInput] = useState("");

  const transcriber = useTranscriber();

  return (
    <div className="flex w-full flex-col justify-end space-y-4 pt-4">
      <div className="flex flex-row space-x-2">
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "my-auto aspect-square size-10 w-10 min-w-10 max-w-10 rounded-full bg-background p-0",
            showAudio && "ring-2 ring-slate-400"
          )}
          onClick={() => setShowAudio((p) => !p)}
        >
          <MicIcon className="size-4" />
        </Button>
      </div>

      <div className={cn("mb-4", !showAudio && "hidden")}>
        <Transcript transcribedData={transcriber.output} />
        <AudioManager
          transcriber={transcriber}
          setInput={setInput}
        />
      </div>
    </div>
  );
}
