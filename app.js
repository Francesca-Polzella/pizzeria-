class Pizza {
    static TAMANOS = {
        PEQUENA: { diametro: 10, multiplicadorExtras: 1 },
        MEDIANA: { diametro: 14, multiplicadorExtras: 2 },
        GRANDE: { diametro: 16, multiplicadorExtras: 4 }
    };

    static COSTO_HARINA_POR_CM = 0.03;

    constructor(tamano, ingredientesExtras, costoManoObra, costoBaseExtra) {
        this.validarEntradas(tamano, ingredientesExtras, costoManoObra, costoBaseExtra);
        
        this.tamano = tamano;
        this.ingredientesExtras = ingredientesExtras;
        this.costoManoObra = costoManoObra;
        this.costoBaseExtra = costoBaseExtra;
    }

    validarEntradas(tamano, ingredientesExtras, costoManoObra, costoBaseExtra) {
        if (!Pizza.TAMANOS[tamano]) {
            throw new Error('Tamaño de pizza inválido');
        }
        if (!Array.isArray(ingredientesExtras)) {
            throw new Error('Ingredientes extras debe ser un array');
        }
        if (costoManoObra <= 0 || costoBaseExtra < 0) {
            throw new Error('Los costos deben ser valores positivos');
        }
    }

    calcularArea() {
        const radio = Pizza.TAMANOS[this.tamano].diametro / 2;
        return Math.PI * Math.pow(radio, 2);
    }

    calcularCostoHarina() {
        return this.calcularArea() * Pizza.COSTO_HARINA_POR_CM;
    }

    calcularCostoExtras() {
        return this.ingredientesExtras.length * 
               this.costoBaseExtra * 
               Pizza.TAMANOS[this.tamano].multiplicadorExtras;
    }

    calcularCostoTotal() {
        const costoPreparacion = this.costoManoObra + 
                                this.calcularCostoHarina() + 
                                this.calcularCostoExtras();
        return costoPreparacion * 1.5;
    }
}

document.getElementById('pizzaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const tamano = document.getElementById('tamano').value;
    const costoManoObra = parseFloat(document.getElementById('costoManoObra').value);
    const costoBaseExtra = parseFloat(document.getElementById('costoBaseExtra').value);
    
    // Obtener ingredientes seleccionados
    const ingredientes = ['champinones', 'jamon', 'aceitunas', 'anchoas', 'salchichon']
        .filter(ing => document.getElementById(ing).checked);

    try {
        const pizza = new Pizza(tamano, ingredientes, costoManoObra, costoBaseExtra);
        const costoTotal = pizza.calcularCostoTotal();

        // Mostrar resultados
        document.getElementById('resultado').style.display = 'block';
        document.getElementById('resumenPedido').innerHTML = `
            Tamaño: ${tamano.toLowerCase()}<br>
            Ingredientes extras: ${ingredientes.length > 0 ? ingredientes.join(', ') : 'ninguno'}<br>
            Costo de mano de obra: $${costoManoObra.toFixed(2)}<br>
            Costo base por extra: $${costoBaseExtra.toFixed(2)}
        `;
        document.getElementById('costoTotal').innerHTML = `
            <strong>Costo total de la pizza: $${costoTotal.toFixed(2)}</strong>
        `;
    } catch (error) {
        alert('Error: ' + error.message);
    }
});