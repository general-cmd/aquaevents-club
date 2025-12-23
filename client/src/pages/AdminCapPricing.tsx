import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";

interface PricingForm {
  id?: string;
  capType: string;
  colorCount: number;
  minQuantity: number;
  maxQuantity: number | null;
  pricePerUnit: string;
  currency: string;
}

const CAP_TYPES = [
  { value: "silicona", label: "Silicona" },
  { value: "latex", label: "Látex" },
  { value: "gamuza", label: "Gamuza" },
  { value: "pelo-largo", label: "Pelo Largo" },
  { value: "tela-polyester", label: "Tela Poliéster" },
  { value: "tela-lycra", label: "Tela Lycra" },
];

export default function AdminCapPricing() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PricingForm | null>(null);
  const [formData, setFormData] = useState<PricingForm>({
    capType: "silicona",
    colorCount: 1,
    minQuantity: 50,
    maxQuantity: null,
    pricePerUnit: "0.00",
    currency: "EUR",
  });

  const utils = trpc.useUtils();
  const { data: pricingList, isLoading } = trpc.capManagement.admin.pricing.getAll.useQuery();

  const createMutation = trpc.capManagement.admin.pricing.create.useMutation({
    onSuccess: () => {
      toast.success("Precio creado correctamente");
      utils.capManagement.admin.pricing.getAll.invalidate();
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const updateMutation = trpc.capManagement.admin.pricing.update.useMutation({
    onSuccess: () => {
      toast.success("Precio actualizado correctamente");
      utils.capManagement.admin.pricing.getAll.invalidate();
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const deleteMutation = trpc.capManagement.admin.pricing.delete.useMutation({
    onSuccess: () => {
      toast.success("Precio eliminado correctamente");
      utils.capManagement.admin.pricing.getAll.invalidate();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const resetForm = () => {
    setFormData({
      capType: "silicona",
      colorCount: 1,
      minQuantity: 50,
      maxQuantity: null,
      pricePerUnit: "0.00",
      currency: "EUR",
    });
    setEditingItem(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingItem?.id) {
      updateMutation.mutate({
        id: editingItem.id,
        ...formData,
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      id: item.id,
      capType: item.capType,
      colorCount: item.colorCount,
      minQuantity: item.minQuantity,
      maxQuantity: item.maxQuantity,
      pricePerUnit: item.pricePerUnit,
      currency: item.currency,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este precio?")) {
      deleteMutation.mutate({ id });
    }
  };

  const handleOpenDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Precios - Gorros</h1>
          <p className="text-gray-600 mt-2">Administra los precios de gorros personalizados</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Precio
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Editar Precio" : "Nuevo Precio"}</DialogTitle>
              <DialogDescription>
                Define los precios por tipo de gorro, cantidad de colores y rango de cantidad
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="capType">Tipo de Gorro</Label>
                    <Select
                      value={formData.capType}
                      onValueChange={(value) => setFormData({ ...formData, capType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CAP_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="colorCount">Número de Colores</Label>
                    <Input
                      id="colorCount"
                      type="number"
                      min="1"
                      max="6"
                      value={formData.colorCount}
                      onChange={(e) =>
                        setFormData({ ...formData, colorCount: parseInt(e.target.value) })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minQuantity">Cantidad Mínima</Label>
                    <Input
                      id="minQuantity"
                      type="number"
                      min="1"
                      value={formData.minQuantity}
                      onChange={(e) =>
                        setFormData({ ...formData, minQuantity: parseInt(e.target.value) })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxQuantity">Cantidad Máxima (opcional)</Label>
                    <Input
                      id="maxQuantity"
                      type="number"
                      placeholder="Dejar vacío para ilimitado"
                      value={formData.maxQuantity || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxQuantity: e.target.value ? parseInt(e.target.value) : null,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pricePerUnit">Precio por Unidad (€)</Label>
                    <Input
                      id="pricePerUnit"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.pricePerUnit}
                      onChange={(e) =>
                        setFormData({ ...formData, pricePerUnit: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency">Moneda</Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value) => setFormData({ ...formData, currency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingItem ? "Actualizar" : "Crear"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Precios</CardTitle>
          <CardDescription>Todos los precios configurados para gorros personalizados</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Cargando...</div>
          ) : pricingList && pricingList.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo de Gorro</TableHead>
                  <TableHead>Colores</TableHead>
                  <TableHead>Cantidad Mín</TableHead>
                  <TableHead>Cantidad Máx</TableHead>
                  <TableHead>Precio/Unidad</TableHead>
                  <TableHead>Moneda</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pricingList.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {CAP_TYPES.find((t) => t.value === item.capType)?.label || item.capType}
                    </TableCell>
                    <TableCell>{item.colorCount}</TableCell>
                    <TableCell>{item.minQuantity}</TableCell>
                    <TableCell>{item.maxQuantity || "Ilimitado"}</TableCell>
                    <TableCell>€{parseFloat(item.pricePerUnit).toFixed(2)}</TableCell>
                    <TableCell>{item.currency}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(item)}
                        className="mr-2"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No hay precios configurados. Crea el primero.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
