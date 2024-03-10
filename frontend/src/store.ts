import { create } from "zustand";

export type IsFirstTime = {
  isFirstTime: boolean;
  setIsFirstTime: (isFirstTime: boolean) => void;
  message: string;
  setMessage: (message: string) => void;
};
interface Option {
  [index: number]: string;
}

export interface Message {
  message: string;
  options: Option;
  id?: string;
  list?: boolean;
  conclusion?: string;
}
function isMessage(message: unknown): message is Message {
  return (
    typeof message === "object" &&
    "message" in message &&
    typeof message.message === "string" &&
    "options" in message &&
    message.options instanceof Option && // Assuming Option is also an interface/type
    ("id" in message ? typeof message.id === "string" : true) && // Optional id check
    ("list" in message ? typeof message.list === "boolean" : true) && // Optional list check
    ("conclusion" in message ? typeof message.conclusion === "string" : true)
  ); // Optional conclusion check
}

export type Steps = {
  step: number;
  setStep: (step: number) => void;
};
export type UseChat = {
  messages: Array<string | Message | unknown>;
  setMessages: (messages: Array<string | Message>) => void;
  clearMessages: () => void;
};

export const useIsFirstTime = create<IsFirstTime>((set) => ({
  isFirstTime: true,
  message: "",
  setIsFirstTime: (isFirstTime: boolean) => set({ isFirstTime }),
  setMessage: (message: string) => set({ message }),
}));

export const useChats = create<UseChat>((set) => ({
  messages: [],
  clearMessages: () => {
    set(() => {
      return {
        messages: [],
      };
    });
  },
  setMessages: (messagesData: Array<string | Message>) => {
    console.log(JSON.stringify(messagesData));
    set((state) => {
      const messagesWithId = messagesData.filter((message) => {
        if (typeof message === "object") {
          return state.messages.some((item) => {
            return (
              isMessage(item) && (item?.id as unknown as string) === message.id
            );
          });
        }
        if (typeof message === "string") {
          return state.messages.some((item) => item === message);
        }
        return false; // Return false if message is not an object
      });
      if (messagesWithId.length > 0) {
        return {
          messages: [...state.messages],
        };
      }
      return {
        messages: [...state.messages, ...messagesData],
      };
    });
  },
}));
