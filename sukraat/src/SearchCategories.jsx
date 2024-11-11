import React, { useState, useEffect } from 'react';
import styles from './SearchCategories.module.css';

const SearchCategories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');

  const allSuggestions = [
    { text: 'Technology', category: 'technology', date: '2024-10-29' },
    { text: 'Health', category: 'health', date: '2024-10-28' },
    { text: 'Lifestyle', category: 'lifestyle', date: '2024-10-27' },
    { text: 'Travel', category: 'travel', date: '2024-10-29' },
    // Add more suggestions if needed
  ];

  useEffect(() => {
    const filtered = allSuggestions.filter(suggestion => {
      const matchesSearchTerm = suggestion.text.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || suggestion.category === selectedCategory;
      const matchesDate = !selectedDate || suggestion.date === selectedDate;
      return matchesSearchTerm && matchesCategory && matchesDate;
    });
    setFilteredSuggestions(filtered);
  }, [searchTerm, selectedCategory, selectedDate]);

  return (
    
    <div className="container mt-3">
    <section className={styles.searchCategories}>
      {/* <h2 className={styles.sectionHeading}>سرچ کریں</h2> */}
      <div className={`input-group ${styles.inputGroup}`}>
          <input
            type="text"
            className={`form-control ${styles.input}`}
            aria-label=" سرچ کریں..."
            placeholder=" سرچ کریں..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          
           
      
          <select
            className={`form-select ${styles.dropdown}`}
            aria-label="Category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">کیٹیگریز</option>
            <option value="technology">ٹیکنالوجی</option>
            <option value="health">صحت</option>
            <option value="lifestyle">طرز زندگی</option>
            <option value="travel">سفر</option>
            <option value="logic">منطق</option>
            <option value="metaphysics">مابعد الطبیعیات</option>
            <option value="epistemology">علمیات</option>
            </select>
           

          <input
            type="date"
            className={`form-control ${styles.dateFilter}`}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />

          <button type="button" className={`btn ${styles.searchButton}`} aria-label="سرچ کریں">
          سرچ کریں
          </button>

          {filteredSuggestions.length > 0 && (
            <ul className={`dropdown-menu dropdown-menu-end ${styles.dropdownMenu}`}>
              {filteredSuggestions.map((suggestion, index) => (
                <li key={index}>
                  <a className={`dropdown-item ${styles.dropdownItem}`} href="#">
                    {suggestion.text}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchCategories;
