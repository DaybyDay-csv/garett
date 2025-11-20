import { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
  fallback?: React.ReactNode;
  onLoad?: () => void;
  showPlayButton?: boolean;
}

export const VideoPlayer = ({
  src,
  poster,
  autoplay = false,
  muted = false,
  loop = false,
  controls = false,
  className,
  fallback,
  onLoad,
  showPlayButton = false,
}: VideoPlayerProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Handle video load
  const handleLoadedData = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  // Handle video error
  const handleError = () => {
    console.error("Video failed to load:", src);
    setHasError(true);
  };

  // Handle play button click
  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Show fallback if error or video not supported
  if (hasError && fallback) {
    return <>{fallback}</>;
  }

  return (
    <div ref={containerRef} className={cn("relative w-full h-full", className)}>
      {isInView && (
        <>
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay={autoplay}
            muted={muted}
            loop={loop}
            controls={controls}
            playsInline
            preload="metadata"
            onLoadedData={handleLoadedData}
            onError={handleError}
            className="w-full h-full object-cover"
          />

          {/* Play button overlay */}
          {showPlayButton && !controls && (
            <button
              onClick={handlePlayClick}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {!isPlaying && (
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-white/90 group-hover:bg-white transition-all shadow-2xl group-hover:scale-110">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-black ml-1" fill="currentColor" />
                </div>
              )}
            </button>
          )}

          {/* Loading indicator */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
              <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </>
      )}
    </div>
  );
};
