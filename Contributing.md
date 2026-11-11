# 📖 Manual de ayuda para contribuir

Guía rápida para colaborar en este repositorio: comandos básicos de terminal, uso de Git y cómo enviar tus cambios.

El manual está hecho para principiantes, no sustituye la documentación oficial, es para ahorrar tiempo y que puedas empezar rápido.

> [!WARNING]
> No te fíes nunca de los comandos que te pase una IA por un chat (ChatGPT, Claude...). Entiende qué hace cada comando antes de ejecutarlo.

## 📑 Índice

1. [Normas del repositorio](#normas-del-repositorio)
2. [Windows comandos básicos](#windows-comandos-básicos-vacío)
3. [Linux comandos básicos](#linux-comandos-básicos)
4. [Como usar Git](#como-usar-git)

---

## Normas del repositorio

- Las solicitudes de cambio por norma general deben apuntar a **dev** ,los cambios a main no deben ir directos sin revisión.
- EL código debe priorizar el inglés.
- Los títulos de commits, issues , Pull requests (solicitudes de cambios) deben usar el formato **Conventional Commits** en inglés (formato: `<tipo>(<ámbito opcional>): <descripción>`).
- Si perteneces al DAFIC, los Issues al canal de telegram, no al repositorio.
- No menciones a todos los miembros usando @ , para eso usas el canal de telegram. Tampoco es recomendado usar menciones por @ sin avisar por telegram o alguna forma a ese participante, nada te asegura que vea la notificación de la mención.
- Separa las solicitudes de cambios por asuntos. No enviar un PR con muchos cambios si no son del mismo asunto. En github se pueden enlazar PRs para facilitar la gestión de estos casos.

## Windows comandos básicos `(vacío)`

## Linux comandos básicos

### Como moverse por directorios

```bash
cd <ruta> #<ruta> es la dirección a donde quieres ir
```

```bash
pwd # te devuelve la ruta donde estás
```

Para acceder al directorio del usuario de la sesión

```bash
cd ~ # ~ es tu ruta raíz del usuario. Ej: /home/paraguayo33/
cd /home/paraguayo33/ # es equivalente, no recomendado para automatizar scripts
```

#### Atajos de rutas relativas:

Para indicar directorio actual usas "./<ruta>" o puedes no poner nada directamente "<ruta>" , no pongas "/" o te lo cojerá como ruta absoluta

```bash
cd ./<ruta>
cd <ruta>
```

Para retroceder usando rutas relativas (relativas al directorio actual)

```bash
cd .. # retrocede al directorio anterior
cd ../<ruta> # retrocede y se mueve a la ruta relativa indicada
```

#### Ejemplo de uso para moverse entre directorios

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

### Como crear carpetas

```bash
mkdir <ruta_nombre_carpeta>
```

Si quieres crear varias carpetas anidadas de una vez, creando también las intermedias que no existan, usa `-p`

```bash
mkdir -p <carpeta>/<subcarpeta>/<subsubcarpeta>
```

### Como crear archivos

```bash
touch <ruta_nombre_archivo> # crea un archivo vacío (si ya existe, solo actualiza su fecha de modificación)
```

Para crear un archivo con contenido directamente desde la terminal

```bash
echo "contenido del archivo" > <archivo> # > sobrescribe el archivo
echo "otra línea" >> <archivo> # >> añade al final sin borrar lo anterior
```

Los **echo** pueden ser más complejos que esto, son muy útiles.

Para ver el contenido de un archivo

```bash
cat <archivo>
```

### Como copiar o mover archivos a otra ruta

Para copiar un archivo (el original se mantiene)

```bash
cp <archivo_origen> <ruta_destino>
cp <archivo_origen> <ruta_destino>/<nuevo_nombre> # lo copia con otro nombre
```

Para copiar una carpeta entera con su contenido (`-r`)

```bash
cp -r <carpeta_origen> <ruta_destino>
```

Para mover un archivo o carpeta (el original deja de estar en su sitio original)

```bash
mv <origen> <ruta_destino>
```

`mv` también sirve para **renombrar**, moviéndolo "a la misma carpeta" con otro nombre

```bash
mv <nombre_viejo> <nombre_nuevo>
```

### Como borrar carpetas y archivos

**Ten cuidado,en la terminal no hay papelera** , lo que borras con estos comandos se pierde para siempre.

Para borrar un archivo

```bash
rm <archivo>
```

Para borrar una carpeta vacía

```bash
rmdir <carpeta>
```

Para borrar una carpeta con todo lo que contiene (`-r` = recursivo)

```bash
rm -r <carpeta>
```

Para que te pida confirmación antes de borrar cada cosa usa `-i`

```bash
rm -ri <carpeta>
```

> No uses `rm -rf` si no sabes exactamente lo que estás borrando: `-f` fuerza el borrado sin preguntar y no avisa de errores.

### Como conseguir permisos administrador (root)

Puede que alguna vez tegas que crear carpetas,archivos ... en directorios restringidos por permisos, o ejecutar scripts que si hagan cosas que los necesiten.
Si es tu ordenador entonces puedes hacer directamente `sudo <codigo/lineas_comandos>` . **sudo** te da los permisos del usuario **root** (administrador), debe ir al inicio de lo que quieras ejecutar con root.

#### Ejemplo de uso

```bash
sudo mkdir /etc/ejemplo # /etc suele venir restringido
```

## Como usar Git

### Como descargar el código del repositorio

Si tienes permisos en ese repositorio, lo clonas directamente

```bash
git clone <url_repositorio>
#Ejemplo
git clone https://github.com/dafic-udc/dafic-udc.github.io.git
```

En el botón verde "<> Code" del repositorio tienes un menú dedicado a esto.

Si no tienes permisos, otra forma es hacer un repositorio propio en tu cuenta de Github:

- **Con fork (recomendado)**: pulsas el botón gris superior "Fork" y luego haces `git clone <url_repositorio_creado>`
- **Sin fork**: creas un repositorio vacío _(botón verde "New" en tu lista de repositorios)_ y enlazas tu código descargado a ese repositorio, Github ya te dice cómo hacerlo al crearlo.

### Como revisar a que repositorio apunta tu configuración git

```bash
git remote -v
```

```text
origin    https://github.com/mglourido/dafic-udc.github.io.git (fetch)
origin    https://github.com/mglourido/dafic-udc.github.io.git (push)

upstream  https://github.com/dafic-udc/dafic-udc.github.io.git (fetch)
upstream  https://github.com/dafic-udc/dafic-udc.github.io.git (push)
```

Es importante que **origin** apunte al repositorio donde quieres guardar tus cambios. **Upstream** decides tú a dónde apunta, en este caso es mejor hacer que apunte al repositorio original de DAFIC. Tanto **origin** como **upstream** son editables:

- Si clonaste el repositorio original: **origin** y **upstream** son idénticos.
- Si clonaste un fork tuyo: **origin** apunta a tu repositorio y **upstream** debe apuntar al repositorio original.
- Si clonaste un repositorio tuyo que no es un fork, puedes hacer que **upstream** quede igual que con el fork:

```bash
git remote set-url upstream https://github.com/dafic-udc/dafic-udc.github.io.git
```

Para editar origin o upstream

```bash
git remote set-url origin https://github.com/mglourido/dafic-udc.github.io.git
git remote set-url upstream <url> # cambias "origin" por "upstream" y editas upstream
```

### Como generar una rama nueva

```bash
git checkout -b <nombre> # crea la rama nueva y te mueve a ella
git switch -c <nombre> # equivalente, más claro
```

La rama nueva parte del código de la rama donde te encontrabas. Los cambios que tengas sin commit se van contigo a la rama nueva.

Para moverte a una rama que ya existe (sin generarla)

```bash
git checkout <nombre>
git switch <nombre>
```

`checkout` puede dar fallos si tienes cambios hechos sin commit. `switch` es más claro, por eso es el recomendado.

### Como borrar una rama

Para borrar una rama remota en tu fork

```bash
git push origin --delete <nombre>
```

Para borrar una rama local

```bash
git branch -d <nombre> # borra la rama si ya está fusionada
git branch -D <nombre> # fuerza el borrado aunque no esté fusionada (si está en un PR sin fusionar, si haces esto, pierdes los cambios asociados en ese PR)
```

### Como guardar cambios

En git se guardan cambios haciendo **commit**. Piensa en él como checkpoints de juegos, pero más avanzados ya que te deja ver los cambios y más cosas útiles; forman parte del historial del repositorio y ramas locales.

#### Como agregar los cambios a un commit desde VSCode

Si usas VSCode es muy intuitivo, viene integrado sin extensiones.

1. Pulsas en el botón superior "Ver" -> "Control de versiones" ("Source control" si lo tienes en inglés).
2. Te aparecerá una lista con título "Cambios", ahí estarán todos los archivos con cambios sin commit. Si pulsas en el "+" se añaden a los cambios adjuntos al commit futuro ("Cambios preparados" / "Staged Changes").
3. Cuando pulses en el botón commit se te abrirá una ventana "COMMIT_EDITMSG".

La primera línea es el título del commit (revisa las [normas del repositorio](#normas-del-repositorio) para saber qué formato debe tener). Un commit no solo lo ves tú, cuando mandes una solicitud de cambios aparecerán todos los que hiciste. Hacer buenos commits no solo te ayuda a ti, sino a quienes deban revisar tus cambios.

Después del título va la descripción. Para eso haces saltos de línea y escribes lo que consideres. Las líneas con `#` al inicio dan información del commit y de los cambios que hay, y no aparecen en la descripción.

#### Como agregar los cambios a un commit por terminal

Para ver los cambios que hay

```bash
git status
```

Te saldrá la rama actual e información de los archivos (rutas). Git muchas veces muestra comandos e información de ayuda para saber qué hacer.

Ejemplo actual mío

```bash
# Tengo algunos cambios del archivo ya añadidos al commit, por eso aparece el mismo archivo en confirmados y en no rastreados
git status
#salida:
En la rama mejorar-readme # esta es mi rama local actual
Tu rama está actualizada con 'origin/mejorar-readme'. # esta es mi rama remota

Cambios a ser confirmados: # cambios añadidos al commit. Aquí aparece solo el archivo, no las líneas
  (usa "git restore --staged <archivo>..." para sacar del área de stage)
        nuevos archivos: Contributing.md

Cambios no rastreados para el commit: # archivos que tienen cambios y no están añadidos al commit
  (usa "git add <archivo>..." para actualizar lo que será confirmado)
  (usa "git restore <archivo>..." para descartar los cambios en el directorio de trabajo)
        modificados:     Contributing.md
```

Para ver qué cambios tienes realmente añadidos al commit sin confirmar (no solo las rutas de los archivos)

```bash
git diff # todos los cambios
git diff --staged # cambios añadidos al commit
```

Las líneas nuevas van con "+" al inicio, las viejas con "-".

Para añadir los cambios al commit sin confirmar

```bash
git add <ruta> # ruta del archivo
git add . # todo
git add -p <ruta> # solo algunos bloques
```

El modo `-p` no se enseña en este manual, puedes usar `--help` al final para recibir ayuda: `git add -p --help`

Para quitar cambios añadidos al commit sin confirmar, sin perder esos cambios

```bash
# Un archivo
git restore --staged <ruta>

# Todo lo que hay en staged
git restore --staged .

# Solo algunos bloques/líneas (modo patch)
git restore --staged -p <ruta>
```

Para deshacer los cambios que tienes sin commit

```bash
git restore <ruta>        # un archivo
git restore -p <ruta>     # solo algunos bloques
git restore .             # todo
```

> **Cuidado, no podrás recuperar esos cambios.**

Para deshacer un commit hecho. Aquí solo se enseña cómo quitar los últimos, `~1` indica cuántos commits deshacer desde la cabeza (HEAD)

```bash
git reset --soft HEAD~1    # deshace el commit, deja los cambios en staged
git reset HEAD~1           # deshace el commit, deja los cambios sin staged (--mixed, por defecto)
git reset --hard HEAD~1    # deshace el commit y borra los cambios
```

Se pueden quitar commits específicos usando su **hash**, pero esto no se tratará en el manual.

Para confirmar el commit

```bash
git commit -m "<mensaje>"
```

```bash
git commit -m "docs: v1 contributing"
# salida:
[mejorar-readme acc4073] docs: v1 contributing # [rama hash-corto-commit] mensaje del commit
 1 file changed, 200 insertions(+) # 1 archivo tocado, 200 líneas añadidas (0 borradas)
 create mode 100644 Contributing.md # archivo nuevo; 100644 = archivo normal (rw-r--r--)
```

#### Ejemplo de uso

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

### Como subir los cambios al servidor (hacer push)

Con VScode, donde hacías commit si hay cambios sin subir al remoto, te aparecerá "Sincronizar cambios" ("Sync changes"). Si es el primer commit puede que falle y te salte que tengas que publicar la rama; es lo mismo, pulsas el boton y listo, si falla puedes hacerlo por terminal con los comandos que se explicarán a acontinuación.

```bash
git push # subes los commits a la ruta origin
```

Si no has hecho ningún push, seguramente tengas que publicar la rama nueva. Git ya te dice cómo se hace, así que haz `git push` y este te enseña el comando adaptado

```bash
git push --set-upstream origin <rama>
```

Si quieres mandar esos cambios a otra rama, o a upstream en vez de origin

```bash
git push origin <rama>
git push upstream <rama>
```

#### Ejemplo de uso

```bash
git push
# salida:
Enumerando objetos: 4, listo.
Contando objetos: 100% (4/4), listo.
Compresión delta usando hasta 12 hilos
Comprimiendo objetos: 100% (3/3), listo.
Escribiendo objetos: 100% (3/3), 3.39 KiB | 3.39 MiB/s, listo.
Total 3 (delta 1), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
To https://github.com/mglourido/dafic-udc.github.io.git # esta es la url del repositorio que usó
   29460d5..27883ba  mejorar-readme -> mejorar-readme
```

### Como actualizar tu código (fetch, pull y rebase)

A veces el push falla por no tener tu código actualizado. En ese caso puedes hacer `fetch` para descargar el código del remoto

```bash
git fetch # descarga el código de origin
git fetch upstream # solo upstream
git fetch upstream main # solo la rama main de upstream
```

Todo esto también se puede con origin o con una url que le pases.

Una vez actualizado git, puedes hacer pull o rebase

```bash
git pull # = git fetch + integrar
git pull --rebase # igual, pero integrando con rebase
git rebase <rama> # reaplica tus commits encima de otra rama
git rebase --abort # aborta un rebase que quedó sin terminar
```

- `git pull` descarga los commits nuevos del remoto y los integra en tu rama actual (por defecto con `merge`).
- `git rebase <rama>` no descarga nada: **reaplica tus commits encima de otra base**. Reescribe tus commits (nuevos hashes) para que parezca que partiste de lo más reciente, dejando un historial lineal.

Después de hacer esto tu rama en origin queda desactualizada (si el fetch era de upstream), por lo tanto deberías hacer un `git push` para que se actualice.

> En resumen, para el uso normal en este proyecto usa `git pull` y si te falla usas `git rebase`. Lo normal es que con eso te llegue para este repositorio, si necesitas más ayuda busca documentación real.

### Resumen de un flujo normal para crear un nuevo PR desde cero

El PR se hace en Github, el resto desde la terminal o con la interfaz de VScode.

```bash
git checkout main

git status # si quieres saber la situación de tu rama local

# si hay cambios en remoto que no tienes en local
git pull

git checkout -b rama-nueva-para-pr

# cuando tengas cambios para commit
git add .

git commit -m "style: fix button hover animation"

git push # si la rama no está publicada el push falla, git ya te dice qué comando usar para arreglarlo

# a partir de aquí si quieres hacer PR debes ir a github
```

### Como hacer PR (solicitud de cambios) en Github

> Si el remoto **origin** es el mismo que **upstream**, siendo ambos el repositorio donde quieres hacer PR, ten cuidado de no haber subido los cambios donde querías hacer PR, ya que si fue así puede que ya estén fusionados sin pasar por PR, si tenías permisos.

Lo normal es que Github te muestre arriba, en tu repositorio o en el upstream, un atajo para hacer PR de esos cambios (es amarillo, si te sale lo ves fácilmente). El menú de PR es bastante intuitivo, es más sencillo aprender viendo cómo están hechos otros PRs.

#### Rama y título

En el PR debes decidir a qué rama quieres fusionar los cambios nuevos (la rama de la izquierda es del upstream y la de la derecha es de origin). El título debe seguir las [normas del repositorio](#normas-del-repositorio).

#### Descripción

Si el proyecto no tiene plantillas para los PR deberás decidir por ti mismo qué deberíamos saber quienes vamos a ver esos cambios. Recomendaciones:

- Explica qué soluciona y/o hacen los cambios.
- Si hay cambios visuales: adjunta capturas o videos.
- Si para estos cambios necesitaste o consideraste necesario hacer **tests**: adjunta la depuración y resultados de estos; lo puedes hacer adjuntando los `.test` al PR o mostrando la depuración del script. Esto permite a los revisores saber que probaste que funcionaba y poder verificarlo más fácilmente.
- Avisos de bugs o regresiones: si sabes que tus cambios traen consigo errores nuevos, reabren bugs corregidos... Es mejor documentarlo.

Una descripción puede tener muchísimos formatos e información, aquí solo se muestra una idea inicial de cómo debería ser.

Github usa **Markdown**, su sintaxis es sencilla

````md
# Título principal (solo uno por documento)

## Subtítulo (vas añadiendo # para los subtítulos de secciones)

--- <!-- separador por línea horizontal -->

**texto en negrita**

`código en línea`

```js
// código con formato: triple ` al inicio y final, tras los tres primeros indicas el lenguaje
document.querySelector();
```
````

#### Draft (PR sin acabar)

Cuando termines la descripción debes decidir si tu PR está acabado o no. Es común publicar PRs sin acabar cuando estos son grandes o quieres que los revisores o usuarios te vayan ayudando a terminarlo. Para marcarlo como sin acabar debes usar **Draft**:

- Durante la creación del PR puedes publicarlo directamente como draft en el botón verde "Create pull request".
- Una vez publicado, en la parte inferior derecha de los ajustes del PR puedes marcarlo como listo para revisión ("Mark ready for review") cuando termines.

También existe una opción, activada por defecto, que permite a los mantenedores editar tu código. En este repositorio no la desactives sin motivo.

#### Panel lateral del PR

- **Reviewers**: los mantenedores, son quienes pueden marcar tu PR como listo para fusión.
- **Assignees**: los reviewers etiquetados y tú. Es solo una etiqueta informativa, no da ni revoca permisos.
- **Labels**: etiquetas informativas usadas para clasificar, se usan en los **PRs** e **Issues**.
- **Milestone**: si tiene algo, significa que ese PR es uno de los que deben ser fusionados para alcanzar una meta objetivo.

#### Después de crear el PR

Una vez creado podrás seguir añadiendo cambios, editar cualquier cosa del PR, cancelarlo y borrarlo.

> Cuidado con borrar la rama que vinculas al PR sin fusionar, ya que los cambios desaparecerán y Github no guarda una copia.

Puedes borrar la rama una vez fusionada si no vas a seguir trabajando en ella; los cambios hechos por el PR fusionado sí se guardan en el historial.

---

Con Github y git puedes hacer todo esto de forma más avanzada y muchísimas cosas más. Con este manual tienes todo lo necesario para comenzar. No se tratan los **Issues** en el manual porque hasta ahora estos se tratan desde el canal de Telegram.
