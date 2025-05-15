import Header from "../components/Header";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";

export default function Home() {
  const posts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      title: "The Pursuit of Beauty & Aesthetics and Its Impact on Our Work",
      description: "The pursuit of beauty has been an integral aspect of human existence, with its influence spanning various fields, from art and architecture.",
      author: "Terra Living",
      date: "Apr 7, 2023",
      readTime: "2 min read",
      views: "1,011",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      title: "Herbariums: TerraLiving's Modern Take on Botanical Treasure & Legacy With Stylish Terrariums",
      description: "Explore how TerraLiving redefines traditional herbariums through modern terrarium design blending nature, science, and art.",
      author: "Terra Living",
      date: "Apr 4, 2023",
      readTime: "3 min read",
      views: "894",
    },
  ];

  return (
    <>
      <Header />
      <main className="w-full flex justify-center mt-8 px-4">
        <div className="max-w-3xl w-full space-y-8">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              image={post.image}
              title={post.title}
              description={post.description}
              author={post.author}
              date={post.date}
              readTime={post.readTime}
              views={post.views}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
