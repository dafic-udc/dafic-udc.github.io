// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-3.0
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU  General Public License (GNU GPL) as published by the Free Software  Foundation, either version 3 of the License, or (at your option)  any later version. The code is distributed WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU GPL for more details.
// @license-end

const degree_text = {
	"gei":    "Estudante no Grao en Enxeñaría Informática",
	"gced":   "Estudante no Grao en Ciencia e Enxeñaría de Datos",
	"gia":    "Estudante no Grao en Intelixencia Artificial",
	"master": "Estudante nalgún mestrado da Facultade de Informática",
	"etc":    "Outro"
};

const year_text = {
	"1G": "1º de Grao",
	"2G": "2º de Grao",
	"3G": "3º de Grao",
	"4G": "4º de Grao",
	"1M": "1º de Mestrado",
	"2M": "2º de Mestrado",
	"alumni": "Xa rematei"
};

function generateMailto(name, surname, degree, year) {
	const subject = encodeURIComponent("[ALTA] Solicitude de inscrición");
	const name_encoded = encodeURIComponent(name);
	const surname_encoded = encodeURIComponent(surname);
	const degree_encoded = encodeURIComponent(degree);
	const year_encoded = encodeURIComponent(year);

	var encoded_data = Object();
	encoded_data.name = name;
	encoded_data.surname = surname;
	encoded_data.degree = degree;
	encoded_data.year = year;

	const body_content = `Boas,

Son ${name} ${surname}, e gustaríame inscribirme na asociación DAFIC. Actualmente estou en ${year_text[year]}, ${degree_text[degree]}.

Un saúdo.

----- BEGIN DAFIC DATA -----
${btoa(JSON.stringify(encoded_data))}
----- END DAFIC DATA -----`;

	return `mailto:contacto@dafic.org?subject=${subject}&body=${encodeURIComponent(body_content)}`;
	// Doesn't work: &X-DAFIC-NAME=${name_encoded}&X-DAFIC-SURNAME=${surname_encoded}&X-DAFIC-DEGREE=${degree_encoded}&X-DAFIC-YEAR=${year_encoded}`;
}

function addLink() {
	var anchor = document.getElementById('link-anchor');
	if (!anchor) return;

	var inscription_request = generateMailto(
		document.getElementById('name').value,
		document.getElementById('surname').value,
		document.getElementById('degree').value,
		document.getElementById('year').value
	);

	var link_element = document.createElement('a');
	link_element.text = "Prema nesta ligazón para mandar a solicitude de inscrición por correo";
	link_element.href = inscription_request;

	anchor.appendChild(link_element);

	link_element.click();
}
