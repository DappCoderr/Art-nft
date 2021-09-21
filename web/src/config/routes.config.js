import Collection from '../pages/Collection.page'
import Arts from '../pages/Art.page'
import Home from '../pages/Home.page'
import MarketPlace from '../pages/MarketPlace.page'
import Create from '../pages/Create.page'

export const ROUTES = [
  { name: "Home", path: "/", component: Home, nav: true },
  { name: "Arts", path: "/arts", component: Arts, nav: true },
  { name: "Collection", path: '/collection', component: Collection, nav: true },
  { name: "Market Place", path: '/marketplace', component: MarketPlace, nav: true },
  { name: "Create", path: '/create', component: Create, nav: true },
]

export const NAV_ROUTES = ROUTES.filter(r => r.nav)