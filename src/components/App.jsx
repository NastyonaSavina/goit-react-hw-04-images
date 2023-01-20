import { useState,useEffect } from 'react';
import Notiflix from 'notiflix';


import { FetchImagesByQuery } from '../services/FetchImagesByQuery';

import { Searchbar } from '../components/Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loder } from './Loder/Loder';
import { Button } from './Button/Button';
import {Modal } from './Modal/Modal';


export const App = () => {
  const [images, setImages] = useState([]);
  const [largeImage, setLargeImage] = useState('');
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const imagesPerPage =12;


  useEffect(() => {

     if (!page) {
      return;
    }
    setIsLoading(true);
    const response = FetchImagesByQuery(query, page);
    response
      .then(({ data }) => {
        const totalPages = Math.ceil(data.totalHits / imagesPerPage);
          
        const imagesData = data.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );
        setImages(images => [...images, ...imagesData]);
          
        if (totalPages === 0 ) {
          Notiflix.Notify.info('Please, query what you want to see');
            
        }
        if (totalPages > page) {
          setShowLoadMoreBtn(true);
           
        } else { setShowLoadMoreBtn(false); }
      })
          
      .catch(() => { Notiflix.Notify.failure('Oops ...something went wrong') })
      .finally(() => {
        setIsLoading(false);
      });

    
  }, [page, query]);



      const handleUpdateQuery = value => {
        if (value.trim().toLowerCase()) {
          setQuery(value);
          setPage(1);
          setImages([]);
          setShowLoadMoreBtn(false);
        }
    }
  
    
    const handleLoadMore = () => {
        setPage(page + 1);
      }
  
    const openModal = index => {
      setShowModal(true);
      setLargeImage(images[index].largeImageURL);
      
    };
  
    const handleToggleModal = () => {
    setShowModal(!showModal);
    };

  return (
    <>
    <Searchbar onSubmit={handleUpdateQuery} />

    {images.length !== 0 && query!=='' && (
    <ImageGallery images={images} openModal={openModal} />
     )}

    {showModal && (
    <Modal onClose={handleToggleModal} largeImage={largeImage} />
    )}

    {isLoading && <Loder />}

    {showLoadMoreBtn && <Button onClick={handleLoadMore} />}
       
       
    </>     
    
  );
 


}









//     render() {

//       const { isLoading, images, showModal, largeImage } = this.state;
//       const { handleUpdateQuery, handleToggleModal, openModal, handleLoadMore } = this;
    
//       return (
//         <>
//           <Searchbar onSubmit={handleUpdateQuery} />

//           {images.length !== 0 && (
//           <ImageGallery images={images} openModal={openModal} />
//           )}

//           {showModal && (
//           <Modal onClose={handleToggleModal} largeImage={largeImage} />
//           )}

//           {isLoading && <Loder />}

//           {this.state.showLoadMoreBtn && <Button onClick={handleLoadMore} />}
       
       
//           <NotificationContainer />
//         </>
    
//       );
 
//     }
  
// }
