import {ActivityIndicator} from 'react-native-paper';

const Loader = ({color, ...rest}) => (
  <ActivityIndicator animating={true} color={color || '#FFF'} {...rest} />
);

export default Loader;
