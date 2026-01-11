import { useEffect, useState } from "react";
import AnimatedCard from "./AnimatedCard";
import { Clock } from "lucide-react";

export default function LocalTimeCard({
  disableHover = false,
}: {
  disableHover?: boolean;
}) {
  const [time, setTime] = useState("");
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();

      const mainTime = new Intl.DateTimeFormat("en-PH", {
        timeZone: "Asia/Manila",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);

      const meta = "GMT+8 • Asia/Manila";

      setTime(mainTime);
      setTimestamp(meta);
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatedCard
      className="glass"
      title="LOCAL TIME"
      icon="focus"
      disableHover={disableHover}
    >
      <div className="flex items-start gap-3">
        <Clock size={18} className="mt-1 text-muted" />

        <div>
          {/* MAIN TIME — bigger */}
          <p className="text-lg font-semibold text-black/500 leading-none">
            {time}
          </p>

          {/* TIMESTAMP — below */}
          <p className="text-xs text-muted mt-1">{timestamp}</p>
        </div>
      </div>
    </AnimatedCard>
  );
}
