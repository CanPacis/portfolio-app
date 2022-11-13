import { atom } from "recoil";

export const scroll_store = atom<boolean>({
  key: "scroll_store",
  default: false,
});
