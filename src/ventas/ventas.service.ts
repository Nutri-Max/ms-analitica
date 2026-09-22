import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Venta, VentaDocument } from '../schemas/venta.schema';

@Injectable()
export class VentasService {
  constructor(
    @InjectModel(Venta.name) private ventaModel: Model<VentaDocument>,
  ) {}

  async registrarVenta(datos: Partial<Venta>): Promise<Venta> {
    const nuevaVenta = new this.ventaModel(datos);
    return nuevaVenta.save();
  }

  async obtenerTodas(): Promise<Venta[]> {
    return this.ventaModel.find().exec();
  }

  async obtenerPorId(ordenId: string): Promise<Venta | null> {
    return this.ventaModel.findOne({ ordenId }).exec();
  }

  async totalVentas(): Promise<{ totalVentas: number; montoAcumulado: number }> {
    const ventas = await this.ventaModel.find().exec();
    const montoAcumulado = ventas.reduce((sum, v) => sum + v.montoTotal, 0);
    return { totalVentas: ventas.length, montoAcumulado };
  }
}