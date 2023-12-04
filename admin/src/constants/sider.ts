const SiderLink = [
  {
    title: 'User Management',
    children: [
      {
        title: 'Active',
        link: '/user/active',
      },
      {
        title: 'InActive',
        link: '/user/inactive',
      },
    ],
  },
  {
    title: 'Area',
    children: [
      {
        title: 'Province',
        link: '/province',
      },
      {
        title: 'District',
        link: '/district',
      },
      {
        title: 'Commune',
        link: 'commune',
      },
    ],
  },

  {
    title: 'Campaign',
    children: [
      {
        title: 'Pending Aprrove',
        link: '/campaign/pending',
      },
      {
        title: 'Start',
        link: '/campaign/start',
      },
      {
        title: 'Finish',
        link: '/campaign/finish',
      },
    ],
  },
  {
    title: 'Setting',
    children: [
      {
        title: 'Banner',
        link: '/banner',
      },
      {
        title: 'Statistical',
        link: '/statistical',
      },
      { title: 'Map', link: '/map' },
    ],
  },
];
export default SiderLink;
