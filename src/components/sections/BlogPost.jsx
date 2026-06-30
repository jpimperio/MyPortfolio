import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPost } from "../../data/posts";
import SEO from "../ui/SEO";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);

  if (!post) {
    return (
      <section className="min-h-screen py-24 px-6 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white mb-4">Post not found</h1>
        <Link to="/blog" className="text-accent-light hover:underline">
          &larr; Back to blog
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-24 px-6">
      <SEO title={post?.title || "Blog Post"} description={post?.description} />
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-slate-400 hover:text-accent-light transition-colors mb-8 text-sm"
          >
            <ArrowLeft size={16} /> Back to blog
          </Link>

          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Calendar size={14} />
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {post.title}
          </h1>

          <article className="prose prose-invert max-w-none">
            <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
          </article>
        </motion.div>
      </div>
    </section>
  );
}
