import { Spell } from '../types/game';

export const SPELLS: Spell[] = [
  {
    name: 'Cold Snap',
    combination: ['Q', 'Q', 'Q'],
    icon: '/images/spells/Cold_Snap_icon.webp',
    description: 'Freezes the target with ice'
  },
  {
    name: 'Ghost Walk',
    combination: ['Q', 'Q', 'W'],
    icon: '/images/spells/Ghost_Walk_icon.webp',
    description: 'Turns Invoker invisible'
  },
  {
    name: 'Ice Wall',
    combination: ['Q', 'Q', 'E'],
    icon: '/images/spells/Ice_Wall_icon.webp',
    description: 'Creates a wall of ice'
  },
  {
    name: 'EMP',
    combination: ['W', 'W', 'W'],
    icon: '/images/spells/E.M.P._icon.webp',
    description: 'Electromagnetic pulse'
  },
  {
    name: 'Tornado',
    combination: ['W', 'W', 'Q'],
    icon: '/images/spells/Tornado_icon.webp',
    description: 'Creates a powerful tornado'
  },
  {
    name: 'Alacrity',
    combination: ['W', 'W', 'E'],
    icon: '/images/spells/Alacrity_icon.webp',
    description: 'Grants attack speed and damage'
  },
  {
    name: 'Sun Strike',
    combination: ['E', 'E', 'E'],
    icon: '/images/spells/Sun_Strike_icon.webp',
    description: 'Calls down a beam of solar energy'
  },
  {
    name: 'Forge Spirit',
    combination: ['E', 'E', 'Q'],
    icon: '/images/spells/Forge_Spirit_icon.webp',
    description: 'Summons a fire spirit'
  },
  {
    name: 'Chaos Meteor',
    combination: ['E', 'E', 'W'],
    icon: '/images/spells/Chaos_Meteor_icon.webp',
    description: 'Summons a meteor from space'
  },
  {
    name: 'Deafening Blast',
    combination: ['Q', 'W', 'E'],
    icon: '/images/spells/Deafening_Blast_icon.webp',
    description: 'Releases a powerful blast'
  }
];

export const getRandomSpell = (previousSpell?: Spell): Spell => {
  if (!previousSpell) {
    const randomIndex = Math.floor(Math.random() * SPELLS.length);
    return SPELLS[randomIndex];
  }
  const filtered = SPELLS.filter(s => s.name !== previousSpell.name);
  if (filtered.length === 0) return previousSpell;
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}; 