import { useState } from "react";

export interface MessageEventHandler {
  (event: MessageEvent): void;
}

export function useWorker(messageEventHandler: MessageEventHandler): Worker {
  // Create new worker once and never again
  const [worker] = useState(() => createWorker(messageEventHandler));
  return worker;
}

function createWorker(messageEventHandler: MessageEventHandler): Worker {
  const worker = new Worker(
    // whisper-worker.js should be at the root of `src`
    new URL("../../../whisper-worker.js", import.meta.url),
    {
      type: "module",
    }
  );
  // Listen for messages from the Web Worker
  worker.addEventListener("message", messageEventHandler);
  return worker;
}
