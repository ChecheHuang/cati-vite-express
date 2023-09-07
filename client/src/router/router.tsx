import LazyLoad from "./LazyLoad/LazyLoad"

const router: Route[] = [
  {
    "path": "/administrator/cati",
    "element": LazyLoad(import('@/views/administrator/cati/layout')),
    "label": "/administrator/cati",
    "name": "/administrator/cati",
    "children": [
      {
        "path": "/administrator/cati",
        "element": LazyLoad(import('@/views/administrator/cati/page')),
        "label": "/administrator/cati",
        "name": "/administrator/cati"
      },
      {
        "path": "/administrator/cati/view",
        "element": LazyLoad(import('@/views/administrator/cati/view/page')),
        "label": "/administrator/cati/view",
        "name": "/administrator/cati/view"
      },
      {
        "path": "/administrator/cati/manager",
        "element": LazyLoad(import('@/views/administrator/cati/manager/page')),
        "label": "/administrator/cati/manager",
        "name": "/administrator/cati/manager"
      },
      {
        "path": "/administrator/cati/view/:cati",
        "element": LazyLoad(import('@/views/administrator/cati/view/[cati]/page')),
        "label": "/administrator/cati/view/:cati",
        "name": "/administrator/cati/view/:cati"
      },
      {
        "path": "/administrator/cati/manager/:cati",
        "element": LazyLoad(import('@/views/administrator/cati/manager/[cati]/page')),
        "label": "/administrator/cati/manager/:cati",
        "name": "/administrator/cati/manager/:cati"
      },
      {
        "path": "/administrator/cati/templatephone",
        "element": LazyLoad(import('@/views/administrator/cati/templatephone/page')),
        "label": "/administrator/cati/templatephone",
        "name": "/administrator/cati/templatephone"
      },
      {
        "path": "/administrator/cati/templatephone/:id",
        "element": LazyLoad(import('@/views/administrator/cati/templatephone/[id]/page')),
        "label": "/administrator/cati/templatephone/:id",
        "name": "/administrator/cati/templatephone/:id"
      }
    ]
  },
  {
    "path": "",
    "element": LazyLoad(import('@/views/page')),
    "label": "/",
    "name": "/"
  },
  {
    "path": "/administrator/login",
    "element": LazyLoad(import('@/views/administrator/login/page')),
    "label": "/administrator/login",
    "name": "/administrator/login"
  },
  {
    "path": "/trpctemplate",
    "element": LazyLoad(import('@/views/trpctemplate/page')),
    "label": "/trpctemplate",
    "name": "/trpctemplate"
  },
  {
    "path": "/*",
    "element": LazyLoad(import('@/views/404/page')),
    "label": "Not Found",
    "name": "Not Found",
    "isHidden": true
  }
]
export default router
export interface Route {
  path: string
  element: JSX.Element
  name: string
  label: string
  icon?: JSX.Element
  children?: Route[]
  isHidden?: boolean
}

