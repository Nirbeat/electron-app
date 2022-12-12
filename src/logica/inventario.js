// const {ipcMain}=require('electron');

function comprobarInventario(){

    if(!localStorage.getItem('stock')){

        localStorage.setItem('stock','');
    }
    else{
        return JSON.parse(localStorage.getItem('stock'));
    }
}

function verInventario(){

    let stock=comprobarInventario();

    stock.forEach(item => {
        
        document.getElementById('tabla').appendChild(document.createElement('tr')).innerHTML=
        `<td><input value='${item.nombre}' readonly='' id='nombre'></td>
        <td><input value='${item.stock}' type='text' readonly='' id='stock'></td>
        <td><input value='${item.precio}' type='text' readonly='' id='precio'></td>
        <input type='button' id='modificar' value='Modificar'>
        `
    });

    crearCategorias();

    //BUSCAR ITEMS
    document.getElementById('filtro').oninput=()=>{

        document.getElementById('tabla').innerHTML=
        `<tr>
            <td>Producto</td>
            <td>Stock</td>
            <td>Precio</td>   
        </tr>`

        let items=buscarItem();

        items.forEach(item=>{

            document.getElementById('tabla').appendChild(document.createElement('tr')).innerHTML=
            `<td><input value='${item.nombre}' readonly='' id='nombre'></td>
            <td><input value='${item.stock}' type='text' readonly='' id='stock'></td>
            <td><input value='${item.precio}' type='text' readonly='' id='precio'></td>
            <input type='button' id='modificar' value='Modificar'>
            `
        })
    }
    //BUSCAR POR CATEGORIAS
    document.getElementById('categorias').onchange=()=>{

        document.getElementById('tabla').innerHTML=
        `<tr>
            <td>Producto</td>
            <td>Stock</td>
            <td>Inventario</td>   
        </tr>`
        
        let categoria=buscarCategorias();

        categoria.forEach(item=>{

            document.getElementById('tabla').appendChild(document.createElement('tr')).innerHTML=
            `<td><input value='${item.nombre}' readonly='' id='nombre'></td>
            <td><input value='${item.stock}' type='text' readonly='' id='stock'></td>
            <td><input value='${item.precio}' type='text' readonly='' id='precio'></td>
            <input type='button' id='modificar' value='Modificar'>
            `
        })
    }

    document.querySelectorAll('#modificar').forEach(btn=>{

        btn.onclick=(e)=>{
            switch(btn.value){
                case "Modificar":
                    btn.value='Confirmar';
                    modificarItem(e);
                    break;

                case "Confirmar":
                    btn.value="Modificar";
                    confirmarCambios(e);
                    break;
            }
        }
    })
};



function comprobarCategoriasRepetidas(){

    let stock=comprobarInventario();
    let categorias=[];

    for(let i=0;i<stock.length;i++){

        if(!categorias.includes(stock[i].categoria)){

            categorias.push(stock[i].categoria)
        }
    }
    return categorias;
}

function crearCategorias(){

    let categorias=comprobarCategoriasRepetidas();

    for(let i=0;i<categorias.length;i++){

        document.getElementById('categorias').appendChild(document.createElement('option')).value=categorias[i];
        
    }

    document.getElementById('categorias').childNodes.forEach(e=>{

        if(e.value==null){}
        else e.innerText=e.value;
    })
}

function buscarItem(){

    let stock=comprobarInventario();
    let arr=[];
        stock.forEach(item=>{

            if(item.nombre.includes(document.getElementById('filtro').value)){
                arr.push(item);
            }
        })
        return arr;
}

function buscarCategorias(){

    let stock=comprobarInventario();
    let arr=[];

    stock.forEach(item=>{

        if(item.categoria==document.getElementById('categorias').value){
            arr.push(item);
        }
    });

    return arr;
}

function itemAModificar(e){

    return e.path[1].childNodes;
}

function modificarItem(e){

    let itemData= itemAModificar(e);

    itemData.forEach(element=>{

        if(element.firstChild!==null){
            if(element.firstChild.id!=='nombre'){
                element.firstChild.removeAttribute('readonly');
            }
        }
    });  
}

function confirmarCambios(e){

    let nombre,stock,precio;
    let inventario=comprobarInventario();
    let itemData= itemAModificar(e);

    itemData.forEach(element=>{

        if(element.firstChild!==null){
            element.firstChild.setAttribute('readonly','');
            switch (element.firstChild.id) {
                case 'nombre':
                    nombre=element.firstChild.value;
                    break;
                case 'stock':
                    stock=element.firstChild.value;
                    break;
                case 'precio':
                    precio=element.firstChild.value;
                    break;
            }
        }
    });  

    inventario.forEach(item=>{

        if(item.nombre==nombre){

            item.nombre=nombre;
            item.stock=stock;
            item.precio=precio;
        }
    }) 

    localStorage.setItem('stock',JSON.stringify(inventario));
}


verInventario();