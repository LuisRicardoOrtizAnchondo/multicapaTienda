DROP TABLE IF EXISTS ventas;
DROP TABLE IF EXISTS comprador;
DROP TABLE IF EXISTS producto;


CREATE TABLE Comprador
(
	comprador_id	SERIAL NOT NULL,
	nombre               VARCHAR(30) NOT NULL ,
	tarjeta		     VARCHAR(16) NOT NULL,
	PRIMARY KEY (comprador_id)
);

CREATE TABLE Producto
(
	producto_id          SERIAL NOT NULL ,
	nombre_producto      VARCHAR(30) NOT NULL ,
	descripcion			 VARCHAR(50) NOT NULL ,
	precio				NUMERIC(10,2) NOT NULL,
	PRIMARY KEY (producto_id)
);

CREATE TABLE ventas
(
	ventas_id			SERIAL NOT NULL,
	comprador_id         SERIAL NOT NULL ,
	producto_id          SERIAL NOT NULL ,
	cantidad             BIGINT NOT NULL ,
	PRIMARY KEY (ventas_id, comprador_id, producto_id),
	FOREIGN KEY (comprador_id) REFERENCES Comprador (comprador_id) ON DELETE CASCADE,
	FOREIGN KEY (producto_id) REFERENCES Producto (producto_id) ON DELETE CASCADE
);