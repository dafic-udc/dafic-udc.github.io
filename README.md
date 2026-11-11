# Web da asociación [DAFIC](https://dafic.org)

<div align="center">

[![License](https://img.shields.io/github/license/dafic-udc/dafic-udc.github.io)](LICENSE "License")
[![GitHub stars](https://img.shields.io/github/stars/dafic-udc/dafic-udc.github.io)](https://github.com/dafic-udc/dafic-udc.github.io/stargazers "Stars")

</div>

## ⚖️ Licenza

O contido deste repositorio está baixo a licenza [GPL3](LICENSE).

## ⚙️ Probas en local

Para visualizar e probar os cambios de forma local antes de publicalos, segue estes pasos:

> [!NOTE]
> É preciso ter instalado Python versión 3 no teu equipo.

1. Clona o repositorio no teu equipo.

   ```bash
    git clone https://github.com/dafic-udc/dafic-udc.github.io.git
   ```

2. Accede ao directorio `site`:

   ```bash
   cd site
   ```

3. Inicia un servidor HTTP simple con Python:

   ```bash
   python3 -m http.server #porto 8000

   python3 -m http.server <porto> # substitue <porto> para elixilo


   # Podes usar python directamente, se apunta a python3
   readlink -f "$(which python)" # linux: /usr/bin/python3.14
   where python # windows (CMD): ... \Python314\python.exe
   ```

4. Abre o navegador e accede á seguinte dirección:

   http://localhost:8000 _(ou ao porto que se indique na consola)_
