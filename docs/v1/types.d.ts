declare module "asciinema-player" {
  /**
   * Available themes for Asciinema Player.
   * @see https://docs.asciinema.org/manual/player/themes
   */
  export type PlayerTheme =
    | "asciinema"
    | "dracula"
    | "monokai"
    | "nord"
    | "solarized-dark"
    | "solarized-light"
    | "tango"
    | "ctnts"

  /**
   * Asciinema Player Options
   * @see https://docs.asciinema.org/manual/player/options
   */
  export type PlayerOptions = Readonly<{
    cols?: number | null
    rows?: number | null
    autoPlay?: boolean | null
    preload?: boolean | null
    loop?: boolean | number | null
    startAt?: number | string | null
    speed?: number | null
    idleTimeLimit?: number | null
    theme?: PlayerTheme | `auto/${PlayerTheme}` | null
    poster?: string | null
    fit?: "width" | "height" | "both" | "none" | false | null
    controls?: boolean | "auto" | null
    markers?: ReadonlyArray<[number, string]> | null
    pauseOnMarkers?: boolean | null
    terminalFontSize?: "small" | "medium" | "large" | `${number}px` | null
    terminalFontFamily?: string | null
    terminalLineHeight?: number | null
    logger?: Readonly<{
      log?: (message: string) => void
      debug?: (message: string) => void
      info?: (message: string) => void
      warn?: (message: string) => void
      error?: (message: string) => void
    }> | null
  }>

  export type AsciinemaPlayer = {
    /**
     * Creates an Asciinema player instance.
     * @param src recording source, typically a recording URL
     * @param containerElement container DOM element, to mount the player in.
     * @param opts configuration options (optional)
     */
    create: (
      src: string,
      containerElement: HTMLElement,
      opts?: PlayerOptions,
    ) => void
  }

  export function create(
    source: string,
    container: HTMLElement,
    options?: PlayerOptions,
  ): void
}
