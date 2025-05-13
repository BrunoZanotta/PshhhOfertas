import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { RiInstagramLine, RiShoppingBag2Line } from "react-icons/ri";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <header className="container mx-auto py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <RiInstagramLine className="h-8 w-8 text-[#FF4B91]" />
            <h1 className="text-2xl font-bold">
              <span className="text-[#FF4B91]">Pshhh</span>
              <span className="text-gray-800">OFERTAS</span>
            </h1>
          </div>
          <Link href="/editor">
            <Button className="bg-[#FF4B91] hover:bg-[#ff2a7f]">
              Criar Template
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto flex-1 py-10">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            <span className="text-[#FF4B91]">Pshhh</span>
            <span className="text-gray-800">OFERTAS</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Crie templates profissionais para divulgar promoções no Instagram
          </p>
          <div className="mt-8">
            <Link href="/editor">
              <Button size="lg" className="bg-[#FF4B91] hover:bg-[#ff2a7f] text-lg px-8">
                Começar a criar
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Templates Profissionais</CardTitle>
              <CardDescription>Crie posts 1080x1080 para Instagram</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-64 h-64 bg-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFB6C1]/20 to-white"></div>
                <div className="absolute top-0 left-0 w-12 h-12 bg-[#FF4B91] rounded-br-full opacity-80"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 bg-[#FF4B91] rounded-tl-full opacity-80"></div>
                <div className="text-center z-10">
                  <h3 className="font-bold text-xl">
                    <span className="text-[#FF4B91]">Pshhh</span>
                    <span>OFERTAS</span>
                  </h3>
                  <div className="mt-2 bg-gray-200 rounded-lg p-2 w-32 mx-auto">
                    <div className="text-sm">Imagem do Produto</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Destaques para Ofertas</CardTitle>
              <CardDescription>Destaque seus produtos e preços</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-[#4CBB17]/10 rounded-lg">
                  <div className="bg-[#4CBB17] text-white font-bold py-2 px-3 rounded-md text-sm mr-2">
                    R$ 99,90
                  </div>
                  <div className="text-sm">
                    <span className="line-through text-gray-500">R$ 149,90</span>
                    <span className="text-[#4CBB17] font-bold ml-2">33% OFF</span>
                  </div>
                </div>
                
                <div className="p-3 bg-[#FF4B91]/10 rounded-lg text-center">
                  <p className="font-bold text-[#FF4B91] text-sm mb-1">LINK AFILIADO</p>
                  <div className="bg-[#FF4B91] text-white py-1 px-3 rounded-md text-sm font-bold flex items-center justify-center">
                    <span>bit.ly/oferta-produto</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Múltiplas Plataformas</CardTitle>
              <CardDescription>Promova ofertas de várias lojas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <div className="bg-[#232F3E] py-2 px-3 rounded-lg text-sm text-white font-bold flex items-center">
                  <RiShoppingBag2Line className="mr-2" /> Amazon
                </div>
                <div className="bg-[#FFE600] py-2 px-3 rounded-lg text-sm text-[#2D3277] font-bold flex items-center">
                  <RiShoppingBag2Line className="mr-2" /> Mercado Livre
                </div>
                <div className="bg-[#EE4D2D] py-2 px-3 rounded-lg text-sm text-white font-bold flex items-center">
                  <RiShoppingBag2Line className="mr-2" /> Shopee
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="text-center">
          <Link href="/editor">
            <Button size="lg" className="bg-[#FF4B91] hover:bg-[#ff2a7f]">
              Criar Meu Template Agora
            </Button>
          </Link>
        </section>
      </main>

      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto text-center text-gray-600 text-sm">
          <p>© 2023 PshhhOfertas - Templates para Instagram</p>
        </div>
      </footer>
    </div>
  );
}
