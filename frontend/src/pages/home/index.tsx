import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-alice-carousel/lib/alice-carousel.css';

import data from './data';

import ShareSection from './components/ShareSection';
import FundSection from './components/FundSection';
import NewsSection from './components/NewsSection';

import AccountSection from './components/AccountSection';
import BannerSection from './components/BannerSection';
import FeatureSection from './components/FeatureSection';
import serviceAPI from '@services/api';
import { BannerUI } from '@models/banner';
import { mapBannerUIs } from '@mapdata/banner';
import { UserUI } from '@models/user';
import { CampainUI } from '@models/campain';
import { mapUsersUI } from '@mapdata/user';
import { mapCampainUIs } from '@mapdata/campain';
import CarouselSection from './components/CarouselSection';

const HomePage = () => {
  const [banners, setBanners] = useState<BannerUI[]>([]);
  const [users, setUsers] = useState<UserUI[]>([]);
  const [campagins, setCampaigns] = useState<CampainUI[]>([]);
  useEffect(() => {
    const initData = async () => {
      const banner = await serviceAPI.banner.getBannerList();
      setBanners(mapBannerUIs(banner));
      const user = await serviceAPI.auth.getListForHome();
      setUsers(mapUsersUI(user.data.result));
      const campaign = await serviceAPI.campain.getListForHome();
      setCampaigns(mapCampainUIs(campaign.data.result));
    };
    initData();
  }, []);

  return (
    <React.Fragment>
      <CarouselSection list={banners} />

      <FeatureSection list={campagins} />

      <BannerSection />

      <NewsSection newsList={data.CardNews} />

      <FundSection fundlist={data.CardFund} />

      <AccountSection list={users} />

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
