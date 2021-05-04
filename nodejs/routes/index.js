//use this file to simplify module export logic
import { router as authRoutes } from './auth.routes.js';
import { router as issueRoutes } from './issue.routes.js';
import { router as volumeRoutes } from './volume.routes.js';
import { router as mainRoutes } from './main.routes.js';
import { router as marketRoutes } from './market.routes.js';

export { authRoutes, issueRoutes, volumeRoutes, mainRoutes, marketRoutes };
