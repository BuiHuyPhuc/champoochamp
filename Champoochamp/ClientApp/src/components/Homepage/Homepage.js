import React, { Component } from 'react';

import { topProductsName } from '../../shared/constants';
import { TopProducts, Section, PageContainer } from '../elements';
import Banner from './components/Banner';

class Homepage extends Component {
  render() {
    return (
      <div>
        {/*<Banner></Banner>*/}
        <PageContainer>
          <Section>
            <TopProducts sectionTitle={topProductsName.discountProducts} />
          </Section>
          <Section>
            <TopProducts sectionTitle={topProductsName.newProducts} />
          </Section>
        </PageContainer>
      </div>
    );
  }
}

export default Homepage;
