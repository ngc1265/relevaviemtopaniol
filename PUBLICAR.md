# Cómo publicar la app (desde Windows, sin tocar la consola)

El objetivo es un link `https://...` que se pueda mandar por WhatsApp y
que cada uno agregue a la pantalla de inicio del celular.

**No se sube un comprimido.** GitHub Pages publica los archivos sueltos
del repositorio: si subís un `.zip`, lo que queda publicado es el `.zip`.
Hay que subir los archivos, no el paquete.

---

## Antes: un repositorio aparte, no el del sistema

Con una cuenta gratis de GitHub, **Pages solo funciona en repositorios
públicos**. Y el repositorio del sistema no puede ser público: tiene el
esquema de la planta, las migraciones y las credenciales de arranque
escritas en `V9`.

Esta app, en cambio, no tiene nada adentro: el HTML, el service worker,
los íconos y el logo. Ni la lista de máquinas ni la de sectores — el
casillero se escribe a mano en el teléfono. Se puede publicar sin
problema.

Entonces: **un repositorio nuevo, público, solo para esto.** El del
sistema queda privado, aparte.

---

## Los pasos

1. En github.com: **New repository**.
   - Nombre: `relevamiento-panol`
   - **Public**
   - Sin README, sin `.gitignore`. Vacío.

2. En el repositorio recién creado: **uploading an existing file**
   (o *Add file → Upload files*).

3. Descomprimí `relevamiento-para-github.zip` y **arrastrá los 8
   archivos** a la ventana del navegador. Los archivos, no la carpeta:
   tienen que quedar en la raíz del repositorio, no adentro de otra
   carpeta.

4. Abajo, **Commit changes**.

5. **Settings → Pages**
   - *Source*: `Deploy from a branch`
   - *Branch*: `main`, carpeta `/ (root)`
   - **Save**

6. Esperá uno o dos minutos y refrescá esa misma pantalla. Arriba
   aparece el link:
   `https://TU-USUARIO.github.io/relevamiento-panol/`

Ese es el link que se manda.

---

## Comprobar que quedó bien

Abrilo **en el celular**, no en la computadora. Tiene que pasar todo
esto:

- Pide el nombre de quien releva.
- El menú del navegador ofrece *Agregar a pantalla principal*
  (en iPhone tiene que ser Safari; desde Chrome no aparece).
- Sacás una foto y abajo dice algo como `4200 KB → 120 KB`.
- Cerrás la app, la volvés a abrir y **lo cargado sigue estando**.
- Ponés el teléfono en modo avión, abrís la app y **igual abre**.

Si alguna falla, avisame cuál.

---

## Para actualizarla después

Mismo camino: *Add file → Upload files*, arrastrar los archivos nuevos,
commit. GitHub pisa los que ya estaban.

Una cosa a tener en cuenta: la app se guarda en el teléfono para poder
funcionar sin señal, así que un cambio no llega solo. Para forzarlo hay
que subir el número de versión en `sw.js`:

```js
const CACHE = 'relevamiento-v1';   // v2, v3, ...
```

Sin eso, los teléfonos que ya la tienen instalada siguen usando la
versión vieja.

---

## Si preferís no usar GitHub

Sirve cualquier hosting estático con `https`: Netlify y Cloudflare Pages
también aceptan arrastrar una carpeta. Y cuando el server del pañol esté
instalado, se puede servir desde ahí y no depender de internet.

Lo que **no** sirve: abrir el `index.html` con doble clic desde el disco.
El navegador no le deja guardar nada a una página abierta como archivo
local, así que se pierde todo al cerrar. Tiene que ser `https`.
