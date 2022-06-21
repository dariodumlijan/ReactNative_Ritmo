// @flow
import axios from 'axios';
import { get, isEqual } from 'lodash';
import { localStorageKeys, appKeys } from '../tokens';
import cmsHeader from './cms.config';
import {
  PRODUCTION_QUERY,
  STAGING_QUERY,
  VALID_PRODUCTION_QUERY,
  VALID_STAGING_QUERY,
} from './cms.querys';
import { isRealDevice } from '../utils';
import { getItem } from '../utils/hooks';
import ENV from '../../env.json';

export type InitialCMSResponse = {
  data: Object,
  timestamps: {
    announcement: number,
    local: {
      master: number,
      announcement: number,
    },
    online: {
      master: number,
      announcement: number,
    },
  },
  isLocal: boolean,
};

const VALID_QUERY = isRealDevice ? VALID_PRODUCTION_QUERY : VALID_STAGING_QUERY;
const MASTER_QUERY = isRealDevice ? PRODUCTION_QUERY : STAGING_QUERY;

export const fetchData = async (query: string): Promise<any> => {
  const response = await axios.post(ENV.CMS.GRAPHQL_URL + ENV.CMS.SPACE, { query }, cmsHeader);

  if (response.status === 200) {
    return response.data.data;
  }
};

export const fetchLocalTimestamps = async (): Promise<{ announcement: any, local: any }> => {
  const contentTimestamps = await getItem(localStorageKeys.contentTimestamps);
  const announcementTimestamp = await getItem(localStorageKeys.announcementTimestamp);

  const local = contentTimestamps ? JSON.parse(contentTimestamps) : appKeys.noLocalData;
  const announcement = announcementTimestamp
    ? JSON.parse(announcementTimestamp)
    : appKeys.noLocalData;

  return { local, announcement };
};

export const fetchCMSTimestamps = async (): Promise<{ master: any, announcement: any } | any> => {
  const response = await axios.post(ENV.CMS.GRAPHQL_URL + ENV.CMS.SPACE, { query: VALID_QUERY }, cmsHeader);

  if (response.status === 200) {
    const master = get(response.data, 'data.appCollection.items[0].sys.publishedAt');
    const announcement = get(response.data, 'data.announcementCollection.items[0].sys.publishedAt');

    return {
      master: master ? new Date(master).valueOf() : null,
      announcement: announcement ? new Date(announcement).valueOf() : null,
    };
  }

  return appKeys.noConnection;
};

export const fetchCMS = async (): Promise<InitialCMSResponse> => {
  const cmsTimestampsResponse = await fetchCMSTimestamps();
  const localTimestampsResponse = await fetchLocalTimestamps();

  const fullTimestampsResponse = {
    ...localTimestampsResponse,
    online: cmsTimestampsResponse,
  };

  const localTimestamps = get(fullTimestampsResponse, 'local');
  const onlineTimestamps = get(fullTimestampsResponse, 'online');
  const timestampsAreEqual = isEqual(localTimestamps, onlineTimestamps);
  const hasLocalData = !isEqual(localTimestamps, appKeys.noLocalData);
  const hasOnlineData = !isEqual(onlineTimestamps, appKeys.noConnection);

  let dataResponse = {};
  if (hasLocalData && (timestampsAreEqual || !hasOnlineData)) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const response = await getItem(localStorageKeys.appContent);

    dataResponse = {
      data: JSON.parse(response),
      isLocal: true,
    };
  }

  if (hasOnlineData && (!timestampsAreEqual || !hasLocalData)) {
    const response = await fetchData(MASTER_QUERY);

    dataResponse = {
      data: response,
      isLocal: false,
    };
  }

  // $FlowFixMe
  return { ...dataResponse, timestamps: fullTimestampsResponse };
};
