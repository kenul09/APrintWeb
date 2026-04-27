import { useEffect, useMemo, useRef, useState } from "react";

const assetMap = import.meta.glob("../assets/*", {
  eager: true,
  import: "default",
});

const getAsset = (file) => assetMap[`../assets/${file}`] ?? "";

const works = [
  { id: 1, title: "Flayer", category: "Flayer", img: getAsset("A4dce582da9e746a6b931cca49b9eb154K.png") },
  { id: 2, title: "Flayer", category: "Flayer", img: getAsset("A592d4fd2be224f19b8ab5135598985edo.png") },
  { id: 3, title: "Flayer", category: "Flayer", img: getAsset("Af616dc1a8227442a85d7b4dd7b82cdcan.png") },

  { id: 4, title: "Vizit kart", category: "Vizit kart", img: getAsset("A50db8da16ff24ab68c8968dbfc5ec660n.png") },
  { id: 5, title: "Vizit kart", category: "Vizit kart", img: getAsset("A26eea4f0379647529595bef2233e7632k.png") },
  { id: 6, title: "Vizit kart", category: "Vizit kart", img: getAsset("Ab8b38d0f0d1b48f78286655b1a0e1b25i.png") },
  { id: 7, title: "Vizit kart", category: "Vizit kart", img: getAsset("unnamed-1.jpg") },
  { id: 8, title: "Vizit kart", category: "Vizit kart", img: getAsset("Gemini_Generated_Image_q0mchoq0mchoq0mc.png") },
  { id: 9, title: "Vizit kart", category: "Vizit kart", img: getAsset("unnamed.jpg") },

  { id: 10, title: "Menu", category: "Menu", img: getAsset("b18c471d-9746-49e3-a91d-e2fc2ea05356.png") },
  { id: 11, title: "Menu", category: "Menu", img: getAsset("4ebaa5fe-9b5b-4c3a-a538-91280865bccb.png") },
  { id: 12, title: "Menu", category: "Menu", img: getAsset("a9077bcc-2022-41c4-8fb7-6615494cf64a.png") },
  { id: 14, title: "Menu", category: "Menu", img: getAsset("a6f0e1f4-c619-4d77-9e7a-54b103b4f43a.png") },
  { id: 15, title: "Menu", category: "Menu", img: getAsset("64c9ee6f-5043-436f-8ebc-8706ecaf15fb.png") },
  { id: 16, title: "Menu", category: "Menu", img: getAsset("872aba5f-4a70-4725-ad73-85576ea36f3c.png") },
  { id: 17, title: "Menu", category: "Menu", img: getAsset("e58dd31b-e14a-4c07-a471-3d62b6ba3efb.png") },
  { id: 18, title: "Menu", category: "Menu", img: getAsset("af04d7fa-bf59-45da-ab06-c9659bb58f7d.png") },
  { id: 19, title: "Menu", category: "Menu", img: getAsset("236b9786-c541-48f9-aa07-dcf40b425087.png") },

  { id: 20, title: "Roll Up", category: "Roll-up", img: getAsset("b2af5af4-3ba6-48d4-8525-7375914567f1.png") },
  { id: 21, title: "Roll Up", category: "Roll-up", img: getAsset("4c42233b-2f06-468c-b8c8-b1d6d8783487.png") },
  { id: 22, title: "Roll Up", category: "Roll-up", img: getAsset("e0de131f-f785-4e6b-a6c3-8f83f5d4fdc4.png") },

  { id: 23, title: "Poster", category: "Poster", img: getAsset("23755a79-c8ed-4e87-9e69-30b1fe735400.png") },
  { id: 24, title: "Poster", category: "Poster", img: getAsset("c18da116-17f0-4f27-a7e0-6b87cd73e697.png") },
  { id: 25, title: "Poster", category: "Poster", img: getAsset("8e0e53ac-6c23-415a-a066-45b9f0273a08.png") },

  { id: 26, title: "Sticker", category: "Sticker", img: getAsset("c602db84-5d02-4b7a-879a-480e67f37cc1.png") },
  { id: 27, title: "Sticker", category: "Sticker", img: getAsset("4095ae57-3e5a-4451-8e9b-418c179f01f7.png") },

  { id: 28, title: "Kataloq", category: "Kataloq", img: getAsset("132ba4e6-9a5b-46c5-a00a-c9d9de1de4f3.png") },
  { id: 29, title: "Kataloq", category: "Kataloq", img: getAsset("9eab215a-2f1d-4dad-8bc7-2bb729c582bc.png") },

  { id: 30, title: "Kitab", category: "Kitab", img: getAsset("cc849925-d1a4-4a85-a473-d1c0a7b85c69.png") },
];

const glassStyle = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "24px",
};

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function WorkCard({ work, delay }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <article
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...glassStyle,
        overflow: "hidden",
        transition: `opacity 0.7s ${delay}s, transform 0.7s ${delay}s, background 0.3s, border-color 0.3s`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
        background: hovered ? "rgba(139,92,246,0.1)" : "rgba(255,255,255,0.04)",
        borderColor: hovered ? "rgba(139,92,246,0.35)" : "rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          height: 320,
          overflow: "hidden",
          position: "relative",
          background: "#0d0d1a",
        }}
      >
        <img
          src={work.img}
          alt={work.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            transition: "transform 0.5s",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: hovered
              ? "linear-gradient(to bottom, transparent 40%, rgba(139,92,246,0.4))"
              : "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.5))",
            transition: "background 0.3s",
          }}
        />
      </div>

      <div style={{ padding: "14px 20px 16px" }}>
        <h3
          style={{
            fontFamily: '"Oswald", sans-serif',
            fontSize: "1.5rem",
            fontWeight: 500,
            letterSpacing: "0.03em",
            margin: 0,
            color: "#fff",
            lineHeight: 1.2,
          }}
        >
          {work.title}
        </h3>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState("Hamısı");
  const [heroRef, heroIn] = useInView(0.1);

  const categories = useMemo(() => {
    const unique = [...new Set(works.map((w) => w.category))];
    return ["Hamısı", ...unique];
  }, []);

  const filteredWorks =
    filter === "Hamısı" ? works : works.filter((w) => w.category === filter);

  return (
    <div
      style={{
        background: "#060608",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: '"DM Sans", sans-serif',
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .portfolio-wrap {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          padding-bottom: 100px;
        }

        @media (max-width: 768px) {
          .portfolio-wrap {
            padding: 0 20px;
          }

          .portfolio-hero {
            padding: 112px 0 56px !important;
          }

          .portfolio-grid {
            grid-template-columns: 1fr;
            padding-bottom: 72px;
          }

          .portfolio-filters {
            margin-bottom: 36px !important;
          }
        }
      `}</style>

      <div className="portfolio-wrap">
        <section ref={heroRef} className="portfolio-hero" style={{ padding: "120px 0 72px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 32,
              transition: "opacity 0.7s 0.1s, transform 0.7s 0.1s",
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
              }}
            />
            <span
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              İşlərimiz
            </span>
          </div>

          <h1
            style={{
              fontFamily: '"Oswald", sans-serif',
              fontSize: "clamp(4rem, 9vw, 7rem)",
              fontWeight: 500,
              lineHeight: 0.92,
              marginBottom: 24,
              transition: "opacity 0.9s 0.2s, transform 0.9s 0.2s",
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #a78bfa, #ec4899)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 4s linear infinite",
              }}
            >
              Portfolio
            </span>
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: "0.9rem",
              lineHeight: 1.8,
              maxWidth: 400,
              fontWeight: 300,
              transition: "opacity 0.9s 0.35s, transform 0.9s 0.35s",
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "translateY(0)" : "translateY(20px)",
            }}
          >
            Müştərilərimiz üçün hazırladığımız işlərin seçmələri.
          </p>
        </section>

        <div
          className="portfolio-filters"
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 48,
            flexWrap: "wrap",
            transition: "opacity 0.9s 0.4s, transform 0.9s 0.4s",
            opacity: heroIn ? 1 : 0,
            transform: heroIn ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              style={{
                background:
                  filter === category
                    ? "linear-gradient(135deg, #8b5cf6, #ec4899)"
                    : "rgba(255,255,255,0.04)",
                color: filter === category ? "#fff" : "rgba(255,255,255,0.4)",
                border:
                  filter === category
                    ? "1px solid transparent"
                    : "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                padding: "9px 22px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.8rem",
                fontFamily: '"DM Sans", sans-serif',
                letterSpacing: "0.05em",
                transition: "all 0.2s",
                backdropFilter: "blur(10px)",
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <section className="portfolio-grid">
          {filteredWorks.map((work, i) => (
            <WorkCard key={work.id} work={work} delay={i * 0.08} />
          ))}
        </section>
      </div>
    </div>
  );
}
