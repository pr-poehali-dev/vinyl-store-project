import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import CartSheet from './CartSheet';

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

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cart: CartItem[];
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  isCheckout: boolean;
  setIsCheckout: (value: boolean) => void;
  selectedPayment: string;
  setSelectedPayment: (value: string) => void;
  handleCheckout: () => void;
}

const Header = ({
  activeSection,
  setActiveSection,
  cart,
  updateQuantity,
  removeFromCart,
  getTotalPrice,
  getTotalItems,
  isCheckout,
  setIsCheckout,
  selectedPayment,
  setSelectedPayment,
  handleCheckout
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-heading font-bold tracking-tight">VINYL ARCHIVE</h1>
          
          <nav className="hidden md:flex items-center gap-8">
            {['catalog', 'search', 'about', 'delivery', 'faq', 'contacts'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-foreground ${
                  activeSection === section ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {section === 'catalog' && 'Каталог'}
                {section === 'search' && 'Поиск'}
                {section === 'about' && 'О нас'}
                {section === 'delivery' && 'Доставка'}
                {section === 'faq' && 'FAQ'}
                {section === 'contacts' && 'Контакты'}
              </button>
            ))}
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg animate-slide-in-right">
              <SheetHeader>
                <SheetTitle className="font-heading text-2xl">
                  {isCheckout ? 'Оформление заказа' : 'Корзина'}
                </SheetTitle>
              </SheetHeader>

              <CartSheet
                cart={cart}
                isCheckout={isCheckout}
                setIsCheckout={setIsCheckout}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                getTotalPrice={getTotalPrice}
                getTotalItems={getTotalItems}
                selectedPayment={selectedPayment}
                setSelectedPayment={setSelectedPayment}
                handleCheckout={handleCheckout}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
