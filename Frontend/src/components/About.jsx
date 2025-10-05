import React from "react";

const About = () => {
  return (
    <section className="bg-gray-900 text-gray-200 py-10 px-6 md:px-16" id="about">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          About Mock Interview AI
        </h1>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          In today’s fast-paced tech world, cracking an interview requires more than just
          technical knowledge — it demands confidence, clear communication, and
          real-world experience. <span className="font-semibold text-blue-400">Mock Interview AI</span> is built to
          bridge that gap. It’s your personal, intelligent interview partner that helps
          you prepare for real interviews in a smarter, more interactive way.
        </p>

        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mt-6">
          Powered by cutting-edge <span className="font-semibold text-blue-400">artificial intelligence</span>, our
          platform generates customized interview questions based on your role, skills,
          and experience level. Whether you’re preparing for a{" "}
          <span className="font-semibold">MERN Stack Developer</span>,{" "}
          <span className="font-semibold">Data Analyst</span>, or{" "}
          <span className="font-semibold">Software Engineer</span> role, Mock Interview AI
          tailors every session to your needs.
        </p>

        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mt-6">
          But we don’t stop there — our system also uses real-time speech analysis and AI
          evaluation to provide instant feedback on your answers. It assesses your
          communication clarity, technical accuracy, confidence, and tone, giving you an
          authentic interview experience that feels like sitting in front of a real
          interviewer.
        </p>

        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mt-6">
          With Mock Interview AI, you can practice technical, HR, or behavioral interviews
          anytime, anywhere. Each session ends with a detailed performance report that
          includes your score, key strengths, and suggestions for improvement — helping
          you track progress and refine your skills with every attempt.
        </p>

        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mt-6 mb-10">
          Our goal is simple — to make interview preparation accessible, personalized, and
          stress-free for everyone. So when the real interview day arrives, you’ll walk in
          with confidence, clarity, and complete readiness.
        </p>
      </div>

      {/* Features Section */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Main Features</h2>
        <ul className="space-y-3 text-lg text-gray-300">
          <li>🎯 <span className="font-semibold">AI-Generated Questions</span> — Tailored to your job title & experience.</li>
          <li>🗣️ <span className="font-semibold">Voice Interaction</span> — Speak naturally, just like a real interview.</li>
          <li>📊 <span className="font-semibold">Performance Feedback</span> — Get score, tips, and improvement areas instantly.</li>
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <h3 className="text-2xl font-semibold mb-4">
          “Ready to test your interview skills? Start your mock interview now!”
        </h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-2xl transition duration-300">
          Start Interview
        </button>
      </div>
    </section>
  );
};

export default About;
