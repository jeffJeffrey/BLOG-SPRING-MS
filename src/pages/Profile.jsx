import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Profile() {
  // Mock user info
  const user = {
    name: "MEFIRE HAMED",
    email: "mefirehamed936@gmail.com",
    bio: "Passionate about design, gardening, and writing.",
    avatar: "https://i.pravatar.cc/150?img=12",
  };

  // Mock posts
  const publishedPosts = [
    {
      id: 1,
      title: "My first article on sustainable design",
      date: "2024-05-01",
      views: 342,
    },
    {
      id: 2,
      title: "Urban gardening: tips and tricks",
      date: "2024-04-15",
      views: 198,
    },
  ];

  const drafts = [
    {
      id: 101,
      title: "Draft: ideas for an organic vegetable garden",
      lastEdited: "2024-05-10",
    },
  ];

  const [activeTab, setActiveTab] = useState("posts"); // 'posts' or 'drafts'

  return (
    <>
      <Header />
      <section className="max-w-5xl mx-auto px-6 py-10 mt-3">
        <section className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10 mb-12">
          <img
            src={user.avatar}
            alt="User avatar"
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="mt-3 text-gray-700 max-w-lg">{user.bio}</p>
          </div>
        </section>

        {/* Tabs */}
        <div className="border-b border-gray-300 mb-6">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("posts")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm ${
                activeTab === "posts"
                  ? "border-green-700 text-green-700"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Published Posts
            </button>
            <button
              onClick={() => setActiveTab("drafts")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm ${
                activeTab === "drafts"
                  ? "border-green-700 text-green-700"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Drafts
            </button>
          </nav>
        </div>

        {/* Tab content */}
        {activeTab === "posts" && (
          <section>
            {publishedPosts.length === 0 ? (
              <p className="text-gray-600">No published posts yet.</p>
            ) : (
              <ul className="space-y-4">
                {publishedPosts.map(({ id, title, date, views }) => (
                  <li
                    key={id}
                    className="p-4 border rounded-md hover:shadow-md transition cursor-pointer"
                  >
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-gray-500 text-sm">
                      Published on {new Date(date).toLocaleDateString()} · {views} views
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {activeTab === "drafts" && (
          <section>
            {drafts.length === 0 ? (
              <p className="text-gray-600">No drafts at the moment.</p>
            ) : (
              <ul className="space-y-4">
                {drafts.map(({ id, title, lastEdited }) => (
                  <li
                    key={id}
                    className="p-4 border rounded-md hover:shadow-md transition cursor-pointer"
                  >
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-gray-500 text-sm">
                      Last edited on {new Date(lastEdited).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </section>
      <Footer />
    </>
  );
}
