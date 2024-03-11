export function YTVideo({ ytVideoId }: { ytVideoId: string }) {
  return (
    <div className="aspect-video">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${ytVideoId}`}
        title="Learn How to Code in 2024 | Become a Web Developer in 2024 - Your Roadmap Starts Here"
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
