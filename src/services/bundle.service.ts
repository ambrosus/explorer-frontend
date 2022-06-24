import API from '../API/api';

export const getBundleData = async (bundleId: any) => {
  const data: any = await API.getBundle(bundleId);
  return data;
};

export const getBundlesData = async (sortTerm: any, next: any) => {
  const data: any = await API.getBundles({
    limit: 20,
    next: next,
  });
  return data;
};
