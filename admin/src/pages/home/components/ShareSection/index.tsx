import TypographyTitle from '@common/Typography';
import { Grid, Typography } from '@mui/material';
import React from 'react';
interface ShareCardProps {
  ShareCard: any;
}
const ShareSection = (props: ShareCardProps) => {
  const renderCardShare = (share: any) => {
    return (
      <React.Fragment>
        <div
          style={{
            textAlign: 'left',
            position: 'relative',
            background: '#fff',
            padding: '20px',
            marginTop: '30px',
          }}
        >
          <img
            src={share.imageUrl}
            style={{
              border: '3px solid #ff9431',
              padding: '3px',
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              position: 'absolute',
              top: '-64px',
              left: 0,
            }}
          />
          <Typography
            fontWeight={'bold'}
            marginTop={'30px'}
          >
            {share.fullName}
          </Typography>
          <Typography color={'#f54a00'}>{share.title}</Typography>
          <Typography lineHeight={'26px'}>{share.describe}</Typography>
        </div>
        <div
          style={{
            width: '100%',
            height: '57px',
            position: 'relative',
            background: '#fff',
            clipPath: 'polygon(0 0,110% 0,98% 40%,0 100%)',
            borderBottomLeftRadius: '20px',
          }}
        ></div>
      </React.Fragment>
    );
  };
  return (
    <React.Fragment>
      <Grid
        container
        height={'530px'}
        spacing={3}
        sx={{
          padding: '0 20px 0 20px',
          backgroundImage:
            'linear-gradient(180deg,rgba(255,221,193,0),rgba(255,221,193,.53) 46.8%,rgba(255,221,193,0))',
        }}
      >
        <Grid
          item
          xs={12}
          textAlign={'center'}
        >
          <TypographyTitle>Chia sẻ từ người dùng Thiện nguyện</TypographyTitle>
        </Grid>

        {props.ShareCard?.map((item: any) => (
          <Grid
            item
            xs={4}
          >
            {renderCardShare(item)}
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};
export default ShareSection;
