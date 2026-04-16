import DomeGallery from "@/components/DomeGallery";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface TrendingItem {
  title?: string;
  name?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
}

async function getTrendingMovies() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/all/week?api_key=5a209f099efaba1cd26a904e09b90829",
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.results || [];
  } catch {
    return [];
  }
}

async function getGitHubStars() {
  try {
    const response = await fetch(
      'https://api.github.com/repos/Anshu78780/ScarperApi',
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      return 0;
    }
    
    const data = await response.json();
    return data.stargazers_count || 0;
  } catch (error) {
    return 0;
  }
}

export default async function Home() {
  const [trending, stars] = await Promise.all([getTrendingMovies(), getGitHubStars()]);

  const images = trending
    .slice(0, 50)
    .map((item: TrendingItem) => {
      const path = item.poster_path || item.backdrop_path;
      if (!path) {
        return null;
      }

      return {
        src: `https://image.tmdb.org/t/p/w500${path}`,
        alt: item.title || item.name || "Movie Poster",
      };
    })
    .filter((item): item is { src: string; alt: string } => item !== null);

  const galleryImages = images.length > 0 ? images : undefined;

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-950 font-sans overflow-hidden">
      {/* Logo and GitHub Stars */}
      <div className="fixed top-6 left-6 z-50 flex items-center gap-4">
        <Image
          src="/logo.svg" 
          alt="Logo" 
          width={40} 
          height={40}
          priority
        />
        <Link 
          href="https://github.com/Anshu78780/ScarperApi"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg px-3 py-2 hover:bg-zinc-800/80 transition-colors"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-white">{stars}</span>
          </div>
        </Link>
      </div>
      
      {/* Login/Signup Buttons */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        <Link href="https://screenscape.me" target="_blank" rel="noopener noreferrer">
          <Button variant="secondary" size="default" className="gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Watch Online
          </Button>
        </Link>
        <Link href="/login">
          <Button variant="outline" size="default">
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="default" size="default">
            Sign Up
          </Button>
        </Link>
      </div>

      

      <div className="absolute inset-0 w-full h-full">
        <DomeGallery 
          images={galleryImages}
          fit={0.6}
          segments={35}
          grayscale={false}
          imageBorderRadius="12px"
          openedImageBorderRadius="16px"
          openedImageWidth="500px"
          openedImageHeight="750px"
          overlayBlurColor="#060010"
          autoRotate={true}
          autoRotateSpeed={0.15}
        />
      </div>
    </div>
  );
}
