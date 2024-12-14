type Coordenada = {
  latitud: number;
  longitud: number;
};

export type Vendedor = {
  id: number;
  nombre: string;
  cuit: string;
  direccion: string;
  lat: number;
  lng: number;
};
export type VendedorResponse = {
  id: number;
  nombre: string;
  cuit: string;
  direccion: string;
  coordenada: Coordenada;
};
export type Cliente = {
  id: number;
  nombre: string;
  apellido: string;
  cuit: string;
  email: string;
  direccion: string;
  lat: number;
  lng: number;
};
export type ClienteResponse = {
  id: number;
  nombre: string;
  apellido: string;
  cuit: string;
  email: string;
  direccion: string;
  coordenada: Coordenada;
};

type BaseItemMenuResponse = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: "COMIDA" | "BEBIDA";
  vendedor: VendedorResponse;
  esAptoVegano: boolean;
  esAptoCeliaco: boolean;
  peso: number | null;
  volumen: number | null;
  graduacionAlcoholica: number | null;
  esAlcoholica: boolean | null;
  esGaseosa: boolean | null;
};
type ComidaResponse = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  vendedor: VendedorResponse;
  esAptoVegano: boolean;
  esAptoCeliaco: boolean;
  peso: number;
};
type BebidaResponse = ComidaResponse & {
  volumen: number;
  graduacionAlcoholica: number;
  esAlcoholica: boolean;
  esGaseosa: boolean;
};

export type MenuResponse = {
  comidas: ComidaResponse[];
  bebidas: BebidaResponse[];
};
export type Menu = {
  comidas: Comida[];
  bebidas: Bebida[];
};
export type ItemMenu = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: "COMIDA" | "BEBIDA";
  vendedor_id: number;
  vendedor: string;
  esAptoVegano: boolean;
  esAptoCeliaco: boolean;
  peso: number;
  volumen: number | null;
  graduacionAlcoholica: number | null;
  esAlcoholica: boolean | null;
  esGaseosa: boolean | null;
};
export type Comida = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: "COMIDA";
  vendedor_id: number;
  vendedor: string;
  esAptoVegano: boolean;
  esAptoCeliaco: boolean;
  peso: number;
};

export type Bebida = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: "BEBIDA";
  vendedor_id: number;
  vendedor: string;
  esAptoVegano: boolean;
  esAptoCeliaco: boolean;
  volumen: number;
  graduacionAlcoholica: number;
  esAlcoholica: boolean;
  esGaseosa: boolean;
};
type PedidoState = "RECIBIDO" | "ENVIADO" | "PREPARADO" | "ACEPTADO";
export type Pedido = {
  id: number;
  pago: string | null;
  vendedor: string;
  vendedor_id: number;
  cliente: string;
  cliente_id: number;
  precio_total: number;
  estado: PedidoState;
};
type PagoMethod = "TRANSFERENCIA" | "MERCADO_PAGO";
type Pago = {
  id: number;
  fecha: string;
  precioTotalSinRecargo: number;
  precioTotalConRecargo: number;
  metodo: PagoMethod;
};
export type ItemPedidoResponse = {
  id: {
    itemMenu: BaseItemMenuResponse;
    pedido: number;
  };
  cantidad: number;
  precio_total: number;
};
export type PedidoResponse = {
  id: number;
  pago: Pago;
  vendedor: VendedorResponse;
  cliente: ClienteResponse;
  precioAcumulado: number;
  estado: PedidoState;
  items: ItemPedidoResponse[];
};
export interface ItemMenuAdvancedFilters {
  esAptoVegano?: boolean;
  esAptoCeliaco?: boolean;
  esAlcoholica?: boolean;
  esGaseosa?: boolean;
  soloComidas?: boolean;
  soloBebidas?: boolean;
  precioMin?: number;
  precioMax?: number;
  pesoMin?: number;
  pesoMax?: number;
  volumenMin?: number;
  volumenMax?: number;
  graduacionAlcoholicaMin?: number;
  graduacionAlcoholicaMax?: number;
}
