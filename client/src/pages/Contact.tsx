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
import { API_BASE } from "../config";

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

  const blocked = new Set<string>(["2026-03-10", "2026-03-14", "2026-03-20"]);
  if (blocked.has(dateKey(d))) return false;

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

  const blockedByDate: Record<string, string[]> = {
    "2026-03-06": ["01:00 PM", "02:00 PM"],
    "2026-03-12": ["10:00 AM"],
  };

  const blocked = new Set(blockedByDate[dateKey(day)] ?? []);
  const dayAvailable = isAvailableDate(day);

  return base.map((s) => ({
    ...s,
    available: dayAvailable && !blocked.has(s.time),
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
    const first = findFirstAvailableNear(new Date());
    return first;
  });
  const [selectedTime, setSelectedTime] = useState<string | null>("10:00 AM");

  const monthStart = useMemo(() => startOfMonth(cursorMonth), [cursorMonth]);
  const monthEnd = useMemo(() => endOfMonth(cursorMonth), [cursorMonth]);

  const anyAvailableThisMonth = useMemo(() => {
    const cur = new Date(monthStart);
    while (cur <= monthEnd) {
      if (isAvailableDate(cur)) return true;
      cur.setDate(cur.getDate() + 1);
    }
    return false;
  }, [monthStart, monthEnd]);

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

  const selectedSlotAvailable = useMemo(() => {
    if (!selectedDate || !selectedTime) return false;
    return getSlotsForDate(selectedDate).some(
      (s) => s.time === selectedTime && s.available,
    );
  }, [selectedDate, selectedTime]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    setSending(true);

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
        throw new Error(raw.slice(0, 180));
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
      setSending(false);
    }
  };

  const confirmCall = () => {
    if (!selectedDate || !selectedTime || !selectedSlotAvailable) return;

    alert(
      `Call scheduled!\n\n${formatFullDate(selectedDate)}\n${selectedTime}\nGMT+8 (PH)`,
    );
  };

  const topPillText = anyAvailableThisMonth ? "Available" : "Unavailable";

  return (
    <motion.main
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="contact-page"
    >
      <button className="contact-backBtn" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} />
        Back
      </button>

      <header className="contact-header">
        <h1>Let’s Work Together</h1>
        <p>
          Have a project in mind or need a professional website? Send a message
          or connect with me through my socials.
        </p>
      </header>

      <section className="contact-layout">
        <div className="contact-leftCol">
          <motion.form
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
            onSubmit={handleSubmit}
            className="contact-card"
          >
            <div className="contact-cardTitle">
              <MessageSquare size={18} />
              <span>Contact Form</span>
            </div>

            <div className="contact-field">
              <label>Full Name</label>
              <div className="contact-inputRow">
                <User size={16} />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  type="text"
                />
              </div>
            </div>

            <div className="contact-field">
              <label>Email Address</label>
              <div className="contact-inputRow">
                <Mail size={16} />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  type="email"
                />
              </div>
            </div>

            <div className="contact-field">
              <label>Message</label>
              <textarea
                className="contact-textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project..."
                rows={5}
              />
            </div>

            <button
              className="contact-primaryBtn"
              type="submit"
              disabled={sending}
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="contact-card"
          >
            <div className="contact-cardTitle">
              <Mail size={18} />
              <span>Connect With Me</span>
            </div>

            <a
              className="contact-linkRow"
              href="mailto:lumborhenrhena@gmail.com"
            >
              <Mail size={18} />
              <span>lumborhenrhena@gmail.com</span>
            </a>

            <a
              className="contact-linkRow"
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={18} />
              <span>linkedin.com/in/yourprofile</span>
            </a>

            <a
              className="contact-linkRow"
              href="https://github.com/wakairrl"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={18} />
              <span>github.com/wakairrl</span>
            </a>
          </motion.div>
        </div>

        <div className="contact-rightCol">
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 }}
            className="contact-card"
          >
            <div className="contact-scheduleHeader">
              <div className="contact-scheduleTitle">
                <Calendar size={18} />
                <div>
                  <div className="contact-titleLine">Schedule a Call</div>
                  <div className="contact-subLine">
                    Pick a date and time that works. Unavailable days and fully
                    booked slots are disabled.
                  </div>
                  <div className="contact-metaLine">Timezone: GMT+8 (PH)</div>
                </div>
              </div>

              <div
                className={cn(
                  "contact-pill",
                  anyAvailableThisMonth ? "contact-pillOk" : "contact-pillBad",
                )}
              >
                <span className="contact-dot" />
                {topPillText}
              </div>
            </div>

            <div className="contact-schedulePanel">
              <div className="contact-calSide">
                <div className="contact-calTop">
                  <button
                    className="contact-iconBtn"
                    onClick={() => {
                      setCursorMonth((m) => addMonths(m, -1));
                      setSelectedTime(null);
                    }}
                    type="button"
                    aria-label="Previous month"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div className="contact-monthLabel">
                    {formatMonthYear(cursorMonth)}
                  </div>

                  <button
                    className="contact-iconBtn"
                    onClick={() => {
                      setCursorMonth((m) => addMonths(m, 1));
                      setSelectedTime(null);
                    }}
                    type="button"
                    aria-label="Next month"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                <div className="contact-dowRow">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (d) => (
                      <div key={d}>{d}</div>
                    ),
                  )}
                </div>

                <div className="contact-grid">
                  {gridDays.map((d) => {
                    const inMonth = d.getMonth() === cursorMonth.getMonth();
                    const available = isAvailableDate(d);
                    const disabled = !inMonth || !available;
                    const selected = selectedDate
                      ? sameDay(d, selectedDate)
                      : false;

                    return (
                      <button
                        key={d.toISOString()}
                        className={cn(
                          "contact-day",
                          !inMonth && "contact-dayOut",
                          disabled && "contact-dayDisabled",
                          available && inMonth && "contact-dayAvail",
                          selected && "contact-daySelected",
                        )}
                        disabled={disabled}
                        type="button"
                        onClick={() => {
                          setSelectedDate(d);
                          setSelectedTime(null);
                        }}
                        title={
                          !inMonth
                            ? "Not in this month"
                            : available
                              ? "Available"
                              : "Unavailable"
                        }
                      >
                        {d.getDate()}
                      </button>
                    );
                  })}
                </div>

                <div className="contact-legend">
                  <span>
                    <i className="contact-legendDot contact-legendSelected" />{" "}
                    Selected
                  </span>
                  <span>
                    <i className="contact-legendDot contact-legendUnavail" />{" "}
                    Unavailable
                  </span>
                </div>
              </div>

              <div className="contact-divider" />

              <div className="contact-slotSide">
                <div className="contact-slotTop">
                  <div className="contact-slotTitle">
                    <Clock size={16} />
                    <span>Time slots</span>
                  </div>

                  {selectedDate ? (
                    <div
                      className={cn(
                        "contact-pill",
                        isAvailableDate(selectedDate)
                          ? "contact-pillOk"
                          : "contact-pillBad",
                      )}
                    >
                      <span className="contact-dot" />
                      {isAvailableDate(selectedDate)
                        ? "Available"
                        : "Unavailable"}
                    </div>
                  ) : null}
                </div>

                <div className="contact-slotDate">
                  {selectedDate
                    ? formatFullDate(selectedDate)
                    : "Select an available date"}
                </div>

                <div className="contact-slotList">
                  {selectedDate ? (
                    slots.map((s) => {
                      const active = selectedTime === s.time;
                      const pillClass = s.available
                        ? "contact-pillOk"
                        : "contact-pillBad";

                      return (
                        <button
                          key={s.time}
                          type="button"
                          disabled={!s.available}
                          className={cn(
                            "contact-slotRow",
                            active && "contact-slotRowActive",
                            !s.available && "contact-slotRowDisabled",
                          )}
                          onClick={() => setSelectedTime(s.time)}
                        >
                          <div className="contact-slotLeft">
                            <div className="contact-slotTime">{s.time}</div>
                            <div className="contact-slotSmall">
                              {s.available ? "Available" : "Unavailable"}
                            </div>
                          </div>

                          <div
                            className={cn(
                              "contact-pill",
                              "contact-smallPill",
                              pillClass,
                            )}
                          >
                            <span className="contact-dot" />
                            {s.available ? "Available" : "Unavailable"}
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="contact-emptySlots">
                      Pick an <b>available</b> date to see time slots.
                    </div>
                  )}
                </div>

                <button
                  className="contact-confirmBtn"
                  type="button"
                  onClick={confirmCall}
                  disabled={
                    !selectedDate || !selectedTime || !selectedSlotAvailable
                  }
                >
                  Confirm Call
                </button>
              </div>
            </div>

            <div className="contact-scheduleFooter">
              After confirming, you can route this to your email / Google
              Calendar / booking system.
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
