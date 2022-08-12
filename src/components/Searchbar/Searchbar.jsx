// import { Component } from 'react';
import { Formik } from 'formik';
import { HiSearch } from 'react-icons/hi';
import { HeaderContainer, SearchForm, Input, Button } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    // console.log(values);
    onSubmit(values);
    resetForm();
  };

  return (
    <HeaderContainer>
      <Formik initialValues={{ value: '' }} onSubmit={handleSubmit}>
        <SearchForm>
          <Button type="submit">
            <HiSearch size={25} />
          </Button>

          <Input
            name="value"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </HeaderContainer>
  );
};
