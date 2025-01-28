import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const languageAtom = atomWithStorage("language", "en");
export const tokenStorage = atomWithStorage("token", null);
export const emailStorage = atomWithStorage("email", null);

export const topRateMovieAtom = atom(null);
export const idMovieAtom = atom(null);
export const isOpenHeroModalAtom = atom(false); // default Modal value is false/close
export const isOpenModalAtom = atom(false); // default Modal value is false/close
export const searchMovieAtom = atom(null); // search query
export const isFetchingAtom = atom(false); // atom to track fetching state
export const emailAtom = atom("");
export const isFavoriteAtom = atom(false);
