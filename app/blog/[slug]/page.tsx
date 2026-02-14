import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/data/posts";
import BlogPost from "@/components/BlogPost";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — Yashika Jotwani`,
    description: post.description,
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <main className="pt-24">
      <BlogPost post={post} />
    </main>
  );
}
