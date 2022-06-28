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

export const getBundleWithEntriesData = async (
  sortTerm: any,
  argument: any,
  bundleId: any,
) => {
  const data: any = await API.getBundleWithEntries(bundleId);
  return data;
};

export const getBundleAssetsData = async (bundleId: any, next: any) => {
  const data: any = await API.getBundleAssets(bundleId, {
    limit: 20,
    next: next,
  });
  return data;
};

export const getBundleEventsData = async (bundleId: any, next: any) => {
  const data: any = await API.getBundleEvents(bundleId, {
    limit: 20,
    next: next,
  });
  return data;
};
