export function Video({ id }: { id: string }) {
  return (
    <div>
      <iframe
        src={"https://www.youtube.com/embed/" + id}
        title="YouTube Video Player"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="aspect-video w-full"
      />
    </div>
  )
}
