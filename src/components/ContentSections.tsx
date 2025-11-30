import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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

interface ContentSectionsProps {
  activeSection: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredRecords: VinylRecord[];
  onAddToCart: (record: VinylRecord) => void;
}

const ContentSections = ({
  activeSection,
  searchQuery,
  setSearchQuery,
  filteredRecords,
  onAddToCart
}: ContentSectionsProps) => {
  if (activeSection === 'search') {
    return (
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
                        <Button onClick={() => onAddToCart(record)}>
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
    );
  }

  if (activeSection === 'about') {
    return (
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
    );
  }

  if (activeSection === 'delivery') {
    return (
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
    );
  }

  if (activeSection === 'faq') {
    return (
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
    );
  }

  if (activeSection === 'contacts') {
    return (
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
    );
  }

  return null;
};

export default ContentSections;
