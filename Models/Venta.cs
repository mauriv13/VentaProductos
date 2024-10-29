using System.ComponentModel.DataAnnotations;

namespace VentaProductos.Models;

public class Venta
{
    public int Id { get; set; }
    
    //[StringLength(100, ErrorMessage = "El Nombre debe contener entre {2} y {1} caracteres.", MinimumLength = 3)]
    public DateTime FechaVenta { get; set; }
    public bool Finalizada { get; set; }
    public int IdCliente { get; set; }
    public virtual Cliente? Cliente { get; set; }

    public virtual ICollection<DetalleVenta>? DetalleVenta { get; set; }


}

