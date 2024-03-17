import { useStorage } from "@vueuse/core";

const token = useStorage<string | null>("token", null, undefined);

export default token;
