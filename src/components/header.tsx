import { ArrowUUpLeft, GearSix } from '@phosphor-icons/react';
import { router } from '../Routes';
import { cn } from '../lib/utils';
import logo from '/logo.svg';

interface HeaderProps {
  homeButton?: boolean
  configButton?: boolean
}

export function Header({ homeButton, configButton }: HeaderProps) {

  function handleBackToHome() {
    router.navigate("/main")
  }

  function handleToConfig() {
    router.navigate("/config")
  }

  return (
    <div className='flex justify-between p-3'>
      <div className='flex items-center justify-center px-3'>
        <div className={cn('rounded-sm w-6 h-6 flex text-accent justify-center items-center invisible transition bg-white/5 hover:bg-white/10', homeButton && 'visible')} onClick={handleBackToHome}>
          <ArrowUUpLeft className='w-5' />
        </div>
      </div>
      <div className='flex-1 flex items-center justify-center flex-col'>

        <img src={logo} alt="LogoTipo do Wildtray" className='w-14' />
        <span className='font-semibold text-sm mt-1 text-white'>WildTray</span>

      </div>
      <div className='flex justify-center items-center px-3'>
        <div className={cn('rounded-sm w-6 h-6 flex text-accent justify-center items-center invisible transition bg-white/5 hover:bg-white/10', configButton && 'visible')} onClick={handleToConfig}>
          <GearSix className='w-5' />
        </div>
      </div>
    </div>
  )
}