
USE FUTPLAY_DB;

GO

SET DATEFORMAT DMY;

GO

CREATE TABLE Provincias ( 
Cod_Provincia INT   NOT NULL,
Provincia VARCHAR (60) NOT NULL,
CONSTRAINT PK_PROVINCIAS_COD_PROVINCIA  PRIMARY KEY (Cod_Provincia)
)

GO

CREATE TABLE Cantones(
Cod_Canton INT NOT NULL,
Cod_Provincia INT  NOT NULL,
Canton VARCHAR (60) NOT NULL,
CONSTRAINT PK_CANTONES_COD_CANTON PRIMARY KEY (Cod_Canton),
CONSTRAINT FK_CANTONES_COD_PROVINCIA  FOREIGN KEY (Cod_Provincia) REFERENCES PROVINCIAS (Cod_Provincia)

)

GO

CREATE TABLE Distritos (
Cod_Distrito INT   NOT NULL,
Cod_Canton INT  NOT NULL,
Distrito VARCHAR (60) NOT NULL,
CONSTRAINT PK_DISTRITOS_COD_DISTRITO PRIMARY KEY (Cod_Distrito),
CONSTRAINT FK_DISTRITOS_COD_CANTON  FOREIGN KEY (Cod_Canton) REFERENCES Cantones (Cod_Canton)
)

GO

CREATE TABLE Posiciones (
Cod_Posicion INT IDENTITY(1,1)  NOT NULL,
Posicion VARCHAR (60) NOT NULL,
CONSTRAINT PK_POSICIONES_COD_POSICION PRIMARY KEY (Cod_Posicion),

)

GO

CREATE TABLE Estados ( 
Cod_Estado INT   NOT NULL,
Estado VARCHAR (60) NOT NULL,
CONSTRAINT PK_ESTADOS_COD_ESTADO  PRIMARY KEY (Cod_Estado)
)

GO

CREATE TABLE Roles(
Cod_Role INT IDENTITY(1,1)  NOT NULL,
Nombre VARCHAR (60) NOT NULL,
CONSTRAINT PK_ROLES_COD_ROLE PRIMARY KEY (Cod_Role),

)


GO


CREATE TABLE Usuarios(
Cod_Usuario INT IDENTITY(1,1)  NOT NULL,
Cod_Role INT  NOT NULL,
Cod_Provincia INT  NOT NULL,
Cod_Canton INT  NOT NULL,
Cod_Distrito INT  NOT NULL,
Cod_Posicion INT  NOT NULL,
Modo_Customizado BIT,
Avatar BIT,
Foto VARCHAR (60),
Nombre VARCHAR (60) NOT NULL,
Primer_Apellido VARCHAR (60) NOT NULL,
Segundo_Apellido VARCHAR (60),
Fecha_Nacimiento VARCHAR(60),
Telefono VARCHAR (60) NOT NULL,
Correo VARCHAR (60) NOT NULL UNIQUE,
Contrasena VARCHAR (60) NOT NULL,   
Fecha DATE NOT NULL,
Intentos INTEGER,
Estatura DOUBLE PRECISION ,
Peso DOUBLE PRECISION ,
Apodo VARCHAR (60),
Partidos_Jugados INT,
Partidos_Jugador_Futplay INT,
Partidos_Jugador_Del_Partido INT,
Compartir_Datos BIT,
Estado BIT,
Descripcion_Estado VARCHAR(60),
Codigo_Token INT,
Expiracion_Token INT,
CONSTRAINT PK_USUARIOS_COD_USUARIO PRIMARY KEY (Cod_Usuario),
CONSTRAINT FK_USUARIOS_COD_ROLE  FOREIGN KEY (Cod_Role) REFERENCES ROLES (Cod_Role),
CONSTRAINT FK_USUARIOS_COD_PROVINCIA  FOREIGN KEY (Cod_Provincia) REFERENCES PROVINCIAS (Cod_Provincia),
CONSTRAINT FK_USUARIOS_COD_CANTON  FOREIGN KEY (Cod_Canton) REFERENCES Cantones (Cod_Canton),
CONSTRAINT FK_USUARIOS_COD_DISTRITO  FOREIGN KEY (Cod_Distrito) REFERENCES Distritos (Cod_Distrito),
CONSTRAINT FK_USUARIOS_COD_POSICION  FOREIGN KEY (Cod_Posicion) REFERENCES POSICIONES (Cod_Posicion)
)
GO
CREATE TABLE Equipos (
Cod_Equipo INT IDENTITY(1,1)  NOT NULL,
Cod_Usuario INT NOT NULL,
Cod_Provincia INT  NOT NULL,
Cod_Canton INT  NOT NULL,
Cod_Distrito INT  NOT NULL,
Avatar BIT,
Foto VARCHAR (60),
Nombre VARCHAR (60) NOT NULL,
Abreviacion VARCHAR (3) NOT NULL,
Fecha Date,
Estrellas INT,
EstrellasAnteriores INT,
Dureza VARCHAR (60),
Posicion_Actual INT,
Puntaje_Actual INT,
Partidos_Ganados INT,
Partidos_Perdidos INT,
Goles_Favor INT,
Goles_Encontra INT,
Promedio_Altura_Jugadores DOUBLE PRECISION, 
Promedio_Peso_Jugadores DOUBLE PRECISION, 
Estado BIT,
Descripcion_Estado VARCHAR(60)
CONSTRAINT PK_EQUIPOS_COD_EQUIPO PRIMARY KEY (Cod_Equipo),
CONSTRAINT FK_EQUIPOS_COD_USUARIO  FOREIGN KEY (Cod_Usuario) REFERENCES USUARIOS (Cod_Usuario),
CONSTRAINT FK_EQUIPOS_COD_PROVINCIA  FOREIGN KEY (Cod_Provincia) REFERENCES PROVINCIAS (cod_Provincia),
CONSTRAINT FK_EQUIPOS_COD_CANTON FOREIGN KEY (Cod_Canton) REFERENCES Cantones (Cod_Canton),
CONSTRAINT FK_EQUIPOS_COD_DISTRITO  FOREIGN KEY (Cod_Distrito) REFERENCES Distritos (Cod_Distrito)

)

GO
CREATE TABLE Categoria_Canchas(
Cod_Categoria INT IDENTITY(1,1)  NOT NULL,
Nombre VARCHAR (60) NOT NULL,
CONSTRAINT PK_CATEGORIA_CANCHAS_COD_CATEGORIA PRIMARY KEY (Cod_Categoria),

)
GO

CREATE TABLE Canchas (
Cod_Cancha INT IDENTITY(1,1)  NOT NULL,
Cod_Usuario INT NOT NULL,
Cod_Provincia INT  NOT NULL,
Cod_Canton INT  NOT NULL,
Cod_Distrito INT  NOT NULL,
Cod_Categoria INT NOT NULL,
Foto VARCHAR (100),
Nombre VARCHAR (100) NOT NULL,
Numero_Cancha VARCHAR (60),
Telefono VARCHAR (60) NOT NULL,
Precio_Hora DOUBLE PRECISION NOT NULL,
Luz BIT ,
Precio_Luz DOUBLE PRECISION,
techo  BIT ,
Latitud DOUBLE PRECISION ,
Longitud DOUBLE PRECISION ,
Fecha Date,
Estado BIT,
Descripcion_Estado VARCHAR(60)
CONSTRAINT PK_CANCHAS_COD_CANCHA PRIMARY KEY (Cod_Cancha),
CONSTRAINT FK_CANCHAS_COD_USUARIO FOREIGN KEY (Cod_Usuario) REFERENCES USUARIOS (Cod_Usuario),
CONSTRAINT FK_CANCHAS_COD_CATEGORIA FOREIGN KEY (Cod_Categoria) REFERENCES CATEGORIA_CANCHAS (Cod_Categoria),
CONSTRAINT FK_CANCHAS_COD_PROVINCIA FOREIGN KEY (Cod_Provincia) REFERENCES PROVINCIAS (Cod_Provincia),
CONSTRAINT FK_CANCHAS_COD_CANTON FOREIGN KEY (Cod_Canton) REFERENCES CANTONES (Cod_Canton),
CONSTRAINT FK_CANCHAS_COD_DISTRITO  FOREIGN KEY (Cod_Distrito) REFERENCES DISTRITOS ( Cod_Distrito)

)


GO
CREATE TABLE Canchas_Favoritos (
Cod_Favorito INT IDENTITY(1,1)  NOT NULL,
Cod_Cancha INT NOT NULL,
Cod_Usuario INT NOT NULL,
Fecha DATE NOT NULL,
CONSTRAINT PK_CANCHAS_FAVORITOS_COD_FAVORITO PRIMARY KEY (Cod_Favorito),
CONSTRAINT FK_CANCHAS_FAVORITOS_COD_CANCHA FOREIGN KEY (Cod_Cancha) REFERENCES CANCHAS (Cod_Cancha),
CONSTRAINT FK_CANCHAS_FAVORITOS_COD_USUARIO FOREIGN KEY (Cod_Cancha) REFERENCES USUARIOS (Cod_Usuario)

)

GO

CREATE TABLE Horario_Canchas (
Cod_Horario INT IDENTITY(1,1)  NOT NULL,
Cod_Cancha INT NOT NULL,
Cod_Dia  INT NOT NULL,
Hora_Inicio INT, 
Hora_Fin INT, 
Estado BIT,
CONSTRAINT PK_HORARIO_CANCHAS_COD_HORARIO PRIMARY KEY (Cod_Horario),
CONSTRAINT FK_HORARIO_CANCHA_COD_CANCHA FOREIGN KEY (Cod_Cancha) REFERENCES CANCHAS (Cod_Cancha)


)





GO

CREATE TABLE Jugadores_Equipos (
Cod_Jugador INT IDENTITY(1,1)  NOT NULL,
Cod_Usuario INT NOT NULL,
Cod_Equipo INT  NOT NULL,
Fecha DATE  NOT NULL,
Favorito BIT, 
Administrador_Equipo BIT,
CONSTRAINT PK_JUGADORES_EQUIPOS_COD_JUGADOR PRIMARY KEY (Cod_Jugador),
CONSTRAINT FK_JUGADORES_EQUIPOS_COD_USUARIO  FOREIGN KEY (Cod_Usuario) REFERENCES USUARIOS (Cod_Usuario),
CONSTRAINT FK_JUGADORES_EQUIPOS_COD_EQUIPO  FOREIGN KEY (Cod_Equipo) REFERENCES EQUIPOS (Cod_Equipo)

)


GO



CREATE TABLE Solicitudes_Jugadores_Equipos (
Cod_Solicitud INT IDENTITY(1,1)  NOT NULL,
Cod_Usuario INT NOT NULL,
Cod_Equipo INT  NOT NULL,
Confirmacion_Usuario BIT,
Confirmacion_Equipo BIT,
Fecha DATE  NOT NULL,
Estado BIT NOT NULL,
CONSTRAINT PK_SOLICITUDES_JUGADORES_EQUIPOS_COD_SOLICITUD PRIMARY KEY (Cod_Solicitud),
CONSTRAINT FK_SOLICITUDES_JUGADORES_EQUIPOS_COD_USUARIO  FOREIGN KEY (Cod_Usuario) REFERENCES USUARIOS (Cod_Usuario),
CONSTRAINT FK_SOLICITUDES_JUGADORES_EQUIPOS_COD_EQUIPO  FOREIGN KEY (Cod_Equipo) REFERENCES EQUIPOS (Cod_Equipo)

)

GO




CREATE TABLE Reservaciones (
Cod_Reservacion INT IDENTITY(1,1)  NOT NULL,
Cod_Cancha INT NOT NULL,
Cod_Usuario INT NOT NULL,
Cod_Estado INT NOT NULL,
Reservacion_Externa BIT,
Titulo VARCHAR (60) NOT NULL, 
Fecha DATE  NOT NULL,
Hora_Inicio DATETIME  NOT NULL, 
Hora_Fin DATETIME  NOT NULL, 
DiaCompleto BIT NOT NULL,
CONSTRAINT PK_RESERVACIONES_COD_RESERVACION PRIMARY KEY (Cod_Reservacion),
CONSTRAINT FK_RESERVACIONES_COD_ESTADO  FOREIGN KEY (Cod_Estado) REFERENCES ESTADOS (Cod_Estado),
CONSTRAINT FK_RESERVACIONES_COD_USUARIO  FOREIGN KEY (Cod_Usuario) REFERENCES USUARIOS (Cod_Usuario),
CONSTRAINT FK_RESERVACIONES_COD_CANCHA FOREIGN KEY (Cod_Cancha) REFERENCES CANCHAS (Cod_Cancha)
)

GO
CREATE TABLE Confirmacion_Reservaciones(
Cod_Confirmacion INT IDENTITY(1,1)  NOT NULL,
Cod_Estado INT NOT NULL,
Cod_Reservacion INT  NOT NULL,
Cod_Retador INT  NOT NULL,
Cod_Rival INT  NOT NULL,
CONSTRAINT PK_CONFIRMACION_RESERVACIONES_COD_CONFIRMACION PRIMARY KEY (Cod_Confirmacion),
CONSTRAINT FK_CONFIRMACION_RESERVACIONE_ESTADO  FOREIGN KEY (Cod_Estado) REFERENCES ESTADOS (Cod_Estado),
CONSTRAINT FK_CONFIRMACION_RESERVACIONES_COD_RESERVACION FOREIGN KEY (Cod_Reservacion) REFERENCES RESERVACIONES (Cod_Reservacion),
CONSTRAINT FK_CONFIRMACION_RESERVACIONES_COD_RETADOR  FOREIGN KEY (Cod_Retador) REFERENCES EQUIPOS (Cod_Equipo),
CONSTRAINT FK_CONFIRMACION_RESERVACIONES_RIVAL  FOREIGN KEY (Cod_Rival) REFERENCES EQUIPOS (Cod_Equipo)

)

GO

CREATE TABLE Factura_Detalle_Reservaciones (
ID INT IDENTITY(1,1)  NOT NULL,
Cod_Reservacion  INT NOT NULL,
Cod_Pago_Retador VARCHAR (MAX) NOT NULL, 
Cod_Descuento VARCHAR (MAX) NOT NULL, 
Cod_Pago_Rival VARCHAR (MAX) NOT NULL, 
Impuesto DOUBLE PRECISION NOT NULL,
Monto_Impuesto DOUBLE PRECISION NOT NULL,
Descuento DOUBLE PRECISION NOT NULL,
Monto_Descuento DOUBLE PRECISION NOT NULL,
Porcentaje_FP DOUBLE PRECISION NOT NULL,
Monto_FP DOUBLE PRECISION NOT NULL,
Luz BIT , 
Total_Horas INT NOT NULL,
Precio_Hora DOUBLE PRECISION NOT NULL,
Precio_Luz DOUBLE PRECISION NOT NULL,
Monto_Subtotal DOUBLE PRECISION NOT NULL,
Monto_Total DOUBLE PRECISION NOT NULL,
Monto_Equipo DOUBLE PRECISION NOT NULL,
Monto_Abonado_Retador DOUBLE PRECISION NOT NULL,
Monto_Abonado_Rival DOUBLE PRECISION NOT NULL,
Monto_Pendiente_Retador DOUBLE PRECISION NOT NULL,
Monto_Pendiente_Rival DOUBLE PRECISION NOT NULL,
Estado BIT NOT NULL,
Notas_Estado VARCHAR (MAX) NOT NULL, 
CONSTRAINT PK_FACTURA_DETALLE_RESERVACIONES_ID PRIMARY KEY (ID),
CONSTRAINT FK_FACTURA_DETALLE_RESERVACIONES_COD_CONFIRMACION FOREIGN KEY (Cod_Reservacion) REFERENCES  RESERVACIONES (Cod_Reservacion)

)


GO

CREATE TABLE Historial_Partidos (
Cod_Partido INT IDENTITY(1,1)  NOT NULL,
Cod_Reservacion INT NOT NULL,
Cod_Equipo INT,
Evaluacion BIT,
Verificacion_QR BIT,
Goles_Retador INT NOT NULL,
Goles_Rival INT NOT NULL,
Estado BIT NOT NULL,
CONSTRAINT PK_HISTORIAL_PARTIDOS_COD_PARTIDO PRIMARY KEY (Cod_Partido),
CONSTRAINT FK_HISTORIAL_PARTIDOS_COD_RESERVACION FOREIGN KEY (Cod_Reservacion) REFERENCES RESERVACIONES (Cod_Reservacion),
CONSTRAINT FK_HISTORIAL_PARTIDOS_COD_EQUIPO FOREIGN KEY (Cod_Equipo) REFERENCES EQUIPOS (Cod_Equipo)
)


GO
CREATE TABLE Historial_Partidos_Equipos (
Cod_Historial_Equipo INT IDENTITY(1,1)  NOT NULL,
Cod_Equipo INT NOT NULL,
Dureza  VARCHAR (60),
Puntaje DOUBLE PRECISION NOT NULL,
CONSTRAINT PK_HISTORIAL_PARTIDOS_EQUIPOS_COD_HISTORIAL_EQUIPO PRIMARY KEY (Cod_Historial_Equipo),
CONSTRAINT FK_HISTORIAL_PARTIDOS_EQUIPOS_COD_EQUIPO FOREIGN KEY (Cod_Equipo) REFERENCES EQUIPOS (Cod_Equipo)

)