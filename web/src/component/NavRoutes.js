import HomePage from '../page/HomePage'
import Art from '../page/Art'
import Collection from '../page/Collection'
import MarketPlace from '../page/MarketPlace'

export const ROUTES = [
  { name: "HomePage", path: "/", component: HomePage, nav: true },
  { name: "Art", path: "/art", component: Art, nav: true },
  { name: "Collection", path: '/collection', component: Collection, nav: true },
  { name: "MarketPlace", path: '/marketplace', component: MarketPlace, nav: true }
]

export const NAV_ROUTES = ROUTES.filter(r => r.nav)