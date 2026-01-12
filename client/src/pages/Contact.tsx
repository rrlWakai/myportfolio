import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  User,
  MessageSquare,
  Calendar,
  ArrowLeft,
  Linkedin,
  Github,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config";

type ContactApiResponse = {
  success?: boolean;
  error?: string;
};

export default function Contact() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const raw = await res.text();
      let data: ContactApiResponse;

      try {
        data = JSON.parse(raw);
      } catch {
        throw new Error(raw.slice(0, 160));
      }

      if (!res.ok) throw new Error(data.error ?? "Failed to send message.");

      if (data.success) {
        alert("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert("Failed to send message. Try again later.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto px-4 py-16"
    >
      <motion.button
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-muted hover:text-head transition"
      >
        <ArrowLeft size={16} />
        Back
      </motion.button>

      <div className="mb-12">
        <h1 className="text-3xl font-extrabold text-head">
          Let’s Work Together
        </h1>
        <p className="text-muted mt-2 max-w-xl">
          Have a project in mind or need a professional website? Send a message
          or connect with me through my socials.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.form
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-6 shadow-sm space-y-4"
        >
          <h2 className="text-lg font-semibold flex items-center gap-2 text-head">
            <MessageSquare size={18} />
            Contact Form
          </h2>

          <div>
            <label className="text-sm font-medium text-muted">Full Name</label>
            <div className="mt-1 flex items-center gap-2 rounded-md border border-black/20 dark:border-white/20 bg-white/70 dark:bg-white/5 px-3 py-2 focus-within:border-black dark:focus-within:border-white focus-within:ring-1 focus-within:ring-black/30 dark:focus-within:ring-white/30 transition">
              <User size={16} className="text-muted" />
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-transparent outline-none text-sm text-head placeholder:text-muted"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted">
              Email Address
            </label>
            <div className="mt-1 flex items-center gap-2 rounded-md border border-black/20 dark:border-white/20 bg-white/70 dark:bg-white/5 px-3 py-2 focus-within:border-black dark:focus-within:border-white focus-within:ring-1 focus-within:ring-black/30 dark:focus-within:ring-white/30 transition">
              <Mail size={16} className="text-muted" />
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full bg-transparent outline-none text-sm text-head placeholder:text-muted"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted">Message</label>
            <textarea
              rows={4}
              placeholder="Tell me about your project..."
              className="mt-1 w-full rounded-md border border-black/20 dark:border-white/20 bg-white/70 dark:bg-white/5 px-3 py-2 text-sm resize-none outline-none text-head placeholder:text-muted focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black/30 dark:focus:ring-white/30 transition"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full py-2 rounded-md text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </motion.form>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-head">
              <Calendar size={18} />
              Schedule & Availability
            </h2>

            <ul className="space-y-3 text-sm text-muted">
              <li>
                <strong className="text-head">Availability:</strong> Open for
                freelance & projects
              </li>
              <li>
                <strong className="text-head">Response Time:</strong> Within 24
                hours
              </li>
              <li>
                <strong className="text-head">Timezone:</strong> GMT+8
                (Philippines)
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold mb-4 text-head">
              Connect With Me
            </h2>

            <div className="space-y-3">
              <motion.a
                whileHover={{ x: 4 }}
                href="mailto:lumborhenrhena@gmail.com"
                className="flex items-center gap-3 rounded-md border border-black/10 dark:border-white/15 px-4 py-3 text-sm text-head hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                <Mail size={18} />
                lumborhenrhena@gmail.com
              </motion.a>

              <motion.a
                whileHover={{ x: 4 }}
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-md border border-black/10 dark:border-white/15 px-4 py-3 text-sm text-head hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                <Linkedin size={18} />
                linkedin.com/in/yourprofile
              </motion.a>

              <motion.a
                whileHover={{ x: 4 }}
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-md border border-black/10 dark:border-white/15 px-4 py-3 text-sm text-head hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                <Github size={18} />
                github.com/wakairrl
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}
