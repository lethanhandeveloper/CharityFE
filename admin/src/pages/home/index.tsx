import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-alice-carousel/lib/alice-carousel.css';

import data from './data';

import ShareSection from './components/ShareSection';
import FundSection from './components/FundSection';
import NewsSection from './components/NewsSection';

import AccountSection from './components/AccountSection';
import BannerSection from './components/BannerSection';
import FeatureSection from './components/FeatureSection';

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

      <div id='fb-root'></div>

      <div
        id='fb-customer-chat'
        className='fb-customerchat'
      ></div>
    </React.Fragment>
  );
};
export default HomePage;
