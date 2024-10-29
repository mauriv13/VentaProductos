using System.ComponentModel.DataAnnotations;

namespace VentaProductos.Models;

public class DetalleVenta
{
    public int Id { get; set; }
    
    //[StringLength(100, ErrorMessage = "El Nombre debe contener entre {2} y {1} caracteres.", MinimumLength = 3)]
    public int IdProducto { get; set; }
    public virtual Producto? Producto { get; set; }
    public int IdVenta { get; set; }
    public virtual Venta? Venta { get; set; }

}

