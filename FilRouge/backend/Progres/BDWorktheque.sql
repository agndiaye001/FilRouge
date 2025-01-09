CREATE TABLE "User" (
    userId SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    activeSubscription BOOLEAN DEFAULT FALSE,
);
ALTER TABLE "User" RENAME TO Users;

CREATE TABLE Subscription (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    amount FLOAT NOT NULL,
    status VARCHAR(20) NOT NULL,
    idUser INT REFERENCES User(userId),
    startDate DATE NOT NULL,
    endDate DATE NOT NULL
);

ALTER TABLE Users
ADD COLUMN idSubscription INT REFERENCES Subscription(id),
ADD COLUMN idAdmin INT REFERENCES Admin(id);

CREATE TABLE Admin (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE Users (
    userId SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    activeSubscription BOOLEAN DEFAULT FALSE,
    idSubscription INT REFERENCES Subscription(id),
    idAdmin INT REFERENCES Admin(id)
);


CREATE TABLE Visitor (
    idVisitor SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
-------------------------------------------------------------------
-- ALTER TABLE Workspace RENAME COLUMN Type TO workspaceType;
-- Table de base pour tous les espaces de travail
CREATE TABLE Workspace (
    idWorkspace SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    img BYTEA,
    duration VARCHAR(50) NOT NULL, 
    day VARCHAR(20) CHECK (day IN ( 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi' )) NOT NULL,
    durationType VARCHAR(20) CHECK (durationType IN ('hour', 'half_day', 'full_day')) NOT NULL,
    capacity INT NOT NULL,
    availability BOOLEAN DEFAULT TRUE,
    idUser INT REFERENCES Users(userId),
    idResManage INT REFERENCES ResourceManager(idResManage),
    idVisitor INT REFERENCES Visitor(idVisitor),
    idAdmin INT REFERENCES Admin(id)
);

ALTER TABLE Workspace ADD COLUMN duration VARCHAR(50) NOT NULL; 
ALTER TABLE Workspace ADD COLUMN img BYTEA;

ALTER TABLE Pricing ADD COLUMN idSubscription  INT REFERENCES Subscription(id);
CREATE TABLE Pricing (
    idPricing SERIAL PRIMARY KEY,
    price DECIMAL(10, 2) NOT NULL,      
    duration VARCHAR(50) NOT NULL,      -- Durée de la réservation (par heure, demi-journée, journée entière)
    idWorkspace INT,                    
    pricingType VARCHAR(50) NOT NULL CHECK (pricingType IN ('hour', 'half_day', 'full_day')),
    CONSTRAINT fk_workspace FOREIGN KEY (idWorkspace) REFERENCES Workspace(idWorkspace) ON DELETE CASCADE,
    idSubscription  INT REFERENCES Subscription(id);
);

----------------------------------------
CREATE TABLE CommonArea (
    idComarea SERIAL PRIMARY KEY,
    -- amenities TEXT[]  -- choix de faire une  table plus flexible Exemple d'amenities (liste de services ou équipements)
) INHERITS (Workspace);

-- Equipement ou service
CREATE TABLE Amenity (
    idAmenity SERIAL PRIMARY KEY,
    amenityName VARCHAR(50) NOT NULL,
    idComarea INT REFERENCES CommonArea(idComarea) ON DELETE CASCADE  -- Référence à CommonArea
);
----------------------------------------
CREATE TABLE IndividualOffice (
    seatingCapacity INT NOT NULL  -- Capacité de sièges pour chaque bureau
) INHERITS (Workspace);


CREATE TABLE MeetingRoom (
    seatingCapacity INT NOT NULL,  
    hasProjector BOOLEAN DEFAULT FALSE  
) INHERITS (Workspace);


CREATE TABLE OpenSpace (  
    sharedSpaces INT NOT NULL  
)INHERITS (Workspace);


CREATE TABLE SharedOffice (
    sharedBy INT NOT NULL CHECK (sharedBy > 1) 
) INHERITS (Workspace);

------------------------------------------------

CREATE TABLE Subscription (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,  
    amount DECIMAL(10, 2) NOT NULL,  
    idUser INT NOT NULL REFERENCES Users(userId), 
    startDate DATE NOT NULL,  
    endDate DATE NOT NULL,  
    status VARCHAR(20) CHECK (status IN ('Active', 'Inactive', 'Expired')) NOT NULL  -- Statut de la souscription
);
 --------------------------------
CREATE TABLE Reservation (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    duration VARCHAR(50) NOT NULL,
    spaceType VARCHAR(50) CHECK (spaceType IN ('IndividualOffice', 'MeetingRoom', 'OpenSpace')) NOT NULL,
    idUser INT REFERENCES Users(userId),  
    idAdmin INT REFERENCES Admin(id), 
    idSubscription INT REFERENCES Subscription(id),  
    idWorkspace INT REFERENCES Workspace(idWorkspace)
);

CREATE TABLE Transaction (
    transactionId SERIAL PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Pending', 'Completed', 'Cancelled')) NOT NULL,
    idReservation INT NOT NULL REFERENCES Reservation(idReservation) ON DELETE CASCADE
);
---------------------- Function User ---------------------------

CREATE OR REPLACE FUNCTION add_user(
    p_name VARCHAR(50),
    p_email VARCHAR(100),
    p_password VARCHAR(100),
    p_activeSubscription BOOLEAN DEFAULT FALSE,
    p_idSubscription INT DEFAULT NULL,
    p_idAdmin INT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    -- Insertion dans la table Users
    INSERT INTO Users(name, email, password, activeSubscription, idSubscription, idAdmin)
    VALUES (p_name, p_email, p_password, p_activeSubscription, p_idSubscription, p_idAdmin);
    
    -- Retourner un message de confirmation (facultatif)
    RAISE NOTICE 'Utilisateur ajouté avec succès: %', p_name;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION update_user(
    p_userId INT,
    p_name VARCHAR(50) DEFAULT NULL,
    p_email VARCHAR(100) DEFAULT NULL,
    p_password VARCHAR(100) DEFAULT NULL,
    p_activeSubscription BOOLEAN DEFAULT NULL,
    p_idSubscription INT DEFAULT NULL,
    p_idAdmin INT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
	 -- Vérifier si l'email est NULL ou vide et déclencher une exception
	 IF p_email IS NULL OR p_email = '' THEN
		RAISE EXCEPTION 'L''email est obligatoire et ne peut pas être NULL ou vide.';
	 END IF;
    
    -- Vérifier si le mot de passe est NULL ou vide et déclencher une exception
    	IF p_password IS NULL OR p_password = '' THEN
        	RAISE EXCEPTION 'Le mot de passe est obligatoire et ne peut pas être NULL ou vide.';
    	END IF;
    UPDATE Users
    SET
        name = COALESCE(p_name, name), -- Si p_name est NULL, conserve la valeur actuelle
        email = p_email,
        password = p_password,
        activeSubscription = COALESCE(p_activeSubscription, activeSubscription),  
        idSubscription = COALESCE(p_idSubscription, idSubscription),  
        idAdmin = COALESCE(p_idAdmin, idAdmin)  
    WHERE userId = p_userId;
    
    -- Retourner un message de confirmation (facultatif)
    RAISE NOTICE 'Utilisateur avec ID % mis à jour avec succès.', p_userId;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION delete_user(p_userId INT)
RETURNS VOID AS $$
BEGIN
    -- Vérifier si l'utilisateur existe avant de tenter de le supprimer
    IF NOT EXISTS (SELECT 1 FROM Users WHERE userId = p_userId) THEN
        RAISE EXCEPTION 'Utilisateur avec ID % n''existe pas.', p_userId;
    END IF;

    -- Suppression de l'utilisateur de la table Users
    DELETE FROM Users WHERE userId = p_userId;

    -- Retourner un message de confirmation (facultatif)
    RAISE NOTICE 'Utilisateur avec ID % supprimé avec succès.', p_userId;
END;
$$ LANGUAGE plpgsql;


------------------------ Reservation ----------------

CREATE OR REPLACE FUNCTION add_reservation(
    p_userId INT,
    p_idWorkspace INT,
    p_idSubscriptio INT,
    p_idAdmin INT,
    p_date DATE,
    p_duration VARCHAR(50),
    p_spaceType VARCHAR(50),
    p_transactionId INT
)
RETURNS VOID AS $$
BEGIN
    -- Vérifier si l'espace de travail est disponible
    IF NOT EXISTS (SELECT 1 FROM Workspace WHERE idWorkspace = p_idWorkspace AND availability = TRUE) THEN
        RAISE EXCEPTION 'L''espace de travail % n''est pas disponible.', p_idWorkspace;
    END IF;

    -- Insertion de la réservation
    INSERT INTO Reservation (date, duration, spaceType, idUser,  idWorkspace,idSubscription, idAdmin)
    VALUES (p_date, p_duration, p_spaceType, p_userId, p_idWorkspace, p_idSubscriptio, p_idAdmin, p_transactionId);

    -- Mettre l'espace de travail comme non disponible
    UPDATE Workspace SET availability = FALSE WHERE idWorkspace = p_idWorkspace;

    -- Retourner un message de confirmation
    RAISE NOTICE 'Réservation pour l''utilisateur % ajoutée avec succès pour l''espace de travail %.', p_userId, p_idWorkspace;
END;
$$ LANGUAGE plpgsql;

----------------------------------
fait la fonction update et delete 







------- Revoir les fonctions et triggers -----------------------
CREATE OR REPLACE FUNCTION update_workspace_availability_on_delete()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE Workspace
    SET availability = TRUE
    WHERE idWorkspace = OLD.idWorkspace; 
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_workspace_available_on_delete
AFTER DELETE ON Reservation
FOR EACH ROW
EXECUTE FUNCTION update_workspace_availability_on_delete();


