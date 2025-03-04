import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
// import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// mui styled
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
// Components
import MainListItems from './list-item/MainList';
import SecondaryListItems from './list-item/SecondList';
// import ProgramChange from './ProgramChange.js'

const drawerWidth = 240;

const StyledDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO ask tomorrow in a help request

// interface Props {
//   toggleDrawer : any,
//   open: any,
// }

const Drawer = (props: { toggleDrawer: any; open: any }) => {
  return (
    <StyledDrawer variant="permanent" open={props.open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        {/* <Box>
                    <ProgramChange />
                </Box> */}
        <IconButton onClick={props.toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <MainListItems />
      <Divider />
      <SecondaryListItems />
    </StyledDrawer>
  );
};

export default Drawer;
