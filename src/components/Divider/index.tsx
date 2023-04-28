import {View} from 'react-native';

interface Props {
  size: number;
}
const Divider = ({size}: Props) => {
  return <View style={{width: size, height: size}} />;
};

export default Divider;
