import Link from "next/link";
import { posts, type Post } from "@/data/posts";
import ArticleContent from "./ArticleContent";
import ArticleFeedback from "./ArticleFeedback";
import ReadingProgress from "./ReadingProgress";

export default function BlogPost({ post }: { post: Post }) {
  const next = posts[posts.findIndex(item => item.slug === post.slug) + 1];
  return <main className="article-page">
    <ReadingProgress />
    <Link className="article-back" href="/#log">← All writing</Link>
    <header>
      <div className="article-meta mono"><span>FIELD NOTES</span><span>{post.date}</span><span>{post.readTime}</span></div>
      <h1 className="article-heading">{post.title}</h1>
      <p className="article-description">{post.description}</p>
    </header>
    <ArticleContent content={post.content} />
    <div className="article-author"><div><strong>Yashika Jotwani</strong><p>Backend engineer · Bangalore</p></div><ArticleFeedback /></div>
    {next && <nav className="article-next" aria-label="Next article"><p className="mono">READ NEXT</p><Link href={`/log/${next.slug}`}><div><h2>{next.title}</h2><small>{next.date} · {next.readTime}</small></div><span aria-hidden="true">↗</span></Link></nav>}
  </main>;
}
