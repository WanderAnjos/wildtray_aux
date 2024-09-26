import { Icon } from "@phosphor-icons/react";
import { Switch } from "./ui/switch";

interface MenuItemSwitchProps {
  label: string
  icon?: Icon
  onCheck: (value: boolean) => void
  value?: boolean
}

export function MenuItemSwitch({ label, icon: Icon, onCheck, value }: MenuItemSwitchProps) {

  const handleSwitchChange = (checked: boolean) => {
    onCheck(checked);
  };

  return (

    <div className="flex items-center justify-between p-2 rounded-sm text-sm text-accent font-semibold">
      <div className="flex items-center gap-2">
        {Icon && <Icon weight="light" className="w-4 h-4" />}
        {label}
      </div >
      <Switch onCheckedChange={handleSwitchChange} checked={value} />
    </div >
  )

}