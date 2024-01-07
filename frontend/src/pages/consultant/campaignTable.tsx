import React, { useEffect, useRef, useState } from 'react';

import { SearchTwoTone } from '@mui/icons-material';
import { Grid, InputAdornment, MenuItem, TextField } from '@mui/material';

import serviceAPI from '@services/api';
import { mapCampainUIs } from '@mapdata/campain';
import { CampainUI } from '@models/campain';
import { SimpleValueKey } from '@models/meta';
import { ButtonStyle1 } from '@common/Button';

import TypographyTitle from '@common/Typography';

import EmptyOverlayGrid from '@components/Empty';

import CardCampaign from '@components/Card/cardCampaign';

export interface SearchStructure {
  id: string;
  categoryId: string;
  provinceId: string;
  search_text: string;
  page: number;
  no_item_per_page: number;
}
const CampaignTable = ({ id, isCurrent }: { id: string; isCurrent?: boolean }) => {
  const [campainList, setCampainList] = useState<CampainUI[]>([]);
  const [provinceList, setProvinceList] = useState<SimpleValueKey[]>([]);
  const [categoryList, setCategoryList] = useState<SimpleValueKey[]>([]);
  const refInput = useRef<HTMLInputElement | null>(null);

  const [searchConfig, setSearchConfig] = useState<SearchStructure>({
    id: id,
    categoryId: '',
    provinceId: '',
    search_text: '',
    page: 1,
    no_item_per_page: 5,
  });

  const initData = async () => {
    let dataMapUI;
    if (!isCurrent) {
      const response = await serviceAPI.campain.getCampainListByUser(searchConfig);
      dataMapUI = mapCampainUIs(response.data.result);
    } else {
      const response = await serviceAPI.campain.getCampainListByCurentUser(searchConfig);
      dataMapUI = mapCampainUIs(response.data.result);
    }

    setCampainList([...dataMapUI]);
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
      {campainList.length > 0 ? (
        <>
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
                    {[
                      { id: 'END', value: 'Kết thúc' },
                      { id: 'START', value: 'Đang ủng hộ' },
                      { id: 'DRAFT', value: 'Đợi duyệt' },
                    ].map((option) => (
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
                  data={item}
                  isOwner={true}
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
        </>
      ) : (
        <>
          <EmptyOverlayGrid />
        </>
      )}
    </React.Fragment>
  );
};
export default CampaignTable;
