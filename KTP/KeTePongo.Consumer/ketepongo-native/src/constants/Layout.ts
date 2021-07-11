import { Dimensions } from 'react-native';  
import { COLORS } from './Colors';

const { width, height } = Dimensions.get('window');
const LAYOUT = {
  WINDOW: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  defaultAlert: {
    width: 294,
    height: 201,
    borderRadius: 10,
    backgroundColor: COLORS.neutral_min,
    position: 'absolute',
    zIndex: 100,
    left: (width - 294) / 2,
    top: (height - 201) / 2,
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteProviderAlert:{
    display:'flex',
    flexDirection:'column',
    width: 294,
    height: 'auto',
    borderRadius: 10,
    backgroundColor: COLORS.neutral_min,
    position: 'absolute',
    zIndex: 100,
    left: (width - 294) / 2,
    top: (height - 201) / 2,
    padding: 15,
    justifyContent: 'space-between',
  },
};

export { LAYOUT };