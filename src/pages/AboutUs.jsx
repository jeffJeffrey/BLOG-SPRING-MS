import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutUs() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
        <h1 className="text-4xl font-extrabold mb-6 text-green-700">About Us</h1>
        <p className="mb-6 text-lg leading-relaxed">
          We are Master's students specializing in Artificial Intelligence, currently enrolled in the first year of our program.
        </p>
        <p className="mb-6 text-lg leading-relaxed">
          As part of our Middleware course, we were tasked with developing a modern web application using a microservices architecture. The goal was to gain practical experience with distributed systems and the challenges of inter-service communication.
        </p>
        <p className="mb-6 text-lg leading-relaxed">
          This project serves as a front-end demonstration that interacts seamlessly with multiple microservices, showcasing best practices in scalable and maintainable software design.
        </p>
        <p className="mb-6 text-lg leading-relaxed">
          Through this application, we aim to illustrate how microservices can work together to deliver rich user experiences, while allowing independent development, deployment, and scalability of each service.
        </p>
        <p className="mb-6 text-lg leading-relaxed">
          We hope this project effectively highlights the power and flexibility of microservices in modern software engineering.
        </p>
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80"
          alt="Microservices illustration"
          className="rounded-lg shadow-md mt-10"
        />
      </main>
      <Footer />
    </>
  );
}
