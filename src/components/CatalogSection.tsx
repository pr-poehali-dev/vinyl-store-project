import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface VinylRecord {
  id: number;
  title: string;
  artist: string;
  price: number;
  image: string;
  year: number;
  genre: string;
}

interface CatalogSectionProps {
  records: VinylRecord[];
  onAddToCart: (record: VinylRecord) => void;
}

const CatalogSection = ({ records, onAddToCart }: CatalogSectionProps) => {
  return (
    <div className="animate-fade-in">
      <div className="mb-12">
        <h2 className="text-5xl md:text-7xl font-heading font-bold mb-4">Каталог</h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Коллекция виниловых пластинок для истинных ценителей музыки
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {records.map((record, index) => (
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
                  <Button onClick={() => onAddToCart(record)}>
                    Добавить
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CatalogSection;
