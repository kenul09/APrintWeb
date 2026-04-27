const styles = `
.aurora-wrap {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: #06080f;
  overflow: hidden;
}

/* STARS */
.stars {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.5), transparent),
    radial-gradient(1px 1px at 70% 60%, rgba(255,255,255,0.4), transparent),
    radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.3), transparent);
  animation: starMove 80s linear infinite;
}

@keyframes starMove {
  from { transform: translateY(0); }
  to { transform: translateY(-120px); }
}

/* AURORA */
.aurora-band {
  position: absolute;
  left: -20%;
  right: -20%;
  border-radius: 50%;
  filter: blur(30px);
  opacity: 0;
  will-change: transform, opacity;
}

/* bands */
.ab1 { height: 30vh; top: 5%; }
.ab2 { height: 25vh; top: 15%; }
.ab3 { height: 20vh; top: 25%; }

/* colors + animation */
.ab1 {
  background: linear-gradient(180deg,
    transparent 0%,
    rgba(0,255,150,0.15) 40%,
    rgba(0,200,255,0.1) 70%,
    transparent 100%
  );
  animation: aurora1 12s ease-in-out infinite;
}

.ab2 {
  background: linear-gradient(180deg,
    transparent 0%,
    rgba(120,0,255,0.12) 40%,
    rgba(0,150,255,0.15) 70%,
    transparent 100%
  );
  animation: aurora2 16s ease-in-out infinite;
}

.ab3 {
  background: linear-gradient(180deg,
    transparent 0%,
    rgba(0,255,200,0.1) 40%,
    rgba(100,0,200,0.1) 70%,
    transparent 100%
  );
  animation: aurora3 20s ease-in-out infinite;
}

/* animations */
@keyframes aurora1 {
  0%   { opacity: 0; transform: translateX(0%) scaleY(1); }
  50%  { opacity: 0.8; transform: translateX(10%) scaleY(1.1); }
  100% { opacity: 0; transform: translateX(0%) scaleY(1); }
}

@keyframes aurora2 {
  0%   { opacity: 0; }
  50%  { opacity: 0.7; transform: translateX(-8%) scaleY(1.1); }
  100% { opacity: 0; }
}

@keyframes aurora3 {
  0%   { opacity: 0; }
  50%  { opacity: 0.6; transform: translateX(6%) scaleY(1.2); }
  100% { opacity: 0; }
}

/* horizon glow */
.horizon-glow {
  position: absolute;
  bottom: 40%;
  left: -10%;
  right: -10%;
  height: 20vh;
  background: linear-gradient(180deg,
    transparent 0%,
    rgba(0,180,120,0.05) 50%,
    transparent 100%
  );
  filter: blur(30px);
  animation: horizonPulse 8s ease-in-out infinite;
}

@keyframes horizonPulse {
  0%,100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* ACCESSIBILITY */
@media (prefers-reduced-motion: reduce) {
  .aurora-band,
  .horizon-glow,
  .stars {
    animation: none;
    opacity: 0.4;
  }
}
`;

export default function AuroraBackground() {
  return (
    <>
      <style>{styles}</style>

      <div className="aurora-wrap">
        <div className="stars" />
        <div className="aurora-band ab1" />
        <div className="aurora-band ab2" />
        <div className="aurora-band ab3" />
        <div className="horizon-glow" />
      </div>
    </>
  );
}