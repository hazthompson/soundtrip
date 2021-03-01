import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export function useWindowSize() {
  const theme = useTheme();
  const windowSizeLoaded = !!theme;
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return { isDesktop, isMobile, windowSizeLoaded };
}
