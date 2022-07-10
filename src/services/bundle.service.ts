import API from '../API/api';

export const getBundleData = async (bundleId: any) => {
  const data: any = await API.getBundle(bundleId);
  return data;
};

export const getBundlesData = async (next: any) => {
  const data: any = await API.getBundles({
    limit: 20,
    next: next,
  });
  return data;
};

export const getBundleAssetsData = async (...arg: any[]) => {
  const [sortTerm, next, bundleId] = arg;

  const data: any = await API.getBundleAssets(bundleId, {
    limit: 20,
    next: next,
  });
  return data;
};

export const getBundleEventsData = async (...arg: any[]) => {
  const [sortTerm, next, bundleId] = arg;

  const data: any = await API.getBundleEvents(bundleId, {
    limit: 20,
    next: next,
  });
  return data;
};

export const getBundleInfo = async () => {
  const data: any = await API.getInfo();
  return data;
};
