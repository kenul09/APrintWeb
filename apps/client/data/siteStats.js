// Single source for company figures shown on more than one page (homepage
// stats, About hero/stats). Change a number here and every page follows.
export const FOUNDED_YEAR = 2003;
export const CUSTOMER_COUNT = "2000+";
export const TEAM_SIZE = "15";
export const PRODUCT_COUNT = "50+";
// TODO(A Print): source of the rating (Google reviews?) — shown on the homepage.
export const RATING = "5.0★";

// Years in business — recalculated on every render, so it rolls over on
// its own each new year.
export function yearsInBusiness(now = new Date()) {
  return now.getFullYear() - FOUNDED_YEAR;
}
