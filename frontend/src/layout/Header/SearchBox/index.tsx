import { forwardRef, Ref, useState, ReactElement, ChangeEvent, useEffect } from 'react';
import {
  Avatar,
  Link,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  lighten,
  List,
  ListItem,
  ListItemAvatar,
  TextField,
  Theme,
  Tooltip,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Hidden,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';
import parse from 'html-react-parser';
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import { useDebounce } from 'use-debounce';
import serviceAPI from '@services/api';
import { CampainUI } from '@models/campain';
import { mapCampainUIs } from '@mapdata/campain';
import { useNavigate } from 'react-router';

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>,
) {
  return (
    <Slide
      direction='down'
      ref={ref}
      {...props}
    />
  );
});

const DialogWrapper = styled(Dialog)(
  () => `
    .MuiDialog-container {
        height: auto;
    }
    
    .MuiDialog-paperScrollPaper {
        max-height: calc(100vh - 64px)
    }
`,
);

export const SearchInputWrapper = styled(TextField)(
  ({ theme }) => `
    background: ${theme.colors.alpha.white[100]};

    .MuiInputBase-input {
        font-size: ${theme.typography.pxToRem(17)};
    }
`,
);

const DialogTitleWrapper = styled(DialogTitle)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(3)}
`,
);

function HeaderSearch() {
  const [openSearchResults, setOpenSearchResults] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchText] = useDebounce<string>(searchValue, 4000);
  const [campaigns, setCampainList] = useState<CampainUI[]>([]);
  const navigate = useNavigate();
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);

    if (event.target.value) {
      if (!openSearchResults) {
        setOpenSearchResults(true);
      }
    } else {
      setOpenSearchResults(false);
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const initData = async () => {
      const data = await serviceAPI.campain.getCampainPendingByPage({
        page: 1,
        no_item_per_page: 3,
        search_text: searchText,
      });
      setCampainList(mapCampainUIs(data.data.result));
    };
    if (searchText) initData();
  }, [searchText]);
  return (
    <>
      <Tooltip
        arrow
        title='Search'
      >
        <IconButton
          color='primary'
          onClick={handleClickOpen}
        >
          <SearchTwoToneIcon />
        </IconButton>
      </Tooltip>

      <DialogWrapper
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth='md'
        fullWidth
        scroll='paper'
        onClose={handleClose}
      >
        <DialogTitleWrapper>
          <SearchInputWrapper
            value={searchValue}
            autoFocus={true}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchTwoToneIcon />
                </InputAdornment>
              ),
            }}
            placeholder='Search terms here...'
            fullWidth
            label='Search'
          />
        </DialogTitleWrapper>
        <Divider />

        {openSearchResults && (
          <DialogContent>
            <Box
              sx={{ pt: 0, pb: 1 }}
              display='flex'
              justifyContent='space-between'
            >
              <Typography
                variant='body2'
                component='span'
              >
                Kết quả tìm kiếm{' '}
                <Typography
                  sx={{ fontWeight: 'bold' }}
                  variant='body1'
                  component='span'
                >
                  {searchValue}
                </Typography>
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <List disablePadding>
              {campaigns.map((item) => (
                <ListItem
                  button
                  onClick={() => {
                    navigate(`/campaign/donate/${item.id}`);
                    setOpen(false);
                  }}
                >
                  <Hidden smDown>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          background: (theme: Theme) => theme.palette.secondary.main,
                        }}
                      >
                        <FindInPageTwoToneIcon />
                      </Avatar>
                    </ListItemAvatar>
                  </Hidden>
                  <Box flex='1'>
                    <Box
                      display='flex'
                      justifyContent='space-between'
                    >
                      <Link
                        href='#'
                        underline='hover'
                        sx={{ fontWeight: 'bold' }}
                        variant='body2'
                      >
                        {item.title}
                      </Link>
                    </Box>
                    <Typography
                      component='span'
                      variant='body2'
                      sx={{
                        color: (theme: Theme) => lighten(theme.palette.secondary.main, 0.5),
                      }}
                    >
                      {parse(item.description)}
                    </Typography>
                  </Box>
                  <ChevronRightTwoToneIcon />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ mt: 1, mb: 2 }} />
            <Box sx={{ textAlign: 'center' }}>
              <Button
                color='primary'
                onClick={() => {
                  navigate('/campaign', { state: { searchText: searchText } });
                  setOpen(false);
                }}
              >
                Xem tất cả kết quả
              </Button>
            </Box>
          </DialogContent>
        )}
      </DialogWrapper>
    </>
  );
}

export default HeaderSearch;
