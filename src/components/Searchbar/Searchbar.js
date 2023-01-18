import PropTypes from 'prop-types';


import styles from '../Searchbar/Searchbar.module.css';
import { useState } from 'react';



export const Searchbar = ({ onSubmit }) => {
    const [value, setValue] = useState('');

    const handleChange = event => {
        const { value } = event.target;
        setValue(value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit(value);
    };

    
    return (
        <>
            <header className = {styles.searchbar} >
                <form className={styles.searchform}  onSubmit={handleSubmit}>
                    <button type="submit" className={styles.SearchFormBtn}>
                    <span className={styles.SearchFormBtnLabel}>Search</span>
                    </button>

                    <input
                    className={styles.SearchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={value}
                    onChange={handleChange}
                    />
                </form>

            </header>         
        </>
       
    )
}



Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,

}