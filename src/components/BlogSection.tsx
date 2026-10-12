import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogArticles';
import { BlogPost } from '../types';
import { BookOpen, Clock, Calendar, User, ChevronRight, X, Sparkles, Tag } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', 'Emergency Care', 'Prevention & Safety', 'Behavior & Training', 'Nutrition & Diet'];

  const filteredPosts = filterCategory === 'all'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((p) => p.category === filterCategory);

  return (
    <div id="blog" className="scroll-mt-24 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold tracking-wide uppercase mb-3">
          <BookOpen className="w-3.5 h-3.5" /> Clinical Pet Health Guides
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-display">
          Veterinary Articles & Emergency First-Aid
        </h2>
        <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
          In-depth care articles written by board-certified veterinarians covering life-saving Heimlich maneuvers, toxic flora identification, and psychological behavior cues.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize ${
                filterCategory === cat
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {cat === 'all' ? 'All Guides' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-0.5 cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            <div>
              {/* Image */}
              <div className="relative h-44 bg-stone-100 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-2.5 left-2.5 bg-emerald-700/90 backdrop-blur-xs text-white font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-stone-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="font-bold text-stone-900 text-sm font-display leading-snug line-clamp-2 group-hover:text-emerald-800 transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between text-xs text-emerald-700 font-semibold">
              <span>Read Full Protocol</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </article>
        ))}
      </div>

      {/* Article Detail Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="relative h-48 sm:h-56 bg-stone-900 shrink-0">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent"></div>

              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600 px-2 py-0.5 rounded text-white">
                  {selectedPost.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold font-display mt-1.5 leading-snug">
                  {selectedPost.title}
                </h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-stone-300">
                  <span>By {selectedPost.author} ({selectedPost.authorRole})</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-sm text-stone-700 leading-relaxed flex-1">
              {selectedPost.content.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <div className="pt-4 border-t border-stone-200 flex flex-wrap gap-1.5">
                {selectedPost.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-stone-100 text-stone-600 px-2.5 py-1 rounded-lg flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3 text-stone-400" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedPost(null)}
                className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold px-5 py-2 rounded-xl transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
