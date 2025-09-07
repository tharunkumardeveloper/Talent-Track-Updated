import { useState, useEffect } from "react";
import { BadgeModal } from "@/components/BadgeModal";
import { Trophy } from "lucide-react";

interface NewBadgePopupProps {
  trigger: boolean;
  badge?: {
    name: string;
    icon: any;
    color: string;
    description: string;
    rarity: string;
    xpReward: number;
    coinReward: number;
    emoji?: string;
  };
}

export function NewBadgePopup({ trigger, badge }: NewBadgePopupProps) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (trigger && badge) {
      setShowModal(true);
    }
  }, [trigger, badge]);

  const defaultBadge = {
    name: "Achievement Unlocked",
    icon: Trophy,
    color: "text-gamification-gold",
    description: "Congratulations on your achievement!",
    rarity: "Common",
    xpReward: 50,
    coinReward: 25,
    emoji: "🏆"
  };

  return (
    <BadgeModal 
      isOpen={showModal} 
      onClose={() => setShowModal(false)}
      badge={badge || defaultBadge}
      isNewBadge={true}
    />
  );
}