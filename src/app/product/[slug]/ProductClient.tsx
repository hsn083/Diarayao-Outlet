'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import SEOContentSection from '@/components/SEOContentSection';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/toast';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Shield, 
  Truck, 
  RotateCcw,
  Check,
  Minus,
  Plus,
  Loader2,
  X,
  MessageCircle,
  Copy,
  Facebook,
  Twitter,
  Mail as MailIcon
} from 'lucide-react';
import { Product } from '@/types';
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import ReviewSection from '@/components/ReviewSection';
import { ProductSchema, BreadcrumbSchema } from '@/components/StructuredData';

export default function ProductClient() {
