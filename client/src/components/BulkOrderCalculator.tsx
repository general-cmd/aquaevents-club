import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calculator } from "lucide-react";

interface BulkOrderCalculatorProps {
  capType: string;
  capTypeLabel: string;
}

const QUANTITY_PRESETS = [50, 100, 250, 500, 1000, 1500];

export default function BulkOrderCalculator({ capType, capTypeLabel }: BulkOrderCalculatorProps) {
  const [colorCount, setColorCount] = useState(1);
  const [quantity, setQuantity] = useState(100);

  const { data: priceData, isLoading } = trpc.capManagement.pricing.calculatePrice.useQuery(
    {
      capType,
      colorCount,
      quantity,
    },
    {
      enabled: quantity > 0 && colorCount > 0,
    }
  );

  const handleQuantityChange = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num > 0) {
      setQuantity(num);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-6 w-6 text-blue-600" />
          <CardTitle className="text-2xl">Calculadora de Precio</CardTitle>
        </div>
        <CardDescription>
          Calcula el precio de tu pedido de {capTypeLabel} en tiempo real
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* Price Display */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Calculando precio...</p>
          </div>
        ) : priceData ? (
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-300">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Precio por Unidad</p>
                <p className="text-3xl font-bold text-blue-600">
                  €{priceData.pricePerUnit.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {colorCount} {colorCount === 1 ? "color" : "colores"} de impresión
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Precio Total</p>
                <p className="text-3xl font-bold text-green-600">
                  €{priceData.totalPrice.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {quantity} unidades
                </p>
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

            {priceData.minQuantity && (
              <div className="mt-3 text-xs text-gray-500 text-center">
                Rango de cantidad: {priceData.minQuantity}
                {priceData.maxQuantity ? ` - ${priceData.maxQuantity}` : "+"} unidades
              </div>
            )}
          </div>
        ) : (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 text-center">
            <p className="text-yellow-800 font-medium">
              No hay precios configurados para esta combinación
            </p>
            <p className="text-sm text-yellow-700 mt-2">
              Por favor, contacta con nosotros para un presupuesto personalizado
            </p>
          </div>
        )}

        <div className="text-center text-sm text-gray-600 mt-4">
          <p>
            * Los precios incluyen personalización e impresión. Descuentos adicionales disponibles
            para pedidos grandes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
