import {
  Box,
  CardMedia,
  Typography,
  Card,
  Divider,
  Grid,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemButton,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

import React, { useEffect } from 'react';
import serviceAPI from '@services/api';
import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';
import { NavLink } from 'react-router-dom';
import { getCurrentDate } from '@pages/home/components/AccountSection';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
const RequestPage = () => {
  const [list, setList] = React.useState<any>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initData = async () => {
      try {
        const response = await serviceAPI.auth.getRequestByUser();
        setList(response.data.result);
      } catch (err) {
        dispatch(setInfoAlert({ open: true, type: 'error', title: 'Thử lại sau!' }));
      }
    };
    initData();
  }, []);
  return (
    <React.Fragment>
      <Card>
        <CardMedia
          sx={{ minHeight: 280 }}
          image='/static/images/placeholders/covers/6.jpg'
          title='Card Cover'
        />
      </Card>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={12}
        >
          {list.length > 0 ? (
            <Card>
              <Box
                p={3}
                display='flex'
                alignItems='center'
                justifyContent='space-between'
              >
                <Box>
                  <Typography
                    variant='h4'
                    gutterBottom
                  >
                    Danh sách yêu cầu đăng ký
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <CardContent sx={{ p: 4 }}>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  {list?.map((item: any) => (
                    <ListItem
                      button
                      to={`/register/account/fund/${item.id}`}
                      component={NavLink}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        style={{
                          fontWeight: 'bold',

                          color: 'black',
                        }}
                        primary={`${item?.commitInfoVerification?.goalName} - ${item?.commitInfoVerification?.targetAmount}`}
                        secondary={`${getCurrentDate(
                          new Date(item?.commitInfoVerification?.startDate),
                        )} - ${getCurrentDate(new Date(item?.commitInfoVerification?.endDate))}`}
                      />
                      <ListItemButton>
                        <Grid
                          container
                          style={{
                            color: 'black',
                          }}
                        >
                          <Grid
                            item
                            xs={6}
                          >
                            {item?.status === 1 ? 'Chưa duyệt' : 'Đã duyệt'}
                          </Grid>
                          <Grid
                            item
                            xs={6}
                          >
                            {item?.type === 1 ? 'Cá nhân' : 'Tổ chức'}
                          </Grid>
                        </Grid>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          ) : (
            <Box
              sx={{
                height: '35vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ErrorOutlineIcon
                sx={{
                  width: '60px',
                  height: '60px',
                }}
              />
              <Typography fontSize={'25px'}>Bạn chưa có đơn đăng ký nào!</Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default RequestPage;
