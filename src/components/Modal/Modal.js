import { useEffect } from 'react';
import PropTypes from 'prop-types';


import styles from '../Modal/Modal.module.css';

export const Modal = ({ largeImage, tags, onClose }) => {
    
    useEffect(() => {

        const handleKeyClose = event => {
        if (event.code === 'Escape') {
        onClose();
        }
    };
        window.addEventListener('keydown', handleKeyClose);

        return ()=> window.removeEventListener('keydown', handleKeyClose);
    }, [onClose]);


    
    
    return (
            <div className={styles.Overlay} onClick={onClose}>
            <div className={styles.Modal}>
                <img src={largeImage} alt={tags} />
            </div>
            </div>
        )
}






Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    largeImage: PropTypes.string.isRequired,
    tags: PropTypes.string,

}

