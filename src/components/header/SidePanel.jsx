import { menuTextAnimation } from "../../helpers/textAnimationHelper";
import { useState } from "react";
import styles from "./style.module.scss";
import { style } from "framer-motion/client";
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
    }, 1000);
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
      <ContactForm />
    </dialog>
  );
};

const ContactForm = () => {
  return (
    <form>
      <div className={styles.input_contianer}>
        <div className={styles.name}>Name</div>
        <input type="text" className={styles.name_input}></input>
      </div>
      <div className={styles.input_contianer}>
        <div className={styles.company}>Organisation</div>
        <input type="email" className={styles.name_input}></input>
      </div>
      <div className={styles.input_contianer}>
        <div className={styles.email_address}>Email address</div>
        <input type="email" className={styles.name_input}></input>
      </div>
      <div className={styles.input_contianer}>
        <div className={styles.email_address}>Message</div>
        <br />
        <textarea className={styles.name_input}></textarea>
      </div>
      <div className={styles.input_contianer}>
        <button type="submit" className={styles.submit_button} role="button">
          Get in touch.
        </button>
      </div>
    </form>
  );
};
