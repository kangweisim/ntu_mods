/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import HomeIcon from '@material-ui/icons/DashboardOutlined';
import SchoolIcon from '@material-ui/icons/School';
import GitHubIcon from '@material-ui/icons/GitHub';

export default [{
  title: 'Modules',
  pages: [{
    title: 'Modules',
    href: '/modules',
    icon: HomeIcon
  }, {
    title: 'Topics',
    href: '/topics',
    icon: SchoolIcon
  }, {
    title: "About",
    href: "/about",
    icon: GitHubIcon
  }]
},
];
