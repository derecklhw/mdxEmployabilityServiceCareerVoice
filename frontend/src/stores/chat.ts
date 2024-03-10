import { useLocalStorage } from "@vueuse/core";
import { CHAT } from "../types";

export const CHATS = useLocalStorage<CHAT[]>(`CHATS`, [
    {
        role: "system", content: "You are a helpful assistant."
    }
]);