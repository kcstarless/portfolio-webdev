import { menuTextAnimation } from "../../helpers/textAnimationHelper";
import { useState } from "react";
import styles from "./style.module.scss";
import emailjs from "emailjs-com";

const SidePanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.contact_menu}>
        <div
          data-text="CONTACT"
          className="menu_link"
          onClick={() => setIsOpen(true)}
        >
          <span onClick={() => setIsOpen(true)}>
            {menuTextAnimation("CONTACT")}
          </span>
        </div>
        {isOpen && <DialogBox setIsOpen={setIsOpen} />}
      </div>
    </>
  );
};

export default SidePanel;

const DialogBox = ({ setIsOpen }) => {
  const [isClosed, setIsClosed] = useState(false);

  const handleClose = () => {
    setIsClosed(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 1000); // match with your CSS animation duration
  };

  return (
    <dialog className={`${styles.dialog_box} ${isClosed ? styles.closed : ""}`}>
      <div className={styles.dialog_title}>
        <button className={styles.close_button} onClick={handleClose}>
          X
        </button>
        <h1>CONTACT ME</h1>
      </div>
      <p>If you have any questions or just like to say 'Hi!'.</p>
      <ContactForm handleClose={handleClose} />
    </dialog>
  );
};

const ContactForm = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    organisation: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate the form fields
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "is required";
    if (!formData.organisation.trim()) newErrors.organisation = "is required";
    if (!formData.email.trim()) {
      newErrors.email = "is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "address is invalid";
    }
    if (!formData.message.trim()) newErrors.message = "is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission and send email via EmailJS
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const templateParams = {
        name: formData.name,
        organisation: formData.organisation,
        email: formData.email,
        message: formData.message,
      };

      emailjs
        .send(
          "service_761mjn2", // Your Service ID from EmailJS
          "template_o666x59", // Your Template ID from EmailJS
          templateParams,
          "98kztHLl7z4dgC9q_" // Replace with your actual Public Key from EmailJS
        )
        .then((response) => {
          console.log("Email sent successfully:", response);
          alert("Great! I'll get back to you as soon as I can.");
          handleClose();
          // Reset form fields after successful submission
          setFormData({
            name: "",
            organisation: "",
            email: "",
            message: "",
          });
        })
        .catch((error) => {
          console.error("Error sending email:", error);
          alert("Failed to send message. Please try again.");
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.input_contianer}>
        <div className={styles.input_label}>
          <div className={styles.name}>Name</div>
          <div className={styles.error}>&nbsp;{errors.name}</div>
        </div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.name_input}
        />
      </div>
      <div className={styles.input_contianer}>
        <div className={styles.input_label}>
          <div className={styles.name}>Organisation</div>
          <div className={styles.error}>&nbsp;{errors.organisation}</div>
        </div>
        <input
          type="text"
          name="organisation"
          value={formData.organisation}
          onChange={handleChange}
          className={styles.name_input}
        />
      </div>
      <div className={styles.input_contianer}>
        <div className={styles.input_label}>
          <div className={styles.name}>Email</div>
          <div className={styles.error}>&nbsp;{errors.email}</div>
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.name_input}
        />
      </div>
      <div className={styles.input_contianer}>
        <div className={styles.input_label}>
          <div className={styles.name}>Message</div>
          <div className={styles.error}>&nbsp;{errors.message}</div>
        </div>
        <br />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={styles.name_input}
        />
      </div>
      <div className={styles.input_contianer}>
        <button type="submit" className={styles.submit_button} role="button">
          Get in touch.
        </button>
      </div>
    </form>
  );
};
