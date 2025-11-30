import { useState } from 'react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import CatalogSection from '@/components/CatalogSection';
import ContentSections from '@/components/ContentSections';

interface VinylRecord {
  id: number;
  title: string;
  artist: string;
  price: number;
  image: string;
  year: number;
  genre: string;
}

interface CartItem extends VinylRecord {
  quantity: number;
}

const vinylRecords: VinylRecord[] = [
  {
    id: 1,
    title: 'Midnight Sessions',
    artist: 'The Velvet Sound',
    price: 2499,
    image: 'https://cdn.poehali.dev/projects/7aa48dc2-68d0-4c00-938a-204ccc29b50f/files/d3f115a8-3207-43ca-b517-53225ada7fac.jpg',
    year: 2023,
    genre: 'Jazz'
  },
  {
    id: 2,
    title: 'Urban Echoes',
    artist: 'Downtown Collective',
    price: 2199,
    image: 'https://cdn.poehali.dev/projects/7aa48dc2-68d0-4c00-938a-204ccc29b50f/files/0093e76e-6ce8-4257-9624-13c42e7dee46.jpg',
    year: 2022,
    genre: 'Electronic'
  },
  {
    id: 3,
    title: 'Solitude',
    artist: 'Marina Waves',
    price: 2799,
    image: 'https://cdn.poehali.dev/projects/7aa48dc2-68d0-4c00-938a-204ccc29b50f/files/f069c98d-cf06-404d-9775-53bd9a78be88.jpg',
    year: 2024,
    genre: 'Ambient'
  },
  {
    id: 4,
    title: 'Retrograde',
    artist: 'Sonic Archive',
    price: 1899,
    image: 'https://cdn.poehali.dev/projects/7aa48dc2-68d0-4c00-938a-204ccc29b50f/files/d3f115a8-3207-43ca-b517-53225ada7fac.jpg',
    year: 2021,
    genre: 'Rock'
  },
  {
    id: 5,
    title: 'Neon Dreams',
    artist: 'Synthwave Collective',
    price: 2599,
    image: 'https://cdn.poehali.dev/projects/7aa48dc2-68d0-4c00-938a-204ccc29b50f/files/0093e76e-6ce8-4257-9624-13c42e7dee46.jpg',
    year: 2023,
    genre: 'Electronic'
  },
  {
    id: 6,
    title: 'Classical Moments',
    artist: 'Orchestra Prima',
    price: 3199,
    image: 'https://cdn.poehali.dev/projects/7aa48dc2-68d0-4c00-938a-204ccc29b50f/files/f069c98d-cf06-404d-9775-53bd9a78be88.jpg',
    year: 2022,
    genre: 'Classical'
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('catalog');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCheckout, setIsCheckout] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');

  const addToCart = (record: VinylRecord) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === record.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === record.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...record, quantity: 1 }];
    });
    toast.success(`${record.title} добавлен в корзину`);
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const filteredRecords = vinylRecords.filter(record =>
    record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckout = () => {
    if (!selectedPayment) {
      toast.error('Выберите способ оплаты');
      return;
    }
    toast.success('Заказ оформлен! Мы свяжемся с вами в ближайшее время');
    setCart([]);
    setIsCheckout(false);
    setSelectedPayment('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
        getTotalItems={getTotalItems}
        isCheckout={isCheckout}
        setIsCheckout={setIsCheckout}
        selectedPayment={selectedPayment}
        setSelectedPayment={setSelectedPayment}
        handleCheckout={handleCheckout}
      />

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'catalog' && (
          <CatalogSection records={vinylRecords} onAddToCart={addToCart} />
        )}

        <ContentSections
          activeSection={activeSection}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredRecords={filteredRecords}
          onAddToCart={addToCart}
        />
      </main>

      <footer className="border-t mt-24 py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">© 2024 VINYL ARCHIVE. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
