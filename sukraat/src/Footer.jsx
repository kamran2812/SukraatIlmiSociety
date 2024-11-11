import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"; // Correct import for the paper plane icon
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <>
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.about}>
          <h3>ہمارے بارے میں</h3>
          <p>
            ہم ایک ایسا پلیٹ فارم ہیں جو آپ کو تازہ ترین معلومات، اپ ڈیٹس اور
            دلچسپ مواد فراہم کرتا ہے۔ ہماری ٹیم کا مقصد آپ کو معلوماتی اور
            تفریحی مواد فراہم کرنا ہے۔
          </p>
        </div>
        <div className={styles.social}>
          <h3>رابطہ کریں</h3>
          <ul>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.newsletter}>
          <h3>نیوز لیٹر</h3>
          <p>
            تازہ ترین معلومات اور اپ ڈیٹس کے لیے ہمارے نیوز لیٹر کو سبسکرائب کریں۔
          </p>
          <form>
            <input type="email" placeholder="آپ کا ای میل" />
            <button type="submit">
              <FontAwesomeIcon icon={faPaperPlane} /> {/* Icon used here */}
            </button>
          </form>
        </div>
        <div className={styles.contact}>
          <h3>معلومات</h3>
          <p>ای میل: info@example.com</p>
          <p>فون: +1234567890</p>
        </div>
      </div>
      <div className={styles.quote}>
        <p>"فلسفہ وہ راستہ ہے جو ہمیں اندھیرے سے روشنی کی طرف لے جاتا ہے۔"</p>
        <p>- سقراط</p>
      </div>
    </footer>
      <div className={styles.copyright}>
        <p>&copy; کاپی رائٹ {new Date().getFullYear()}۔ سقراط علمی سوسائٹی</p>
      </div>
    </>
  );
};

export default Footer;
