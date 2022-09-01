// @flow
export const VALID_PRODUCTION_QUERY = `
  {
    appCollection(where: {id: "Ritmo"}) {
      items {
        sys {
          publishedAt
        }
      }
    }
    announcementCollection(where: {id: "Ritmo"}) {
      items {
        sys {
          publishedAt
        }
      }
    }
  }
`;

export const VALID_STAGING_QUERY = `
  {
    appCollection(where: {id: "Ritmo"}) {
      items {
        sys {
          publishedAt
        }
      }
    }
    announcementCollection(where: {id: "Ritmo - Staging"}) {
      items {
        sys {
          publishedAt
        }
      }
    }
  }
`;

export const PRODUCTION_QUERY = `
  {
    appCollection(where: {id: "Ritmo"}) {
      items {
        adIds
        ads
        resetRewards
        keepRewards
      }
    }
    announcementCollection(where: {id: "Ritmo"}) {
      items {
        content {
          json
        }
      }
    }
  }
`;

export const STAGING_QUERY = `
  {
    appCollection(where: {id: "Ritmo"}) {
      items {
        adIds
        adsStaging
        resetRewardsStaging
        keepRewardsStaging
      }
    }
    announcementCollection(where: {id: "Ritmo - Staging"}) {
      items {
        content {
          json
        }
      }
    }
  }
`;
