'use client';

import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export default function WhatsAppButton({ 
  phoneNumber = '923001234567', 
  message = 'Hello, I would like to place an order.',
  className = ''
}: WhatsAppButtonProps) {
  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={handleClick}
      className={`bg-green-500 hover:bg-green-600 text-white font-semibold transition-all duration-300 hover:scale-105 ${className}`}
      size="lg"
    >
      <MessageCircle className="mr-2 h-5 w-5" />
      Order via WhatsApp
    </Button>
  );
}
