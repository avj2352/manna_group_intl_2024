import "@/styles/manna-redesign.css";


import logoImg from "@/assets/images/logo-img.png";

import { useEffect, useRef } from "react";
import "./about.css";
import { Navigation } from "../home/redesign/navigation";
import Footer from "../home/redesign/footer";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  img: string;
};

const TEAM: TeamMember[] = [
  {
    name: "Dr. Amara Osei",
    role: "Chief Executive Officer",
    bio: "A visionary with 20+ years in global health. Amara founded MANNA on one conviction: quality nutrition is a human right, not a privilege.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=85",
  },
  {
    name: "Marcus Ndiaye",
    role: "Chief Operations Officer",
    bio: "Marcus brings operational excellence to every corner of MANNA. His supply chain mastery ensures our products reach communities with precision.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85",
  },
  {
    name: "Priya Sharma",
    role: "Head of R&D",
    bio: "Priya leads our science team with infectious curiosity — bridging cutting-edge nutritional research with formulations people actually trust.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85",
  },
  {
    name: "James Okonkwo",
    role: "Director of Partnerships",
    bio: "James has opened doors in 14 countries. His relationship-first approach bridges communities, governments, and NGOs around a shared mission.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=85",
  },
  {
    name: "Sofia Mendes",
    role: "Nutritional Scientist",
    bio: "With a doctorate from Johns Hopkins, Sofia ensures every MANNA product is backed by rigorous science.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85",
  },
  {
    name: "Zara Williams",
    role: "Community Outreach Lead",
    bio: "Zara is the human face of MANNA in the field. Her programs have directly reached over 50,000 families.",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=85",
  },
  {
    name: "Daniel Park",
    role: "Financial Controller",
    bio: "Daniel keeps the mission sustainable and ensures every dollar creates maximum impact.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=85",
  },
  {
    name: "Emmanuel Torres",
    role: "Digital & Brand Strategy",
    bio: "Emmanuel transforms MANNA's story into digital experiences that make the mission resonate worldwide.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=85",
  },
];

const AboutPage = () => {
 const stageRef = useRef<HTMLDivElement | null>(null);
const wheelWrapRef = useRef<HTMLDivElement | null>(null);
const wheelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
  const stage = stageRef.current;
  const wheelWrap = wheelWrapRef.current;
  const wheel = wheelRef.current;

  if (!stage || !wheelWrap || !wheel) return;

  let frame = 0;
  let angle = 0;

  const positionWheel = () => {
    const isMobile = window.innerWidth < 640;
    const radius = isMobile ? 1150 : 1939;
    const wheelCenter = 1600;

    const stageHeight = stage.offsetHeight;
    const ratio = isMobile ? 0.38 : 0.42;
    const cardCenterInStage = stageHeight * ratio;
    const wheelCenterInStage = cardCenterInStage + radius;

    wheelWrap.style.top = `${wheelCenterInStage - wheelCenter}px`;
  };

  const animate = () => {
    angle -= window.innerWidth < 640 ? 0.008 : 0.03;
    wheel.style.transform = `rotate(${angle}deg)`;
    frame = requestAnimationFrame(animate);
  };

  positionWheel();
  window.addEventListener("resize", positionWheel);

  animate();

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("resize", positionWheel);
  };
}, []);

 return (
  <main className="about-page">
    <Navigation />

    <section className="about-section">
        <div className="about-stack">
          <article className="about-card">
            <h2 className="about-title">Who We Are</h2>
            <div className="about-body">
              <p className="sub-heading">
                Aiming To Serve People With Healthcare Products For Their
                Overall Day-to-day Good Health
              </p>

              <p>
                MANNA Group International is a New Jersey, USA based up-coming
                group of business divisions. MANNA Group International with one
                of its US FDA registered business unit 'MANNA International
                Corp.' is engaged in manufacturing and marketing of products
                related to day-to-day overall health care of people.
              </p>

              <p>
                MANNA International Corp. is introducing products in healthcare
                areas like Nutraceutical Supplements, OTC pharmaceuticals and
                Essential Oils.
              </p>

              <p>
                MANNA International Corp. is planning to introduce many
                clinically evaluated healthcare products targeted to specific
                health conditions and therapeutic areas. MANNA International Corp. is committed to offer quality products and maintaining ethical approach towards its customers to ensure Win-Win Association.
              </p>
            </div>
          </article>

          <article className="about-card">
            <h2 className="about-title">Our Vision & Mission</h2>

            <div className="about-body">
              <p>
                “Our vision is to be a well familiar healthcare products
                provider and a part of day-to-day good health and wellness to
                our customers.”
              </p>

              <p>
                “Our mission is to provide meaningful and focused products to
                our customers, helping them have day-to-day good health and
                wellness.”
              </p>

              <p>
               MANNA International Corp. is committed to delivering exceptional value through innovative products. By 2025, the company aims to reach 1,000 customers, focusing on personalized medicine, advanced drug delivery systems, and cutting-edge research and development.
              </p>
              <p>Our dedication to quality, efficiency, and accessibility positions us as a leader in the industry, driving our growth and customer satisfaction to new heights.</p>
            </div>
          </article>

          <article className="about-card">
            <h2 className="about-title">Our Value</h2>

            <div className="about-body">
              <p>
                We trust and practice honesty, integrity and transparency with
                our customers and stakeholders while building a win-win
                relationship.
              </p>

              <div className="lang-list">
                <p>“Customer is the King”</p>
                <p>“El cliente es el rey”</p>
                <p>“Le client est le roi”</p>
                <p>“Клиент – король”</p>
                <p>“O cliente é o rei”</p>
                <p>“الزبون هو الملك”</p>
                <p>“客户为王”</p>
                <p>“ग्राहक राजा है”</p>
                <p>“গ্রাহক রাজা”</p>
                <p>“Il cliente è il re”</p>
                <p>“Kunde ist der König”</p>
              </div>

              <p className="about-spaced">
                In Sanskrit, we address our customers as “Eko Twam Dwitiyo
                Naasty,” meaning: in our business, it is only you, no one else.
              </p>
            </div>
          </article>

          <article className="about-card">
            <h2 className="about-title">Quality & Affordability</h2>

            <div className="about-body">
              <p>
                Quality is the core essence of our business. With MANNA, quality
                comes at affordability.
              </p>

              <p>
              The quality of supplements or pharmaceuticals has been a concern for the manufacturer, marketing company and for the consumers as well.
              </p>

              <p>
               At MANNA, quality starts with sourcing of materials and its analysis to manufacturing process, analysis in lab., packaging labelling and storage conditions. With quality assurance, our focus remains at every steps of development of products so to provide products with 100% quality for assured outcome.
              </p>
              <p>At MANNA, we believe to deliver the quality products at a genuinely affordable price.</p>
            </div>
          </article>

          <article className="about-card">
            <h2 className="about-title">Management</h2>

            <div className="about-body">
              <p>
              At MANNA, we are driven by a fundamental commitment: improving lives through the power of innovative medicines. We believe that access to effective healthcare is a right, not a privilege, and we are dedicated to developing and delivering life-changing treatments to patients around the world.
              </p>

              <p className="sub-heading about-spaced">Dr. George Varges</p>

              <p>
                Orchestating international transactions involving millions of dollars with such multi-national conglomerates as Pfizer, Xerox, Minnesota mining & Manufacturing..etc., Expert in providing leadership and project management, conducting strategic planning, marketing, business development, sales, proposal preparation, presentations to the business partners and clients in the Middle East, Asia, Africa & the USA.
              </p>
            </div>
          </article>

          <article className="about-card">
            <h2 className="about-title">Collaboration</h2>

            <div className="about-body">
              <p>
                MANNA Pharmaceuticals works with healthcare research
                organizations in the USA and abroad to introduce clinically
                evaluated healthcare products.
              </p>

              <p>
                Products such as CalcuNix Tablets and KoviFlu Tablets reflect
                this approach.
              </p>

              <ul>
                <li>Alzheimer's disease</li>
                <li>Diabetes</li>
                <li>HIV</li>
                <li>Sickle cell anaemia</li>
                <li>Wound Care</li>
              </ul>

              <p>
              Focus on collaboration and R&D on healthcare products reflects our futuristic approach for introducing improved newer products for better health care of people.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="team-section">
        <div className="team-header">
          <h2>OUR TEAM</h2>
        </div>

       <div ref={stageRef} className="team-stage">
  <div ref={wheelWrapRef} className="team-wheel-wrap">
            <div ref={wheelRef} className="team-wheel">
              {TEAM.concat(TEAM, TEAM).map((member, index) => {
                const total = TEAM.length * 3;
                const angle = (360 / total) * index;
                const radius = 1939;
                const center = 1600;
                const rad = (angle * Math.PI) / 180;
                const x = center + radius * Math.sin(rad);
                const y = center - radius * Math.cos(rad);

                return (
                  <div
                    className="team-card-slot"
                    key={`${member.name}-${index}`}
                    style={{
                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`,
                    }}
                  >
                    <div className="team-card-inner">
                      <div className="team-card-photo">
                        <img src={member.img} alt={member.name} />
                      </div>

                      <div className="team-card-overlay">
                        <div className="ov-name">{member.name}</div>
                        <div className="ov-role">{member.role}</div>
                        <div className="ov-bio">{member.bio}</div>
                      </div>
                    </div>

                    <button
                      className="team-card-btn"
                      type="button"
                      aria-label={`More about ${member.name}`}
                    >
                      +
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default AboutPage;