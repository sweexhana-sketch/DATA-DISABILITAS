import * as route0 from '../src/app/api/auth/expo-web-success/route.js';
import * as route1 from '../src/app/api/auth/token/route.js';
import * as route2 from '../src/app/api/certifications/route.js';
import * as route3 from '../src/app/api/contractors/[id]/route.js';
import * as route4 from '../src/app/api/contractors/my-profile/route.js';
import * as route5 from '../src/app/api/contractors/route.js';
import * as route6 from '../src/app/api/contractors/verify/route.js';
import * as route7 from '../src/app/api/disability/route.js';
import * as route8 from '../src/app/api/documents/route.js';
import * as route9 from '../src/app/api/make-admin/route.js';
import * as route10 from '../src/app/api/projects/route.js';
import * as route11 from '../src/app/api/stats/route.js';
import * as route12 from '../src/app/api/user/role/route.js';

export const routesManifest = [
  { path: 'auth/expo-web-success/route.js', module: route0 },
  { path: 'auth/token/route.js', module: route1 },
  { path: 'certifications/route.js', module: route2 },
  { path: 'contractors/[id]/route.js', module: route3 },
  { path: 'contractors/my-profile/route.js', module: route4 },
  { path: 'contractors/route.js', module: route5 },
  { path: 'contractors/verify/route.js', module: route6 },
  { path: 'disability/route.js', module: route7 },
  { path: 'documents/route.js', module: route8 },
  { path: 'make-admin/route.js', module: route9 },
  { path: 'projects/route.js', module: route10 },
  { path: 'stats/route.js', module: route11 },
  { path: 'user/role/route.js', module: route12 },
];
