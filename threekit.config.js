export default {
  credentials: {
    preview: {
      orgId: process.env.THREEKIT_PREVIEW_ORG_ID,
      publicToken: process.env.THREEKIT_PREVIEW_PUBLIC_TOKEN,
    },
    'admin-fts': {
      orgId: process.env.THREEKIT_ADMIN_FTS_ORG_ID,
      publicToken: process.env.THREEKIT_ADMIN_FTS_PUBLIC_TOKEN,
    },
  },

  products: {
    preview: {
      assetId: 'a71325e3-4b6a-410b-99bb-c91b6af3a628',
      configurationId: undefined,
      stageId: undefined,
    },
    'admin-fts': {
      assetId: undefined,
      configurationId: undefined,
      stageId: undefined,
    },
  },
};
