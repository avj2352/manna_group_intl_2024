import "@/styles/manna-redesign.css";




import { Navigation } from "../home/redesign/navigation";
import Footer from "../home/redesign/footer";
import "./career.css";

const CareersPage = () => {
  return (
    <main className="careers-page">
      <Navigation />

      <header className="careers-header">
        <span className="eyebrow">Join Our Team</span>

        <h1>Careers</h1>

        <p>
          Join the MANNA Group International team and help us improve
          day-to-day health for people worldwide.
        </p>
      </header>

      <section className="careers-wrap">
        <div className="job-card">
          <div className="role-head">
            <div className="role-icon">💼</div>

            <h2>Clinical Marketing and Training Manager</h2>
          </div>

          <div className="tags">
            <span className="tag">Full-Time</span>
            <span className="tag">Union, NJ</span>
            <span className="tag orange-tag">
              $182,300 – $200,000 / yr
            </span>
          </div>

          <div className="valid-window">
            📅 This job ad is valid from May 27th, 2026 – June 27th, 2026
          </div>

          <p className="description">
            MANNA Pharmaceuticals, dba of MANNA Int&apos;l Corp, Union, NJ
            seeks an experienced Clinical Marketing and Training Manager to
            educate and train MANNA&apos;s current and upcoming product
            associates, customers and distributors; market MANNA products and
            outsourcing raw materials for manufacturing; provide hospital
            assistance hands-on training; attend and provide product
            evaluations and competitive analysis from the attendance of
            related symposiums, seminars, trade shows, conferences and so on.
          </p>

          <ul>
            <li>Requires extensive local and international travel.</li>

            <li>
              Languages required: English, Arabic, Hindi, Urdu, Malayalam,
              Tamil, etc.
            </li>

            <li>
              Minimum BSc. in Nursing or Hospital Administration.
            </li>
          </ul>

          <a
            href="mailto:femiaade2@gmail.com?subject=Application:%20Clinical%20Marketing%20and%20Training%20Manager"
            className="apply-btn"
          >
            ✉ Apply via Email
          </a>

          <p className="apply-note">
            *or send an email titled: &quot;Application: Clinical Marketing
            and Training Manager&quot; to{" "}
            <strong>femiaade2@gmail.com</strong>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CareersPage;