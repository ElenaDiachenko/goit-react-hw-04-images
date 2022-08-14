import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

export const fetchImages = async (value, page) => {
  const searchParams = new URLSearchParams({
    key: '28311245-d5a87b2fb61808ea8cd4c4eb5',
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 100,
    page: page,
  });
  const res = await axios.get(`/api/?${searchParams}`);
  return res.data;
};
