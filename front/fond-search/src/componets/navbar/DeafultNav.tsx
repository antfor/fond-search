import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {colorScale,bgScale} from 'src/assets/color.mjs'


type Page = {
  name: string;
  href: string;
  current: boolean;
};

const navigation:Page[] = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ')
}

function NavButtons(item:Page, mobile:boolean){

  const mobileClasses='block text-base';
  const desktopClasses= 'text-sm'; 
  const textclasses = mobile ? mobileClasses : desktopClasses;
  const classes = classNames(
    item.current ? 'bg-pink-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
    'rounded-md px-3 py-2 font-medium', textclasses, 
  );

  if(mobile){
    return(
      <DisclosureButton
        key={item.name}
        as="a"
        href={item.href}
        aria-current={item.current ? 'page' : undefined}
        className={classes}
      >
        {item.name}
      </DisclosureButton>
    );
  }else{
    return(
      <a
        key={item.name}
        href={item.href}
        aria-current={item.current ? 'page' : undefined}
        className={classes}
      >
        {item.name}
      </a>
    );
  }

}

function DefaultNav() {

  const mobileButtons = (item:Page) => NavButtons(item, true); 
  const desktopButtons = (item:Page) => NavButtons(item, false); 

  return(
    <Disclosure as="nav" className="bg-gray-900 ">
      <div className='flex items-center justify-between px-6 h-16'>
        <div className='flex items-center justify-start' >
          <img alt="Fond sök" src="/pigo.svg" className="h-8 w-auto"/>
          <h1 className='ml-2 text-pink-700 font-bold text-2xl text-nowrap'>Fond sök</h1>
          <div className="hidden sm:flex space-x-4 ml-4">
                  {navigation.map(desktopButtons)}
          </div>
        </div>
        <div className="flex items-center justify-end sm:hidden">
          <DisclosureButton className="group flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
          </DisclosureButton>
        </div>
      </div >
      <DisclosurePanel className='sm:hidden'>
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map(mobileButtons)}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default DefaultNav;