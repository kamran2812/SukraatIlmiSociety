import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons'; 

import styles from "./AuthorAboutCard.module.css";

const AuthorAboutCard = ({ author }) => {
  const { name, bio, imageUrl, socialLinks } = author;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={name} className={styles.cardImage} />
      </div>
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{name}</h2>
        <p className={styles.cardBio}>{bio}</p>
        <div className={styles.socialLinks}>
          {socialLinks.map((link, index) => (
           <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
           <span>
                {"  "}پروفائل 
              </span>
         </a>
              
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorAboutCard;