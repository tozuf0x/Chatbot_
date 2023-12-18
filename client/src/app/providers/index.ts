import compose from 'compose-function';
import { withAntDesign } from './withAntDesign';
import { withErrorBoundary } from './withErrorBoundary';
import { withHelmet } from './withHelmet';
import { withRedux } from './withRedux';
import { withRouter } from './withRouter';

export const withProviders = compose(withAntDesign, withHelmet, withErrorBoundary, withRedux, withRouter);
