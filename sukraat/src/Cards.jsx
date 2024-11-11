import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import styles from './Cards.module.css';

const Cards = ({ title, author, description, comments, likes, imageUrl }) => {
      // Truncate description if it exceeds 110 characters
      const truncatedDescription = description.length > 110 ? description.slice(0, 110) + '...' : description;
    return (
        <div className={styles.card}>
            <img src={imageUrl} alt="مضمون کی تصویر" className={styles.cardImage} />
            <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{title}</h2>
                <p className={styles.cardAuthor}>{author}</p>
                <p className={styles.cardDescription}>{truncatedDescription}</p>
                <div className={styles.likesComments}>
                    <FontAwesomeIcon icon={faHeart} className={styles.icon} />
                    <span className={styles.likeCount}>{likes}</span>
                    <FontAwesomeIcon icon={faComment} className={styles.icon} />
                    <span className={styles.commentCount}>{comments}</span>
                </div>
            </div>
        </div>
    );
};

export default Cards;
