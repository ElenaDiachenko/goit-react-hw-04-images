import styled from 'styled-components';

export const ImageContainer = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: ${p => p.theme.space[5]}px;
  margin-top: ${p => p.theme.space[1]}px;
  margin-bottom: ${p => p.theme.space[1]}px;
  padding: ${p => p.theme.space[1]}px;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

export const ItemGallery = styled.li`
  border-radius: ${p => p.theme.borders.none};
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;
