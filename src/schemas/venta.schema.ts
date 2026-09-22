import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VentaDocument = Venta & Document;

@Schema({ timestamps: true })
export class ProductoVendido {
  @Prop({ required: true })
  productoId: string;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  cantidad: number;

  @Prop({ required: true })
  precioUnitario: number;
}

@Schema({ timestamps: true })
export class Venta {
  @Prop({ required: true, unique: true })
  ordenId: string;

  @Prop({ required: true })
  usuarioId: string;

  @Prop({ type: [ProductoVendido], required: true })
  productos: ProductoVendido[];

  @Prop({ required: true })
  montoTotal: number;

  @Prop({ default: Date.now })
  fecha: Date;
}

export const VentaSchema = SchemaFactory.createForClass(Venta);