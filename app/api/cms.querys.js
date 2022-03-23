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
    ritmoCollection(limit: 1, order: sys_publishedAt_DESC, where: {destination: true}) {
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
    ritmoCollection(limit: 1, order: sys_publishedAt_DESC, where: {destination: false}) {
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
    ritmoCollection(where: {destination: true}) {
      items {
        samplesCollection {
          items {
            title
            url
          }
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
    ritmoCollection(where: {destination: false}) {
      items {
        samplesCollection {
          items {
            title
            url
          }
        }
      }
    }
  }
`;
