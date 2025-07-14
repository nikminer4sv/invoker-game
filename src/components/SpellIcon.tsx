import React from 'react';

interface SpellIconProps {
   icon: string;
   size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
   className?: string;
}

const sizeClasses = {
   sm: 'w-4 h-4',
   md: 'w-6 h-6',
   lg: 'w-8 h-8',
   xl: 'w-12 h-12',
   xxl: 'w-16 h-16',
};

const SpellIcon: React.FC<SpellIconProps> = ({ icon, size = 'md', className = '' }) => {
   const isImage = icon.startsWith('/');

   if (isImage) {
      return (
         <img
            src={icon}
            alt="spell icon"
            className={`${sizeClasses[size]} object-cover ${className}`}
         />
      );
   }

   return (
      <span className={`${sizeClasses[size]} flex items-center justify-center text-center ${className}`}>
         {icon}
      </span>
   );
};

export default SpellIcon; 