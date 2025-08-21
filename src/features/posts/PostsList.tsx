import { useAppSelector } from '@/app/hooks'
import { Link } from 'react-router-dom'

export const PostsList = () => {
  // Select the `state.posts` value from the store into the component
  const posts = useAppSelector(state => state.posts)

  const renderedPosts = posts.map(post => (
    <article className="post-excerpt" key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
      <p className="post-content">{post.content.substring(0, 100)}</p>
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}