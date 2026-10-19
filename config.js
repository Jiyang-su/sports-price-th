// ===== Site configuration: the ONLY place to switch analytics on. =====
// ANALYTICS_CODE: your GoatCounter site code, e.g. 'runguideth' for https://runguideth.goatcounter.com
//   Empty string = tracking is OFF (safe no-op; events are only written to console.debug for local testing).
// AFFILIATE_STORES is filled automatically at build time from stores.json (stores whose affiliate_url_template
//   is non-empty). Links to those stores get rel="sponsored nofollow noopener"; all others get rel="nofollow noopener".
window.SITE_CONFIG={
  ANALYTICS_PROVIDER:'goatcounter',
  ANALYTICS_CODE:'runguideth',
  AFFILIATE_STORES:[]
};
