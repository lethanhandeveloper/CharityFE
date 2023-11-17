import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-alice-carousel/lib/alice-carousel.css';

import data from './data';

import ShareSection from './ShareSection';
import FundSection from './FundSection';
import NewsSection from './NewsSection';

import AccountSection from './AccountSection';
import BannerSection from './BannerSection';
import FeatureSection from './FeatureSection';

const HomePage = () => {
  return (
    <React.Fragment>
      <div>
        <img
          style={{ width: '100%', height: '100%' }}
          src={data.CardBanner[0]?.imageUrl || ''}
        />
      </div>

      <FeatureSection campaignList={data.CardCampaign} />

      <BannerSection />

      <NewsSection newsList={data.CardNews} />

      <FundSection fundlist={data.CardFund} />

      <AccountSection CardAccount={data.CardAccount} />

      <ShareSection ShareCard={data.CardShare} />
    </React.Fragment>
  );
};
export default HomePage;
