declare module '*.svg' {
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
declare module "*.png";
declare module "*.jpeg";
declare module "*.jpg";