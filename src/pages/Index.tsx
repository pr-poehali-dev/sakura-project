import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });

  const services = [
    {
      id: 1,
      title: "Японский массаж",
      description: "Традиционный расслабляющий массаж с использованием натуральных масел",
      duration: "60 мин",
      price: "4 500 ₽",
      image: "/img/95022065-e8a7-4390-b664-b3daf8fc2cb1.jpg"
    },
    {
      id: 2,
      title: "Спа-ритуал Сакура",
      description: "Комплексная процедура с цветочными экстрактами для полного расслабления",
      duration: "90 мин",
      price: "6 800 ₽",
      image: "/img/a3f71952-edfa-46f2-a55d-20074ab3a0c5.jpg"
    },
    {
      id: 3,
      title: "Гидротерапия",
      description: "Омолаживающие водные процедуры в японском стиле",
      duration: "45 мин",
      price: "3 200 ₽",
      image: "/img/710d572f-8963-4b24-ab6f-b826b3d41830.jpg"
    },
    {
      id: 4,
      title: "Ароматерапия",
      description: "Процедуры с использованием эфирных масел и японских благовоний",
      duration: "50 мин",
      price: "3 800 ₽",
      image: "/img/bf6c45cf-56c5-4fc2-af30-dc8523d9091f.jpg"
    }
  ];

  const promotions = [
    {
      title: "Первое посещение -30%",
      description: "Скидка на любую процедуру для новых клиентов",
      validUntil: "До 31 декабря",
      discount: "30%"
    },
    {
      title: "Спа-день для двоих",
      description: "Комплекс процедур для пары со скидкой",
      validUntil: "Весь месяц",
      discount: "25%"
    }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking submitted:', bookingForm);
    alert('Спасибо! Мы свяжемся с вами для подтверждения записи.');
    setBookingForm({
      name: '',
      email: '',
      phone: '',
      service: '',
      date: '',
      time: '',
      message: ''
    });
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-spa-cream">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-spa-white/95 backdrop-blur-sm border-b border-spa-terracotta/20 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🌸</div>
              <h1 className="text-2xl font-playfair font-bold text-spa-charcoal">Сакура</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'services', label: 'Услуги' },
                { id: 'prices', label: 'Цены' },
                { id: 'promotions', label: 'Акции' },
                { id: 'contacts', label: 'Контакты' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-medium transition-colors hover:text-spa-terracotta ${
                    activeSection === item.id ? 'text-spa-terracotta' : 'text-spa-charcoal'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-spa-terracotta hover:bg-spa-terracotta/90 text-white font-medium">
                  Записаться
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-playfair text-xl">Онлайн запись</DialogTitle>
                  <DialogDescription>
                    Выберите услугу и удобное время для посещения
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Имя</Label>
                      <Input
                        id="name"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="service">Услуга</Label>
                    <Select onValueChange={(value) => setBookingForm({...bookingForm, service: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите услугу" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.title}>
                            {service.title} - {service.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Дата</Label>
                      <Input
                        id="date"
                        type="date"
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Время</Label>
                      <Select onValueChange={(value) => setBookingForm({...bookingForm, time: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите время" />
                        </SelectTrigger>
                        <SelectContent>
                          {['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'].map((time) => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Комментарий</Label>
                    <Textarea
                      id="message"
                      placeholder="Дополнительные пожелания..."
                      value={bookingForm.message}
                      onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-spa-terracotta hover:bg-spa-terracotta/90">
                    Подтвердить запись
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-playfair font-bold text-spa-charcoal mb-6 animate-fade-in">
              Оазис спокойствия и красоты
            </h2>
            <p className="text-xl text-spa-charcoal/80 mb-8 max-w-2xl mx-auto animate-fade-in">
              Откройте для себя мир японских спа-традиций в атмосфере умиротворения и гармонии
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-spa-terracotta hover:bg-spa-terracotta/90 text-white px-8 py-3">
                    <Icon name="Calendar" className="mr-2" size={20} />
                    Записаться на процедуру
                  </Button>
                </DialogTrigger>
              </Dialog>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => scrollToSection('services')}
                className="border-spa-terracotta text-spa-terracotta hover:bg-spa-terracotta hover:text-white px-8 py-3"
              >
                Узнать о услугах
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 bg-spa-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-playfair font-bold text-spa-charcoal mb-4">Наши услуги</h3>
            <p className="text-lg text-spa-charcoal/70 max-w-2xl mx-auto">
              Авторские программы, созданные на основе древних японских традиций ухода за телом и душой
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={service.id} className="border-spa-terracotta/20 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                <CardHeader className="pb-4">
                  <div className="w-full h-48 rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardTitle className="font-playfair text-xl text-spa-charcoal">{service.title}</CardTitle>
                  <CardDescription className="text-spa-charcoal/70">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-spa-charcoal/60">
                      <Icon name="Clock" size={16} className="inline mr-1" />
                      {service.duration}
                    </span>
                    <span className="text-lg font-semibold text-spa-terracotta">{service.price}</span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full border-spa-terracotta text-spa-terracotta hover:bg-spa-terracotta hover:text-white">
                        Записаться
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Prices Section */}
      <section id="prices" className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-playfair font-bold text-spa-charcoal mb-8">Прайс-лист</h3>
          <div className="max-w-2xl mx-auto">
            <Card className="border-spa-terracotta/20">
              <CardHeader>
                <CardTitle className="font-playfair text-2xl text-spa-charcoal">Базовые услуги</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="flex justify-between items-center py-2 border-b border-spa-cream last:border-b-0">
                    <div className="text-left">
                      <div className="font-medium text-spa-charcoal">{service.title}</div>
                      <div className="text-sm text-spa-charcoal/60">{service.duration}</div>
                    </div>
                    <div className="text-lg font-semibold text-spa-terracotta">{service.price}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section id="promotions" className="py-16 px-4 bg-spa-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-playfair font-bold text-spa-charcoal mb-4">Акции и предложения</h3>
            <p className="text-lg text-spa-charcoal/70">Специальные предложения для наших гостей</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {promotions.map((promo, index) => (
              <Card key={index} className="border-spa-terracotta/20 bg-gradient-to-br from-spa-cream to-spa-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-playfair text-xl text-spa-charcoal">{promo.title}</CardTitle>
                    <div className="bg-spa-terracotta text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{promo.discount}
                    </div>
                  </div>
                  <CardDescription className="text-spa-charcoal/70">
                    {promo.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-spa-charcoal/60">{promo.validUntil}</span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-spa-terracotta hover:bg-spa-terracotta/90 text-white">
                          Воспользоваться
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-playfair font-bold text-spa-charcoal mb-4">Контакты</h3>
            <p className="text-lg text-spa-charcoal/70">Мы ждем вас в нашем уютном спа-центре</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-6">
              <Card className="border-spa-terracotta/20">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Icon name="MapPin" className="text-spa-terracotta" size={20} />
                      <div>
                        <div className="font-medium text-spa-charcoal">Адрес</div>
                        <div className="text-spa-charcoal/70">ул. Цветочная, 15, Москва</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Icon name="Phone" className="text-spa-terracotta" size={20} />
                      <div>
                        <div className="font-medium text-spa-charcoal">Телефон</div>
                        <div className="text-spa-charcoal/70">+7 (495) 123-45-67</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Icon name="Mail" className="text-spa-terracotta" size={20} />
                      <div>
                        <div className="font-medium text-spa-charcoal">Email</div>
                        <div className="text-spa-charcoal/70">info@sakura-spa.ru</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Icon name="Clock" className="text-spa-terracotta" size={20} />
                      <div>
                        <div className="font-medium text-spa-charcoal">Часы работы</div>
                        <div className="text-spa-charcoal/70">Ежедневно: 9:00 - 21:00</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="border-spa-terracotta/20">
                <CardHeader>
                  <CardTitle className="font-playfair text-xl text-spa-charcoal">Обратная связь</CardTitle>
                  <CardDescription>Напишите нам, и мы обязательно ответим</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="contact-name">Имя</Label>
                    <Input id="contact-name" placeholder="Ваше имя" />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email</Label>
                    <Input id="contact-email" type="email" placeholder="ваш@email.ru" />
                  </div>
                  <div>
                    <Label htmlFor="contact-message">Сообщение</Label>
                    <Textarea id="contact-message" placeholder="Ваше сообщение..." rows={4} />
                  </div>
                  <Button className="w-full bg-spa-terracotta hover:bg-spa-terracotta/90 text-white">
                    Отправить сообщение
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-spa-charcoal text-spa-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="text-2xl">🌸</div>
            <h1 className="text-2xl font-playfair font-bold">Сакура</h1>
          </div>
          <p className="text-spa-white/70 mb-4">
            Спа-салон премиум класса • Японские традиции красоты и здоровья
          </p>
          <div className="text-sm text-spa-white/50">
            © 2024 Спа-салон Сакура. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;