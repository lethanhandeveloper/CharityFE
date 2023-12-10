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
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

import React, { useEffect } from 'react';
import serviceAPI from '@services/api';
import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';

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
                  Thông tin chi tiết
                </Typography>
              </Box>
            </Box>
            <Divider />
            <CardContent sx={{ p: 4 }}>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {list?.map((item: any) => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item?.name}
                      secondary='Jan 9, 2014'
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default RequestPage;
