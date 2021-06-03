//use this file to simplify module export logic
import { router as authRoutes } from './auth.routes.js';
import { router as issueRoutes } from './issues.routes.js';
import { router as volumeRoutes } from './volume.routes.js';
import { router as characterRoutes } from './character.routes.js';
import { router as teamRoutes } from './team.routes.js';
import { router as storyArcRoutes } from './storyArc.routes.js';
import { router as publisherRoutes } from './publisher.routes.js';
import { router as personRoutes } from './person.routes.js';
import { router as marketRoutes } from './market.routes.js';

export {
    authRoutes,
    issueRoutes,
    volumeRoutes,
    marketRoutes,
    characterRoutes,
    personRoutes,
    teamRoutes,
    publisherRoutes,
    storyArcRoutes,
};
