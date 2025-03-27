export type ISideBarSubMenu = {
  route_path: string
  nome: string
  icon: string
}

export type ISideBarSelection = {
  titulo: string
  sub_route: ISideBarSubMenu[]
  index: number
}
