const SiderLink = [
  {
    title: 'Chiến dịch',
    children: [
      {
        title: 'Đợi duyệt',
        link: '/campaign/pending',
      },
      {
        title: 'Đang kêu gọi',
        link: '/campaign/start',
      },
      {
        title: 'Đã kết thúc',
        link: '/campaign/finish',
      },
    ],
  },
  {
    title: 'Yêu cầu đăng ký',
    children: [
      {
        title: 'Đăng ký',
        link: '/request',
      },
      {
        title: 'Đánh giá',
        link: '/feedback',
      },
    ],
  },
  {
    title: 'Quản lý người dùng',
    children: [
      {
        title: 'Danh sách',
        link: '/user/active',
      },
    ],
  },
  {
    title: 'Cài đặt',
    children: [
      {
        title: 'Banner',
        link: '/banner',
      },
      {
        title: 'Thống kê',
        link: '/statistical',
      },
      { title: 'Bản đồ', link: '/map' },
    ],
  },
  {
    title: 'Địa chỉ',
    children: [
      {
        title: 'Tỉnh',
        link: '/province',
      },
      {
        title: 'Huyện',
        link: '/district',
      },
      {
        title: 'Xã',
        link: 'commune',
      },
    ],
  },
];
export default SiderLink;
