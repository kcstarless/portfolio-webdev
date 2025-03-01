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
  return (
    <div className={styles.dialog_box} open>
      <div className={styles.dialog_title}>
        <button
          className={styles.close_button}
          onClick={() => setIsOpen(false)}
        >
          X
        </button>
        <h1>CONTACT ME</h1>
      </div>

      <p>If you have any questions or just like to say 'Hi'!</p>
      <ContactForm />
    </div>
  );
};

const ContactForm = () => {
  return (
    <form>
      <div className={styles.input_contianer}>
        <div className={styles.name}>NAME</div>
        <input type="text" className={styles.name_input}></input>
      </div>
      <div className={styles.input_contianer}>
        <div className={styles.company}>Organisation</div>
        <input type="email" className={styles.name_input}></input>
      </div>
      <div className={styles.input_contianer}>
        <div className={styles.email_address}>EMAIL ADDRESS</div>
        <input type="email" className={styles.name_input}></input>
      </div>
      <div className={styles.input_contianer}>
        <div className={styles.email_address}>MESSAGE</div>
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
