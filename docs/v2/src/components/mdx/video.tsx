import React from "react"

export function Video(props: React.ComponentProps<"iframe">) {
  const { id } = props

  return (
    <div>
      <iframe
        src={"https://www.youtube.com/embed/" + id}
        title="YouTube Video Player"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="aspect-video w-full rounded-md"
      />
    </div>
  )
}
