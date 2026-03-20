import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type ContactApiResponse = { success?: boolean; error?: string };
type Slot = { time: string; available: boolean };

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatMonthYear(d: Date) {
  return d.toLocaleString(undefined, { month: "long", year: "numeric" });
}

function formatFullDate(d: Date) {
  return d.toLocaleString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function dateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

function isAvailableDate(day: Date) {
  const d = startOfDay(day);
  const today = startOfDay(new Date());
  if (d < today) return false;

  const dow = d.getDay();
  const weekday = dow >= 1 && dow <= 5;
  if (!weekday) return false;

  return true;
}

function getSlotsForDate(day: Date): Slot[] {
  const base: Slot[] = [
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: true },
    { time: "01:00 PM", available: true },
    { time: "02:00 PM", available: true },
    { time: "04:00 PM", available: true },
  ];

  const dayAvailable = isAvailableDate(day);

  return base.map((s) => ({
    ...s,
    available: dayAvailable,
  }));
}

function findFirstAvailableNear(d: Date) {
  const cur = startOfDay(d);
  for (let i = 0; i < 60; i++) {
    if (isAvailableDate(cur)) return cur;
    cur.setDate(cur.getDate() + 1);
  }
  return null;
}

export default function Contact() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const [cursorMonth, setCursorMonth] = useState(() =>
    startOfMonth(new Date()),
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    return findFirstAvailableNear(new Date());
  });
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const monthStart = useMemo(() => startOfMonth(cursorMonth), [cursorMonth]);
  const monthEnd = useMemo(() => endOfMonth(cursorMonth), [cursorMonth]);

  const gridDays = useMemo(() => {
    const first = monthStart;
    const firstDow = (first.getDay() + 6) % 7;
    const gridStart = new Date(first);
    gridStart.setDate(first.getDate() - firstDow);

    const last = monthEnd;
    const lastDow = (last.getDay() + 6) % 7;
    const gridEnd = new Date(last);
    gridEnd.setDate(last.getDate() + (6 - lastDow));

    const out: Date[] = [];
    const cur = new Date(gridStart);
    while (cur <= gridEnd) {
      out.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }
    return out;
  }, [monthStart, monthEnd]);

  const slots = useMemo(() => {
    if (!selectedDate) return [];
    return getSlotsForDate(selectedDate);
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    setSending(true);

    try {
      const res = await fetch(`/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data: ContactApiResponse = await res.json();

      if (!res.ok) throw new Error(data.error);

      alert("✅ Message sent successfully!");

      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  const confirmCall = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Select date and time.");
      return;
    }

    if (!name || !email) {
      alert("Enter your name and email first.");
      return;
    }

    try {
      const res = await fetch(`/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message: `📅 Booking Request\n\nDate: ${formatFullDate(
            selectedDate,
          )}\nTime: ${selectedTime}`,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      alert("✅ Booking request sent!");

      setSelectedTime(null);
    } catch (err) {
      console.error(err);
      alert("❌ Booking failed.");
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      className="contact-page"
    >
      <button className="contact-backBtn" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Back
      </button>

      <h1>Let’s Work Together</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
        />
        <button type="submit" disabled={sending}>
          {sending ? "Sending..." : "Send"}
        </button>
      </form>

      <div>
        <h2>Schedule a Call</h2>

        {slots.map((s) => (
          <button
            key={s.time}
            disabled={!s.available}
            onClick={() => setSelectedTime(s.time)}
          >
            {s.time}
          </button>
        ))}

        <button onClick={confirmCall}>Confirm Call</button>
      </div>
    </motion.main>
  );
}
