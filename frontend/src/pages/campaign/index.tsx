import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { SearchTwoTone } from '@mui/icons-material';
import { Grid, InputAdornment, MenuItem, TextField } from '@mui/material';

import serviceAPI from '@services/api';
import { mapCampainUIs } from '@mapdata/campain';
import { CampainUI } from '@models/campain';
import { SimpleValueKey } from '@models/meta';
import { ButtonStyle1 } from '@common/Button';

import TypographyTitle from '@common/Typography';
import CardCampaign from '@components/Card/cardCampaign';
export interface SearchStructure {
  page: number;
  no_item_per_page: number;
  categoryId: string;
  provinceId: string;
  search_text: string;
}

const CampainPage = () => {
  const [campainList, setCampainList] = useState<CampainUI[]>([]);
  const location = useLocation();
  const [provinceList, setProvinceList] = useState<SimpleValueKey[]>([]);
  const [categoryList, setCategoryList] = useState<SimpleValueKey[]>([]);
  const refInput = useRef<HTMLInputElement | null>(null);
  const statusList =
    localStorage.getItem('role') === '2' || localStorage.getItem('role') === '3'
      ? [
          { id: 'END', value: 'Kết thúc' },
          { id: 'START', value: 'Đang ủng hộ' },
          { id: 'DRAFT', value: 'Đợi duyệt' },
        ]
      : [
          { id: 'END', value: 'Kết thúc' },
          { id: 'START', value: 'Đang ủng hộ' },
        ];
  const [searchConfig, setSearchConfig] = useState<SearchStructure>({
    page: 1,
    no_item_per_page: 9,
    categoryId: '',
    provinceId: '',
    search_text: location?.state?.searchText || '',
  });

  const initData = async () => {
    const response = await serviceAPI.campain.getCampainPendingByPage(searchConfig);
    const dataMapUI = mapCampainUIs(response.data.result);
    if (searchConfig.page === 1) {
      setCampainList([...dataMapUI]);
    } else {
      setCampainList([...campainList, ...dataMapUI]);
    }
  };

  const handleGetMoreItem = () => {
    setSearchConfig({ ...searchConfig, page: searchConfig.page + 1 });
  };

  const handleChange = (e: any) => {
    setSearchConfig({ ...searchConfig, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    initData();
  }, [searchConfig]);

  useEffect(() => {
    const initProvince = async () => {
      const [provinceAPI, categoryAPI] = await Promise.all([
        serviceAPI.location.getAllProvince(),
        serviceAPI.campain.getCategory(),
      ]);
      setProvinceList(
        provinceAPI.data.result.map((item: any) => ({ id: item._id, value: item.name })),
      );
      setCategoryList(
        categoryAPI.data.result.map((item: any) => ({ id: item._id, value: item.name })),
      );
    };
    initProvince();
  }, []);

  return (
    <React.Fragment>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            textAlign: 'center',
          }}
        >
          <TypographyTitle>Chiến dịch nổi bật</TypographyTitle>
          <Grid
            container
            justifyContent={'center'}
            spacing={3}
            padding={'30px'}
          >
            <Grid
              item
              xs={2}
            >
              <TextField
                id='standard-select-currency'
                label='Tỉnh/TP'
                select
                fullWidth
                name='provinceId'
                onChange={handleChange}
                variant='standard'
              >
                {provinceList.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.id}
                  >
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              xs={2}
            >
              <TextField
                id='standard-select-currency'
                label='Danh mục'
                select
                name='categoryId'
                onChange={handleChange}
                fullWidth
                variant='standard'
              >
                {categoryList.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.id}
                  >
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              xs={2}
            >
              <TextField
                id='standard-select-currency'
                label='Trạng thái'
                select
                name='status'
                onChange={handleChange}
                fullWidth
                variant='standard'
              >
                {statusList.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.id}
                  >
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              xs={6}
            >
              <TextField
                id='standard-select-currency'
                label='Tìm kiếm theo tên ...'
                name='search_text'
                inputRef={refInput}
                onKeyUp={(e) => {
                  if (e.code === 'Enter') {
                    setSearchConfig({
                      ...searchConfig,
                      search_text: refInput.current?.value || '',
                      page: 1,
                    });
                  }
                }}
                fullWidth
                variant='standard'
                sx={{
                  width: '50%',
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <SearchTwoTone />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        {campainList.map((item: any) => (
          <Grid
            item
            xs={4}
          >
            <CardCampaign
              isOwner={false}
              data={item}
              isHover={true}
            />
          </Grid>
        ))}
        <Grid
          item
          xs={12}
          sx={{
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <ButtonStyle1
            onClick={handleGetMoreItem}
            sx={{
              marginBottom: '20px',
            }}
          >
            Xem thêm
          </ButtonStyle1>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default CampainPage;
