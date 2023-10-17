import {Dimensions, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

export const {width, height} = Dimensions.get('window');
export const hasNotch =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTV &&
  (height === 780 ||
    width === 780 ||
    height === 812 ||
    width === 812 ||
    height === 844 ||
    width === 844 ||
    height === 896 ||
    width === 896 ||
    height === 926 ||
    width === 926);

const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];
const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

export const getPercentage = (size: number) =>
  (size / guidelineBaseWidth) * 100;
export const getHeightPercentage = (size: number) =>
  (size / guidelineBaseHeight) * 100;
export const scale = (size: number) =>
  (shortDimension / guidelineBaseWidth) * size;
export const verticalScale = (size: number) =>
  (longDimension / guidelineBaseHeight) * size;
export const sizeScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const getScaleSizeHeight = (size: number) => {
  return hp(getHeightPercentage(size) + '%');
};
export const getScaleSizeWidth = (size: number) => {
  return wp(getPercentage(size) + '%');
};

export const getPixelSize = (pixels: number) => {
  return Platform.select({
    ios: pixels,
    android: pixels,
  });
};

export const DIMENSION = {
  space: getScaleSizeWidth(10),
  borderRadius: getScaleSizeWidth(2),
  borderRadiusCircle: getScaleSizeWidth(9999),
  buttonHeight: getScaleSizeWidth(50),
  paymentButtonWidth: getScaleSizeWidth(80),
  bottomButtonHeight: getScaleSizeWidth(90),
  px: getScaleSizeWidth(25),
  p5: getScaleSizeWidth(5),
  p10: getScaleSizeWidth(10),
  p15: getScaleSizeWidth(15),
  p20: getScaleSizeWidth(20),
  p25: getScaleSizeWidth(25),
  p30: getScaleSizeWidth(30),
  p35: getScaleSizeWidth(35),
};
