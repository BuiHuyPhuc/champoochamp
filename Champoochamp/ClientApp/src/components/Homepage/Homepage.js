import React, { Component, Fragment } from 'react';

import { topProductsName } from '../../shared/constants';
import { TopProducts, Section, PageContainer } from '../elements';
import Banner from './components/Banner';

class Homepage extends Component {
  render() {
    return (
      <Fragment>
        <Banner></Banner>
        <PageContainer>
          <Section>
            <TopProducts sectionTitle={topProductsName.discountProducts} />
          </Section>
          <Section>
            <TopProducts sectionTitle={topProductsName.newProducts} />
          </Section>
        </PageContainer>
      </Fragment>
    );
  }
}

export default Homepage;
