import { useLocalStorage } from "@vueuse/core";
import { CHAT } from "../types";
import { v4 as uuidv4 } from "uuid";

export const CHATS = useLocalStorage<CHAT[]>(`CHATS`, [
    {
        id: uuidv4() , role: "system", content: "You are a helpful assistant.", html: "good"
    }
]);