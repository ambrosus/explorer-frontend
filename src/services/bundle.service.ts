import API from '../API/api';

export const getBlockData = async (hashOrNumber: string) => {
  const data: any = await API.getBlock(hashOrNumber);
  return data;
};
export const getBundleData = async (bundleId: string) => {
  const data: any = await API.getBundle(bundleId);
  return data;
};

// const getBundleAssets = (bundleId: any, params = {}) => {
//   return API().get(`bundles/${bundleId}/assets`, {
//     params,
//   });
// };

// const getBundleEvents = (bundleId: any, params = {}) => {
//   return API().get(`bundles/${bundleId}/events`, {
//     params,
//   });
// };
