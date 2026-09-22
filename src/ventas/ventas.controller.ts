import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { Venta } from '../schemas/venta.schema';

@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post()
  async registrar(@Body() datos: Partial<Venta>) {
    return this.ventasService.registrarVenta(datos);
  }

  @Get()
  async obtenerTodas() {
    return this.ventasService.obtenerTodas();
  }

  @Get('reporte/total')
  async totalVentas() {
    return this.ventasService.totalVentas();
  }

  @Get(':ordenId')
  async obtenerPorId(@Param('ordenId') ordenId: string) {
    return this.ventasService.obtenerPorId(ordenId);
  }
}