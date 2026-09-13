import React from 'react';
import {
  HeartPulse,
  Stethoscope,
  Activity,
  Bone,
  Pill,
  ShieldAlert,
  Sparkles,
  Film,
  Tv,
  Drama,
  Star,
  Music,
  Globe,
  Landmark,
  Compass,
  Atom,
  Wrench,
  Zap,
  Cpu,
  CircuitBoard,
  Wind,
  Laptop,
  Monitor,
  Car,
  Brain,
  Calculator,
  BookOpen,
  Flag,
  ShieldCheck,
  CarFront,
  Smile,
  HeartHandshake,
  Feather,
  Shuffle,
  HelpCircle,
  type LucideProps
} from 'lucide-react';

const ICON_MAP: Record<string, React.FC<LucideProps>> = {
  HeartPulse,
  Stethoscope,
  Activity,
  Bone,
  Pill,
  ShieldAlert,
  Sparkles,
  Film,
  Tv,
  Drama,
  Star,
  Music,
  Globe,
  Landmark,
  Compass,
  Atom,
  Wrench,
  Zap,
  Cpu,
  CircuitBoard,
  Wind,
  Laptop,
  Monitor,
  Car,
  Brain,
  Calculator,
  BookOpen,
  Flag,
  ShieldCheck,
  CarFront,
  Smile,
  HeartHandshake,
  Feather,
  Shuffle
};

interface IconHelperProps extends LucideProps {
  name: string;
}

export const IconHelper: React.FC<IconHelperProps> = ({ name, ...props }) => {
  const IconComponent = ICON_MAP[name] || HelpCircle;
  return <IconComponent {...props} />;
};
