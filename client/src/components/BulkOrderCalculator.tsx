import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, Sparkles, Mail } from "lucide-react";

interface BulkOrderCalculatorProps {
  capType: string;
  capTypeLabel: string;
}

const QUANTITY_PRESETS = [50, 100, 250, 500, 1000, 1500];

// Material-specific base pricing (per unit for 100 units, prices from product pages)
const MATERIAL_PRICING: Record<string, { base: number, colors: Record<number, number>, label: string }> = {
  "silicona": {
    base: 4.45,
    colors: { 1: 4.45, 2: 5.95, 3: 7.50 },
    label: "Gorros de Silicona"
  },
  "latex": {
    base: 2.10,
    colors: { 1: 2.10 },
    label: "Gorros de Látex"
  },
  "gamuza": {
    base: 5.95,
    colors: { 1: 5.95, 2: 7.55, 3: 9.25 },
    label: "Gorros de Gamuza"
  },
  "pelo-largo": {
    base: 6.20,
    colors: { 1: 6.20, 2: 7.55, 3: 9.25 },
    label: "Gorros para Pelo Largo"
  },
  "tela-polyester": {
    base: 2.10,
    colors: { 1: 2.10, 2: 2.60, 3: 3.10 },
    label: "Gorros de Tela/Polyester"
  },
  "tela-lycra": {
    base: 2.10,
    colors: { 1: 2.10, 2: 2.60, 3: 3.10 },
    label: "Gorros de Lycra"
  }
};

// Quantity-based discounts (base prices are for 100 units)
function getQuantityMultiplier(quantity: number): number {
  // Base price is for 100 units, discounts for larger orders
  if (quantity >= 1500) return 0.70;  // -30% discount
  if (quantity >= 1000) return 0.80;  // -20% discount
  if (quantity >= 500) return 0.90;   // -10% discount
  if (quantity >= 250) return 0.95;   // -5% discount
  return 1.00;  // Base price (50-249 units)
}

function isPromoCodeValid(): boolean {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 0-indexed
  
  // Valid for Jan-Feb 2026 only
  return year === 2026 && (month === 1 || month === 2);
}

export default function BulkOrderCalculator({ capType, capTypeLabel }: BulkOrderCalculatorProps) {
  const [selectedMaterial, setSelectedMaterial] = useState(capType);
  const [colorCount, setColorCount] = useState(1);
  const [quantity, setQuantity] = useState(250);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const pricing = MATERIAL_PRICING[selectedMaterial] || MATERIAL_PRICING["silicona"];
  const basePrice = pricing.colors[colorCount] || pricing.base;
  const quantityMultiplier = getQuantityMultiplier(quantity);
  const pricePerUnit = basePrice * quantityMultiplier;
  const subtotal = pricePerUnit * quantity;
  
  // Apply AQUA20 promo code (20% discount, valid Jan-Feb 2026 only)
  const isPromoValid = promoCode.toUpperCase() === "AQUA20" && isPromoCodeValid();
  const discount = isPromoValid && promoApplied ? subtotal * 0.20 : 0;
  const totalPrice = subtotal - discount;

  const handleQuantityChange = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num > 0) {
      setQuantity(num);
    }
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "AQUA20") {
      if (isPromoCodeValid()) {
        setPromoApplied(true);
      } else {
        alert("El código AQUA20 solo es válido en enero y febrero de 2026");
      }
    } else {
      alert("Código promocional no válido");
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-6 w-6 text-blue-600" />
          <CardTitle className="text-2xl">Calculadora de Precio Orientativo</CardTitle>
        </div>
        <CardDescription>
          Calcula el precio estimado de tu pedido de {capTypeLabel}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Material Selector */}
          <div className="space-y-2">
            <Label htmlFor="material" className="text-base font-semibold">
              Tipo de Gorro
            </Label>
            <Select
              value={selectedMaterial}
              onValueChange={(value) => setSelectedMaterial(value)}
            >
              <SelectTrigger id="material" className="h-12 text-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="silicona">Gorros de Silicona</SelectItem>
                <SelectItem value="latex">Gorros de Látex</SelectItem>
                <SelectItem value="gamuza">Gorros de Gamuza</SelectItem>
                <SelectItem value="pelo-largo">Gorros para Pelo Largo</SelectItem>
                <SelectItem value="tela-polyester">Gorros de Tela/Polyester</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Color Count Selector */}
          <div className="space-y-2">
            <Label htmlFor="colorCount" className="text-base font-semibold">
              Número de Colores de Impresión
            </Label>
            <Select
              value={colorCount.toString()}
              onValueChange={(value) => setColorCount(parseInt(value))}
            >
              <SelectTrigger id="colorCount" className="h-12 text-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Color</SelectItem>
                <SelectItem value="2">2 Colores</SelectItem>
                <SelectItem value="3">3 Colores</SelectItem>
                <SelectItem value="4">4 Colores</SelectItem>
                <SelectItem value="5">5 Colores</SelectItem>
                <SelectItem value="6">6 Colores</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quantity Input */}
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-base font-semibold">
              Cantidad de Gorros
            </Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              className="h-12 text-lg"
            />
          </div>
        </div>

        {/* Quantity Presets */}
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Cantidades Comunes:</Label>
          <div className="flex flex-wrap gap-2">
            {QUANTITY_PRESETS.map((preset) => (
              <button
                key={preset}
                onClick={() => setQuantity(preset)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  quantity === preset
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-blue-100 border border-gray-300"
                }`}
              >
                {preset} uds
              </button>
            ))}
          </div>
        </div>

        {/* Promo Code Input */}
        {isPromoCodeValid() && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-yellow-600" />
              <Label className="text-base font-bold text-yellow-800">
                ¡Oferta Especial! 20% de Descuento en tu Primer Pedido
              </Label>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Código: AQUA20"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1"
                disabled={promoApplied}
              />
              <Button 
                onClick={handleApplyPromo}
                disabled={promoApplied}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                {promoApplied ? "✓ Aplicado" : "Aplicar"}
              </Button>
            </div>
            <p className="text-xs text-yellow-700 mt-2">
              Válido solo en enero y febrero de 2026 para nuevos clientes
            </p>
          </div>
        )}

        {/* Price Display */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-300">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Precio por Unidad</p>
              <p className="text-3xl font-bold text-blue-600">
                €{pricePerUnit.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {colorCount} {colorCount === 1 ? "color" : "colores"} de impresión
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Precio Total</p>
              {discount > 0 && (
                <p className="text-lg text-gray-400 line-through">
                  €{subtotal.toFixed(2)}
                </p>
              )}
              <p className="text-3xl font-bold text-green-600">
                €{totalPrice.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {quantity} unidades
              </p>
              {discount > 0 && (
                <p className="text-xs text-green-600 font-bold mt-1">
                  ¡Ahorro de €{discount.toFixed(2)}!
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                ✓ Envío gratuito en Europa
              </span>
              <span className="text-gray-600">
                ✓ Entrega en 3 semanas
              </span>
            </div>
          </div>

          {quantity >= 500 && (
            <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <p className="text-sm text-green-800 font-semibold">
                🎉 ¡Descuento por volumen aplicado! {quantity >= 1500 ? "30%" : quantity >= 1000 ? "20%" : "10%"} de ahorro
              </p>
            </div>
          )}
        </div>

        {/* Orientative Disclaimer */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center">
          <p className="text-sm text-blue-800 font-medium mb-2">
            ⚠️ Precios orientativos. Descuentos adicionales disponibles para pedidos grandes.
          </p>
          <p className="text-xs text-blue-600">
            Los precios finales pueden variar según diseño, colores Pantone específicos y opciones de personalización.
          </p>
        </div>

        {/* Fantastic CTA */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white text-center shadow-xl">
          <h3 className="text-2xl font-bold mb-2">¿Listo para tu Pedido Personalizado?</h3>
          <p className="text-green-100 mb-4">
            Obtén un presupuesto exacto en menos de 24 horas. ¡Sin compromiso!
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-white text-green-600 hover:bg-gray-100 font-bold text-lg px-8 py-6 shadow-lg"
          >
            <a href="mailto:general@aquaevents.club?subject=Presupuesto Gorros Personalizados&body=Hola, me gustaría solicitar un presupuesto para:%0D%0A%0D%0A- Material: {capTypeLabel}%0D%0A- Cantidad: {quantity} unidades%0D%0A- Colores de impresión: {colorCount}%0D%0A%0D%0APor favor, envíenme un presupuesto detallado.%0D%0A%0D%0AGracias">
              <Mail className="mr-2 h-5 w-5" />
              Solicitar Presupuesto Gratis
            </a>
          </Button>
          <p className="text-xs text-green-100 mt-3">
            📧 Respuesta garantizada en 24h | 🎨 Diseño gratuito incluido | 🚚 Envío gratis en Europa
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
