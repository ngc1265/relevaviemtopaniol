# App de relevamiento

Para cargar el pañol con el celular, caminando entre los estantes.
Captura **nombre, foto, cantidad y dónde está**, y al final exporta un
solo archivo que se importa al sistema.

No es una app de las que se instalan de una tienda: es una página web
que se agrega a la pantalla de inicio y queda con ícono, igual que una
app. Eso evita el APK, el "permitir orígenes desconocidos" de Android y
el problema de que en iPhone directamente no se puede instalar nada por
fuera de la App Store.

---

## Publicarla (una sola vez)

La forma más rápida es GitHub Pages: da un link `https` gratis, y el
mismo link sirve para todos los teléfonos.

1. En el repositorio: **Settings → Pages**.
2. *Source*: `Deploy from a branch`, rama `main`, carpeta `/ (root)`.
3. Esperar un minuto. La app queda en
   `https://<usuario>.github.io/<repo>/relevamiento/`.
4. Ese link se manda por WhatsApp a los que van a relevar.

Tiene que ser `https` (o `localhost`). Si la app se abre desde un
archivo bajado a mano, el navegador **no la deja guardar nada** y se
pierde todo al cerrar. Cuando el server del pañol esté instalado, se
puede servir también desde ahí.

## Instalarla en el teléfono

- **Android (Chrome):** abrir el link → menú (⋮) → *Agregar a pantalla
  principal*.
- **iPhone (Safari):** abrir el link → compartir (□↑) → *Agregar a
  inicio*. En iPhone tiene que ser Safari; desde Chrome no aparece la
  opción.

Después de abrirla una vez con señal, **funciona sin señal**: adentro
del galpón no hace falta wifi ni datos.

---

## Cómo se usa

1. La primera vez pide el nombre de quien releva. Queda en cada ficha.
2. Arriba de todo se fija **dónde estás parado**. Se pone una vez por
   estante y queda fijo: no hay que repetirlo en cada pieza.
3. Por cada pieza: foto → nombre → cantidad → *Guardar y cargar la
   próxima*. La pantalla se limpia sola y queda lista, sin perder el
   lugar.
4. En *Cargado* se ve todo lo que va entrando, con buscador, y se puede
   borrar una ficha que salió mal.
5. Al terminar (o cada tanto), *Exportar* baja un `.zip` con todo
   adentro. Ese archivo se manda por donde sea.

Cosas pensadas para el pañol y no para una oficina:

- **La foto se achica en el teléfono.** Una foto de celular pesa 4 o 5
  MB; achicada queda en 50 a 250 KB. Con 800 piezas, es la diferencia
  entre 3,5 GB y unos 100 MB. También corrige la rotación, así las
  fotos verticales no llegan acostadas.
- **Todo se guarda en el teléfono**, no en internet. No sale nada hasta
  que alguien toca *Exportar*.
- **Cada 25 piezas avisa que conviene exportar.** Vale la pena hacerle
  caso: es la única copia hasta que se exporta.
- Los botones son grandes a propósito. Esto se usa parado, con una mano
  y con las manos sucias.

> **Lo único frágil:** mientras no se exporte, lo cargado vive solo en
> ese teléfono. Si alguien borra los datos del navegador o desinstala
> la app, se pierde. Exportar seguido y no vaciar el teléfono hasta que
> el que importa confirme que entró todo.

---

## Importarlo al sistema

```bash
python3 instalacion/importar-relevamiento.py relevamiento-*.zip \
        --adjuntos C:/panol/adjuntos --persona 1
```

Por cada pieza crea la ficha con código provisorio (`PROV-00001`),
marcada como incompleta, deja el saldo inicial como ajuste con motivo, y
guarda la foto en tres tamaños.

- **Es idempotente:** correr el mismo ZIP dos veces no duplica nada.
- **Una ubicación que no se puede identificar sin ambigüedad NO se
  adivina.** Si alguien escribió "Casillero 3" y ese nombre existe en
  cada estantería, la pieza entra **sin ubicación** y el importador
  avisa cuántas quedaron así. Adivinar mandaría a buscar la pieza al
  estante equivocado, que es peor que no saber dónde está.
- `--seco` dice qué haría sin escribir nada.

---

## Qué se verificó

Corriendo en un navegador con pantalla y user-agent de celular:

- **26 verificaciones** de la app: el flujo completo, que no deje cargar
  sin ubicación, que la foto se achique, que lo cargado sobreviva a
  cerrar y reabrir, que exporte, y que vaciar pida confirmación.
- **16 verificaciones** del `.zip` exportado, abierto con la librería
  estándar de Python: CRC de cada entrada, que el manifiesto vaya
  primero, que toda foto referida exista y ninguna sobre, que las fotos
  sean JPEG de 1280 px o menos, y que los nombres vayan en UTF-8. El
  escritor de ZIP está hecho a mano —para que la app no dependa de
  ninguna librería y pueda abrir sin señal—, así que hace falta
  comprobarlo con una implementación que no sea la propia.
- **18 verificaciones** del importador: que enganche la ubicación
  exacta, que **no** adivine la ambigua, que la foto quede en tres
  tamaños, que la pieza se encuentre buscando, y que reimportar no
  duplique.

Lo que no está probado: el comportamiento en un teléfono real. El
navegador simulado no reproduce la cámara, ni cuánto espacio le deja el
sistema a la app, ni qué pasa cuando Android cierra la app por falta de
memoria. **Antes de mandar a nadie a relevar 800 piezas, hacé una prueba
de 10 en un teléfono de verdad, exportá, e importá ese ZIP.**
