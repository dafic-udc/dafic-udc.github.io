- Comandos básicos de Linux/Windows
- Comandos básicos de Git
- Como hacer solicitud de cambios
- Normas para las solicitudes de cambios

> [!WARNING]
> Advertencia: No te fíes nunca de los comandos que te pase una IA por un Chat (Chatgpt, claude).

---

## Normas

- Las solicitudes de cambio por norma general deben apuntar a **dev**
- EL código debe priorizar el inglés
- Los títulos de commits, issues , Pull requests (solicitudes de cambios) deben usar el formato **Conventional Commits** (formato: `<tipo>(<ámbito opcional>): <descripción>`)

## Windows comandos básicos

## Linux comandos básicos

```bash
cd <ruta> #<ruta> es la dirección a donde quieres ir
```

```bash
pwd
```

te devuelve la ruta donde estás

Para acceder al directorio del usuario de la sesión

```bash
cd ~ # ~ es tu ruta raíz del usuario ej: /home/paraguayo33/
cd /home/paraguayo33/ # es equivalente
```

para retroceder sin poner una ruta absoluta (que vaya desde ~)

```bash
cd ..
```

Ejemplo

```bash
pwd
/home/paraguayo33/Github-Repos/dafic-udc.github.io

cd site

pwd
/home/paraguayo33/Github-Repos/dafic-udc.github.io/site

cd ..

pwd
/home/paraguayo33/Github-Repos/dafic-udc.github.io

cd ~

pwd
/home/paraguayo33/

cd /home/paraguayo33/Github-Repos/dafic-udc.github.io

pwd
/home/paraguayo33/Github-Repos/dafic-udc.github.io
```

## Como usar Git

### Para descargar el código con el repositorio git:

> <u>Si tienes permisos en ese repositorio</u>

```bash
# git clone <url repositorio>
git clone https://github.com/dafic-udc/dafic-udc.github.io.git

# En el boton verde "<> Code" tienes un menú dedicado a esto
```

> <u>Otra forma es haciendo un repositorio propio en tu cuenta de Github:</u>
>
> -Lo recomendado en hacer fork (boton gris superior "Fork").
>
> Luego haces `git clone <url_repositorio_creado>`
>
> -Sin hacer fork: creas un repositorio vacío _(boton verde "New" en tu lista de repositorios)_ y enlazas tu código descargado a ese repositorio, Github ya te dice como hacerlo al crear el repositorio.

### Revisar a donde apunta tu configuracion git del código

```bash
git remote -v
```

```text
origin    https://github.com/mglourido/dafic-udc.github.io.git (fetch)
origin    https://github.com/mglourido/dafic-udc.github.io.git (push)

upstream  https://github.com/dafic-udc/dafic-udc.github.io.git (fetch)
upstream  https://github.com/dafic-udc/dafic-udc.github.io.git (push)
```

Es importante que **origin** apunte al repositorio donde quieres guardar tus cambios. **Upstream** decides tu a donde apunta, en este caso es mejor hacer que apunte al repositorio original de DAFIC.
_Tanto **Origin** como **Upstream** son editables:_

- Si clonaste el repositorio **Origin** y **Upstream** son idénticos.
- Si clonaste un fork tuyo: **Origin** apunta a tu repositorio, upstream debe apuntar al repositorio original.
- Si clonaste un repositorio tuyo , que no es **fork**, puedes hacer que **Upstream** quede igual que con el **fork**:

  `git remote set-url upstream https://github.com/dafic-udc/dafic-udc.github.io.git`

Para editar Origin/Upstream:

```bash
git remote set-url origin https://github.com/mglourido/dafic-udc.github.io.git
#cambias "origin" por "upstream" y con eso editas upstream
```

### Como generar una rama nueva

`git checkout -b <nombre>` te genera una rama nueva usando el código que tienes en la rama donde te encontrabas, y te mueve a esa rama nueva. Si usas `git checkout <nombre>` te meuve a esa rama, sin generarla, porque ya debe existir. Si tienes cambios hechos o commits sin hacer push, se van tambien a esa rama nueva, pero se van de la rama donde estabas al hacer el checkout.

Checkout puede dar fallos si tienes cambios hechos sin commit, se puedes usar `git switch -c <nombre>` para crear la rama, y `git switch <nombre>` para moverse; es más claro que checkout.

### Como borrar una rama remota en tu fork

`git push origin --delete <nombre>`

```bash
git branch -d <nombre>   # borra la rama local si ya está fusionada
git branch -D <nombre>   # la fuerza aunque no esté fusionada
```

### Como guardar cambios

En git se guardan cambios haciendo **commit**. Piensa en él como checkpoints de juegos, pero más avanzados ya que te deja ver los cambios y más cosas útiles.

#### Como agregar los cambios a un Commit

> Si usas VSCode , esta ya es muy intuitivo, viene integrado sin extensiones

Pulsas en el boton superior "Ver"-> "Control de versiones" ("Source control" si lo tienes en inglés)

- Te aparecera una lista con título "Cambios", ahí estarán todos los archivos con cambios sin commit; si pulsas en el "+" se añaden a los cambios adjuntos al commit futuro ("cambios preparados" / "Staged Changes")

Cuando pulses en el boton commit se te abrirá una ventana "COMMIT_EDITMSG"

La primera linea es el título del commit (revisa las normas básicas para saber que formato deben tener). Un commit no solo lo ves tú, cuando mandes una solicitud de cambios aparecerán todos los que hiciste.

Despues de eso es la descripción. Para eso haces saltos de linea y escribes lo que consideres, no pongas # al inicio, los comentarios no se cojen en la descripción.

Las lineas con # al inicio, dan información del commit y de los cambios que hay.

> Por terminal

**Para ver los cambios que hay** `git status` . Te saldrá la rama actual e información para los archivos (rutas). Git muchas veces muestra comandos e información de ayuda para saber que hacer.

```bash
#Ejemplo actual mío
# Tengo algunos cambios del archivo ya añadidos al commit, por eso aparece el mismo archivo en confirmados y en no rastreados
git status

En la rama mejorar-readme # esta es mi rama local actual
Tu rama está actualizada con 'origin/mejorar-readme'. # esta es mi rama actual

Cambios a ser confirmados: # cambios añadidos al commit . Aquí aparece solo el archivo, no las lineas
  (usa "git restore --staged <archivo>..." para sacar del área de stage)
        nuevos archivos: Contributing.md

Cambios no rastreados para el commit: # Archivos que tienen cambios y no estan añadidos al commit
  (usa "git add <archivo>..." para actualizar lo que será confirmado)
  (usa "git restore <archivo>..." para descartar los cambios en el directorio de trabajo)
        modificados:     Contributing.md
```

**Para ver que cambios tienes realmente añadidos al commit sin confirmar**, no solo rutas de archivos `git diff #todos los cambios` `git diff --staged # cambios añadidos al commit`

Las lineas nuevas van con "+" al inicio, las viejas con "-"

**Para añadir los cambios al commit sin confirmar** `git add <ruta> # ruta es la ruta del archivo` o puedes hacerlo por bloques `git add -p <ruta>`, esto último no se enseña en este manual, puedes usar **--help** al final para recibir ayuda `git add -p --help`

**Para quitar cambios añadidos al commit sin confirmar, sin perder esos cambios**

```bash
# Un archivo
git restore --staged <ruta>

# Todo lo que hay en staged
git restore --staged .

# Solo algunos bloques/líneas (modo patch)
git restore --staged -p <ruta>
```

**Para deshacer los cambios que tienes sin commit**, cuidado, no podrás recuperar los cambios.

```bash
git restore <ruta>        # un archivo
git restore -p <ruta>     # solo algunos bloques
git restore .             # todo
```

**Para deshacer un commit hecho**. Aqui se enseña como solo quitar el que es primero para adelante, ~1 indica cuantos commits deshacer desde la cabeza (HEAD)

```bash
git reset --soft HEAD~1    # deshace el commit, deja los cambios en staged
git reset HEAD~1           # deshace el commit, deja los cambios sin staged (--mixed, por defecto)
git reset --hard HEAD~1    # deshace el commit y borra los cambios
```

Se pueden quitar commits específicos usando su **hash**, pero esto no se tratará en el manual.

**Para confirmar el commit** `git commit -m <mensaje>`.

```bash
git commit -m "docs: v1 contributing"

[mejorar-readme acc4073] docs: v1 contributing # [rama hash-corto-commit] mensaje del commit
 1 file changed, 200 insertions(+) # 1 archivo tocado, 200 líneas añadidas (0 borradas)
 create mode 100644 Contributing.md # archivo nuevo; 100644 = archivo normal (rw-r--r--)
```

Ejemplo de uso real de todo esto

```bash
> git status
En la rama mejorar-readme
Tu rama está actualizada con 'origin/mejorar-readme'.

Archivos sin seguimiento:
  (usa "git add <archivo>..." para incluirlo a lo que será confirmado)
        Contributing.md

no hay nada agregado al commit pero hay archivos sin seguimiento presentes (usa "git add" para hacerles seguimiento)

> git add .

> git status
En la rama mejorar-readme
Tu rama está actualizada con 'origin/mejorar-readme'.

Cambios a ser confirmados:
  (usa "git restore --staged <archivo>..." para sacar del área de stage)
        nuevos archivos: Contributing.md

> git commit -m "docs: v1 contributing"
[mejorar-readme acc4073] docs: v1 contributing
 1 file changed, 200 insertions(+)
 create mode 100644 Contributing.md

> git reset HEAD~1

> git status
En la rama mejorar-readme
Tu rama está actualizada con 'origin/mejorar-readme'.

Archivos sin seguimiento:
  (usa "git add <archivo>..." para incluirlo a lo que será confirmado)
        Contributing.md

no hay nada agregado al commit pero hay archivos sin seguimiento presentes (usa "git add" para hacerles seguimiento)

```

### Para subir los cambios al servidor (hacer push)

`git push` subes los commits a la ruta origin

Si no has hecho ningún push, seguramente tengas que publicar la rama nueva, git ya te dice como se hace, asi que haz git push y este te enseña el comando adaptado
`git push --set-upstream origin <rama>`

puedes hacer `git push origin/<rama>` por si quieres mandar eso cambios a otra rama, y cambiar origin por upstream tambien.

Ejemplo real

```bash
git push

Enumerando objetos: 4, listo.
Contando objetos: 100% (4/4), listo.
Compresión delta usando hasta 12 hilos
Comprimiendo objetos: 100% (3/3), listo.
Escribiendo objetos: 100% (3/3), 3.39 KiB | 3.39 MiB/s, listo.
Total 3 (delta 1), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
To https://github.com/mglourido/dafic-udc.github.io.git # esta el la url que usó
   29460d5..27883ba  mejorar-readme -> mejorar-readme
```
Ha veces puede que el push falle por no tener tu código actualizado, en ese caso puedes hacer
```git fetch``` para que descargue el codigo de origin y upstream,```git fetch upstream``` si solo quieres upstream, ```git fetch upstream/main``` si solo quieres la rama main de upstream; todo esto tambien se puede con origin o con una url que le pases.

Una vez actualizado git, puedes hacer pull o rebase.

`git pull` = `git fetch` + integrar. Descarga los commits nuevos del remote y los integra en tu rama actual (por defecto con `merge`; con `git pull --rebase` usa `rebase`).

`git rebase <rama>` no descarga nada: **reaplica tus commits encima de otra base**. Reescribe tus commits (nuevos hashes) para que parezca que partiste de lo más reciente, dejando un historial lineal.

```git rebase --abort``` es para abortar un rebase que quedo sin terminar.

Importante, despues de hacer esto tu rama origin queda desactualizada, si el fetch era de upstream, po rlo tanto deberías hacer un git push para que se actualice.

>En resumen, para el uso normal en este proyecto, usa ```git pull``` y si te falla usas ```git rebase```; lo normal es que para este repositorio con eso te llegue, si necesitas más ayuda busca documentación real.

