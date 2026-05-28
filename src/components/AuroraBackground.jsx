/* AuroraBackground — sabit arxa fon effekti
   ✅ FIX: z-index -1 edildi ki, bütün məzmunun ARXASINDA qalsın
   ✅ FIX: pointer-events: none — kliklərə mane olmur
*/

const styles = `
.aurora-wrap {
  position: fixed;
  inset: 0;
  z-index: -1;         /* ✅ -1: Hər şeyin arxasında */
  pointer-events: none;
  background: #06080f;
  overflow: hidden;
}

/* STARS */
.aurora-stars {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1px 1px at 15% 25%, rgba(255,255,255,0.55), transparent),
    radial-gradient(1px 1px at 65% 55%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 35% 75%, rgba(255,255,255,0.35), transparent),
    radial-gradient(1px 1px at 80% 20%, rgba(255,255,255,0.4), transparent),
    radial-gradient(1px 1px at 50% 90%, rgba(255,255,255,0.3), transparent),
    radial-gradient(1.5px 1.5px at 90% 40%, rgba(255,255,255,0.5), transparent),
    radial-gradient(1px 1px at 25% 50%, rgba(255,255,255,0.25), transparent);
  animation: starDrift 90s linear infinite;
}

@keyframes starDrift {
  from { transform: translateY(0); }
  to   { transform: translateY(-100px); }
}

/* AURORA BANDS */
.aurora-band {
  position: absolute;
  left: -20%;
  right: -20%;
  border-radius: 50%;
  filter: blur(35px);
  opacity: 0;
  will-change: transform, opacity;
}

.ab1 {
  height: 32vh;
  top: 4%;
  background: linear-gradient(180deg,
    transparent 0%,
    rgba(0,230,140,0.14) 45%,
    rgba(0,190,255,0.09) 72%,
    transparent 100%
  );
  animation: aurora1 14s ease-in-out infinite;
}

.ab2 {
  height: 26vh;
  top: 14%;
  background: linear-gradient(180deg,
    transparent 0%,
    rgba(110,0,255,0.11) 45%,
    rgba(0,140,255,0.13) 72%,
    transparent 100%
  );
  animation: aurora2 18s ease-in-out infinite 2s;
}

.ab3 {
  height: 22vh;
  top: 24%;
  background: linear-gradient(180deg,
    transparent 0%,
    rgba(0,240,190,0.09) 45%,
    rgba(90,0,190,0.09) 72%,
    transparent 100%
  );
  animation: aurora3 22s ease-in-out infinite 4s;
}

@keyframes aurora1 {
  0%,100% { opacity: 0;   transform: translateX(0%)  scaleY(1); }
  50%      { opacity: 0.85; transform: translateX(8%)  scaleY(1.1); }
}

@keyframes aurora2 {
  0%,100% { opacity: 0;   transform: translateX(0%)  scaleY(1); }
  50%      { opacity: 0.75; transform: translateX(-7%) scaleY(1.12); }
}

@keyframes aurora3 {
  0%,100% { opacity: 0;   transform: translateX(0%)  scaleY(1); }
  50%      { opacity: 0.65; transform: translateX(5%)  scaleY(1.15); }
}

/* Üfüq parıltısı */
.aurora-horizon {
  position: absolute;
  bottom: 42%;
  left: -10%;
  right: -10%;
  height: 18vh;
  background: linear-gradient(180deg,
    transparent 0%,
    rgba(0,170,110,0.045) 50%,
    transparent 100%
  );
  filter: blur(28px);
  animation: horizonPulse 9s ease-in-out infinite;
}

@keyframes horizonPulse {
  0%,100% { opacity: 0.45; }
  50%      { opacity: 1; }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .aurora-band,
  .aurora-horizon,
  .aurora-stars {
    animation: none !important;
    opacity: 0.3;
  }
}
`;

export default function AuroraBackground() {
  return (
    <>
      <style>{styles}</style>
      <div className="aurora-wrap" aria-hidden="true">
        <div className="aurora-stars" />
        <div className="aurora-band ab1" />
        <div className="aurora-band ab2" />
        <div className="aurora-band ab3" />
        <div className="aurora-horizon" />
      </div>
    </>
  );
}