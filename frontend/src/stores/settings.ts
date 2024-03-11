import { useLocalStorage } from "@vueuse/core";

export const soundEnabled = useLocalStorage<boolean>("soundEnabled", true);

