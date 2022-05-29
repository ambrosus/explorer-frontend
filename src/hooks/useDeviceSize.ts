import useWindowSize from './useWindowSize';

const useDeviceSize = () => {
  const { width } = useWindowSize();
  const FOR_LAPTOP = width > 1200;
  const FOR_BIG_TABLET = width > 990;
  const FOR_TABLET = width > 768;
  const FOR_PHONE = width > 576;
  const FOR_SMALL_PHONE = width > 415;
  return { FOR_LAPTOP, FOR_BIG_TABLET, FOR_TABLET, FOR_PHONE, FOR_SMALL_PHONE };
};

export default useDeviceSize;
