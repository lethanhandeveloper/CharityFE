import CampaignIcon from '@mui/icons-material/Campaign';
import PendingIcon from '@mui/icons-material/Pending';
import StartIcon from '@mui/icons-material/Start';
import DoneIcon from '@mui/icons-material/Done';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import SettingsIcon from '@mui/icons-material/Settings';
const SiderLink = [
  {
    title: 'Chiến dịch',
    icon: <CampaignIcon />,
    children: [
      {
        title: 'Đợi duyệt',
        link: '/campaign/pending',
        icon: <PendingIcon />,
      },
      {
        title: 'Đang kêu gọi',
        link: '/campaign/start',
        icon: <StartIcon />,
      },
      {
        title: 'Đã kết thúc',
        link: '/campaign/finish',
        icon: <DoneIcon />,
      },
    ],
  },
  {
    title: 'Yêu cầu đăng ký',
    icon: <HowToRegIcon />,
    children: [
      {
        title: 'Đăng ký',
        link: '/request/pending',
        icon: <PendingIcon />,
      },
      {
        title: 'Đăng ký đã duyệt',
        link: '/request/done',
        icon: <DoneIcon />,
      },
      {
        title: 'Đánh giá',
        link: '/feedback',
        icon: <FeedbackIcon />,
      },
    ],
  },
  {
    title: 'Quản lý người dùng',
    icon: <SupervisedUserCircleIcon />,
    children: [
      {
        title: 'Danh sách',
        link: '/user/active',
        icon: <PersonIcon />,
      },
    ],
  },
  {
    title: 'Cài đặt',
    icon: <SettingsIcon />,
    children: [
      {
        title: 'Banner',
        link: '/banner',
        icon: <ViewCarouselIcon />,
      },
      {
        title: 'Thống kê',
        link: '/statistical',
        icon: <AssessmentIcon />,
      },
      { title: 'Bản đồ', link: '/map', icon: <AddLocationAltIcon /> },
    ],
  },
  {
    title: 'Địa chỉ',
    icon: <BusinessIcon />,
    children: [
      {
        title: 'Tỉnh',
        link: '/province',
        icon: <AddRoadIcon />,
      },
      {
        title: 'Huyện',
        link: '/district',
        icon: <AddRoadIcon />,
      },
      {
        title: 'Xã',
        link: 'commune',
        icon: <AddRoadIcon />,
      },
    ],
  },
];
export default SiderLink;
