const {BrowserWindow,app, Menu}=require('electron');
let win;

function initApp(){

    win=new BrowserWindow({
        width:800,
        height:600,
        // resizable:false,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false,
            
        }
    })

    const template=[
        {
            label:'Inventario',
            submenu:[
                {
                    label:'Ver Inventario',
                    click(){
                        win.loadFile(__dirname+'/vistas/ver-inventario.html')
                    }
                },
                {
                    label:'Agregar Item',
                    click(){
                        win.loadFile(__dirname+'/vistas/agregar-item.html')
                    }
                },
            ],
            
        },
        {
            label:'Facturación',
            click(){
                win.loadFile(__dirname+'/vistas/facturacion.html')
            }
        },
        {
            label:'dev Tools',
            click(){
                win.webContents.openDevTools()
            }
        }
    ];
    
    const menu=Menu.buildFromTemplate(template)
    win.setMenu(menu);
}

app.whenReady().then(initApp);