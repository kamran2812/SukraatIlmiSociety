import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import styles from './RecentArticles.module.css';
import img from "./assets/cardimg.jpg";


const articleData = [
    {
        title: 'فلسفیانہ بصیرتیں',
        author: 'بذریعہ جان ڈو',
        description: 'گہرے فلسفیانہ خیالات دریافت کریں جو آپ کے نظریات کو چیلنج کریں اور آپ کی سمجھ کو وسیع کریں۔',
        comments: 30,
        likes: 120,
        imageUrl: img
    },
    {
        title: 'ذہن کا سفر',
        author: 'بذریعہ جین سمتھ',
        description: 'ذہن کے اسرار میں گم ہو جائیں اور فلسفیانہ سوچ کے تجربات کے ذریعے انسانیت کے بارے میں جانیں۔',
        comments: 25,
        likes: 95,
        imageUrl: img
    },
    {
        title: 'حقیقت اور سراب',
        author: 'بذریعہ ایلکس لی',
        description: 'حقیقت اور سراب کی نوعیت کو چیلنج کریں، اور ہماری ادراک کو بیان کرنے والے فلسفیانہ دلائل دریافت کریں۔',
        comments: 15,
        likes: 75,
        imageUrl: img
    },
    {
        title: ' بصتیں',
        author: 'بذری',
        description: 'گہرے فلسفیانہ خیالات دریافت کریں جو آپ نظریات کو چیلنج کریں اور آپ کی سمجھ کو وسیع کریں۔',
        comments: 10,
        likes: 190,
        imageUrl: img
    },
    {
        title: ' کا سفر',
        author: ' جین سمتھ',
        description: 'ذہن کے اسرار میں گم ہو جائیں اور فلسفیانہ سوچ کے تجربات کے ذریعے  کے بارے میں جانیں۔',
        comments: 65,
        likes: 195,
        imageUrl: img
    },
    {
        title: ' اور سراب',
        author: 'بذریعہ  لی',
        description: 'حقیقت اور سراب کی نوعیت کو چیلنج کریں، اور ہماری ادراک کو بیان کرنے والے  دلائل دریافت کریں۔',
        comments: 215,
        likes: 775,
        imageUrl: img
    },{
        title: 'فلسفیانہ بصیرتیں',
        author: 'بذریعہ جان ڈو',
        description: 'گہرے فلسفیانہ خیالات دریافت کریں جو آپ کے نظریات کو چیلنج کریں اور آپ کی سمجھ کو وسیع کریں۔',
        comments: 30,
        likes: 120,
        imageUrl: img
    },
    {
        title: 'ذہن کا سفر',
        author: 'بذریعہ جین سمتھ',
        description: 'ذہن کے اسرار میں گم ہو جائیں اور فلسفیانہ سوچ کے تجربات کے ذریعے انسانیت کے بارے میں جانیں۔',
        comments: 25,
        likes: 95,
        imageUrl: img
    },
    {
        title: 'حقیقت اور سراب',
        author: 'بذریعہ ایلکس لی',
        description: 'حقیقت اور سراب کی نوعیت کو چیلنج کریں، اور ہماری ادراک کو بیان کرنے والے فلسفیانہ دلائل دریافت کریں۔',
        comments: 15,
        likes: 75,
        imageUrl: img
    },
    // آپ یہاں مزید اشیاء شامل کر سکتے ہیں
];


const RecentArticles = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [itemsPerRow, setItemsPerRow] = useState(3); // Default to 3 for larger screens

    const handleNext = () => {
        if (startIndex + itemsPerRow < articleData.length) {
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
            setItemsPerRow(1); // 1 card for mobile
        } else if (width <= 1000) {
            setItemsPerRow(2); // 2 cards for screen size between 769px and 958px
        } else {
            setItemsPerRow(3); // 3 cards for larger screens
        }
    };

    useEffect(() => {
        updateItemsPerRow();
        window.addEventListener('resize', updateItemsPerRow);
        
        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('resize', updateItemsPerRow);
        };
    }, []);

    const visibleArticles = articleData.slice(startIndex, startIndex + itemsPerRow);


    return (
        <>
              <h2 className={styles.heading}>حالیہ مضامین</h2> {/* Urdu heading */}
        <div className={styles.container}>


            <div className={`container ${styles.carouselRow}`}>
                <button onClick={handlePrev} disabled={startIndex === 0} className={styles.carouselButton}>
                    &lt; {/* Left arrow */}
                </button>
                <div className={styles.cardsContainer}>
                    {visibleArticles.map((article, index) => (
                        <Cards
                            key={index}
                            title={article.title}
                            author={article.author}
                            description={article.description}
                            comments={article.comments}
                            likes={article.likes}
                            imageUrl={article.imageUrl}
                        />
                    ))}
                </div>
                <button onClick={handleNext} disabled={startIndex + itemsPerRow >= articleData.length} className={styles.carouselButton}>
                    &gt; {/* Right arrow */}
                </button>
            </div>
        </div>
        </>
    );
};

export default RecentArticles;
