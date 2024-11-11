import React, { useState, useEffect } from "react";

import AuthorAboutCard from "./AuthorAboutCard";
import styles from "./AuthorsSection.module.css";
import authorImg from "./assets/logo.jpg"; // Sample author image

const authorData = [
  {
    name: "جان ڈو",
    bio: "فلسفے اور ادب میں گہری بصیرت رکھنے والے مصنف، جنہوں نے کئی کتابیں لکھیں اور مشہور مضامین شائع کیے۔",
    articles: 45,
    followers: 320,
    imageUrl: authorImg,
    socialLinks: [
      {
        platform: "Platform 1",
        url: "#",
        icon: ["fab", "facebook"], // Example icon (replace with your actual icons)
      },
      // ... more social links
    ],
  },
  {
    name: "جین سمتھ",
    bio: "ایک متجسس دانشور اور مضمون نگار، جو ذہنی صحت اور فلسفہ پر لکھنے میں مہارت رکھتے ہیں۔",
    articles: 30,
    followers: 250,
    imageUrl: authorImg,
    socialLinks: [
      {
        platform: "Platform 1",
        url: "#",
        icon: ["fab", "facebook"], // Example icon (replace with your actual icons)
      },
      // ... more social links
    ],
  },
  {
    name: "جان ڈو",
    bio: "فلسفے اور ادب میں گہری بصیرت رکھنے والے مصنف، جنہوں نے کئی کتابیں لکھیں اور مشہور مضامین شائع کیے۔",
    articles: 45,
    followers: 320,
    imageUrl: authorImg,
    socialLinks: [
      {
        platform: "Platform 1",
        url: "#",
        icon: ["fab", "facebook"], // Example icon (replace with your actual icons)
      },
      // ... more social links
    ],
  },
  {
    name: "جین سمتھ",
    bio: "ایک متجسس دانشور اور مضمون نگار، جو ذہنی صحت اور فلسفہ پر لکھنے میں مہارت رکھتے ہیں۔",
    articles: 30,
    followers: 250,
    imageUrl: authorImg,
    socialLinks: [
      {
        platform: "Platform 1",
        url: "#",
        icon: ["fab", "facebook"], // Example icon (replace with your actual icons)
      },
      // ... more social links
    ],
  },
  {
    name: "جان ڈو",
    bio: "فلسفے اور ادب میں گہری بصیرت رکھنے والے مصنف، جنہوں نے کئی کتابیں لکھیں اور مشہور مضامین شائع کیے۔",
    articles: 45,
    followers: 320,
    imageUrl: authorImg,
    socialLinks: [
      {
        platform: "Platform 1",
        url: "#",
        icon: ["fab", "facebook"], // Example icon (replace with your actual icons)
      },
      // ... more social links
    ],
  },
  {
    name: "جین سمتھ",
    bio: "ایک متجسس دانشور اور مضمون نگار، جو ذہنی صحت اور فلسفہ پر لکھنے میں مہارت رکھتے ہیں۔",
    articles: 30,
    followers: 250,
    imageUrl: authorImg,
    socialLinks: [
      {
        platform: "Platform 1",
        url: "#",
        icon: ["fab", "facebook"], // Example icon (replace with your actual icons)
      },
      // ... more social links
    ],
  },
  // ... rest of your author data with socialLinks
];

const AuthorsSection = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerRow, setItemsPerRow] = useState(3);

  const handleNext = () => {
    if (startIndex + itemsPerRow < authorData.length) {
      setStartIndex(startIndex + itemsPerRow);
    }
  };

  const handlePrev = () => {
    if (startIndex - itemsPerRow >= 0) {
      setStartIndex(startIndex - itemsPerRow);
    }
  };

  const updateItemsPerRow = () => {
    const width = window.innerWidth;
    if (width <= 768) {
      setItemsPerRow(1);
    } else if (width <= 1000) {
      setItemsPerRow(2);
    } else {
      setItemsPerRow(3);
    }
  };

  useEffect(() => {
    updateItemsPerRow();
    window.addEventListener("resize", updateItemsPerRow);

    return () => {
      window.removeEventListener("resize", updateItemsPerRow);
    };
  }, []);

  const visibleAuthors = authorData.slice(startIndex, startIndex + itemsPerRow);

  return (
    <>
      <h2 className={styles.heading}>ممتاز مصنفین</h2>
      <div className={styles.container}>
        <div className={`container ${styles.carouselRow}`}>
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className={styles.carouselButton}
          >
            &lt;
          </button>
          <div className={styles.cardsContainer}>
            {visibleAuthors.map((author, index) => (
              <AuthorAboutCard key={index} author={author} />
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={startIndex + itemsPerRow >= authorData.length}
            className={styles.carouselButton}
          >
            &gt;
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthorsSection;