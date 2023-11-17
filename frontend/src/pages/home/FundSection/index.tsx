import { ButtonStyle1 } from '@common/Button';
import TypographyTitle from '@common/Typography';
import { Grid, Typography } from '@mui/material';
import React from 'react';
interface FundCardProps {
  fundlist: any;
}
const FundSection = (props: FundCardProps) => {
  const { fundlist } = props;
  const itemXs = Math.ceil(12 / fundlist.length);
  return (
    <React.Fragment>
      <Grid
        container
        spacing={3}
        sx={{
          padding: '0 20px 30px 20px',
          backgroundColor: '#f9f3ee',
        }}
      >
        <Grid
          item
          xs={12}
          textAlign={'center'}
        >
          <TypographyTitle>Gây quỹ từ tài khoản Thiện nguyện</TypographyTitle>
        </Grid>

        {fundlist.map((item: any) => (
          <Grid
            item
            xs={itemXs}
            sx={{
              textAlign: 'center',
            }}
          >
            <Typography
              fontSize='20px'
              fontWeight='bold'
            >
              {item.title}
            </Typography>
            <span>{item.describe}</span>
          </Grid>
        ))}
        <Grid
          item
          sx={{
            display: 'flex',
            margin: '0 auto',
          }}
        >
          <ButtonStyle1>Đăng ký ngay</ButtonStyle1>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default FundSection;
