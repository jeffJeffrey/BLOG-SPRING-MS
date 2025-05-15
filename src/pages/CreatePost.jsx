import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pour l'instant on affiche juste les valeurs dans la console
    console.log({ title, image, description, content });

    // Ici tu pourras appeler une API ou gérer la sauvegarde des données

    // Reset du formulaire
    setTitle("");
    setImage("");
    setDescription("");
    setContent("");
  };

  return (
    <>
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>

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
              placeholder="Enter post title"
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
              placeholder="Enter image URL"
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
              placeholder="Short description"
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
              placeholder="Write your post content here"
            />
          </div>

          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition"
          >
            Create Post
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
}
