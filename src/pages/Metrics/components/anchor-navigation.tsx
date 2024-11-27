import { cn } from '../../../utils/helpers';
import CoinIcon from './icons/coin';
import TransactionsIcon from './icons/transactions';
import UsersIcon from './icons/users';
import { useState, useEffect, useRef } from 'react';

const navItems = [
  { id: 'users', label: 'Active Users', icon: UsersIcon },
  { id: 'transactions', label: 'Transactions', icon: TransactionsIcon },
  { id: 'tvl', label: 'TVL', icon: CoinIcon },
];

export default function AnchorNavigation() {
  const [activeSection, setActiveSection] = useState('users');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 },
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.current?.observe(element);
    });

    return () => observer.current?.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="py-6 px-4 w-64 flex flex-col">
      <ul className="flex flex-col gap-y-4">
        {navItems.map((item) => (
          <li key={item.id} className="relative">
            <button
              onClick={() => handleClick(item.id)}
              className={cn(
                'w-full p-4 text-left leading-6 text-base font-semibold transition-colors flex gap-x-2 items-center',
                activeSection === item.id
                  ? '!text-blue-200 fill-blue-200'
                  : '!text-neutral-400 fill-neutral-400',
              )}
            >
              <item.icon />
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
