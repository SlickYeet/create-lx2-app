import * as AsciinemaPlayer from "asciinema-player"

export const player = (container, opts) => {
  if (!container) {
    console.error("Container element not found for Asciinema player.")
    return
  }

  AsciinemaPlayer.create("/demo.cast", container, opts)
}
