import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ShowPost() {
  const { id } = useParams();

  // Mock data pour les posts, simule une base de données ou API
  const posts = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      title: "The Pursuit of Beauty & Aesthetics and Its Impact on Our Work",
      description:
        "The pursuit of beauty has been an integral aspect of human existence, influencing various fields from art to architecture.",
      author: "Terra Living",
      date: "Apr 7, 2023",
      readTime: "2 min read",
      views: "1,011",
      content:
        "Voici le contenu détaillé du post 1... tu peux y mettre tout ce que tu veux.",
      comments: [
        { id: 1, author: "Alice", content: "Super article !" },
        { id: 2, author: "Bob", content: "Merci pour ces infos." },
      ],
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      title:
        "Herbariums: TerraLiving's Modern Take on Botanical Treasure & Legacy With Stylish Terrariums",
      description:
        "Explore how TerraLiving redefines traditional herbariums through modern terrarium design blending nature, science, and art.",
      author: "Terra Living",
      date: "Apr 4, 2023",
      readTime: "3 min read",
      views: "894",
      content:
        "Voici le contenu détaillé du post 2... tu peux y mettre tout ce que tu veux.",
      comments: [
        { id: 1, author: "Charlie", content: "Très instructif." },
        { id: 2, author: "Diane", content: "J'adore ce sujet !" },
      ],
    },
  ];

  // Trouve le post correspondant à l'id
  const post = posts.find((p) => p.id === id);

  // Gérer le nouvel ajout de commentaire
  const [comments, setComments] = useState(post ? post.comments : []);
  const [newComment, setNewComment] = useState("");

  if (!post) return <p>Post not found.</p>;

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    const comment = {
      id: comments.length + 1,
      author: "Anonymous", // tu peux ajouter un système d'utilisateur plus tard
      content: newComment.trim(),
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <>
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-10">
        <article>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600 mb-6">
            By {post.author} · {post.date} · {post.readTime} · {post.views} views
          </p>
          <img src={post.image} alt={post.title} className="w-full rounded-md mb-6" />
          <p className="mb-8">{post.content}</p>
        </article>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            <ul className="space-y-4">
              {comments.map(({ id, author, content }) => (
                <li key={id} className="border p-4 rounded-md">
                  <p className="font-semibold">{author}</p>
                  <p>{content}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <form onSubmit={handleAddComment} className="space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={4}
            required
          />
          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition"
          >
            Post Comment
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
}
