class Item{

    constructor(nombre,categoria,precio,stock){

        this.nombre=nombre;
        this.precio=precio;
        this.stock=stock;
        this.categoria=categoria

    }
}

class IngresoEgreso{

    constructor(tipo,descripcion,monto){

        this.monto=monto;
        this.descripcion=descripcion;
        this.tipo=tipo;
    }
}

class FacturacionDiaria{

    constructor(fecha,ingresos,egresos){

        this.fecha=fecha;
        this.ingresos=ingresos;
        this.egresos=egresos;
    }
}

document.getElementById('update').onclick=()=>agregarItem();

function agregarItem(){

    let listaDeItems;
    if(!localStorage.getItem('stock')) {
        listaDeItems=[]
    }else{

        listaDeItems=JSON.parse(localStorage.getItem('stock'));
    }

    let item=new Item();
    
    item.nombre=document.getElementById('nombre').value;
    item.precio=document.getElementById('precio').value;
    item.stock=document.getElementById('stock').value;
    item.categoria=document.getElementById('categoria').value;

    if(item.nombre==''||item.nombre==null||
        item.precio==''||item.precio==null||
        item.stock==''||item.stock==null){
            document.getElementById('confirmacion').innerHTML=`<p>Por favor, llene todos los campos</p><input type='button' value='X'  id='close'>`
        }
        else {
            listaDeItems.push(item);
            localStorage.setItem('stock',JSON.stringify(listaDeItems));
            document.getElementById('nombre').value='';
            document.getElementById('precio').value='';
            document.getElementById('stock').value='';
            document.getElementById('categoria').value='';
            document.getElementById('confirmacion').innerHTML=`
            <p>Producto agregado exitosamente</p><input type='button' value='X' id='close'>`
            
        }

    document.getElementById('close').onclick=()=>{
        document.getElementById('confirmacion').innerHTML='';
    }
}