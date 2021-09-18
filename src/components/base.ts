import styled from '@emotion/styled';

export const FlexContainer = styled.div`
    display: flex;
`;

export const VerticalContainer = styled(FlexContainer)`
    flex-direction: column;
`;

export const HorizontalContainer = styled(FlexContainer)`
    flex-direction: row;
`;
