import { useEffect } from "react";
import gsap from "gsap";
import logoImg from "@/assets/images/logo-img.png";
import { Link, useNavigate } from "react-router-dom";


const Footer = () => {
  const navigate = useNavigate();
  useEffect(() => {
  const mobileBreakpoint = 1000;

  const isMobile = () => window.innerWidth < mobileBreakpoint;

  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".char-hover-text")
  );

  const cleanups: Array<() => void> = [];

  elements.forEach((element) => {
    if (element.dataset.chtDone === "1") return;

    element.dataset.chtDone = "1";

    const originalText = element.textContent || "";

    element.innerHTML = "";

    originalText.split("").forEach((character) => {
      const wrapper = document.createElement("span");
      wrapper.className = "cht-char";

      const defaultCharacter = document.createElement("span");
      defaultCharacter.className = "cht-default";
      defaultCharacter.textContent =
        character === " " ? "\u00A0" : character;

      const hoverCharacter = document.createElement("span");
      hoverCharacter.className = "cht-hover";
      hoverCharacter.textContent =
        character === " " ? "\u00A0" : character;

      wrapper.appendChild(defaultCharacter);
      wrapper.appendChild(hoverCharacter);
      element.appendChild(wrapper);
    });

    const defaultCharacters =
      element.querySelectorAll<HTMLElement>(".cht-default");

    const hoverCharacters =
      element.querySelectorAll<HTMLElement>(".cht-hover");

    gsap.set(defaultCharacters, {
      yPercent: 0,
    });

    gsap.set(hoverCharacters, {
      yPercent: -100,
    });

    let timeline: gsap.core.Timeline | null = null;
    let touchTimer: number | undefined;

    const animateOut = () => {
      timeline?.kill();

      timeline = gsap.timeline();

      timeline.to(
        defaultCharacters,
        {
          yPercent: 100,
          duration: 0.3,
          ease: "power3.out",
          stagger: 0.01,
        },
        0
      );

      timeline.to(
        hoverCharacters,
        {
          yPercent: 0,
          duration: 0.3,
          ease: "power3.out",
          stagger: 0.01,
        },
        0.1
      );
    };

    const animateBack = () => {
      timeline?.kill();

      timeline = gsap.timeline();

      timeline.to(
        hoverCharacters,
        {
          yPercent: -100,
          duration: 0.4,
          ease: "power3.inOut",
          stagger: 0.01,
        },
        0
      );

      timeline.to(
        defaultCharacters,
        {
          yPercent: 0,
          duration: 0.4,
          ease: "power3.inOut",
          stagger: 0.01,
        },
        0.15
      );
    };

    const handleMouseEnter = () => {
      if (!isMobile()) animateOut();
    };

    const handleMouseLeave = () => {
      if (!isMobile()) animateBack();
    };

    const handleTouchStart = () => {
      if (!isMobile()) return;

      animateOut();

      window.clearTimeout(touchTimer);

      const totalDuration =
        (0.1 + 0.3 + defaultCharacters.length * 0.01) * 1000;

      touchTimer = window.setTimeout(
        animateBack,
        totalDuration
      );
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });

    cleanups.push(() => {
      timeline?.kill();
      window.clearTimeout(touchTimer);

      element.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );

      element.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      element.removeEventListener(
        "touchstart",
        handleTouchStart
      );

      element.innerHTML = originalText;
      delete element.dataset.chtDone;
    });
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}, []);

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact-section");

    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    navigate("/");

    window.setTimeout(() => {
      document
        .getElementById("contact-section")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 600);
  };

  return (
    <footer className="mgi-footer">
      <div className="mgi-footer-top">
        {/* Brand */}
        <div className="mgi-footer-brand">
          <Link to="/" aria-label="Go to homepage">
            <img
              src={logoImg}
              alt="Manna International"
              className="mgi-footer-logo"
            />
          </Link>

          <p className="mgi-footer-tag">
            Innovative wellness for everyday health, proudly developed and
            manufactured in the USA.
          </p>

          <div className="mgi-footer-social">
            <a href="#" aria-label="Instagram">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" />
              </svg>
            </a>

            <a href="#" aria-label="Facebook">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M15 3h-2a4 4 0 0 0-4 4v3H7v4h2v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>

            <a href="#" aria-label="LinkedIn">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="8" y1="11" x2="8" y2="16" />
                <line x1="8" y1="8" x2="8" y2="8" />
                <line x1="12" y1="11" x2="12" y2="16" />
                <path d="M12 13c0-1.5 1.5-2 3-2s2 1 2 2v3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Company */}
        <nav className="mgi-footer-col">
          <h4>Company</h4>

          <Link to="/" className="char-hover-text">
            Home
          </Link>

          <Link to="/about/100" className="char-hover-text">
            About
          </Link>

          <Link to="/careers" className="char-hover-text">
            Careers
          </Link>

          <button
            type="button"
            className="char-hover-text mgi-footer-link-button"
            onClick={handleContactClick}
          >
            Contact
          </button>
        </nav>

        {/* Products */}
        <nav className="mgi-footer-col">
          <h4>Products</h4>

          <Link to="/products/calcunix" className="char-hover-text">
            CalcuNix
          </Link>

          <Link to="/products/menoseg" className="char-hover-text">
            MenoSeg Plus
          </Link>

          <Link to="/products/prosante" className="char-hover-text">
            ProSante Plus
          </Link>

          <Link to="/products/manaliv" className="char-hover-text">
            ManaLiv
          </Link>
        </nav>

        {/* Newsletter */}
        <div className="mgi-footer-col mgi-footer-newsletter">
          <h4>Stay Updated</h4>

          <p>Get wellness tips and product updates in your inbox.</p>

          <form
            className="mgi-footer-form"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              required
            />

            <button type="submit" aria-label="Subscribe">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M5 12h12" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      <div
        className="mgi-footer-wordmark"
        aria-hidden="true"
      >
        <span>MANNAGROUPINTERNATIONAL</span>
      </div>

      <div className="mgi-footer-bottom">
        <p>© 2026 MANNA Group International. All rights reserved.</p>

        <div className="mgi-footer-legal">
          <Link to="/privacy">Privacy Policy</Link>

          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;