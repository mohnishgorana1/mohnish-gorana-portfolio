"use client";

import { TextShimmer } from "@/components/ui/text-shimmer";
import axios from "axios";
import { Star } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiFillLike, AiFillDislike, AiOutlineEye } from "react-icons/ai";
import { TbStarFilled } from "react-icons/tb";

const BATCH_SIZE = 10; // Number of posts per load

function InfiniteScroll() {
  const [posts, setPosts] = useState<any[]>([]);
  const [skip, setSkip] = useState(0); // offset for API
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      // simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay

      const response = await axios.get(`
			https://dummyjson.com/posts?limit=${BATCH_SIZE}&skip=${skip}`);

      const newPosts: any[] = response.data.posts;
      console.log(newPosts);

      setPosts((prevPosts): any => [...prevPosts, ...newPosts]);
      setSkip((prev) => prev + BATCH_SIZE);

      if (newPosts.length < BATCH_SIZE) {
        setHasMore(false); // no more posts
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [skip, loading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchPosts(); // fetch trigger hota hai jab ref element viewport me dikhe
        }
      },
      { rootMargin: "100px" } // thoda pehle trigger karne ke liye margin
    );

    if (observerRef.current) observer.observe(observerRef.current);

    // returning cleanup fn to unobserve our target when the component unmount
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [fetchPosts]);

  // initial fetch
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen w-full bg-background dark:bg-gray-900/40 py-8 px-4">
      {/* Header Section */}
      <section className="mb-10 text-center space-y-3">
        <div className="animate-pulse inline-flex items-center justify-center gap-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/60 dark:border-gray-700/60 shadow-sm mb-2">
          <TbStarFilled className="text-amber-400" />
          <span className="text-lg font-bold tracking-widest text-blue-500 dark:text-blue-400 uppercase">
            Live Feed
          </span>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-md mx-auto">
          Keep scrolling to load more content automatically.
        </p>
      </section>

      {/* Feed Section */}
      <section className="space-y-8 max-w-2xl mx-auto">
        {posts &&
          posts.length > 0 &&
          posts.map((post, idx) => {
            const { id, title, body, tags, reactions, views, userId } = post;
            return (
              <div
                key={id}
                className="group relative overflow-hidden rounded-2xl bg-slate-100  dark:bg-gray-800/60 backdrop-blur-xl border border-white/60 dark:border-gray-700/60 p-6 shadow-lg shadow-blue-200 dark:shadow-gray-900/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-200/60 dark:hover:shadow-gray-900/70 hover:bg-white/80 dark:hover:bg-gray-800/80"
              >
                {/* Decorative shine on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-gray-600/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none" />

                {/* Header: Index & User */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-bold text-sm shadow-inner">
                      {idx + 1}
                    </span>
                    <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 leading-tight group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                      {title}
                    </h2>
                  </div>
                </div>

                {/* Body */}
                <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed pl-11 mb-4">
                  {body}
                </p>

                {/* Footer Info */}
                <div className="pl-0 sm:pl-11 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-blue-50 dark:border-gray-700">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {tags &&
                      tags.length > 0 &&
                      tags.map((tag: string | null) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-900 text-xs font-medium transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/70"
                        >
                          #{tag}
                        </span>
                      ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-3 bg-white/50 dark:bg-gray-700/50 rounded-lg px-2 py-1 border border-white/50 dark:border-gray-700/50 shadow-sm">
                      <span
                        className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium"
                        title="Likes"
                      >
                        <AiFillLike className="text-lg" />{" "}
                        {reactions?.likes ?? 0}
                      </span>
                      <div className="w-px h-3 bg-slate-200 dark:bg-gray-600"></div>
                      <span
                        className="flex items-center gap-1 text-rose-500 dark:text-rose-400 font-medium"
                        title="Dislikes"
                      >
                        <AiFillDislike className="text-lg" />{" "}
                        {reactions?.dislikes ?? 0}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-xs font-medium bg-slate-100/50 dark:bg-gray-700/50 px-2 py-1 rounded-md">
                      <AiOutlineEye />
                      <span>{views} views</span>
                    </div>

                    <span className="text-[10px] font-mono text-slate-300 dark:text-slate-600">
                      User: {userId}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </section>

      {/* Loading State */}
      {loading && (
        <div className="mx-auto w-full flex flex-col items-center justify-center py-8 gap-2">
          <div className="w-6 h-6 border-2 border-blue-200 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
          <TextShimmer
            className="text-center font-medium text-blue-400 dark:text-blue-300 text-sm tracking-wide"
            duration={1}
          >
            Fetching more posts...
          </TextShimmer>
        </div>
      )}

      {/* Observer Target */}
      {hasMore && (
        <div
          ref={observerRef}
          className="h-10 opacity-0 pointer-events-none"
        ></div>
      )}

      {/* End of Feed */}
      {!hasMore && (
        <div className="text-center py-8">
          <span className="inline-block px-4 py-2 rounded-full bg-slate-200/50 dark:bg-gray-700/50 text-slate-500 dark:text-slate-300 text-sm font-medium">
            You've reached the end! 🎉
          </span>
        </div>
      )}
    </main>
  );
}

export default InfiniteScroll;