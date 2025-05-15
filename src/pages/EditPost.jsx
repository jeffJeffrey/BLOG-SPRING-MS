import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Mock data (à remplacer par une API ou contexte global)
const postsData = [
  {
    id: "1",
    title: "The Pursuit of Beauty & Aesthetics and Its Impact on Our Work",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description: "The pursuit of beauty has been an integral aspect...",
    content: "Voici le contenu détaillé du post 1... tu peux y mettre tout ce que tu veux.",
  },
  {
    id: "2",
    title: "Herbariums: TerraLiving's Modern Take on Botanical Treasure & Legacy With Stylish Terrariums",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    description: "Explore how TerraLiving redefines traditional herbariums...",
    content: "Voici le contenu détaillé du post 2... tu peux y mettre tout ce que tu veux.",
  },
];

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Trouver le post à modifier
  const post = postsData.find((p) => p.id === id);

  // États pour les champs du formulaire
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setDescription(post.description);
      setContent(post.content);
    }
  }, [post]);

  if (!post) {
    return <p>Post not found.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ici tu peux envoyer la requête PUT/PATCH vers une API pour modifier le post
    // Pour l'instant on affiche juste en console
    console.log({ id, title, image, description, content });

    // Redirige vers la page du post (ou autre)
    navigate(`/posts/${id}`);
  };

  return (
    <>
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Edit Post</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-2" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2" htmlFor="image">
              Image URL
            </label>
            <input
              id="image"
              type="url"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <label className="block font-semibold mb-2" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition"
          >
            Save Changes
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
}
