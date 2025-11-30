import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

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

interface CartSheetProps {
  cart: CartItem[];
  isCheckout: boolean;
  setIsCheckout: (value: boolean) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  selectedPayment: string;
  setSelectedPayment: (value: string) => void;
  handleCheckout: () => void;
}

const CartSheet = ({
  cart,
  isCheckout,
  setIsCheckout,
  updateQuantity,
  removeFromCart,
  getTotalPrice,
  getTotalItems,
  selectedPayment,
  setSelectedPayment,
  handleCheckout
}: CartSheetProps) => {
  if (!isCheckout) {
    return (
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
    );
  }

  return (
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
  );
};

export default CartSheet;
