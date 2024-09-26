import { Icon } from "@phosphor-icons/react"

interface MenuItemProps {
  label: string
  icon?: Icon
  onClick: () => void
  shorcut?: string
}

export function MenuItem({ label, icon: Icon, onClick, shorcut }: MenuItemProps) {

  return (
    <div onClick={onClick} className="relative group flex items-center justify-between p-2 rounded-sm text-sm text-accent font-semibold hover:bg-white/5 hover:text-accent">
      <span className="w-1 h-5 group-hover:bg-blue-500 rounded-md absolute left-0 group-active:h-4 transition"></span>
      <div className="flex items-center gap-2">
        {Icon && <Icon weight="light" className="w-4 h-4" />}
        {label}
      </div >

      {shorcut && (<span className=" bg-muted group-hover:bg-transparent group-hover:border-transparent px-1.5 text-[10px] font-mono rounded">{shorcut}</span>)}

    </div >
  )

}