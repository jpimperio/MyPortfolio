import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { getPosts } from "../../data/posts";
import SectionHeader from "../ui/SectionHeader";
import SEO from "../ui/SEO";

const posts = getPosts();

export default function BlogList() {
  return (
    <section className="min-h-screen py-24 px-6">
      <SEO title="Blog" description="Thoughts, tutorials, and things I've learned about web development." />
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          id="blog"
          title="My"
          accentWord="Blog"
          subtitle="THOUGHTS, TUTORIALS, AND THINGS I'VE LEARNED"
        />

        {posts.length === 0 && (
          <p className="text-center text-slate-500">No posts yet. Check back soon!</p>
        )}

        <div className="space-y-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="block p-6 rounded-xl bg-deep-700/50 border border-deep-600 hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                  <Calendar size={14} />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-accent-light transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {post.description}
                </p>
                <div className="flex items-center gap-1 text-accent-light text-sm mt-4 font-medium">
                  Read more <ArrowRight size={14} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
