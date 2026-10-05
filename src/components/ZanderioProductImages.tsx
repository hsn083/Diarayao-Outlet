'use client';

import { useEffect } from 'react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/components/ui/toast';

type CatalogProduct = Partial<Product> & {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  price: number;
  images?: string[];
  stock?: number;
};

function toCartProduct(product: CatalogProduct): Product {
  const stock = product.stockQuantity ?? product.stock ?? 0;

  return {
    id: product.id || product._id || product.slug,
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    description: product.description || '',
    metaTitle: product.metaTitle,
    metaDescription: product.metaDescription,
    metaKeywords: product.metaKeywords,
    price: product.price,
    discountPrice: product.discountPrice,
    discountPercentage: product.discountPercentage,
    categoryId: product.categoryId || '',
    category: product.category || '',
    brand: product.brand || '',
    stock,
    stockQuantity: stock,
    lowStockThreshold: product.lowStockThreshold || 10,
    stockStatus: stock > 10 ? 'in_stock' : stock > 0 ? 'low_stock' : 'out_of_stock',
    images: product.images || [],
    hoverImage: product.hoverImage,
    fabric: product.fabric,
    colors: product.colors,
    sizes: product.sizes,
    video: product.video,
    specifications: product.specifications || {},
    features: product.features || [],
    warranty: product.warranty || '',
    rating: product.rating || 0,
    reviewCount: product.reviewCount || 0,
    reviews: product.reviews || product.reviewCount || 0,
    newArrival: product.newArrival || false,
    isFeatured: product.isFeatured || false,
    isBestSeller: product.isBestSeller || false,
    statusTags: product.statusTags || [],
    tags: product.tags || [],
    createdAt: product.createdAt || '',
    updatedAt: product.updatedAt || '',
  };
}

export default function ZanderioProductImages() {
  useEffect(() => {
    let widgetObserver: MutationObserver | undefined;
    let catalog: CatalogProduct[] = [];
    let cardsRoot: HTMLDivElement | undefined;
    let widgetStyles: HTMLStyleElement | undefined;
    let activeShadowRoot: ShadowRoot | undefined;
    let disposed = false;
    const cardGroups = new Map<HTMLParagraphElement, HTMLDivElement>();
    const renderedCards = new WeakMap<HTMLParagraphElement, Set<string>>();

    const renderProductCard = (
      product: CatalogProduct,
      paragraph: HTMLParagraphElement,
    ) => {
      const imageUrl = product.images?.[0];
      if (!imageUrl || !cardsRoot) return;

      const renderedForParagraph = renderedCards.get(paragraph) || new Set<string>();
      if (renderedForParagraph.has(product.slug)) return;
      renderedForParagraph.add(product.slug);
      renderedCards.set(paragraph, renderedForParagraph);

      let group = cardGroups.get(paragraph);
      if (!group) {
        group = document.createElement('div');
        group.dataset.productCardGroup = 'true';
        const anchorRect = paragraph.getBoundingClientRect();
        group.style.left = `${Math.max(12, Math.min(anchorRect.left, window.innerWidth - 362))}px`;
        group.style.top = `${Math.max(12, Math.min(anchorRect.bottom + 8, window.innerHeight - 200))}px`;
        cardsRoot.appendChild(group);
        cardGroups.set(paragraph, group);
      }

      const card = document.createElement('article');
      card.dataset.productCardId = product.slug;
      card.setAttribute('aria-label', product.name);

      const image = document.createElement('img');
      image.src = imageUrl;
      image.alt = product.name;
      image.loading = 'lazy';
      image.decoding = 'async';

      const details = document.createElement('div');
      details.dataset.productCardDetails = 'true';

      const stock = product.stockQuantity ?? product.stock ?? 0;
      const stockBadge = document.createElement('span');
      stockBadge.dataset.productStock = 'true';
      stockBadge.textContent = stock > 0 ? 'In stock' : 'Out of stock';

      const name = document.createElement('strong');
      name.textContent = product.name;

      const brand = document.createElement('span');
      brand.dataset.productBrand = 'true';
      brand.textContent = product.brand || product.category || '';

      const variants = document.createElement('span');
      variants.dataset.productVariants = 'true';
      const colors = product.colors?.map((color) => color.name.trim()).filter(Boolean) || [];
      const sizes = product.sizes?.map((size) => size.size).filter(Boolean) || [];
      variants.textContent = [
        colors.length ? `Colors: ${colors.join(', ')}` : '',
        sizes.length ? `Sizes: ${sizes.join(', ')}` : '',
      ].filter(Boolean).join(' · ');

      const priceRow = document.createElement('div');
      priceRow.dataset.productPrice = 'true';

      const price = document.createElement('span');
      price.textContent = `PKR ${(product.discountPrice || product.price).toLocaleString()}`;
      priceRow.appendChild(price);

      if (product.discountPrice) {
        const originalPrice = document.createElement('del');
        originalPrice.textContent = `PKR ${product.price.toLocaleString()}`;
        priceRow.appendChild(originalPrice);
      }

      const actions = document.createElement('div');
      actions.dataset.productCardActions = 'true';

      const listingLink = document.createElement('a');
      listingLink.href = `https://www.diarayao.com/product/${product.slug}`;
      listingLink.textContent = 'View listing';

      const addButton = document.createElement('button');
      addButton.type = 'button';
      addButton.textContent = stock > 0 ? 'Add to cart' : 'Out of stock';
      addButton.disabled = stock <= 0;
      addButton.addEventListener('click', () => {
        try {
          useCartStore.getState().addItem(toCartProduct(product), 1);
          useToastStore.getState().addToast('success', `${product.name} added to cart`);
        } catch (error) {
          console.error('Failed to add Zanderio product to cart:', error);
          useToastStore.getState().addToast('error', 'Failed to add product to cart');
        }
      });

      actions.append(listingLink, addButton);
      details.append(stockBadge, name);
      if (brand.textContent) details.appendChild(brand);
      if (variants.textContent) details.appendChild(variants);
      details.append(priceRow, actions);
      card.append(image, details);

      group.appendChild(card);
    };

    const isAssistantMessage = (paragraph: HTMLParagraphElement) => {
      const message = paragraph.parentElement?.parentElement?.parentElement;
      return !!message &&
        getComputedStyle(message).display === 'flex' &&
        getComputedStyle(message).alignItems === 'flex-start';
    };

    const normalizeText = (value: string) =>
      ` ${value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()} `;

    const findProductsForText = (text: string): CatalogProduct[] => {
      const normalizedText = normalizeText(text);
      const mentionedProducts = catalog.filter((product) => {
        const name = normalizeText(product.name);
        const slug = normalizeText(product.slug);
        return normalizedText.includes(name) || normalizedText.includes(slug);
      });

      if (mentionedProducts.length === 1) return mentionedProducts;

      if (mentionedProducts.length > 1) {
        const mentionedPrices = new Set(
          Array.from(text.matchAll(/\b\d[\d,]*\b/g), (match) =>
            Number(match[0].replace(/,/g, ''))
          )
        );
        const priceMatchedProducts = mentionedProducts.filter((product) =>
          mentionedPrices.has(product.price) ||
          (product.discountPrice !== undefined && mentionedPrices.has(product.discountPrice))
        );
        return priceMatchedProducts.length ? priceMatchedProducts : mentionedProducts;
      }

      const productQuestion =
        /\b(product|products|abaya|abayas|hijab|hijabs|khimar|khimars|dress|dresses|clothing|catalog|shop|picture|photo|image)\b/i
          .test(text);
      if (!productQuestion) return [];

      const categoryTerms = ['abaya', 'hijab', 'khimar', 'dress'];
      const requestedCategories = categoryTerms.filter((term) =>
        normalizedText.includes(` ${term}`) ||
        normalizedText.includes(` ${term}s `)
      );

      if (requestedCategories.length) {
        return catalog.filter((product) => {
          const productText = normalizeText(
            `${product.name} ${product.slug} ${product.category || ''} ${product.description || ''}`
          );
          return requestedCategories.some((term) => productText.includes(` ${term}`));
        });
      }

      return catalog;
    };

    const getMessageScrollArea = (paragraph: HTMLElement, dialog: HTMLElement) => {
      for (let ancestor = paragraph.parentElement; ancestor && ancestor !== dialog; ancestor = ancestor.parentElement) {
        const styles = getComputedStyle(ancestor);
        if (
          ancestor.scrollHeight > ancestor.clientHeight + 1 ||
          /auto|scroll/.test(styles.overflowY)
        ) {
          return ancestor;
        }
      }

      return dialog;
    };

    const positionProductCards = (shadowRoot: ShadowRoot) => {
      const dialog = shadowRoot.querySelector<HTMLElement>(
        '#zanderio-root [role="dialog"][aria-label="Diarayao AI chat"]'
      );
      if (!dialog || !cardsRoot) return;

      const dialogStyles = getComputedStyle(dialog);
      const dialogRect = dialog.getBoundingClientRect();
      const isChatOpen =
        dialogStyles.display !== 'none' &&
        dialogStyles.visibility !== 'hidden' &&
        Number(dialogStyles.opacity) > 0 &&
        dialogRect.width > 0 &&
        dialogRect.height > 0;
      cardsRoot.style.display = isChatOpen ? 'block' : 'none';
      if (!isChatOpen) return;

      for (const [paragraph, group] of cardGroups) {
        if (!paragraph.isConnected) {
          group.remove();
          cardGroups.delete(paragraph);
          continue;
        }

        const scrollArea = getMessageScrollArea(paragraph, dialog);
        const scrollRect = scrollArea.getBoundingClientRect();
        const anchorRect = paragraph.getBoundingClientRect();
        const anchorIsVisible =
          anchorRect.bottom > scrollRect.top &&
          anchorRect.top < scrollRect.bottom &&
          anchorRect.right > scrollRect.left &&
          anchorRect.left < scrollRect.right;
        group.style.display = anchorIsVisible ? 'grid' : 'none';
        if (!anchorIsVisible) continue;

        group.style.width = `${Math.max(0, Math.min(350, scrollRect.width - 16))}px`;
        group.style.maxHeight = `${Math.max(0, scrollRect.height - 16)}px`;
        const groupRect = group.getBoundingClientRect();
        const left = Math.max(
          scrollRect.left + 8,
          Math.min(anchorRect.left, scrollRect.right - groupRect.width - 8)
        );
        const top = Math.max(
          scrollRect.top + 8,
          Math.min(anchorRect.bottom + 8, scrollRect.bottom - groupRect.height - 8)
        );
        group.style.left = `${left}px`;
        group.style.top = `${top}px`;
      }
    };

    const onWidgetScroll = () => {
      if (activeShadowRoot) positionProductCards(activeShadowRoot);
    };
    const onWindowResize = () => {
      if (activeShadowRoot) positionProductCards(activeShadowRoot);
    };

    const enhanceAssistantMessages = (shadowRoot: ShadowRoot) => {
      const paragraphs = Array.from(shadowRoot.querySelectorAll<HTMLParagraphElement>('#zanderio-root p'));
      const userMessages = paragraphs.filter((paragraph) => !isAssistantMessage(paragraph));

      paragraphs.forEach((paragraph) => {
        if (!isAssistantMessage(paragraph)) return;

        const paragraphIndex = paragraphs.indexOf(paragraph);
        const precedingUserMessage = userMessages
          .filter((userMessage) => paragraphs.indexOf(userMessage) < paragraphIndex)
          .slice(-1)[0];
        const products = findProductsForText(
          `${precedingUserMessage?.textContent || ''} ${paragraph.textContent || ''}`
        );

        products.forEach((product) => renderProductCard(product, paragraph));
      });

      positionProductCards(shadowRoot);
    };

    const installWidgetEnhancement = () => {
      const shadowRoot = document.getElementById('zanderio-widget-host')?.shadowRoot;
      if (!shadowRoot) return false;
      activeShadowRoot = shadowRoot;

      const widgetRoot = shadowRoot.querySelector('#zanderio-root');
      if (!widgetRoot) return false;

      cardsRoot = shadowRoot.querySelector<HTMLDivElement>('#zanderio-product-cards-root') || document.createElement('div');
      if (!cardsRoot.isConnected) {
        cardsRoot.id = 'zanderio-product-cards-root';
        cardsRoot.setAttribute('aria-live', 'polite');
        shadowRoot.appendChild(cardsRoot);
      }

      widgetStyles = shadowRoot.querySelector<HTMLStyleElement>('#zanderio-product-card') || document.createElement('style');
      if (!widgetStyles.isConnected) {
        widgetStyles.id = 'zanderio-product-card';
        widgetStyles.textContent = `
          #zanderio-product-cards-root {
            position: fixed;
            inset: 0;
            z-index: 2147483646;
            pointer-events: none;
          }
          #zanderio-root a[href*="/product/"],
          #zanderio-root a[href*="res.cloudinary.com"] {
            display: none !important;
          }
          [data-product-card-group] {
            position: fixed;
            display: grid;
            gap: 8px;
            overflow-y: auto;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
            pointer-events: auto;
          }
          [data-product-card-id] {
            width: 100%;
            overflow: hidden;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            background: #fff;
            color: #111827;
            font: inherit;
          }
          [data-product-card-id] > img {
            display: block;
            width: calc(100% - 20px);
            height: 176px;
            margin: 10px 10px 0;
            object-fit: contain;
            border-radius: 8px;
          }
          [data-product-card-details] {
            display: grid;
            gap: 5px;
            padding: 10px 12px 12px;
          }
          [data-product-stock] {
            width: fit-content;
            padding: 3px 7px;
            border-radius: 6px;
            background: #edf5e5;
            color: #537044;
            font-size: 11px;
          }
          [data-product-card-details] strong {
            font-size: 14px;
            line-height: 1.4;
          }
          [data-product-brand] {
            color: #6b7280;
            font-size: 12px;
          }
          [data-product-variants] {
            color: #6b7280;
            font-size: 11px;
            line-height: 1.4;
          }
          [data-product-price] {
            display: flex;
            align-items: baseline;
            gap: 8px;
            margin: 2px 0;
            font-size: 16px;
            font-weight: 600;
          }
          [data-product-price] del {
            color: #9ca3af;
            font-size: 12px;
            font-weight: 400;
          }
          [data-product-card-actions] {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }
          [data-product-card-actions] a,
          [data-product-card-actions] button {
            display: flex;
            min-height: 38px;
            align-items: center;
            justify-content: center;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            background: #fff;
            color: #111827;
            font: inherit;
            font-size: 12px;
            text-decoration: none;
            cursor: pointer;
          }
          [data-product-card-actions] button {
            border-color: #111827;
            background: #111827;
            color: #fff;
          }
          [data-product-card-actions] button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
        `;
        shadowRoot.appendChild(widgetStyles);
      }

      if (!widgetObserver) {
        enhanceAssistantMessages(shadowRoot);
        widgetObserver = new MutationObserver(() => enhanceAssistantMessages(shadowRoot));
        widgetObserver.observe(widgetRoot, {
          attributes: true,
          attributeFilter: ['aria-hidden', 'class', 'style'],
          characterData: true,
          childList: true,
          subtree: true,
        });
        shadowRoot.addEventListener('scroll', onWidgetScroll, true);
        window.addEventListener('resize', onWindowResize);
      }

      return true;
    };

    const hostObserver = new MutationObserver(() => {
      if (installWidgetEnhancement()) {
        hostObserver.disconnect();
      }
    });

    const loadCatalog = async () => {
      const response = await fetch('/api/products?limit=1000', { cache: 'no-store' });
      if (disposed) return;
      if (!response.ok) {
        throw new Error(`Product catalog request failed with status ${response.status}`);
      }

      const result = await response.json() as { success?: boolean; products?: CatalogProduct[] };
      if (disposed) return;
      if (!result.success || !Array.isArray(result.products)) {
        throw new Error('Product catalog response did not contain a product list');
      }

      catalog = result.products;
      installWidgetEnhancement();
    };

    hostObserver.observe(document.body, { childList: true });
    loadCatalog().catch((error) => {
      if (!disposed) {
        console.error('Failed to load products for Zanderio cards:', error);
      }
    });

    return () => {
      disposed = true;
      hostObserver.disconnect();
      widgetObserver?.disconnect();
      const shadowRoot = document.getElementById('zanderio-widget-host')?.shadowRoot;
      shadowRoot?.removeEventListener('scroll', onWidgetScroll, true);
      window.removeEventListener('resize', onWindowResize);
      cardsRoot?.remove();
      widgetStyles?.remove();
    };
  }, []);

  return null;
}
