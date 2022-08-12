import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

export const getImages = async (value, page) => {
  const searchParams = new URLSearchParams({
    q: value,
    page: page,
    key: '28311245-d5a87b2fb61808ea8cd4c4eb5',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });
  const response = await axios.get(`/?${searchParams}`);
  return response.data;
};
