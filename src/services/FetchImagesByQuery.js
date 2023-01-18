import axios from 'axios';

export function FetchImagesByQuery(searchQuery, page) {
    
   const response = axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=30575262-802bd827513eacead1493e6f3&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response;
}


