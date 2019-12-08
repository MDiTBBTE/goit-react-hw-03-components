import axios from "axios";

export const searchPhotos = (text, page) => {
  return axios.get(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${text}&page=${page}&per_page=12&key=13852929-0c902e3dcc1c85bade193ae44`
  );
};
