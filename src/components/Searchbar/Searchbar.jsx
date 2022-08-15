import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { HiSearch } from 'react-icons/hi';
import { HeaderContainer, SearchForm, Input, Button } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = async (values, actions) => {
    await onSubmit(values);
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <HeaderContainer>
      <Formik initialValues={{ value: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => {
          // console.log(isSubmitting);
          return (
            <SearchForm>
              <Button type="submit" disabled={isSubmitting}>
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
          );
        }}
      </Formik>
    </HeaderContainer>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
