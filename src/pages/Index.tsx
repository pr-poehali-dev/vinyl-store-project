import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

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

                {!isCheckout ? (
                  <div className="mt-8 flex flex-col h-[calc(100vh-12rem)]">
                    {cart.length === 0 ? (
                      <div className="flex-1 flex items-center justify-center">
                        <p className="text-muted-foreground">Корзина пуста</p>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 overflow-y-auto space-y-4">
                          {cart.map((item) => (
                            <Card key={item.id} className="animate-fade-in">
                              <CardContent className="p-4">
                                <div className="flex gap-4">
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-20 h-20 object-cover"
                                  />
                                  <div className="flex-1">
                                    <h3 className="font-heading font-semibold">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.artist}</p>
                                    <p className="text-sm font-medium mt-1">{item.price} ₽</p>
                                    <div className="flex items-center gap-2 mt-2">
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      >
                                        <Icon name="Minus" size={14} />
                                      </Button>
                                      <span className="w-8 text-center">{item.quantity}</span>
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      >
                                        <Icon name="Plus" size={14} />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 ml-auto"
                                        onClick={() => removeFromCart(item.id)}
                                      >
                                        <Icon name="X" size={14} />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        <div className="border-t pt-4 space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-heading font-semibold">Итого:</span>
                            <span className="text-2xl font-heading font-bold">{getTotalPrice()} ₽</span>
                          </div>
                          <Button
                            className="w-full"
                            size="lg"
                            onClick={() => setIsCheckout(true)}
                          >
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="mt-8 space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-heading font-semibold">Способ оплаты</h3>
                      <div className="space-y-2">
                        {[
                          { id: 'card', label: 'Банковская карта', icon: 'CreditCard' },
                          { id: 'wallet', label: 'Электронный кошелек', icon: 'Wallet' },
                          { id: 'transfer', label: 'Банковский перевод', icon: 'Building' }
                        ].map((method) => (
                          <button
                            key={method.id}
                            onClick={() => setSelectedPayment(method.id)}
                            className={`w-full p-4 border rounded-lg flex items-center gap-3 transition-colors ${
                              selectedPayment === method.id
                                ? 'border-foreground bg-accent text-accent-foreground'
                                : 'border-border hover:border-foreground'
                            }`}
                          >
                            <Icon name={method.icon as any} size={20} />
                            <span className="font-medium">{method.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t">
                      <div className="flex justify-between text-sm">
                        <span>Товаров: {getTotalItems()}</span>
                        <span>{getTotalPrice()} ₽</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Доставка:</span>
                        <span>Бесплатно</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-lg font-heading font-semibold">Итого:</span>
                        <span className="text-2xl font-heading font-bold">{getTotalPrice()} ₽</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleCheckout}
                      >
                        Оплатить
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setIsCheckout(false)}
                      >
                        Назад к корзине
                      </Button>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'catalog' && (
          <div className="animate-fade-in">
            <div className="mb-12">
              <h2 className="text-5xl md:text-7xl font-heading font-bold mb-4">Каталог</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Коллекция виниловых пластинок для истинных ценителей музыки
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vinylRecords.map((record, index) => (
                <Card key={record.id} className="group overflow-hidden animate-fade-in hover-scale" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={record.image}
                        alt={record.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <div>
                        <h3 className="text-xl font-heading font-bold mb-1">{record.title}</h3>
                        <p className="text-muted-foreground">{record.artist}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline">{record.genre}</Badge>
                        <span>{record.year}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-2xl font-heading font-bold">{record.price} ₽</span>
                        <Button onClick={() => addToCart(record)}>
                          Добавить
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'search' && (
          <div className="animate-fade-in">
            <div className="mb-12">
              <h2 className="text-5xl md:text-7xl font-heading font-bold mb-4">Поиск</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Найдите свою любимую пластинку
              </p>
              <div className="max-w-2xl">
                <div className="relative">
                  <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input
                    type="text"
                    placeholder="Поиск по названию, исполнителю или жанру..."
                    className="pl-10 h-12 text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {searchQuery && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <Card key={record.id} className="group overflow-hidden animate-scale-in hover-scale">
                      <CardContent className="p-0">
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={record.image}
                            alt={record.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-6 space-y-3">
                          <div>
                            <h3 className="text-xl font-heading font-bold mb-1">{record.title}</h3>
                            <p className="text-muted-foreground">{record.artist}</p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline">{record.genre}</Badge>
                            <span>{record.year}</span>
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-2xl font-heading font-bold">{record.price} ₽</span>
                            <Button onClick={() => addToCart(record)}>
                              Добавить
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="col-span-full text-center text-muted-foreground py-12">
                    Ничего не найдено
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {activeSection === 'about' && (
          <div className="animate-fade-in max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-heading font-bold mb-8">О нас</h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                VINYL ARCHIVE — это специализированный магазин виниловых пластинок, 
                основанный группой энтузиастов и ценителей аналогового звука.
              </p>
              <p>
                Мы тщательно отбираем каждую пластинку в нашей коллекции, 
                гарантируя высокое качество звучания и аутентичность записей.
              </p>
              <p>
                Наша миссия — сохранить культуру виниловых пластинок и сделать 
                качественную музыку доступной для всех, кто ценит настоящий звук.
              </p>
            </div>
          </div>
        )}

        {activeSection === 'delivery' && (
          <div className="animate-fade-in max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-heading font-bold mb-8">Доставка</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-foreground pl-6 py-2">
                <h3 className="text-2xl font-heading font-bold mb-2">По России</h3>
                <p className="text-muted-foreground">
                  Бесплатная доставка при заказе от 5000 ₽. 
                  Срок доставки: 3-7 рабочих дней.
                </p>
              </div>
              <div className="border-l-4 border-foreground pl-6 py-2">
                <h3 className="text-2xl font-heading font-bold mb-2">По Москве</h3>
                <p className="text-muted-foreground">
                  Курьерская доставка в день заказа при оформлении до 14:00.
                  Стоимость: 300 ₽.
                </p>
              </div>
              <div className="border-l-4 border-foreground pl-6 py-2">
                <h3 className="text-2xl font-heading font-bold mb-2">Самовывоз</h3>
                <p className="text-muted-foreground">
                  Вы можете забрать заказ самостоятельно из нашего шоурума 
                  в центре Москвы. Бесплатно.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'faq' && (
          <div className="animate-fade-in max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-heading font-bold mb-8">Вопросы и ответы</h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border px-6 rounded-lg">
                <AccordionTrigger className="text-left font-heading font-semibold hover:no-underline">
                  Как я могу оплатить заказ?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Мы принимаем оплату банковскими картами, электронными кошельками 
                  и банковскими переводами. Все платежи защищены и проходят через 
                  безопасные каналы.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border px-6 rounded-lg">
                <AccordionTrigger className="text-left font-heading font-semibold hover:no-underline">
                  В каком состоянии пластинки?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Все пластинки в нашем каталоге новые или в идеальном состоянии. 
                  Мы тщательно проверяем качество каждой записи перед отправкой.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border px-6 rounded-lg">
                <AccordionTrigger className="text-left font-heading font-semibold hover:no-underline">
                  Могу ли я вернуть пластинку?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Да, вы можете вернуть товар в течение 14 дней с момента получения, 
                  если пластинка не вскрыта и сохранена оригинальная упаковка.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border px-6 rounded-lg">
                <AccordionTrigger className="text-left font-heading font-semibold hover:no-underline">
                  Как работает поиск через Shazam?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Функция интеграции с Shazam находится в разработке. Скоро вы сможете 
                  найти пластинку, просто включив понравившуюся композицию рядом с телефоном.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="animate-fade-in max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-heading font-bold mb-8">Контакты</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Icon name="MapPin" size={24} className="mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-xl mb-1">Адрес шоурума</h3>
                  <p className="text-muted-foreground">Москва, ул. Примерная, д. 1</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Icon name="Phone" size={24} className="mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-xl mb-1">Телефон</h3>
                  <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Icon name="Mail" size={24} className="mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-xl mb-1">Email</h3>
                  <p className="text-muted-foreground">info@vinylarchive.ru</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Icon name="Clock" size={24} className="mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-xl mb-1">Режим работы</h3>
                  <p className="text-muted-foreground">Пн-Пт: 10:00 - 20:00</p>
                  <p className="text-muted-foreground">Сб-Вс: 11:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>
        )}
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
