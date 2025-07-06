import { atom, useAtom } from "jotai"

const searchDialogAtom = atom(false)

export function useSearch() {
  return useAtom(searchDialogAtom)
}
