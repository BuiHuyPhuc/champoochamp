import React, { Component } from 'react';

import { topProductsName } from '../../shared/constants';
import { TopProducts, Section, Container } from '../elements';
import Banner from './components/Banner';

class Homepage extends Component {
  render() {
    return (
      <Container>
        <Section>
          <Banner></Banner>
        </Section>
        <Section>
          <TopProducts sectionTitle={topProductsName.discountProducts} />
        </Section>
        <Section>
          <TopProducts sectionTitle={topProductsName.newProducts}></TopProducts>
        </Section>
      </Container>
    );
  }
}

export default Homepage;
