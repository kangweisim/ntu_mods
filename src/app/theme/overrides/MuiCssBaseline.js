import sf_black from "../fonts/SF-Compact-Rounded-Black.otf";
import sf_heavy from "../fonts/SF-Compact-Rounded-Heavy.otf";
import sf_bold from "../fonts/SF-Compact-Rounded-Bold.otf";
import sf_semibold from "../fonts/SF-Compact-Rounded-Semibold.otf";
import sf_medium from "../fonts/SF-Compact-Rounded-Medium.otf";
import sf_regular from "../fonts/SF-Compact-Rounded-Regular.otf";
import sf_light from "../fonts/SF-Compact-Rounded-Light.otf";
import sf_thin from "../fonts/SF-Compact-Rounded-Thin.otf";
import sf_ultralight from "../fonts/SF-Compact-Rounded-Ultralight.otf";

export default {
  "@global": {
    "@font-face": [
      make_sf_font("SF Compact", 900, sf_black),
      make_sf_font("SF Compact", 800, sf_heavy),
      make_sf_font("SF Compact", 700, sf_bold),
      make_sf_font("SF Compact", 600, sf_semibold),
      make_sf_font("SF Compact", 500, sf_medium),
      make_sf_font("SF Compact", 400, sf_regular),
      make_sf_font("SF Compact", 300, sf_light),
      make_sf_font("SF Compact", 200, sf_thin),
      make_sf_font("SF Compact", 100, sf_ultralight),
    ],
  }
};