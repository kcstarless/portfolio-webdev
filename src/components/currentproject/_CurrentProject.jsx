import styles from "./style.module.scss";
import projects from "../project/projects";
import kcmVideo from "../../assets/videos/kcm_video.mp4";
import { useState, useEffect, useRef } from "react";

const Header = () => {
  const project = projects()[projects().length - 1];
  return (
    <div className={styles.header}>
      <div className={styles.projectTitle}>
        <div className={styles.title}>Current Project</div>
        {project.name}
      </div>
    </div>
  );
};

// Overview, Details, Design, Challenges, Features, Outcome
const Overview = ({ project }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const handleMouseEnter = () => {
      video.play();
    };

    const handleMouseLeave = () => {
      video.pause();
      video.currentTime = 0; // Optional: Reset to the beginning
    };

    video.addEventListener("mouseenter", handleMouseEnter);
    video.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      video.removeEventListener("mouseenter", handleMouseEnter);
      video.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className={styles.overview}>
      <div className={styles.separator}>
        {/* Project Details */}
        <div className={styles.item}>
          <span className={styles.label}>Project No.</span>
          <span className={styles.value}>{project.id}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Project Title</span>
          <span className={styles.value}>{project.name}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Year</span>
          <span className={styles.value}>{project.year}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Complete</span>
          <span className={styles.value}>{project.duration}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Type</span>
          <span className={styles.value}>{project.type}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Tech Stack</span>
          <span className={styles.icon}>
            {project.tech_stack.map((tech, index) => (
              <span key={index} className={styles.techIcon}>
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className={styles.techIcon}
                />
              </span>
            ))}
          </span>
        </div>
      </div>
      <div className={styles.imageGrid}>
        <video
          ref={videoRef}
          src={kcmVideo}
          className={styles.video}
          muted
          playsInline
          loop
        />
      </div>
    </div>
  );
};

const Details = ({ project }) => {
  return (
    <div className={styles.details}>
      <div className={styles.item}>
        <span className={styles.details}>{project.details}.</span>
      </div>
    </div>
  );
};

const Challenges = ({ project }) => {
  const [activeSection, setActiveSection] = useState(1);

  const Challenges1 = () => {
    return (
      <div className={styles.challengesDetails}>
        ​Initially, implementing distinct layouts for mobile and desktop views
        posed significant challenges, particularly in maintaining
        synchronization between the two. For instance, when switching from
        desktop to mobile view, the content and URL path inconsistencies
        required targeting and updating separate Turbo Frames (main-content and
        main-content-mobile), leading to increased complexity and code
        maintenance difficulties. <br />​<br /> To address these issues, the
        menu was redesigned to utilize an accordion layout uniformly across both
        mobile and desktop platforms. This unified approach, controlled by a
        menu icon in the mobile layout, resulted in cleaner, more efficient
        code, reducing the reliance on multiple Stimulus controllers, eliminated
        mirroring, reduced network request and simplifying the overall
        implementation. Consequently, this redesign enhanced the user experience
        by providing a consistent and smoother navigation system across all
        devices.
      </div>
    );
  };

  const Challenges2 = () => {
    return (
      <div className={styles.challengesDetails}>
        ​Integrating Turbo Frames within accordion panels can be challenging due
        to the need for dynamic content loading. Initially, I attempted to house
        all content within a single Turbo Frame inside each accordion panel.
        This approach required extensive use of Stimulus controllers and CSS to
        manage content injection and removal, leading to increased code
        complexity and reduced readability.​
        <br />
        <br />
        To address these issues, I transitioned to assigning a unique Turbo
        Frame to each accordion panel, ensuring that each panel's actions
        targeted its associated Turbo Frame. This strategy reduced the reliance
        on Stimulus controllers, resulting in a leaner, more maintainable
        codebase and providing a smoother user interaction experience.​
        <br />
        <br />
        This experience underscores the importance of aligning Turbo Frame
        implementation with the structural requirements of UI components to
        achieve optimal performance and maintainability.
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 1:
        return <Challenges1 />;
      case 2:
        return <Challenges2 />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.challenges}>
      <div className={styles.challengesSubmenu}>
        <div
          className={styles.challengesSubmenuTitle}
          aria-expanded={activeSection === 1}
          onClick={() => setActiveSection(1)}
        >
          1. Menu Layout
        </div>
        <div
          className={styles.challengesSubmenuTitle}
          aria-expanded={activeSection === 2}
          onClick={() => setActiveSection(2)}
        >
          2. Turbo Content
        </div>
      </div>

      <div className={styles.challengesContent}>{renderContent()}</div>
    </div>
  );
};

const Design1 = ({ project }) => {
  const [expandedImage, setExpandedImage] = useState(null);

  const handleImageClick = (image) => {
    setExpandedImage(image);
  };

  const closeExpandedImage = () => {
    setExpandedImage(null);
  };

  return (
    <>
      <div className={styles.designDetails}>
        <img
          src={project.images[0]}
          alt="Design"
          className={styles.image}
          onClick={() => handleImageClick(project.images[0])}
        />
        <p>
          I decided to use some colors for general layout of the website. With
          two distinct layout for mobile and desktop menu with each
          corresponding colors. Navigation is done through accordion on desktop
          and bento box for mobile devices. Main font used is Bebas Neue and
          alternative is Poppins. Main logo for QVM is retained with title set
          as King Charles Market.
        </p>
      </div>
      {expandedImage && (
        <div className={styles.modalOverlay} onClick={closeExpandedImage}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={expandedImage} alt="Expanded Design" />
            <button className={styles.closeButton} onClick={closeExpandedImage}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const Design2 = ({ project }) => {
  const [expandedImage, setExpandedImage] = useState(null);

  const handleImageClick = (image) => {
    setExpandedImage(image);
  };

  const closeExpandedImage = () => {
    setExpandedImage(null);
  };

  return (
    <>
      <div className={styles.designDetails}>
        <img
          src={project.images[1]}
          alt="Database Design"
          className={styles.image}
          onClick={() => handleImageClick(project.images[1])}
        />
        <p>
          The database design supports an e-commerce platform with users, shops,
          products, categories, and carts. Users can have roles like customers,
          traders, or admins and are linked to carts and sessions. Shops store
          details like name, location, and contact info, and are associated with
          products and categories. Products belong to shops, are categorized via
          a many-to-many relationship, and include attributes like name, price,
          and stock. Carts track shopping activity, with cart items linking
          carts to products and storing quantity and price. Relationships are
          enforced with foreign key constraints, ensuring data integrity across
          the system.
        </p>
      </div>
      {expandedImage && (
        <div className={styles.modalOverlay} onClick={closeExpandedImage}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={expandedImage} alt="Expanded Database Design" />
            <button className={styles.closeButton} onClick={closeExpandedImage}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const Design = ({ project }) => {
  const [activeSection, setActiveSection] = useState(1);

  const renderContent = () => {
    switch (activeSection) {
      case 1:
        return <Design1 project={project} />;
      case 2:
        return <Design2 project={project} />;
      default:
        return null;
    }
  };
  return (
    <div className={styles.design}>
      <div className={styles.designSubmenu}>
        <div
          className={styles.designSubmenuTitle}
          aria-expanded={activeSection === 1}
          onClick={() => setActiveSection(1)}
        >
          1. MAIN UI/UX Design
        </div>
        <div
          className={styles.designSubmenuTitle}
          aria-expanded={activeSection === 2}
          onClick={() => setActiveSection(2)}
        >
          2. Database Design
        </div>
      </div>

      <div className={styles.designContent}>{renderContent()}</div>
    </div>
  );
};

const Project = () => {
  const project = projects()[projects().length - 1];

  const [activeSection, setActiveSection] = useState("Overview");

  const renderContent = () => {
    switch (activeSection) {
      case "Overview":
        return (
          <div className={styles.projectDetails}>
            <Overview project={project} />
          </div>
        );
      case "Details":
        return (
          <div className={styles.projectDetails}>
            <Details project={project} />
          </div>
        );
      case "Design":
        return (
          <div className={styles.projectDetails}>
            <Design project={project} />
          </div>
        );
      case "Challenges":
        return (
          <div className={styles.projectDetails}>
            <Challenges project={project} />
          </div>
        );
      case "Features":
        return (
          <div className={styles.projectDetails}>{project.keyFeatures}</div>
        );
      case "Outcome":
        return <div className={styles.projectDetails}>{project.outcome}</div>;
      default:
        return null;
    }
  };

  const submenu = ["Overview", "Details", "Design", "Challenges", "Features"];

  return (
    <div className={styles.body}>
      <div className={styles.menubar}>
        {submenu.map((section) => (
          <div
            key={section}
            className={styles.menuItem}
            aria-expanded={activeSection === section}
            onClick={() => setActiveSection(section)}
          >
            {section}
          </div>
        ))}
      </div>
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};

const CurrentProject = () => {
  return (
    <section id={styles.currentProject}>
      <div className={styles.mainContainer}>
        {/* <div className={styles.container}> */}
        <Header />
        <Project />
        {/* </div> */}
      </div>
    </section>
  );
};
export default CurrentProject;
