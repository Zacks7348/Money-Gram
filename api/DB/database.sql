-- *************** SqlDBM: PostgreSQL ****************;
-- ***************************************************;

DROP TABLE IF EXISTS "Bank Accounts";
DROP TABLE IF EXISTS Account;
DROP TABLE IF EXISTS "Payment Methods";
DROP TABLE IF EXISTS "Relationship Status Enum";
DROP TABLE IF EXISTS Relationships;
DROP TABLE IF EXISTS "Transaction Status Enum";
DROP TABLE IF EXISTS Transactions;
DROP TABLE IF EXISTS "User";


-- ************************************** "Bank Accounts"

CREATE TABLE IF NOT EXISTS "Bank Accounts"
(
 account_ID     bigint NOT NULL,
 routing_number bigint NOT NULL,
 account_number bigint NOT NULL,
 bank_name      text NOT NULL,
 CONSTRAINT FK_31 FOREIGN KEY ( account_ID ) REFERENCES Account ( account_ID )
);

CREATE INDEX fkIdx_32 ON "Bank Accounts"
(
 account_ID
);

-- ************************************** Account

CREATE TABLE IF NOT EXISTS Account
(
 account_ID bigint NOT NULL,
 balance    decimal NOT NULL,
 CONSTRAINT PK_account PRIMARY KEY ( account_ID )
);

-- ************************************** "Payment Methods"

CREATE TABLE IF NOT EXISTS "Payment Methods"
(
 account_ID   bigint NOT NULL,
 card_number  bigint NOT NULL,
 name_on_card text NOT NULL,
 exp_date     varchar(5) NOT NULL,
 cvv          int NOT NULL,
 CONSTRAINT FK_28 FOREIGN KEY ( account_ID ) REFERENCES Account ( account_ID )
);

CREATE INDEX fkIdx_29 ON "Payment Methods"
(
 account_ID
);

-- ************************************** "Relationship Status Enum"

CREATE TABLE IF NOT EXISTS "Relationship Status Enum"
(
 status_ID   int NOT NULL,
 description text NOT NULL,
 CONSTRAINT "PK_relationship status enum" PRIMARY KEY ( status_ID )
);

-- ************************************** Relationships

CREATE TABLE IF NOT EXISTS Relationships
(
 status_ID      int NOT NULL,
 user1_ID       bigint NOT NULL,
 user2_ID       bigint NOT NULL,
 action_user_ID bigint NOT NULL,
 CONSTRAINT FK_40 FOREIGN KEY ( user1_ID ) REFERENCES "User" ( user_ID ),
 CONSTRAINT FK_43 FOREIGN KEY ( user2_ID ) REFERENCES "User" ( user_ID ),
 CONSTRAINT FK_46 FOREIGN KEY ( status_ID ) REFERENCES "Relationship Status Enum" ( status_ID ),
 CONSTRAINT FK_49 FOREIGN KEY ( action_user_ID ) REFERENCES "User" ( user_ID )
);

CREATE INDEX fkIdx_41 ON Relationships
(
 user1_ID
);

CREATE INDEX fkIdx_44 ON Relationships
(
 user2_ID
);

CREATE INDEX fkIdx_47 ON Relationships
(
 status_ID
);

CREATE INDEX fkIdx_50 ON Relationships
(
 action_user_ID
);

-- ************************************** "Transaction Status Enum"

CREATE TABLE IF NOT EXISTS "Transaction Status Enum"
(
 status_ID   bigint NOT NULL,
 description text NOT NULL,
 CONSTRAINT "PK_transaction status enum" PRIMARY KEY ( status_ID )
);

-- ************************************** Transactions

CREATE TABLE IF NOT EXISTS Transactions
(
 transaction_ID bigint NOT NULL,
 account_ID     bigint NOT NULL,
 sender_ID      bigint NOT NULL,
 receiver_ID    bigint NOT NULL,
 status_ID      bigint NOT NULL,
 amount         decimal NOT NULL,
 "date"           text NOT NULL,
 "time"           text NOT NULL,
 CONSTRAINT PK_transactions PRIMARY KEY ( transaction_ID ),
 CONSTRAINT FK_62 FOREIGN KEY ( status_ID ) REFERENCES "Transaction Status Enum" ( status_ID ),
 CONSTRAINT FK_65 FOREIGN KEY ( account_ID ) REFERENCES Account ( account_ID ),
 CONSTRAINT FK_68 FOREIGN KEY ( sender_ID ) REFERENCES Account ( account_ID ),
 CONSTRAINT FK_71 FOREIGN KEY ( receiver_ID ) REFERENCES Account ( account_ID )
);

CREATE INDEX fkIdx_63 ON Transactions
(
 status_ID
);

CREATE INDEX fkIdx_66 ON Transactions
(
 account_ID
);

CREATE INDEX fkIdx_69 ON Transactions
(
 sender_ID
);

CREATE INDEX fkIdx_72 ON Transactions
(
 receiver_ID
);

-- ************************************** "User"

CREATE TABLE IF NOT EXISTS "User"
(
 user_ID    bigint NOT NULL,
 account_ID bigint NOT NULL,
 Fname      text NOT NULL,
 Mname      varchar(1) NOT NULL,
 Lname      text NOT NULL,
 DOB        text NOT NULL,
 phone      int NOT NULL,
 CONSTRAINT PK_user PRIMARY KEY ( user_ID ),
 CONSTRAINT FK_37 FOREIGN KEY ( account_ID ) REFERENCES Account ( account_ID )
);

CREATE INDEX fkIdx_38 ON "User"
(
 account_ID
);
