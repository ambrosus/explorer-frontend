import API from '../API/api';

export const getBundleData = async (bundleId: any) => {
  const data: any = await API.getBundle(bundleId);
  return data;
};

export const getBundlesData = async (params = { next: null }) => {
  const { next } = params;
  const data: any = await API.getBundles({
    limit: 20,
    next: next,
  });
  return data;
};

export const getBundleAssetsData = async (
  bundleId: any,
  params = { limit: 20, next: null },
) => {
  const { limit, next } = params;
  const data: any = await API.getBundleAssets(bundleId, {
    limit: limit,
    next: next,
  });
  return data;
};

export const getBundleEventsData = async (
  bundleId: any,
  params = { limit: 20, next: null },
) => {
  const { limit, next } = params;

  const data: any = await API.getBundleEvents(bundleId, {
    limit: limit,
    next: next,
  });
  return data;
};
