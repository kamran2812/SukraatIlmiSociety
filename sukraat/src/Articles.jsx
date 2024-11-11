import React, { useState, useEffect, useRef  } from 'react';
import Cards from './Cards'; // Import your existing Cards component
import styles from './Articles.module.css'; // CSS module for styling
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
        title: 'بصتیں',
        author: 'بذریعہ مریم',
        description: 'گہرے فلسفیانہ خیالات دریافت کریں جو آپ نظریات کو چیلنج کریں اور آپ کی سمجھ کو وسیع کریں۔',
        comments: 10,
        likes: 190,
        imageUrl: img
    },
    {
        title: 'ذہن کی گہرائی',
        author: 'بذریعہ جین سمتھ',
        description: 'ذہن کے اسرار میں گم ہو جائیں اور فلسفیانہ سوچ کے تجربات کے ذریعے انسانیت کے بارے میں جانیں۔',
        comments: 65,
        likes: 195,
        imageUrl: img
    },
    {
        title: 'سراب کی حقیقت',
        author: 'بذریعہ لی',
        description: 'حقیقت اور سراب کی نوعیت کو چیلنج کریں، اور ہماری ادراک کو بیان کرنے والے فلسفیانہ دلائل دریافت کریں۔',
        comments: 215,
        likes: 775,
        imageUrl: img
    },
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
        title: 'بصتیں',
        author: 'بذریعہ مریم',
        description: 'گہرے فلسفیانہ خیالات دریافت کریں جو آپ نظریات کو چیلنج کریں اور آپ کی سمجھ کو وسیع کریں۔',
        comments: 10,
        likes: 190,
        imageUrl: img
    },
    {
        title: 'ذہن کی گہرائی',
        author: 'بذریعہ جین سمتھ',
        description: 'ذہن کے اسرار میں گم ہو جائیں اور فلسفیانہ سوچ کے تجربات کے ذریعے انسانیت کے بارے میں جانیں۔',
        comments: 65,
        likes: 195,
        imageUrl: img
    },
    {
        title: 'سراب کی حقیقت',
        author: 'بذریعہ لی',
        description: 'حقیقت اور سراب کی نوعیت کو چیلنج کریں، اور ہماری ادراک کو بیان کرنے والے فلسفیانہ دلائل دریافت کریں۔',
        comments: 215,
        likes: 775,
        imageUrl: img
    },
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
        title: 'بصتیں',
        author: 'بذریعہ مریم',
        description: 'گہرے فلسفیانہ خیالات دریافت کریں جو آپ نظریات کو چیلنج کریں اور آپ کی سمجھ کو وسیع کریں۔',
        comments: 10,
        likes: 190,
        imageUrl: img
    },
    {
        title: 'ذہن کی گہرائی',
        author: 'بذریعہ جین سمتھ',
        description: 'ذہن کے اسرار میں گم ہو جائیں اور فلسفیانہ سوچ کے تجربات کے ذریعے انسانیت کے بارے میں جانیں۔',
        comments: 65,
        likes: 195,
        imageUrl: img
    },
    {
        title: 'سراب کی حقیقت',
        author: 'بذریعہ لی',
        description: 'حقیقت اور سراب کی نوعیت کو چیلنج کریں، اور ہماری ادراک کو بیان کرنے والے فلسفیانہ دلائل دریافت کریں۔',
        comments: 215,
        likes: 775,
        imageUrl: img
    },
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
        title: 'بصتیں',
        author: 'بذریعہ مریم',
        description: 'گہرے فلسفیانہ خیالات دریافت کریں جو آپ نظریات کو چیلنج کریں اور آپ کی سمجھ کو وسیع کریں۔',
        comments: 10,
        likes: 190,
        imageUrl: img
    },
    {
        title: 'ذہن کی گہرائی',
        author: 'بذریعہ جین سمتھ',
        description: 'ذہن کے اسرار میں گم ہو جائیں اور فلسفیانہ سوچ کے تجربات کے ذریعے انسانیت کے بارے میں جانیں۔',
        comments: 65,
        likes: 195,
        imageUrl: img
    },
    {
        title: 'سراب کی حقیقت',
        author: 'بذریعہ لی',
        description: 'حقیقت اور سراب کی نوعیت کو چیلنج کریں، اور ہماری ادراک کو بیان کرنے والے فلسفیانہ دلائل دریافت کریں۔',
        comments: 215,
        likes: 775,
        imageUrl: img
    },
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
        title: 'بصتیں',
        author: 'بذریعہ مریم',
        description: 'گہرے فلسفیانہ خیالات دریافت کریں جو آپ نظریات کو چیلنج کریں اور آپ کی سمجھ کو وسیع کریں۔',
        comments: 10,
        likes: 190,
        imageUrl: img
    },
    {
        title: 'ذہن کی گہرائی',
        author: 'بذریعہ جین سمتھ',
        description: 'ذہن کے اسرار میں گم ہو جائیں اور فلسفیانہ سوچ کے تجربات کے ذریعے انسانیت کے بارے میں جانیں۔',
        comments: 65,
        likes: 195,
        imageUrl: img
    },
    {
        title: 'سراب کی حقیقت',
        author: 'بذریعہ لی',
        description: 'حقیقت اور سراب کی نوعیت کو چیلنج کریں، اور ہماری ادراک کو بیان کرنے والے فلسفیانہ دلائل دریافت کریں۔',
        comments: 215,
        likes: 775,
        imageUrl: img
    },
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
        title: 'بصتیں',
        author: 'بذریعہ مریم',
        description: 'گہرے فلسفیانہ خیالات دریافت کریں جو آپ نظریات کو چیلنج کریں اور آپ کی سمجھ کو وسیع کریں۔',
        comments: 10,
        likes: 190,
        imageUrl: img
    },
    {
        title: 'ذہن کی گہرائی',
        author: 'بذریعہ جین سمتھ',
        description: 'ذہن کے اسرار میں گم ہو جائیں اور فلسفیانہ سوچ کے تجربات کے ذریعے انسانیت کے بارے میں جانیں۔',
        comments: 65,
        likes: 195,
        imageUrl: img
    },
    {
        title: 'سراب کی حقیقت',
        author: 'بذریعہ لی',
        description: 'حقیقت اور سراب کی نوعیت کو چیلنج کریں، اور ہماری ادراک کو بیان کرنے والے فلسفیانہ دلائل دریافت کریں۔',
        comments: 215,
        likes: 775,
        imageUrl: img
    },
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
        title: 'بصتیں',
        author: 'بذریعہ مریم',
        description: 'گہرے فلسفیانہ خیالات دریافت کریں جو آپ نظریات کو چیلنج کریں اور آپ کی سمجھ کو وسیع کریں۔',
        comments: 10,
        likes: 190,
        imageUrl: img
    },
    {
        title: 'ذہن کی گہرائی',
        author: 'بذریعہ جین سمتھ',
        description: 'ذہن کے اسرار میں گم ہو جائیں اور فلسفیانہ سوچ کے تجربات کے ذریعے انسانیت کے بارے میں جانیں۔',
        comments: 65,
        likes: 195,
        imageUrl: img
    },
    {
        title: 'سراب کی حقیقت',
        author: 'بذریعہ لی',
        description: 'حقیقت اور سراب کی نوعیت کو چیلنج کریں، اور ہماری ادراک کو بیان کرنے والے فلسفیانہ دلائل دریافت کریں۔',
        comments: 215,
        likes: 775,
        imageUrl: img
    },
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
        title: 'بصتیں',
        author: 'بذریعہ مریم',
        description: 'گہرے فلسفیانہ خیالات دریافت کریں جو آپ نظریات کو چیلنج کریں اور آپ کی سمجھ کو وسیع کریں۔',
        comments: 10,
        likes: 190,
        imageUrl: img
    },
    {
        title: 'ذہن کی گہرائی',
        author: 'بذریعہ جین سمتھ',
        description: 'ذہن کے اسرار میں گم ہو جائیں اور فلسفیانہ سوچ کے تجربات کے ذریعے انسانیت کے بارے میں جانیں۔',
        comments: 65,
        likes: 195,
        imageUrl: img
    },
    {
        title: 'سراب کی حقیقت',
        author: 'بذریعہ لی',
        description: 'حقیقت اور سراب کی نوعیت کو چیلنج کریں، اور ہماری ادراک کو بیان کرنے والے فلسفیانہ دلائل دریافت کریں۔',
        comments: 215,
        likes: 775,
        imageUrl: img
    },
    // You can add more items here
];

const Articles = () => {
    const [currentCards, setCurrentCards] = useState(articleData.slice(0, 6));
    const [hasMore, setHasMore] = useState(articleData.length > 6);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [loading, setLoading] = useState(false); // loading state

    const topRef = useRef(null);

    const handleMore = () => {
        // Set loading state to true
        setLoading(true);

        setTimeout(() => {
            // Load more cards after 1 second
            const newCards = articleData.slice(currentCards.length, currentCards.length + 6);
            setCurrentCards(prevCards => [...prevCards, ...newCards]);

            // Check if there are no more cards to load
            if (currentCards.length + newCards.length >= articleData.length) {
                setHasMore(false);
            }

            // Show "Scroll to Top" button and turn off loading state
            setShowScrollToTop(true);
            setLoading(false);
        }, 1000); // Delay for 1 second
    };

    const scrollToTop = () => {
        topRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <div ref={topRef}></div>
            <h2 className={styles.heading}>مضمون</h2>
            <div className={`container ${styles.container}`}>
                <div className={styles.cardsContainer}>
                    {currentCards.map((article, index) => (
                        <div className={styles.card} key={index}>
                            <Cards
                                title={article.title}
                                author={article.author}
                                description={article.description}
                                comments={article.comments}
                                likes={article.likes}
                                imageUrl={article.imageUrl}
                            />
                        </div>
                    ))}
                </div>

                {/* Show shimmer effect when loading */}
                {loading && <div className={styles.shimmer}></div>}

                <div className={styles.btn}>
                    <button onClick={handleMore} className={styles.moreButton} disabled={!hasMore || loading}>
                        &#8595;
                    </button>
                    {showScrollToTop && (
                        <button onClick={scrollToTop} className={styles.scrollToTopButton}>
                            ↑
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Articles;

