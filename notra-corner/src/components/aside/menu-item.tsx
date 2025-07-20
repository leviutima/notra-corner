interface MenuItemProps {
  title: string,
}

export function MenuItem({title}: MenuItemProps) {
  return(
    <li>
      <h2>{title}</h2>
    </li>
  )
}