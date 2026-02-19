import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import garettLogoFooter from "@/assets/garett-logo-footer.png";

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(217, 44%, 8%) 0%, hsl(210, 60%, 14%) 50%, hsl(217, 44%, 11%) 100%)",
      }}
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, hsl(210, 100%, 70%) 0%, transparent 50%), radial-gradient(circle at 75% 75%, hsl(330, 60%, 60%) 0%, transparent 50%)",
        }}
      />

      {/* Decorative lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full opacity-10"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(0,0%,100%), transparent)" }}
        />
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-px opacity-10"
          style={{ background: "linear-gradient(to right, transparent, hsl(0,0%,100%), transparent)" }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto">
        {/* Logo */}
        <div className="mb-12">
          <img
            src={garettLogoFooter}
            alt="Garett Beauty"
            className="h-10 md:h-12 object-contain opacity-90"
          />
        </div>

        {/* Divider */}
        <div className="w-12 h-px mb-10 opacity-40" style={{ background: "hsl(0,0%,100%)" }} />

        {/* Headline */}
        <h1
          className="text-4xl md:text-6xl font-light tracking-widest uppercase mb-6"
          style={{ color: "hsl(0,0%,100%)", letterSpacing: "0.2em" }}
        >
          Volvemos
          <br />
          <span className="text-2xl md:text-3xl font-extralight tracking-[0.3em] opacity-70">
            muy pronto
          </span>
        </h1>

        {/* Message */}
        <p
          className="text-base md:text-lg font-light leading-relaxed mb-12 max-w-lg"
          style={{ color: "hsl(0,0%,85%)", letterSpacing: "0.03em" }}
        >
          Estamos trabajando en algo especial para ti. Déjanos tu email y serás la primera en descubrirlo.
        </p>

        {/* Email form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Tu dirección de email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none text-sm tracking-wide"
            />
            <Button
              type="submit"
              className="h-12 px-8 rounded-none text-xs tracking-widest uppercase font-medium"
              style={{
                background: "hsl(0,0%,100%)",
                color: "hsl(217, 44%, 11%)",
              }}
            >
              Avisar
            </Button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-sm tracking-widest uppercase font-light" style={{ color: "hsl(0,0%,70%)" }}>
              ✦ &nbsp; Gracias. Te avisaremos en cuanto estemos de vuelta. &nbsp; ✦
            </p>
          </div>
        )}

        {/* Bottom divider & tagline */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <div className="w-8 h-px opacity-30" style={{ background: "hsl(0,0%,100%)" }} />
          <p className="text-xs tracking-[0.2em] uppercase opacity-30" style={{ color: "hsl(0,0%,100%)" }}>
            Garett Beauty España
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
