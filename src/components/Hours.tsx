import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, CheckCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Hours = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const schedule = [
    { hours: "07:30 - 18:00" }, // Monday
    { hours: "07:30 - 18:00" }, // Tuesday
    { hours: "07:30 - 18:00" }, // Wednesday
    { hours: "07:30 - 18:00" }, // Thursday
    { hours: "07:30 - 18:00" }, // Friday
    { hours: "07:30 - 18:00" }, // Saturday
    { hours: t.hours.closed }, // Sunday
  ];

  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

  return (
    <section id="hours" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm uppercase tracking-widest text-accent">{t.hours.label}</span>
          <h2 className="font-serif text-3xl md:text-5xl mt-2">{t.hours.title}</h2>
        </motion.div>

        {/* Hours Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-2xl"
        >
          <div className="rounded-2xl border bg-background shadow-soft overflow-hidden">
            <div className="flex items-center gap-3 border-b bg-accent/10 px-6 py-4">
              <Clock className="h-5 w-5 text-accent" />
              <span className="font-serif text-lg text-foreground">{t.hours.header}</span>
            </div>

            <div className="divide-y">
              {schedule.map((item, i) => {
                const isToday = i === todayIndex;
                const isClosed = item.hours === t.hours.closed;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                    className={`px-6 py-4 flex justify-between items-center transition-colors ${
                      isToday ? "bg-accent/5" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isToday && <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />}
                      <span
                        className={`font-medium ${isToday ? "text-accent font-semibold" : "text-foreground"}`}
                      >
                        {t.hours.days[i]}
                      </span>
                      {isToday && (
                        <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full ml-auto">
                          {t.hours.today}
                        </span>
                      )}
                    </div>
                    <span className={`font-medium ${isClosed ? "text-muted-foreground" : ""}`}>
                      {item.hours}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hours;
