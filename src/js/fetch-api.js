import axios from 'axios';
import { renderTop, renderCategories, renderCategory } from './rendering-books';

const BASE_URL = 'https://books-backend.p.goit.global';

let savedFetch = JSON.parse(sessionStorage.getItem('savedfetch')) || '';
export const fetchGeneral = async booksPerRow => {
  if (!savedFetch) {
    const endpoint = '/books/top-books/';
    const fetchUrl = BASE_URL + endpoint;
    try {
      const response = await axios.get(fetchUrl);
      sessionStorage.setItem('savedfetch', JSON.stringify(response.data));
      savedFetch = response.data;
      return renderTop(response.data, booksPerRow);
    } catch (error) {
      console.log(error);
    }
  } else {
    return renderTop(savedFetch, booksPerRow);
  }
};

let savedCatsFetch =
  JSON.parse(sessionStorage.getItem('savedcategoriesfetch')) || '';
export const fetchCategories = async () => {
  const endpoint = '/books/category-list/';
  const fetchUrl = BASE_URL + endpoint;
  if (!savedCatsFetch) {
    try {
      const response = await axios.get(fetchUrl);
      sessionStorage.setItem(
        'savedcategoriesfetch',
        JSON.stringify(response.data)
      );
      savedCatsFetch = response.data;
      return renderCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  } else {
    return renderCategories(savedCatsFetch);
  }
};

export const fetchCategory = async categoryName => {
  const endpoint = '/books/category/';
  const fetchUrl = BASE_URL + endpoint;
  const params = {
    category: categoryName,
  };
  try {
    const response = await axios.get(fetchUrl, { params });
    return renderCategory(response.data, categoryName);
  } catch (error) {
    console.log(error);
  }
};

export const fetchBookById = async id => {
  const endpoint = `/books/${id}`;
  const fetchUrl = BASE_URL + endpoint;
  try {
    const response = await axios.get(fetchUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
