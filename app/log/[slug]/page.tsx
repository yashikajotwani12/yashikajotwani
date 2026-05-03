import { getPostBySlug, getAllSlugs } from "@/data/posts";
import BlogPost from "@/components/BlogPost";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default function LogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  return <BlogPost post={post} />;
}
