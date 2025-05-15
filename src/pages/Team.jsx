import Header from "../components/Header";
import Footer from "../components/Footer";

const teamMembers = [
  {
    name: "MEFIRE HAMED",
    role: "Frontend/Backend Developer, Microservices Specialist",
    photo: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    name: "LEKANE VERHEZ",
    role: "Backend Developer, Microservices Specialist, DevOps",
    photo: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    name: "KENFACK JEFF",
    role: "API Integration, Backend Developer, Microservices Specialist",
    photo: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

export default function Team() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
        <h1 className="text-4xl font-extrabold mb-6 text-green-700">Our Team</h1>
        <p className="mb-6 text-lg leading-relaxed">
          We are a group of passionate Master’s students specializing in Artificial Intelligence.
          Our team has worked collaboratively on this project as part of our Middleware course,
          aiming to explore microservices architecture in practice.
        </p>
        <p className="mb-6 text-lg leading-relaxed">
          Each member has contributed to different aspects of the project, including frontend development,
          backend microservices, API design, and integration.
        </p>
        <p className="mb-6 text-lg leading-relaxed">
          Together, we have built a scalable and modular application to demonstrate the power of modern distributed systems.
        </p>
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-6">Team Members</h2>
          <ul className="space-y-6">
            {teamMembers.map(({ name, role, photo }) => (
              <li key={name} className="flex items-center space-x-4 border p-4 rounded-md shadow-sm hover:shadow-md transition">
                <img
                  src={photo}
                  alt={name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-green-600"
                />
                <div>
                  <p className="font-semibold text-lg">{name}</p>
                  <p className="text-gray-600">{role}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
